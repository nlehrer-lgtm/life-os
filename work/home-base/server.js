require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// ── Google token cache ────────────────────────────────────────────────────────
let googleAccessToken = null;
let googleTokenExpiry = 0;

async function getGoogleToken() {
  if (googleAccessToken && Date.now() < googleTokenExpiry) {
    return googleAccessToken;
  }
  const { default: fetch } = await import('node-fetch');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Google token error: ${JSON.stringify(data)}`);
  googleAccessToken = data.access_token;
  googleTokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return googleAccessToken;
}

// ── Gmail ─────────────────────────────────────────────────────────────────────
app.get('/api/gmail', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');
    const token = await getGoogleToken();

    const listRes = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=8&q=is:unread+in:inbox',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const listData = await listRes.json();
    const messages = listData.messages || [];

    const details = await Promise.all(
      messages.map(m =>
        fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
          { headers: { Authorization: `Bearer ${token}` } }
        ).then(r => r.json())
      )
    );

    res.json({
      unreadCount: listData.resultSizeEstimate || messages.length,
      messages: details.map(d => {
        const headers = Object.fromEntries(
          (d.payload?.headers || []).map(h => [h.name, h.value])
        );
        return {
          id: d.id,
          subject: headers.Subject || '(no subject)',
          from: headers.From || '',
          date: headers.Date || '',
          snippet: d.snippet || '',
        };
      }),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Calendar ──────────────────────────────────────────────────────────────────
app.get('/api/calendar', async (req, res) => {
  try {
    const { default: fetch } = await import('node-fetch');
    const token = await getGoogleToken();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();

    const calRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfDay}&timeMax=${endOfDay}&singleEvents=true&orderBy=startTime`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const calData = await calRes.json();

    res.json({
      events: (calData.items || []).map(e => ({
        id: e.id,
        summary: e.summary || '(no title)',
        start: e.start?.dateTime || e.start?.date,
        end: e.end?.dateTime || e.end?.date,
        location: e.location || null,
        colorId: e.colorId || null,
        allDay: !!e.start?.date && !e.start?.dateTime,
      })),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Slack ─────────────────────────────────────────────────────────────────────
const SLACK_BASE = 'https://slack.com/api';

async function slackFetch(path) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(`${SLACK_BASE}${path}`, {
    headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
  });
  return res.json();
}

app.get('/api/slack/mentions', async (req, res) => {
  try {
    const dmsData = await slackFetch('/conversations.list?types=im&limit=8');
    const dmChannels = (dmsData.channels || []).slice(0, 8);

    const [dmMessages, dmInfos] = await Promise.all([
      Promise.all(dmChannels.map(c => slackFetch(`/conversations.history?channel=${c.id}&limit=3`))),
      Promise.all(dmChannels.map(c => slackFetch(`/conversations.info?channel=${c.id}`))),
    ]);

    const userIds = [...new Set(dmChannels.map(c => c.user).filter(Boolean))];
    const users = await Promise.all(userIds.map(id => slackFetch(`/users.info?user=${id}`)));
    const userMap = Object.fromEntries(
      users.map(u => [u.user?.id, u.user?.real_name || u.user?.name])
    );

    const dms = dmChannels
      .map((c, i) => ({
        channelId: c.id,
        userId: c.user,
        userName: userMap[c.user] || 'Unknown',
        unread: dmInfos[i]?.channel?.unread_count || 0,
        messages: (dmMessages[i]?.messages || []).slice(0, 3).map(m => ({
          text: m.text,
          ts: m.ts,
        })),
      }))
      .filter(d => d.messages.length > 0 || d.unread > 0);

    res.json({ dms });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/slack/channel/:channelId', async (req, res) => {
  try {
    const { channelId } = req.params;
    const [histData, infoData] = await Promise.all([
      slackFetch(`/conversations.history?channel=${channelId}&limit=12`),
      slackFetch(`/conversations.info?channel=${channelId}`),
    ]);

    const messages = histData.messages || [];
    const userIds = [...new Set(messages.map(m => m.user).filter(Boolean))];
    const users = await Promise.all(userIds.map(id => slackFetch(`/users.info?user=${id}`)));
    const userMap = Object.fromEntries(
      users.map(u => [u.user?.id, u.user?.real_name || u.user?.name])
    );

    res.json({
      channelName: infoData.channel?.name || channelId,
      unread: infoData.channel?.unread_count || 0,
      messages: messages.map(m => ({
        text: m.text,
        ts: m.ts,
        userName: userMap[m.user] || m.username || 'Unknown',
        reactions: m.reactions || [],
      })),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Asana ─────────────────────────────────────────────────────────────────────
const ASANA_BASE = 'https://app.asana.com/api/1.0';
const ASANA_FIELDS = 'name,due_on,projects,notes,permalink_url,completed,assignee';

async function asanaFetch(path) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(`${ASANA_BASE}${path}`, {
    headers: { Authorization: `Bearer ${process.env.ASANA_PAT}` },
  });
  return res.json();
}

app.get('/api/asana/urgent', async (req, res) => {
  try {
    const data = await asanaFetch(
      `/tasks?assignee=me&workspace=${process.env.ASANA_WORKSPACE_GID}&completed_since=now&opt_fields=${ASANA_FIELDS}&limit=25&sort_by=due_date&sort_ascending=true`
    );
    const tasks = (data.data || []).filter(t => !t.completed).slice(0, 10);
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/asana/ahead', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = await asanaFetch(
      `/tasks?assignee=me&workspace=${process.env.ASANA_WORKSPACE_GID}&completed_since=now&opt_fields=${ASANA_FIELDS}&limit=30&sort_by=due_date&sort_ascending=true`
    );
    const tasks = (data.data || [])
      .filter(t => !t.completed && t.due_on && t.due_on > today)
      .slice(0, 8);
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Claude Chat (SSE streaming) ───────────────────────────────────────────────
app.post('/api/chat', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        stream: true,
        system: `You are Nathaniel's helpful work assistant embedded in his leadership dashboard. He is the Director of Video Production at Messenger International, a non-profit Christian ministry in Spring Hill, TN. His leadership ideology: leadership is designed not improvised; delegation is how thinking scales; his highest leverage is people, not output. Be concise, warm, and direct. Use his name occasionally.`,
        messages: req.body.messages,
      }),
    });

    const reader = response.body;
    reader.on('data', chunk => res.write(chunk));
    reader.on('end', () => res.end());
    reader.on('error', e => {
      res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
      res.end();
    });
  } catch (e) {
    res.write(`data: ${JSON.stringify({ error: e.message })}\n\n`);
    res.end();
  }
});

// ── Quote of the day ──────────────────────────────────────────────────────────
const quotes = require('./quotes');
app.get('/api/quote', (req, res) => {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - start) / 86400000);
  res.json(quotes[dayOfYear % quotes.length]);
});

// ── Milestones ────────────────────────────────────────────────────────────────
app.get('/api/milestones', (req, res) => {
  res.json(require('./milestones.json'));
});

// ── Config (exposes non-secret env vars to frontend) ─────────────────────────
app.get('/api/config', (req, res) => {
  res.json({
    slackVideoChannelId: process.env.SLACK_VIDEO_CHANNEL_ID || '',
    slackAllStaffChannelId: process.env.SLACK_ALLSTAFF_CHANNEL_ID || '',
    refreshIntervalMinutes: parseInt(process.env.REFRESH_INTERVAL_MINUTES || '5'),
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏠 Home Base running at http://localhost:${PORT}\n`);
});
