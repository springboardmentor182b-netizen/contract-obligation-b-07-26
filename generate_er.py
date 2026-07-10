"""
Generate ER Diagram PNG — tight canvas, no white space.
Uses only matplotlib (already installed).
"""

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch

# ── Colour palette ─────────────────────────────────────────────────────────
C = {
    "auth":        "#1565C0",
    "contract":    "#2E7D32",
    "obligation":  "#E65100",
    "renewal":     "#6A1B9A",
    "compliance":  "#AD1457",
    "notification":"#00838F",
    "report":      "#4E342E",
    "audit":       "#37474F",
    "bg":          "#F0F4F8",
    "rel":         "#78909C",
    "pk":          "#B71C1C",
    "fk":          "#1565C0",
    "uk":          "#2E7D32",
    "field_dark":  "#263238",
    "field_light": "#FAFAFA",
    "field_alt":   "#ECEFF1",
}

TABLE_COLOR = {
    "users":                   C["auth"],
    "departments":             C["auth"],
    "user_sessions":           C["auth"],
    "password_reset_tokens":   C["auth"],
    "permissions":             C["auth"],
    "role_permissions":        C["auth"],
    "contracts":               C["contract"],
    "contract_versions":       C["contract"],
    "approval_workflows":      C["contract"],
    "approval_workflow_steps": C["contract"],
    "contract_approvals":      C["contract"],
    "contract_comments":       C["contract"],
    "tags":                    C["contract"],
    "contract_tag_map":        C["contract"],
    "document_archives":       C["contract"],
    "obligations":             C["obligation"],
    "obligation_progress":     C["obligation"],
    "renewals":                C["renewal"],
    "renewal_approvals":       C["renewal"],
    "compliance_records":      C["compliance"],
    "notifications":           C["notification"],
    "notification_templates":  C["notification"],
    "reports":                 C["report"],
    "audit_logs":              C["audit"],
    "activities":              C["audit"],
    "system_settings":         C["audit"],
}

