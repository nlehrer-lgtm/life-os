// ── Config (loaded first) ─────────────────────────────────────────────────────
let SLACK_VIDEO_ID = '';
let SLACK_ALLSTAFF_ID = '';
let REFRESH_MS = 5 * 60 * 1000;

async function loadConfig() {
  try {
    const c = await api('/config');
    SLACK_VIDEO_ID = c.slackVideoChannelId || '';
    SLACK_ALLSTAFF_ID = c.slackAllStaffChannelId || '';
    REFRESH_MS = (c.refreshIntervalMinutes || 5) * 60 * 1000;
  } catch {}
}

// ── Fetch helper ──────────────────────────────────────────────────────────────
async function api(path) {
  const res = await fetch(`/api${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ── HTML escape ───────────────────────────────────────────────────────────────
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Clock & greeting ──────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  document.getElementById('clock').textContent = `${h % 12 || 12}:${m} ${ampm}`;

  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  document.getElementById('greeting').textContent = `${greet}, Nathaniel`;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('date-long').textContent =
    `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;

  const start = new Date(now.getFullYear(), 0, 1);
  const dayOfYear = Math.ceil((now - start) / 86400000);
  const daysInYear = new Date(now.getFullYear(), 1, 29).getMonth() === 1 ? 366 : 365;
  document.getElementById('date-sub').textContent = `Day ${dayOfYear} of ${daysInYear}`;
}
setInterval(updateClock, 1000);
updateClock();

// ── Gmail ─────────────────────────────────────────────────────────────────────
async function loadGmail() {
  const body = document.getElementById('gmail-body');
  try {
    const data = await api('/gmail');
    document.getElementById('gmail-count').textContent = data.unreadCount || '0';
    if (!data.messages?.length) {
      body.innerHTML = '<div class="empty">Inbox zero 🎉</div>';
      return;
    }
    body.innerHTML = data.messages.map(m => {
      const fromName = m.from.replace(/<[^>]+>/, '').trim() || m.from;
      return `<div class="email-item">
        <div class="email-from">${esc(fromName)}</div>
        <div class="email-subject">${esc(m.subject)}</div>
        <div class="email-snippet">${esc(m.snippet)}</div>
      </div>`;
    }).join('');
  } catch (e) {
    body.innerHTML = `<div class="error-msg">Gmail unavailable — check credentials</div>`;
  }
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

async function loadCalendar() {
  const body = document.getElementById('calendar-body');
  try {
    const data = await api('/calendar');
    const events = data.events || [];
    document.getElementById('cal-event-count').textContent =
      `${events.length} event${events.length !== 1 ? 's' : ''}`;

    if (!events.length) {
      body.innerHTML = '<div class="empty">Nothing on the schedule today</div>';
      return;
    }

    const now = new Date();
    let html = '';
    let nowLineInserted = false;

    for (const e of events) {
      const start = new Date(e.start);
      if (!nowLineInserted && !e.allDay && start > now) {
        html += `<div class="cal-now-line"></div>`;
        nowLineInserted = true;
      }
      const isCurrent = !e.allDay && start <= now && new Date(e.end) >= now;
      const timeStr = e.allDay ? 'All day' : formatTime(start);
      html += `<div class="cal-event ${isCurrent ? 'cal-current' : ''}">
        <div class="cal-time">${timeStr}</div>
        <div>
          <div class="cal-title">${esc(e.summary)}</div>
          ${e.location ? `<div class="cal-loc">${esc(e.location)}</div>` : ''}
        </div>
      </div>`;
    }
    body.innerHTML = html;
  } catch (e) {
    body.innerHTML = `<div class="error-msg">Calendar unavailable — check credentials</div>`;
  }
}

// ── Slack ─────────────────────────────────────────────────────────────────────
async function loadSlackDMs() {
  const body = document.getElementById('slack-dms-body');
  try {
    const data = await api('/slack/mentions');
    const dms = data.dms || [];
    const totalUnread = dms.reduce((acc, d) => acc + (d.unread || 0), 0);
    document.getElementById('slack-dm-count').textContent = totalUnread || '0';

    if (!dms.length) {
      body.innerHTML = '<div class="empty">No recent DMs</div>';
      return;
    }
    body.innerHTML = dms.map(d => `
      <div style="margin-bottom:9px;">
        <div class="slack-msg-user">${esc(d.userName)}${d.unread ? ` <span style="font-size:9px; background:var(--accent-dim); color:var(--accent); border-radius:8px; padding:1px 5px;">${d.unread}</span>` : ''}</div>
        ${d.messages.map(m => `<div class="slack-msg-text">${esc(m.text)}</div>`).join('')}
      </div>`).join('');
  } catch (e) {
    if (!SLACK_VIDEO_ID) {
      body.innerHTML = `<div class="error-msg">Slack not configured yet — see setup.md</div>`;
    } else {
      body.innerHTML = `<div class="error-msg">Slack DMs unavailable</div>`;
    }
  }
}

async function loadSlackChannel(channelId, bodyId, notConfiguredMsg) {
  const body = document.getElementById(bodyId);
  if (!channelId) {
    body.innerHTML = `<div class="error-msg">${notConfiguredMsg || 'Channel not configured — see setup.md'}</div>`;
    return;
  }
  try {
    const data = await api(`/slack/channel/${channelId}`);
    const msgs = data.messages || [];
    if (!msgs.length) {
      body.innerHTML = '<div class="empty">No recent messages</div>';
      return;
    }
    body.innerHTML = msgs.map(m => `
      <div class="slack-msg">
        <div class="slack-msg-user">${esc(m.userName)}</div>
        <div class="slack-msg-text">${esc(m.text)}</div>
      </div>`).join('');
  } catch (e) {
    body.innerHTML = `<div class="error-msg">Channel unavailable</div>`;
  }
}

// ── Asana ─────────────────────────────────────────────────────────────────────
function formatDue(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[m-1]} ${d}`;
}
function dueClass(dateStr) {
  if (!dateStr) return 'none';
  const today = new Date().toISOString().split('T')[0];
  if (dateStr < today) return 'overdue';
  if (dateStr === today) return 'today';
  const soon = new Date();
  soon.setDate(soon.getDate() + 3);
  if (dateStr <= soon.toISOString().split('T')[0]) return 'soon';
  return 'future';
}

async function loadAsana() {
  const body = document.getElementById('asana-urgent-body');
  try {
    const data = await api('/asana/urgent');
    const tasks = data.tasks || [];
    if (!tasks.length) {
      body.innerHTML = '<div class="empty">No urgent tasks</div>';
      return;
    }
    body.innerHTML = tasks.map(t => {
      const cls = dueClass(t.due_on);
      const label = cls === 'today' ? 'Today' : cls === 'overdue' ? 'Overdue' : (formatDue(t.due_on) || '—');
      return `<div class="task-item">
        <div class="task-due ${cls}">${label}</div>
        <div class="task-name">${esc(t.name)}</div>
      </div>`;
    }).join('');
  } catch (e) {
    body.innerHTML = `<div class="error-msg">Asana unavailable — check ASANA_PAT</div>`;
  }
}

// ── Quote ─────────────────────────────────────────────────────────────────────
async function loadQuote() {
  const body = document.getElementById('quote-body');
  try {
    const q = await api('/quote');
    body.innerHTML = `
      <div class="quote-text">"${esc(q.text)}"</div>
      <div class="quote-author">— ${esc(q.author)}</div>
      ${q.context ? `<div class="quote-context">${esc(q.context)}</div>` : ''}`;
  } catch (e) {
    body.innerHTML = '<div class="empty">—</div>';
  }
}

// ── Year Timeline SVG ─────────────────────────────────────────────────────────
async function renderTimeline() {
  try {
    const data = await api('/milestones');
    const milestones = data.milestones || [];
    drawTimeline(milestones);
  } catch {
    drawTimeline([]);
  }
}

function drawTimeline(milestones) {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31, 23, 59, 59);
  const totalMs = endOfYear - startOfYear;
  const progress = (now - startOfYear) / totalMs;

  const W = 1000, H = 52;
  const roadY = 36, padX = 30;
  const roadW = W - padX * 2;
  const carX = padX + progress * roadW;

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let svg = '';

  // Road background (gray)
  svg += `<line x1="${padX}" y1="${roadY}" x2="${W - padX}" y2="${roadY}" stroke="rgba(255,255,255,0.18)" stroke-width="5" stroke-linecap="round"/>`;

  // Progress line (gold)
  svg += `<line x1="${padX}" y1="${roadY}" x2="${carX}" y2="${roadY}" stroke="#e8b96a" stroke-width="5" stroke-linecap="round"/>`;

  // Month tick marks and labels
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(year, i, 1);
    const pos = (monthDate - startOfYear) / totalMs;
    const x = padX + pos * roadW;
    svg += `<line x1="${x}" y1="${roadY - 4}" x2="${x}" y2="${roadY + 4}" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>`;
    svg += `<text x="${x}" y="${H}" text-anchor="middle" font-size="8.5" fill="rgba(255,250,238,0.45)" font-family="-apple-system,sans-serif">${months[i]}</text>`;
  }

  // Milestone flags
  for (const m of milestones) {
    const d = new Date(m.date);
    const pos = (d - startOfYear) / totalMs;
    const x = padX + Math.max(0, Math.min(1, pos)) * roadW;
    const color = m.color || '#e8b96a';
    const labelW = m.label.length * 5.8 + 10;

    svg += `<line x1="${x}" y1="${roadY - 18}" x2="${x}" y2="${roadY - 1}" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.85"/>`;
    svg += `<rect x="${x - labelW / 2}" y="${roadY - 30}" width="${labelW}" height="14" rx="3" fill="${color}" opacity="0.9"/>`;
    svg += `<text x="${x}" y="${roadY - 20}" text-anchor="middle" font-size="8" fill="#1a0a00" font-family="-apple-system,sans-serif" font-weight="700">${esc(m.label)}</text>`;
  }

  // Car icon at today position
  const cx = carX;
  svg += `
    <g transform="translate(${cx - 11}, ${roadY - 24})" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
      <rect x="1" y="7" width="20" height="10" rx="3" fill="#e8b96a"/>
      <rect x="4" y="3" width="14" height="8" rx="2" fill="#f5d48a"/>
      <rect x="5" y="4" width="4" height="5" rx="1" fill="rgba(180,230,255,0.8)"/>
      <rect x="13" y="4" width="4" height="5" rx="1" fill="rgba(180,230,255,0.8)"/>
      <circle cx="5.5" cy="18" r="2.8" fill="#1a0a00"/>
      <circle cx="16.5" cy="18" r="2.8" fill="#1a0a00"/>
      <circle cx="5.5" cy="18" r="1.2" fill="#555"/>
      <circle cx="16.5" cy="18" r="1.2" fill="#555"/>
      <rect x="0" y="12" width="3" height="2" rx="1" fill="rgba(255,240,120,0.7)"/>
      <rect x="19" y="12" width="3" height="2" rx="1" fill="rgba(255,80,80,0.6)"/>
    </g>`;

  // "Today" label below car
  svg += `<text x="${cx}" y="${H - 1}" text-anchor="middle" font-size="8" fill="#e8b96a" font-weight="700" font-family="-apple-system,sans-serif">Now</text>`;

  document.getElementById('timeline-svg').innerHTML = svg;
}

