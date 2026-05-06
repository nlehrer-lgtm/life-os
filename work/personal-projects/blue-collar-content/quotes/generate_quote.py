from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OUTPUT = "hushed-lawn-care-quote.pdf"

# Color palette — clean, professional, dark
DARK = colors.HexColor("#1A1A1A")
MID = colors.HexColor("#555555")
LIGHT = colors.HexColor("#999999")
ACCENT = colors.HexColor("#2C6E49")   # deep green — nods to lawn care
RULE = colors.HexColor("#DDDDDD")
BG_LIGHT = colors.HexColor("#F7F9F7")

def build_styles():
    base = getSampleStyleSheet()

    styles = {}

    styles["doc_title"] = ParagraphStyle(
        "doc_title",
        fontName="Helvetica-Bold",
        fontSize=22,
        textColor=DARK,
        spaceAfter=2,
        leading=26,
    )

    styles["doc_subtitle"] = ParagraphStyle(
        "doc_subtitle",
        fontName="Helvetica",
        fontSize=10,
        textColor=LIGHT,
        spaceAfter=0,
        leading=14,
    )

    styles["section_label"] = ParagraphStyle(
        "section_label",
        fontName="Helvetica-Bold",
        fontSize=7,
        textColor=ACCENT,
        spaceBefore=0,
        spaceAfter=4,
        leading=10,
        letterSpacing=1.2,
    )

    styles["party_name"] = ParagraphStyle(
        "party_name",
        fontName="Helvetica-Bold",
        fontSize=11,
        textColor=DARK,
        spaceAfter=1,
        leading=14,
    )

    styles["party_detail"] = ParagraphStyle(
        "party_detail",
        fontName="Helvetica",
        fontSize=9,
        textColor=MID,
        spaceAfter=1,
        leading=13,
    )

    styles["section_heading"] = ParagraphStyle(
        "section_heading",
        fontName="Helvetica-Bold",
        fontSize=10,
        textColor=DARK,
        spaceBefore=16,
        spaceAfter=6,
        leading=14,
    )

    styles["body"] = ParagraphStyle(
        "body",
        fontName="Helvetica",
        fontSize=9.5,
        textColor=DARK,
        spaceAfter=6,
        leading=15,
    )

    styles["body_bold"] = ParagraphStyle(
        "body_bold",
        fontName="Helvetica-Bold",
        fontSize=9.5,
        textColor=DARK,
        spaceAfter=4,
        leading=15,
    )

    styles["bullet"] = ParagraphStyle(
        "bullet",
        fontName="Helvetica",
        fontSize=9.5,
        textColor=DARK,
        spaceAfter=4,
        leading=15,
        leftIndent=14,
        bulletIndent=0,
    )

    styles["rate_label"] = ParagraphStyle(
        "rate_label",
        fontName="Helvetica-Bold",
        fontSize=9.5,
        textColor=MID,
        spaceAfter=0,
        leading=14,
    )

    styles["rate_value"] = ParagraphStyle(
        "rate_value",
        fontName="Helvetica-Bold",
        fontSize=18,
        textColor=ACCENT,
        spaceAfter=0,
        leading=22,
    )

    styles["sig_name"] = ParagraphStyle(
        "sig_name",
        fontName="Helvetica-Bold",
        fontSize=9.5,
        textColor=DARK,
        spaceAfter=2,
        leading=14,
    )

    styles["sig_label"] = ParagraphStyle(
        "sig_label",
        fontName="Helvetica",
        fontSize=8,
        textColor=LIGHT,
        spaceAfter=0,
        leading=12,
    )

    styles["footer"] = ParagraphStyle(
        "footer",
        fontName="Helvetica",
        fontSize=7.5,
        textColor=LIGHT,
        alignment=TA_CENTER,
        leading=11,
    )

    return styles


def rule(color=RULE, thickness=0.5, spaceAfter=12, spaceBefore=0):
    return HRFlowable(
        width="100%",
        thickness=thickness,
        color=color,
        spaceAfter=spaceAfter,
        spaceBefore=spaceBefore,
    )