# (field_name, type_label, note)   note: PK | FK | UK | ""
TABLES = {
    "users": [
        ("id",                 "UUID",        "PK"),
        ("employee_id",        "VARCHAR",     "UK"),
        ("first_name",         "VARCHAR",     ""),
        ("last_name",          "VARCHAR",     ""),
        ("email",              "VARCHAR",     "UK"),
        ("phone",              "VARCHAR",     ""),
        ("password_hash",      "TEXT",        ""),
        ("role",               "ENUM",        ""),
        ("department_id",      "UUID",        "FK"),
        ("is_active",          "BOOLEAN",     ""),
        ("last_login_at",      "TIMESTAMPTZ", ""),
        ("failed_login_count", "INT",         ""),
        ("created_at",         "TIMESTAMPTZ", ""),
        ("deleted_at",         "TIMESTAMPTZ", ""),
    ],
    "departments": [
        ("id",          "UUID",        "PK"),
        ("name",        "VARCHAR",     "UK"),
        ("code",        "VARCHAR",     "UK"),
        ("description", "TEXT",        ""),
        ("head_id",     "UUID",        "FK"),
        ("parent_id",   "UUID",        "FK"),
        ("is_active",   "BOOLEAN",     ""),
        ("created_at",  "TIMESTAMPTZ", ""),
    ],
    "user_sessions": [
        ("id",           "UUID",        "PK"),
        ("user_id",      "UUID",        "FK"),
        ("token_hash",   "TEXT",        "UK"),
        ("ip_address",   "INET",        ""),
        ("is_active",    "BOOLEAN",     ""),
        ("expires_at",   "TIMESTAMPTZ", ""),
        ("created_at",   "TIMESTAMPTZ", ""),
        ("revoked_at",   "TIMESTAMPTZ", ""),
    ],
    "password_reset_tokens": [
        ("id",         "UUID",        "PK"),
        ("user_id",    "UUID",        "FK"),
        ("token_hash", "TEXT",        "UK"),
        ("expires_at", "TIMESTAMPTZ", ""),
        ("used_at",    "TIMESTAMPTZ", ""),
        ("created_at", "TIMESTAMPTZ", ""),
    ],
    "permissions": [
        ("id",          "UUID",    "PK"),
        ("resource",    "VARCHAR", ""),
        ("action",      "VARCHAR", ""),
        ("description", "TEXT",    ""),
    ],
    "role_permissions": [
        ("role",          "ENUM",        "PK"),
        ("permission_id", "UUID",        "PK,FK"),
        ("granted_at",    "TIMESTAMPTZ", ""),
        ("granted_by",    "UUID",        "FK"),
    ],
    "contracts": [
        ("id",                  "UUID",        "PK"),
        ("contract_number",     "VARCHAR",     "UK"),
        ("title",               "VARCHAR",     ""),
        ("category",            "ENUM",        ""),
        ("status",              "ENUM",        ""),
        ("counterparty_name",   "VARCHAR",     ""),
        ("department_id",       "UUID",        "FK"),
        ("owner_id",            "UUID",        "FK"),
        ("assigned_manager_id", "UUID",        "FK"),
        ("value",               "NUMERIC",     ""),
        ("currency",            "CHAR(3)",     ""),
        ("start_date",          "DATE",        ""),
        ("end_date",            "DATE",        ""),
        ("auto_renew",          "BOOLEAN",     ""),
        ("is_confidential",     "BOOLEAN",     ""),
        ("created_at",          "TIMESTAMPTZ", ""),
        ("deleted_at",          "TIMESTAMPTZ", ""),
    ],
    "contract_versions": [
        ("id",             "UUID",        "PK"),
        ("contract_id",    "UUID",        "FK"),
        ("version_number", "INT",         ""),
        ("file_name",      "VARCHAR",     ""),
        ("file_path",      "TEXT",        ""),
        ("file_size",      "BIGINT",      ""),
        ("checksum",       "VARCHAR",     ""),
        ("is_current",     "BOOLEAN",     ""),
        ("uploaded_by",    "UUID",        "FK"),
        ("created_at",     "TIMESTAMPTZ", ""),
    ],
    "approval_workflows": [
        ("id",          "UUID",        "PK"),
        ("name",        "VARCHAR",     ""),
        ("category",    "ENUM",        ""),
        ("steps_count", "INT",         ""),
        ("is_active",   "BOOLEAN",     ""),
        ("created_at",  "TIMESTAMPTZ", ""),
    ],
    "approval_workflow_steps": [
        ("id",            "UUID",    "PK"),
        ("workflow_id",   "UUID",    "FK"),
        ("step_order",    "INT",     ""),
        ("step_name",     "VARCHAR", ""),
        ("approver_role", "ENUM",    ""),
        ("approver_id",   "UUID",    "FK"),
        ("is_mandatory",  "BOOLEAN", ""),
    ],
    "contract_approvals": [
        ("id",          "UUID",        "PK"),
        ("contract_id", "UUID",        "FK"),
        ("workflow_id", "UUID",        "FK"),
        ("step_id",     "UUID",        "FK"),
        ("approver_id", "UUID",        "FK"),
        ("action",      "ENUM",        ""),
        ("comments",    "TEXT",        ""),
        ("acted_at",    "TIMESTAMPTZ", ""),
    ],
    "contract_comments": [
        ("id",          "UUID",        "PK"),
        ("contract_id", "UUID",        "FK"),
        ("parent_id",   "UUID",        "FK"),
        ("author_id",   "UUID",        "FK"),
        ("body",        "TEXT",        ""),
        ("is_internal", "BOOLEAN",     ""),
        ("created_at",  "TIMESTAMPTZ", ""),
    ],
    "tags": [
        ("id",    "UUID",    "PK"),
        ("name",  "VARCHAR", "UK"),
        ("color", "VARCHAR", ""),
    ],
    "contract_tag_map": [
        ("contract_id", "UUID", "PK,FK"),
        ("tag_id",      "UUID", "PK,FK"),
    ],
    "document_archives": [
        ("id",             "UUID",        "PK"),
        ("contract_id",    "UUID",        "FK"),
        ("version_id",     "UUID",        "FK"),
        ("archived_by",    "UUID",        "FK"),
        ("archive_reason", "TEXT",        ""),
        ("storage_path",   "TEXT",        ""),
        ("archived_at",    "TIMESTAMPTZ", ""),
    ],
    "obligations": [
        ("id",                  "UUID",        "PK"),
        ("contract_id",         "UUID",        "FK"),
        ("title",               "VARCHAR",     ""),
        ("obligation_type",     "ENUM",        ""),
        ("status",              "ENUM",        ""),
        ("responsible_user_id", "UUID",        "FK"),
        ("responsible_dept_id", "UUID",        "FK"),
        ("due_date",            "DATE",        ""),
        ("amount",              "NUMERIC",     ""),
        ("completion_date",     "DATE",        ""),
        ("compliance_level",    "ENUM",        ""),
        ("priority",            "SMALLINT",    ""),
        ("created_at",          "TIMESTAMPTZ", ""),
    ],
    "obligation_progress": [
        ("id",            "UUID",        "PK"),
        ("obligation_id", "UUID",        "FK"),
        ("progress_pct",  "SMALLINT",    ""),
        ("note",          "TEXT",        ""),
        ("recorded_by",   "UUID",        "FK"),
        ("recorded_at",   "TIMESTAMPTZ", ""),
    ],
    "renewals": [
        ("id",                "UUID",        "PK"),
        ("contract_id",       "UUID",        "FK"),
        ("renewal_number",    "INT",         ""),
        ("status",            "ENUM",        ""),
        ("previous_end_date", "DATE",        ""),
        ("new_start_date",    "DATE",        ""),
        ("new_end_date",      "DATE",        ""),
        ("new_value",         "NUMERIC",     ""),
        ("approved_by",       "UUID",        "FK"),
        ("created_at",        "TIMESTAMPTZ", ""),
    ],
    "renewal_approvals": [
        ("id",          "UUID",        "PK"),
        ("renewal_id",  "UUID",        "FK"),
        ("approver_id", "UUID",        "FK"),
        ("action",      "ENUM",        ""),
        ("comments",    "TEXT",        ""),
        ("acted_at",    "TIMESTAMPTZ", ""),
    ],
    "compliance_records": [
        ("id",               "UUID",        "PK"),
        ("contract_id",      "UUID",        "FK"),
        ("obligation_id",    "UUID",        "FK"),
        ("compliance_level", "ENUM",        ""),
        ("review_date",      "DATE",        ""),
        ("reviewed_by",      "UUID",        "FK"),
        ("risk_score",       "SMALLINT",    ""),
        ("findings",         "TEXT",        ""),
        ("is_resolved",      "BOOLEAN",     ""),
        ("created_at",       "TIMESTAMPTZ", ""),
    ],
    "notifications": [
        ("id",             "UUID",        "PK"),
        ("user_id",        "UUID",        "FK"),
        ("type",           "ENUM",        ""),
        ("channel",        "ENUM",        ""),
        ("status",         "ENUM",        ""),
        ("subject",        "VARCHAR",     ""),
        ("reference_type", "VARCHAR",     ""),
        ("reference_id",   "UUID",        ""),
        ("scheduled_at",   "TIMESTAMPTZ", ""),
        ("sent_at",        "TIMESTAMPTZ", ""),
        ("created_at",     "TIMESTAMPTZ", ""),
    ],
    "notification_templates": [
        ("id",         "UUID",        "PK"),
        ("name",       "VARCHAR",     "UK"),
        ("type",       "ENUM",        ""),
        ("channel",    "ENUM",        ""),
        ("subject",    "VARCHAR",     ""),
        ("body_html",  "TEXT",        ""),
        ("is_active",  "BOOLEAN",     ""),
        ("created_at", "TIMESTAMPTZ", ""),
    ],
    "reports": [
        ("id",            "UUID",        "PK"),
        ("report_type",   "ENUM",        ""),
        ("title",         "VARCHAR",     ""),
        ("parameters",    "JSONB",       ""),
        ("export_format", "ENUM",        ""),
        ("file_path",     "TEXT",        ""),
        ("generated_by",  "UUID",        "FK"),
        ("generated_at",  "TIMESTAMPTZ", ""),
        ("is_scheduled",  "BOOLEAN",     ""),
    ],
    "audit_logs": [
        ("id",            "UUID",        "PK"),
        ("user_id",       "UUID",        "FK"),
        ("action",        "ENUM",        ""),
        ("resource_type", "VARCHAR",     ""),
        ("resource_id",   "UUID",        ""),
        ("old_values",    "JSONB",       ""),
        ("new_values",    "JSONB",       ""),
        ("ip_address",    "INET",        ""),
        ("session_id",    "UUID",        "FK"),
        ("created_at",    "TIMESTAMPTZ", ""),
    ],
    "activities": [
        ("id",            "UUID",        "PK"),
        ("actor_id",      "UUID",        "FK"),
        ("verb",          "VARCHAR",     ""),
        ("object_type",   "VARCHAR",     ""),
        ("object_id",     "UUID",        ""),
        ("target_type",   "VARCHAR",     ""),
        ("department_id", "UUID",        "FK"),
        ("metadata",      "JSONB",       ""),
        ("created_at",    "TIMESTAMPTZ", ""),
    ],
    "system_settings": [
        ("key",         "VARCHAR",     "PK"),
        ("value",       "TEXT",        ""),
        ("description", "TEXT",        ""),
        ("updated_at",  "TIMESTAMPTZ", ""),
        ("updated_by",  "UUID",        "FK"),
    ],
}