// ── Claude Chat ───────────────────────────────────────────────────────────────
const chatHistory = [];

function appendBubble(role, text) {
  const el = document.createElement('div');
  el.className = `chat-bubble ${role}`;
  el.textContent = text;
  document.getElementById('chat-messages').appendChild(el);
  el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  return el;
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = '';

  chatHistory.push({ role: 'user', content: text });
  appendBubble('user', text);

  const bubble = appendBubble('assistant', '');
  bubble.classList.add('typing');
  let accumulated = '';

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        try {
          const json = JSON.parse(line.slice(6));
          if (json.type === 'content_block_delta' && json.delta?.text) {
            accumulated += json.delta.text;
            bubble.textContent = accumulated;
            bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        } catch {}
      }
    }
    bubble.classList.remove('typing');
    if (accumulated) chatHistory.push({ role: 'assistant', content: accumulated });
  } catch (e) {
    bubble.classList.remove('typing');
    bubble.textContent = `Error: ${e.message}`;
  }
}

document.getElementById('chat-send').addEventListener('click', sendChat);
document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(); }
});
// Auto-resize textarea
document.getElementById('chat-input').addEventListener('input', function () {
  this.style.height = '';
  this.style.height = Math.min(this.scrollHeight, 80) + 'px';
});

// ── Expand overlay ────────────────────────────────────────────────────────────
document.querySelectorAll('.expandable').forEach(panel => {
  panel.addEventListener('click', e => {
    if (e.target.closest('#chat-input-row')) return;
    const overlay = document.getElementById('overlay');
    document.getElementById('overlay-title').textContent = panel.dataset.title || '';
    const srcBody = panel.querySelector('.panel-body');
    document.getElementById('overlay-body').innerHTML = srcBody ? srcBody.innerHTML : '';
    overlay.classList.add('active');
  });
});

document.getElementById('overlay-close').addEventListener('click', () => {
  document.getElementById('overlay').classList.remove('active');
});
document.getElementById('overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('overlay')) {
    document.getElementById('overlay').classList.remove('active');
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('overlay').classList.remove('active');
});

// ── Auto-refresh ──────────────────────────────────────────────────────────────
async function loadAll() {
  const dot = document.getElementById('refresh-dot');
  dot.classList.add('active');
  await Promise.allSettled([
    loadGmail(),
    loadCalendar(),
    loadSlackDMs(),
    loadSlackChannel(SLACK_VIDEO_ID, 'slack-video-body', 'Video channel not configured — see setup.md'),
    loadSlackChannel(SLACK_ALLSTAFF_ID, 'slack-allstaff-body', 'All-staff channel not configured — see setup.md'),
    loadAsana(),
    loadQuote(),
    renderTimeline(),
  ]);
  dot.classList.remove('active');
}

// ── Boot sequence ─────────────────────────────────────────────────────────────
(async () => {
  await loadConfig();
  await loadAll();
  setInterval(loadAll, REFRESH_MS);
})();