def build_story(styles):
    story = []
    W = 6.5 * inch  # usable width

    # ── HEADER ──────────────────────────────────────────────────────────────
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("SERVICE QUOTE", styles["doc_title"]))
    story.append(Paragraph("May 5, 2026", styles["doc_subtitle"]))
    story.append(Spacer(1, 0.18 * inch))
    story.append(rule(color=ACCENT, thickness=1.5, spaceAfter=16))

    # ── FROM / PREPARED FOR (two-column) ────────────────────────────────────
    from_block = [
        Paragraph("FROM", styles["section_label"]),
        Paragraph("Nathaniel Lehrer", styles["party_name"]),
        Paragraph("nathanielrlehrer@gmail.com", styles["party_detail"]),
    ]
    to_block = [
        Paragraph("PREPARED FOR", styles["section_label"]),
        Paragraph("Zac Musgrove", styles["party_name"]),
        Paragraph("HUSHED | All-Electric Lawncare", styles["party_detail"]),
        Paragraph("Franklin, TN", styles["party_detail"]),
        Paragraph("615-996-9479  ·  zac@hushedlawncare.com", styles["party_detail"]),
    ]

    party_table = Table(
        [[from_block, to_block]],
        colWidths=[W * 0.45, W * 0.55],
    )
    party_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(party_table)
    story.append(Spacer(1, 0.2 * inch))
    story.append(rule())

    # ── SCOPE OF WORK ────────────────────────────────────────────────────────
    story.append(Paragraph("SCOPE OF WORK", styles["section_label"]))
    story.append(Paragraph(
        "Nathaniel Lehrer will supply social media content that includes both professional "
        "photos and videos, and will manage HUSHED Lawn Care’s social media platforms by "
        "capturing, curating, and posting unique content on a monthly basis, scheduled out weekly.",
        styles["body"]
    ))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Deliverables include:", styles["body_bold"]))

    bullets = [
        "Professional on-location photo and video content shot at HUSHED Lawn Care job sites",
        "Monthly content cycle with fresh, original material produced each month",
        "Content curation and scheduling — posted weekly across agreed social media platforms",
    ]
    for b in bullets:
        story.append(Paragraph(f"•  {b}", styles["bullet"]))

    # Rate callout box
    story.append(Spacer(1, 10))
    rate_data = [
        [
            Paragraph("MONTHLY RATE", styles["rate_label"]),
            Paragraph("$750", styles["rate_value"]),
        ]
    ]
    rate_table = Table(rate_data, colWidths=[W * 0.5, W * 0.5])
    rate_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BG_LIGHT),
        ("BOX", (0, 0), (-1, -1), 0.5, RULE),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("RIGHTPADDING", (1, 0), (1, 0), 18),
    ]))
    story.append(rate_table)
    story.append(Spacer(1, 0.18 * inch))
    story.append(rule())

    # ── CONTENT OWNERSHIP ────────────────────────────────────────────────────
    story.append(Paragraph("CONTENT OWNERSHIP", styles["section_label"]))
    story.append(Paragraph(
        "All content created under this agreement is the exclusive property of HUSHED Lawn Care "
        "and may be used freely across their website, social media platforms, and marketing materials.",
        styles["body"]
    ))
    story.append(Paragraph(
        "Content produced under this agreement may <b>not</b> be licensed, sold, or distributed "
        "to third-party companies, competitors, or other websites.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    story.append(rule())

    # ── PAYMENT TERMS ────────────────────────────────────────────────────────
    story.append(Paragraph("PAYMENT TERMS", styles["section_label"]))
    story.append(Paragraph(
        "Payment of <b>$750</b> is due no later than <b>two (2) weeks</b> after the date "
        "this agreement is signed.",
        styles["body"]
    ))
    story.append(Paragraph(
        "Accepted payment methods: &nbsp; Venmo · Zelle · Cash",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    story.append(rule())

    # ── AGREEMENT TERMS ──────────────────────────────────────────────────────
    story.append(Paragraph("AGREEMENT TERMS", styles["section_label"]))
    story.append(Paragraph(
        "This quote covers <b>one (1) month</b> of content services (capture, editing, and posting). "
        "It is not a subscription, retainer, or long-term contract. HUSHED Lawn Care is under no "
        "obligation to continue beyond the initial month. Continuation is entirely at your discretion.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    story.append(rule())

    # ── SIGNATURES ───────────────────────────────────────────────────────────
    story.append(Paragraph("SIGNATURES", styles["section_label"]))
    story.append(Paragraph(
        "By signing below, both parties agree to the scope of work and terms outlined in this document.",
        styles["body"]
    ))
    story.append(Spacer(1, 0.3 * inch))

    col = W / 2 - 0.2 * inch
    gap = 0.4 * inch

    def sig_block(name):
        return [
            Paragraph(name, styles["sig_name"]),
            Spacer(1, 0.45 * inch),
            HRFlowable(width="100%", thickness=0.5, color=DARK, spaceAfter=4),
            Paragraph("Signature", styles["sig_label"]),
            Spacer(1, 0.25 * inch),
            HRFlowable(width="40%", thickness=0.5, color=DARK, spaceAfter=4),
            Paragraph("Date", styles["sig_label"]),
        ]

    sig_data = [[sig_block("Nathaniel Lehrer"), sig_block("Zac Musgrove — HUSHED Lawn Care")]]

    sig_table = Table(sig_data, colWidths=[col, col])
    sig_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (0, -1), gap),
        ("RIGHTPADDING", (1, 0), (1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    story.append(sig_table)

    return story


def main():
    import os
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(out_dir, OUTPUT)

    doc = SimpleDocTemplate(
        out_path,
        pagesize=letter,
        leftMargin=1.0 * inch,
        rightMargin=1.0 * inch,
        topMargin=0.9 * inch,
        bottomMargin=0.9 * inch,
        title="Service Quote — HUSHED Lawn Care",
        author="Nathaniel Lehrer",
    )

    styles = build_styles()
    story = build_story(styles)

    doc.build(story)
    print(f"PDF saved to: {out_path}")


if __name__ == "__main__":
    main()