# Grid layout: (col, row)  — 6 columns
GRID = {
    "users":                   (0, 0),
    "departments":             (0, 1),
    "user_sessions":           (0, 2),
    "password_reset_tokens":   (0, 3),
    "permissions":             (0, 4),
    "role_permissions":        (0, 5),

    "contracts":               (1, 0),
    "contract_versions":       (1, 1),
    "document_archives":       (1, 2),
    "tags":                    (1, 3),
    "contract_tag_map":        (1, 4),

    "approval_workflows":      (2, 0),
    "approval_workflow_steps": (2, 1),
    "contract_approvals":      (2, 2),
    "contract_comments":       (2, 3),

    "obligations":             (3, 0),
    "obligation_progress":     (3, 1),
    "compliance_records":      (3, 2),

    "renewals":                (4, 0),
    "renewal_approvals":       (4, 1),
    "notifications":           (4, 2),
    "notification_templates":  (4, 3),

    "reports":                 (5, 0),
    "audit_logs":              (5, 1),
    "activities":              (5, 2),
    "system_settings":         (5, 3),
}

RELATIONS = [
    ("users",                   "departments",             "belongs_to"),
    ("users",                   "user_sessions",           "has"),
    ("users",                   "password_reset_tokens",   "requests"),
    ("role_permissions",        "permissions",             "grants"),
    ("users",                   "contracts",               "owns"),
    ("departments",             "contracts",               "holds"),
    ("contracts",               "contract_versions",       "versioned"),
    ("contracts",               "contract_approvals",      "approved_via"),
    ("contracts",               "contract_comments",       "has"),
    ("contracts",               "contract_tag_map",        "tagged"),
    ("contract_tag_map",        "tags",                    "uses"),
    ("contracts",               "document_archives",       "archived"),
    ("approval_workflows",      "approval_workflow_steps", "has_steps"),
    ("approval_workflow_steps", "contract_approvals",      "used_in"),
    ("contracts",               "obligations",             "has"),
    ("obligations",             "obligation_progress",     "tracked"),
    ("obligations",             "compliance_records",      "assessed"),
    ("contracts",               "compliance_records",      "assessed"),
    ("contracts",               "renewals",                "renewed"),
    ("renewals",                "renewal_approvals",       "approved"),
    ("users",                   "notifications",           "receives"),
    ("users",                   "audit_logs",              "generates"),
    ("users",                   "activities",              "performs"),
    ("users",                   "reports",                 "generates"),
]

# ── Geometry constants ─────────────────────────────────────────────────────
TW      = 3.6    # table width
HDR_H   = 0.38   # header height
FLD_H   = 0.215  # field row height
COL_GAP = 0.55   # horizontal gap between columns
ROW_GAP = 0.45   # vertical gap between tables in same column

# ── Helpers ────────────────────────────────────────────────────────────────

def tbox_h(name):
    return HDR_H + len(TABLES[name]) * FLD_H

def compute_positions():
    """Return dict: name -> (x_left, y_top) in data coordinates."""
    # Group tables per column
    cols = {}
    for name, (c, r) in GRID.items():
        cols.setdefault(c, []).append((r, name))

    positions = {}
    for c, items in cols.items():
        items.sort()
        x = c * (TW + COL_GAP)
        y = 0.0
        for _, name in items:
            positions[name] = (x, y)
            y -= tbox_h(name) + ROW_GAP
    return positions

def draw_table(ax, name, x, y, color):
    fields = TABLES[name]
    bh = tbox_h(name)

    # Drop shadow
    ax.add_patch(FancyBboxPatch(
        (x + 0.045, y - bh - 0.045), TW, bh,
        boxstyle="round,pad=0.025", lw=0,
        facecolor="#B0BEC5", zorder=1, alpha=0.55))

    # White body
    ax.add_patch(FancyBboxPatch(
        (x, y - bh), TW, bh,
        boxstyle="round,pad=0.025", lw=0.9,
        edgecolor=color, facecolor="white", zorder=2))

    # Coloured header
    ax.add_patch(FancyBboxPatch(
        (x, y - HDR_H), TW, HDR_H,
        boxstyle="round,pad=0.025", lw=0,
        facecolor=color, zorder=3))

    # Table name
    ax.text(x + TW / 2, y - HDR_H / 2, name,
            ha="center", va="center", fontsize=7.2,
            fontweight="bold", color="white", zorder=4)

    # Divider
    ax.plot([x + 0.05, x + TW - 0.05],
            [y - HDR_H, y - HDR_H],
            color=color, lw=0.5, zorder=5)

    # Fields
    for i, (fname, ftype, note) in enumerate(fields):
        fy = y - HDR_H - (i + 0.5) * FLD_H

        # Alternating row
        bg = C["field_alt"] if i % 2 == 0 else C["field_light"]
        ax.add_patch(mpatches.Rectangle(
            (x + 0.03, fy - FLD_H / 2 + 0.005), TW - 0.06, FLD_H - 0.01,
            lw=0, facecolor=bg, zorder=2))

        # Badge colour
        if   "PK" in note: fc = C["pk"]
        elif "FK" in note: fc = C["fk"]
        elif "UK" in note: fc = C["uk"]
        else:              fc = C["field_dark"]

        fw = "bold" if note else "normal"
        ax.text(x + 0.13, fy, fname,
                ha="left", va="center", fontsize=5.6,
                color=fc, fontweight=fw, zorder=4)

        ax.text(x + TW - 0.10, fy, ftype,
                ha="right", va="center", fontsize=5.0,
                color="#78909C", style="italic", zorder=4)

        if note:
            badge = note.split(",")[0]
            bw, bh2 = 0.28, 0.13
            bxl = x + TW * 0.565
            ax.add_patch(FancyBboxPatch(
                (bxl, fy - bh2 / 2), bw, bh2,
                boxstyle="round,pad=0.015", lw=0,
                facecolor=fc, alpha=0.18, zorder=3))
            ax.text(bxl + bw / 2, fy, badge,
                    ha="center", va="center", fontsize=4.2,
                    color=fc, fontweight="bold", zorder=4)

    # Return mid-top anchor (header centre)
    return x + TW / 2, y - HDR_H / 2

def draw_relation(ax, x1, y1, x2, y2, label):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(
                    arrowstyle="-|>", color=C["rel"], lw=0.55,
                    connectionstyle="arc3,rad=0.18"),
                zorder=0)
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    ax.text(mx, my, label, ha="center", va="center",
            fontsize=3.8, color=C["rel"], zorder=6,
            bbox=dict(facecolor="white", edgecolor="none",
                      boxstyle="round,pad=0.2", alpha=0.82))

# ── Render ─────────────────────────────────────────────────────────────────

def render():
    positions = compute_positions()

    # ── Compute tight bounding box ──────────────────────────────────────────
    xs = [x for (x, _) in positions.values()]
    ys = [y for (_, y) in positions.values()]
    # rightmost table
    x_max = max(x + TW for x in xs)
    x_min = min(xs)
    # bottom of tallest stack
    y_min = min(y - tbox_h(n) for n, (x, y) in positions.items())
    y_max = 0.0   # top of grid

    TITLE_H  = 0.90   # space reserved above grid for title + legend
    PAD      = 0.30   # outer padding on all sides

    total_w = (x_max - x_min) + 2 * PAD
    total_h = (y_max - y_min) + TITLE_H + 2 * PAD

    DPI = 200
    fig, ax = plt.subplots(figsize=(total_w, total_h), dpi=DPI)
    fig.patch.set_facecolor(C["bg"])
    ax.set_facecolor(C["bg"])

    ax.set_xlim(x_min - PAD, x_min - PAD + total_w)
    ax.set_ylim(y_min - PAD, y_max + TITLE_H + PAD)
    ax.axis("off")

    title_y = y_max + TITLE_H * 0.78
    ax.text((x_min + x_max) / 2, title_y,
            "Contract Management System — Entity Relationship Diagram",
            ha="center", va="center", fontsize=11,
            fontweight="bold", color="#1A237E")
    ax.text((x_min + x_max) / 2, title_y - 0.30,
            "26 Tables  ·  PostgreSQL  ·  Private & Confidential",
            ha="center", va="center", fontsize=7, color="#546E7A")

    # Module legend
    legend_items = [
        ("Auth & RBAC",       C["auth"]),
        ("Contracts",         C["contract"]),
        ("Obligations",       C["obligation"]),
        ("Renewals",          C["renewal"]),
        ("Compliance",        C["compliance"]),
        ("Notifications",     C["notification"]),
        ("Reports",           C["report"]),
        ("Audit & Activity",  C["audit"]),
    ]
    total_span = x_max - x_min
    step = total_span / len(legend_items)
    ly = title_y - 0.58
    for i, (lbl, col) in enumerate(legend_items):
        lx = x_min + i * step + step / 2
        ax.add_patch(mpatches.Rectangle(
            (lx - step / 2 + 0.08, ly - 0.11), step - 0.16, 0.22,
            lw=0, facecolor=col, alpha=0.15, zorder=1,
            transform=ax.transData))
        ax.plot(lx - step / 2 + 0.18, ly, "s",
                color=col, markersize=5, zorder=2)
        ax.text(lx - step / 2 + 0.33, ly, lbl,
                ha="left", va="center", fontsize=5.5,
                color=col, fontweight="bold")

    # Draw tables + collect anchors
    anchors = {}
    for name, (x, y) in positions.items():
        color = TABLE_COLOR.get(name, "#607D8B")
        cx, cy = draw_table(ax, name, x, y, color)
        anchors[name] = (cx, cy)

    # Draw relationships
    for src, dst, label in RELATIONS:
        if src in anchors and dst in anchors:
            draw_relation(ax, *anchors[src], *anchors[dst], label)

    # ── Save with zero padding — tight_layout disabled ─────────────────────
    out = "database/er_diagram.png"
    fig.savefig(out, dpi=DPI, bbox_inches="tight",
                pad_inches=0.08, facecolor=C["bg"])
    plt.close(fig)
    print(f"Saved → {out}")
    print(f"Canvas: {total_w:.1f} × {total_h:.1f} inches  @ {DPI} DPI")

if __name__ == "__main__":
    render()
