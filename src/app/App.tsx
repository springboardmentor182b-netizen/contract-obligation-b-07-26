/**
 * ContractIQ — Figma-style Design Presentation Board
 * 10 independent dashboard mockups shown as a 5×2 gallery at ~18% scale.
 * Click any preview to open full-size. Zoom controls float bottom-right.
 */
import { useState, useCallback } from "react";
import { toast, Toaster } from "sonner";
import {
  LayoutDashboard, FileText, FolderOpen, ClipboardList, RefreshCw,
  ShieldCheck, BarChart2, Bell, Users, Settings, Search, ChevronDown,
  Plus, Filter, TrendingUp, UserCheck, UserPlus, UserX, Eye, Edit2,
  Trash2, LogOut, ChevronRight, CheckCircle, XCircle, Clock,
  AlertCircle, Upload, Download, FileArchive, FilePlus, Calendar,
  Activity, Shield, Lock, AlertTriangle, Mail, Smartphone,
  FileBarChart, Database, Server, Flag, CheckSquare, Info,
  ArrowUpRight, ArrowDownRight, Star, Target, RotateCcw,
  ZoomIn, ZoomOut, Maximize2, X, ChevronLeft, ChevronRight as ChevronRightIcon,
  User as UserIcon, EyeOff, Eye as EyeIcon, KeyRound, ArrowLeft
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE_SCALE = 0.175;   // default ~18% — 5 cols fit in 1440px
const ZOOM_STEP  = 0.15;
const ZOOM_MIN   = 0.4;
const ZOOM_MAX   = 2.5;
const FW = 1440;
const FH = 1024;

// ─── Design tokens ────────────────────────────────────────────────────────────

const P  = "#2563EB";
const BG = "#F8FAFC";
const CA = "#FFFFFF";
const TX = "#1E293B";
const SU = "#16A34A";
const WA = "#F59E0B";
const ER = "#DC2626";
const MU = "#64748B";
const BD = "#E2E8F0";
const SB = "#1E293B";
const VI = "#7C3AED";
const TE = "#0D9488";

// ─── Frame metadata ───────────────────────────────────────────────────────────

const FRAME_TITLES = [
  "User Authentication",
  "Contract Repository",
  "Contract Management",
  "Obligation Tracker",
  "             Management",
  "Compliance Monitoring",
  "Analytics Overview",
  "Reports Dashboard",
  "Notifications",
  "Audit & Activity Logs",
];

const NAV_TO_IDX: Record<string, number> = {
  Dashboard: 6, Contracts: 2, Repository: 1, Obligations: 3,
  Renewals: 4, Compliance: 5, Reports: 7, Notifications: 8,
  Users: 0, "Audit & Logs": 9, Settings: 6,
};

// ─── Shared data ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard"      },
  { icon: FileText,        label: "Contracts"      },
  { icon: FolderOpen,      label: "Repository"     },
  { icon: ClipboardList,   label: "Obligations", b: 7  },
  { icon: RefreshCw,       label: "Renewals"       },
  { icon: ShieldCheck,     label: "Compliance"     },
  { icon: BarChart2,       label: "Reports"        },
  { icon: Bell,            label: "Notifications", b: 14 },
  { icon: Users,           label: "Users"          },
  { icon: Activity,        label: "Audit & Logs"   },
  { icon: Settings,        label: "Settings"       },
];

const CHART_TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: CA, border: `1px solid ${BD}`, borderRadius: 10, padding: "8px 12px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", fontSize: 11 }}>
      <div style={{ color: MU, marginBottom: 2 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={p.name || p.dataKey || String(i)} style={{ fontWeight: 700, color: p.color || p.fill }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function Sidebar({ active, onNavClick }: { active: string; onNavClick?: (label: string) => void }) {
  return (
    <div style={{ width: 240, height: FH, background: SB, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #2d3f55" }}>
        <div style={{ width: 32, height: 32, background: P, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShieldCheck size={15} color="white" strokeWidth={2.5} />
        </div>
        <div style={{ marginLeft: 10 }}>
          <div style={{ color: "white", fontSize: 14, fontWeight: 700 }}>ContractIQ</div>
          <div style={{ color: "#60A5FA", fontSize: 10, fontWeight: 500 }}>Enterprise Suite</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "14px 10px", overflow: "hidden" }}>
        <div style={{ color: "#4B5563", fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 10px", marginBottom: 6 }}>Main Menu</div>
        {NAV_ITEMS.map(({ icon: Icon, label, b }: any) => {
          const on = label === active;
          return (
            <div key={label} onClick={() => onNavClick?.(label)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 7, marginBottom: 1, background: on ? P : "transparent", boxShadow: on ? "0 4px 14px rgba(37,99,235,0.35)" : "none", cursor: onNavClick ? "pointer" : "default" }}>
              <Icon size={14} color={on ? "white" : "#94A3B8"} strokeWidth={on ? 2.5 : 2} />
              <span style={{ color: on ? "white" : "#94A3B8", fontSize: 12.5, fontWeight: 500, flex: 1 }}>{label}</span>
              {b && <span style={{ background: on ? "#3B82F6" : "#475569", color: "white", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 9 }}>{b}</span>}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "12px 14px", borderTop: "1px solid #2d3f55", display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 32, height: 32, background: "#3B82F6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>AT</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "white", fontSize: 11.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Alexandra Thornton</div>
          <div style={{ color: "#94A3B8", fontSize: 10 }}>System Admin</div>
        </div>
        <LogOut size={13} color="#94A3B8" />
      </div>
    </div>
  );
}

function TopBar({ crumbs, onBellClick }: { crumbs: string[]; onBellClick?: () => void }) {
  return (
    <div style={{ height: 64, background: CA, borderBottom: `1px solid ${BD}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 14, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: MU }}>
        <span>ContractIQ</span>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <ChevronRight size={11} />
            <span style={{ color: i === crumbs.length - 1 ? TX : MU, fontWeight: i === crumbs.length - 1 ? 600 : 400 }}>{c}</span>
          </span>
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ position: "relative" }}>
        <Search size={13} color="#94A3B8" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <input placeholder="Search..." style={{ paddingLeft: 30, paddingRight: 14, paddingTop: 6, paddingBottom: 6, background: BG, border: `1px solid ${BD}`, borderRadius: 8, fontSize: 12, color: TX, width: 196, outline: "none" }} />
      </div>
      <div onClick={onBellClick} style={{ position: "relative", width: 34, height: 34, background: BG, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${BD}`, cursor: "pointer" }}>
        <Bell size={15} color="#64748B" />
        <div style={{ position: "absolute", top: 5, right: 5, width: 7, height: 7, background: ER, borderRadius: "50%", border: "2px solid white" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 14, borderLeft: `1px solid ${BD}` }}>
        <div style={{ width: 34, height: 34, background: "#3B82F6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 700 }}>AT</div>
        <div><div style={{ fontSize: 12, fontWeight: 600, color: TX }}>Alexandra T.</div><div style={{ fontSize: 10, color: MU }}>System Admin</div></div>
        <ChevronDown size={11} color="#94A3B8" />
      </div>
    </div>
  );
}

function KPI({ label, value, delta, up, icon: Icon, ic, ib, suffix = "" }: any) {
  return (
    <div style={{ flex: 1, background: CA, borderRadius: 12, padding: "18px 18px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: `1px solid ${BD}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: MU, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: TX, marginTop: 6, lineHeight: 1 }}>{value}{suffix}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 7, fontSize: 10.5, fontWeight: 500, color: up === false ? ER : up ? SU : MU }}>
            {up !== undefined && (up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />)}
            {delta}
          </div>
        </div>
        <div style={{ width: 42, height: 42, background: ib, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={19} color={ic} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, sub, children, action, style: sx }: any) {
  return (
    <div style={{ background: CA, borderRadius: 12, border: `1px solid ${BD}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", overflow: "hidden", ...sx }}>
      <div style={{ padding: "13px 18px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: TX }}>{title}</div>
          {sub && <div style={{ fontSize: 10.5, color: MU, marginTop: 1 }}>{sub}</div>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function Pill({ label, color }: { label: string; color: "green"|"amber"|"red"|"blue"|"slate"|"violet" }) {
  const map: Record<string,[string,string,string]> = {
    green:  ["#F0FDF4","#15803D","#16A34A"], amber:  ["#FFFBEB","#B45309","#F59E0B"],
    red:    ["#FEF2F2","#B91C1C","#DC2626"], blue:   ["#EFF6FF","#1D4ED8","#2563EB"],
    slate:  ["#F1F5F9","#475569","#94A3B8"], violet: ["#F5F3FF","#6D28D9","#7C3AED"],
  };
  const [bg,tx,dot] = map[color];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 9px", borderRadius:20, background:bg, fontSize:10.5, fontWeight:700, color:tx }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:dot }} />{label}
    </span>
  );
}

function Btn({ label, icon: Icon, primary, onClick }: any) {
  return (
    <div onClick={onClick} style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"8px 16px", background:primary?P:CA, border:`1px solid ${primary?P:BD}`, borderRadius:8, fontSize:12, fontWeight:600, color:primary?"white":TX, cursor:"pointer", boxShadow:primary?"0 2px 8px rgba(37,99,235,0.25)":"none" }}>
      {Icon && <Icon size={13} color={primary?"white":TX} />}{label}
    </div>
  );
}

function THead({ cols }: { cols: string[] }) {
  return (
    <thead>
      <tr style={{ background:"#F8FAFC", borderBottom:`1px solid ${BD}` }}>
        {cols.map(c=><th key={c} style={{ padding:"9px 14px", fontSize:9.5, fontWeight:700, color:MU, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"left", whiteSpace:"nowrap" }}>{c}</th>)}
      </tr>
    </thead>
  );
}

function TRow({ cells }: { cells: React.ReactNode[] }) {
  return (
    <tr style={{ borderBottom:"1px solid #F8FAFC" }}>
      {cells.map((c,i)=><td key={i} style={{ padding:"9px 14px", fontSize:11.5, color:TX }}>{c}</td>)}
    </tr>
  );
}

function AvatarChip({ init, name, sub }: { init:string; name:string; sub?:string }) {
  const colors=[P,VI,SU,"#E11D48",TE,WA];
  const bg=colors[(init.charCodeAt(0)+(init.charCodeAt(1)||0))%colors.length];
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ width:28, height:28, background:bg, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:9.5, fontWeight:700, flexShrink:0 }}>{init}</div>
      <div><div style={{ fontSize:11.5, fontWeight:600, color:TX }}>{name}</div>{sub&&<div style={{ fontSize:10, color:MU }}>{sub}</div>}</div>
    </div>
  );
}

function ActionBtns({ onView, onEdit, onDelete }: any) {
  return (
    <div style={{ display:"flex", gap:3 }}>
      <div onClick={onView}   style={{ width:26, height:26, background:"#EFF6FF", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><Eye size={12} color={P}/></div>
      <div onClick={onEdit}   style={{ width:26, height:26, background:"#FFFBEB", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><Edit2 size={12} color={WA}/></div>
      <div onClick={onDelete} style={{ width:26, height:26, background:"#FEF2F2", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><Trash2 size={12} color={ER}/></div>
    </div>
  );
}

// ─── Simple Modal ─────────────────────────────────────────────────────────────

function Modal({ title, onClose, children }: any) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,23,42,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999 }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{ background:CA, borderRadius:16, padding:28, width:480, boxShadow:"0 25px 60px rgba(0,0,0,0.3)", border:`1px solid ${BD}` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ fontSize:16, fontWeight:700, color:TX }}>{title}</div>
          <div onClick={onClose} style={{ width:28, height:28, background:"#F1F5F9", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><X size={14} color={MU}/></div>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, placeholder, type="text" }: any) {
  return (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:"block", fontSize:12, fontWeight:600, color:TX, marginBottom:5 }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{ width:"100%", padding:"9px 12px", border:`1px solid ${BD}`, borderRadius:8, fontSize:13, color:TX, outline:"none", boxSizing:"border-box" }} />
    </div>
  );
}

// ─── Notification panel ───────────────────────────────────────────────────────

function NotifPanel({ onClose }: { onClose:()=>void }) {
  const items = [
    { icon:AlertCircle, c:ER, bg:"#FEF2F2", text:"Enterprise SaaS Agreement expires in 58 days", time:"5 min ago" },
    { icon:AlertTriangle, c:WA, bg:"#FFFBEB", text:"Security Audit obligation is overdue", time:"1 hr ago" },
    { icon:CheckCircle, c:SU, bg:"#F0FDF4", text:"Compliance review scheduled for Jul 15", time:"3 hrs ago" },
    { icon:Bell, c:P, bg:"#EFF6FF", text:"New contract uploaded by T. Essien", time:"5 hrs ago" },
    { icon:Shield, c:VI, bg:"#F5F3FF", text:"Monthly compliance report is ready", time:"Yesterday" },
  ];
  return (
    <div style={{ position:"absolute", top:64, right:16, width:340, background:CA, borderRadius:14, border:`1px solid ${BD}`, boxShadow:"0 16px 48px rgba(0,0,0,0.15)", zIndex:500 }}>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${BD}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:13, fontWeight:700, color:TX }}>Notifications</div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:11, color:P, fontWeight:600, cursor:"pointer" }} onClick={()=>toast.success("All marked as read")}>Mark all read</span>
          <div onClick={onClose} style={{ cursor:"pointer" }}><X size={14} color={MU}/></div>
        </div>
      </div>
      {items.map((n,i)=>(
        <div key={i} style={{ padding:"12px 18px", borderBottom:"1px solid #F8FAFC", display:"flex", alignItems:"flex-start", gap:10 }}>
          <div style={{ width:30, height:30, background:n.bg, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><n.icon size={13} color={n.c}/></div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:11.5, color:TX, lineHeight:1.4 }}>{n.text}</div>
            <div style={{ fontSize:10, color:"#94A3B8", marginTop:2 }}>{n.time}</div>
          </div>
        </div>
      ))}
      <div style={{ padding:"12px 18px", textAlign:"center" }}>
        <span style={{ fontSize:12, color:P, fontWeight:600, cursor:"pointer" }}>View all notifications</span>
      </div>
    </div>
  );
}

// ─── FrameShell ───────────────────────────────────────────────────────────────

function FrameShell({ active, crumbs, title, subtitle, cta, children, onNavClick }: any) {
  const [showNotif, setShowNotif] = useState(false);
  return (
    <div style={{ display:"flex", width:FW, height:FH, background:BG, fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif", overflow:"hidden", position:"relative" }}>
      <Sidebar active={active} onNavClick={onNavClick} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
        <TopBar crumbs={crumbs} onBellClick={()=>setShowNotif(v=>!v)} />
        {showNotif && <NotifPanel onClose={()=>setShowNotif(false)} />}
        <div style={{ flex:1, padding:24, overflow:"hidden", display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:TX }}>{title}</div>
              <div style={{ fontSize:12.5, color:MU, marginTop:3 }}>{subtitle}</div>
            </div>
            {cta}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Frame 1: User Authentication ────────────────────────────────────────────

const REG_TREND=[{m:"Jan",n:8},{m:"Feb",n:14},{m:"Mar",n:11},{m:"Apr",n:19},{m:"May",n:24},{m:"Jun",n:18},{m:"Jul",n:31}];
const ROLE_PIE=[{name:"Admin",value:3,color:P},{name:"Contracts",value:11,color:SU},{name:"Legal",value:8,color:VI},{name:"Compliance",value:5,color:WA},{name:"Viewer",value:9,color:"#94A3B8"}];
const USERS_ROWS=[
  ["AT","Alexandra Thornton","a.thornton@contractiq.com","Admin","Active","Jul 4, 09:14 AM"],
  ["MD","Marcus Delgado","m.delgado@contractiq.com","Contract Manager","Active","Jul 4, 08:52 AM"],
  ["PN","Priya Nair","p.nair@contractiq.com","Legal Counsel","Active","Jul 3, 05:31 PM"],
  ["JW","James Whitfield","j.whitfield@contractiq.com","Viewer","Inactive","Jun 28, 02:10 PM"],
  ["SR","Sofia Reinholt","s.reinholt@contractiq.com","Compliance","Active","Jul 4, 07:40 AM"],
  ["HB","Hannah Bremer","h.bremer@contractiq.com","Viewer","Blocked","Jun 15, 03:45 PM"],
];
const ROLES_LIST=["All Roles","Admin","Contract Manager","Legal Counsel","Compliance Officer","Viewer"];
const ROLE_COLORS:Record<string,any>={Admin:"blue","Contract Manager":"green","Legal Counsel":"violet","Compliance":"amber","Viewer":"slate"};

function Frame01({ onNavClick }: any) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [dropOpen, setDropOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const filtered = USERS_ROWS.filter(r=>{
    const ms=(r[1] as string).toLowerCase().includes(search.toLowerCase())||(r[2] as string).toLowerCase().includes(search.toLowerCase());
    const mr=roleFilter==="All Roles"||(r[3] as string).includes(roleFilter.split(" ")[0]);
    return ms&&mr;
  });
  return (
    <FrameShell active="Users" crumbs={["Administration","User Management"]}
      title="User Authentication & Role Management" subtitle="Manage system users, roles, and access permissions"
      cta={<Btn label="Add User" icon={UserPlus} primary onClick={()=>setShowAddModal(true)} />}
      onNavClick={onNavClick}
    >
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Total Users" value="247" delta="+12 this month" up icon={Users} ic={P} ib="#EFF6FF"/>
        <KPI label="Active Users" value="198" delta="80.2% of total" icon={UserCheck} ic={SU} ib="#F0FDF4"/>
        <KPI label="New Registrations" value="31" delta="+8 vs last month" up icon={UserPlus} ic={VI} ib="#F5F3FF"/>
        <KPI label="Blocked Users" value="18" delta="7.3% of total" up={false} icon={UserX} ic={ER} ib="#FEF2F2"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 220px" }}>
        <Card title="Registration Trend" sub="New users per month — 2026"
          action={<span style={{ fontSize:10.5, fontWeight:700, color:SU, background:"#F0FDF4", padding:"3px 9px", borderRadius:20, display:"flex", alignItems:"center", gap:4 }}><TrendingUp size={11}/>+28.9%</span>}
          style={{ flex:3 }}>
          <div style={{ padding:"14px 14px 10px" }}>
            <ResponsiveContainer width="100%" height={155}>
              <LineChart id="c01-line" data={REG_TREND} margin={{ left:-22, right:6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CHART_TT/>}/>
                <Line type="monotone" dataKey="n" name="Users" stroke={P} strokeWidth={2.5} dot={{ fill:P, r:3.5, strokeWidth:2, stroke:"#fff" }} activeDot={{ r:5 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Role Distribution" sub="Users by assigned role" style={{ flex:2 }}>
          <div style={{ padding:"10px 14px" }}>
            <ResponsiveContainer width="100%" height={108}>
              <PieChart id="c01-pie"><Pie data={ROLE_PIE} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={3} dataKey="value">{ROLE_PIE.map(e=><Cell key={e.name} fill={e.color}/>)}</Pie><Tooltip content={<CHART_TT/>}/></PieChart>
            </ResponsiveContainer>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 8px", marginTop:4 }}>
              {ROLE_PIE.map(({name,value,color})=>(
                <div key={name} style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }}/>
                  <span style={{ fontSize:10, color:MU, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{name}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:TX }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card title="User Management" action={
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ position:"relative" }}>
            <Search size={12} color="#94A3B8" style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..." style={{ paddingLeft:26, paddingRight:10, paddingTop:6, paddingBottom:6, background:BG, border:`1px solid ${BD}`, borderRadius:7, fontSize:11.5, color:TX, width:168, outline:"none" }}/>
          </div>
          <div style={{ position:"relative" }}>
            <div onClick={()=>setDropOpen(v=>!v)} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px", background:BG, border:`1px solid ${BD}`, borderRadius:7, fontSize:11.5, color:MU, cursor:"pointer" }}>
              <Filter size={11}/>{roleFilter}<ChevronDown size={11}/>
            </div>
            {dropOpen&&(
              <div style={{ position:"absolute", right:0, top:"100%", marginTop:4, width:192, background:CA, border:`1px solid ${BD}`, borderRadius:12, boxShadow:"0 12px 32px rgba(0,0,0,0.12)", zIndex:100 }}>
                {ROLES_LIST.map(r=><div key={r} onClick={()=>{setRoleFilter(r);setDropOpen(false)}} style={{ padding:"10px 16px", fontSize:12, fontWeight:roleFilter===r?700:400, color:roleFilter===r?P:TX, background:roleFilter===r?"#EFF6FF":"transparent", cursor:"pointer" }}>{r}</div>)}
              </div>
            )}
          </div>
        </div>
      } style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["User","Email","Role","Status","Last Login","Actions"]}/>
          <tbody>
            {filtered.map(([av,name,email,role,status,login],i)=>{
              const ss:Record<string,any>={Active:"green",Inactive:"slate",Blocked:"red"};
              return <TRow key={i} cells={[
                <AvatarChip init={av as string} name={name as string}/>,
                <span style={{ color:MU, fontSize:11 }}>{email}</span>,
                <Pill label={role as string} color={ROLE_COLORS[role as string]||"slate"}/>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:MU }}>{login}</span>,
                <ActionBtns onView={()=>toast.info(`Viewing ${name}`)} onEdit={()=>toast.info(`Editing ${name}`)} onDelete={()=>toast.error(`Deleted ${name}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
        <div style={{ padding:"10px 14px", borderTop:`1px solid #F1F5F9`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:MU }}>Showing <b style={{ color:TX }}>{filtered.length}</b> of <b style={{ color:TX }}>247</b> users</span>
          <div style={{ display:"flex", gap:4 }}>{[1,2,3,4].map(p=><div key={p} style={{ width:26, height:26, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", background:p===1?P:BG, border:`1px solid ${p===1?P:BD}`, fontSize:11, fontWeight:600, color:p===1?"white":MU, cursor:"pointer" }}>{p}</div>)}</div>
        </div>
      </Card>
      {showAddModal&&(
        <Modal title="Add New User" onClose={()=>setShowAddModal(false)}>
          <FormField label="Full Name" placeholder="e.g. John Smith"/>
          <FormField label="Email Address" placeholder="john@contractiq.com" type="email"/>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:TX, marginBottom:5 }}>Role</label>
            <select style={{ width:"100%", padding:"9px 12px", border:`1px solid ${BD}`, borderRadius:8, fontSize:13, color:TX, outline:"none" }}>
              {ROLES_LIST.slice(1).map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}>
            <Btn label="Cancel" onClick={()=>setShowAddModal(false)}/>
            <Btn label="Create User" icon={UserPlus} primary onClick={()=>{setShowAddModal(false);toast.success("User created successfully");}}/>
          </div>
        </Modal>
      )}
    </FrameShell>
  );
}

// ─── Frame 2: Contract Repository ────────────────────────────────────────────

const CAT_DATA=[{name:"Services",value:28,color:P},{name:"Technology",value:22,color:TE},{name:"NDA",value:19,color:VI},{name:"Procurement",value:15,color:WA},{name:"HR",value:12,color:SU},{name:"Other",value:14,color:"#94A3B8"}];
const REPO_ROWS=[
  ["CTR-001","Master Services Agreement — Vertex Corp","Services","Active","v3.2","2.4 MB","Jan 15, 2026"],
  ["CTR-002","Software License — CloudSys Inc","Technology","Active","v1.0","1.1 MB","Feb 3, 2026"],
  ["CTR-003","NDA — Finport Ltd","NDA","Archived","v2.1","0.6 MB","Mar 22, 2026"],
  ["CTR-004","Vendor Contract — SupplyGrid Global","Procurement","Active","v1.4","3.2 MB","Apr 10, 2026"],
  ["CTR-005","Employment Contract — Sr. Engineer","HR","Active","v1.0","0.8 MB","May 1, 2026"],
  ["CTR-006","Consulting Agreement — Apex Strategy","Consulting","Expired","v1.1","1.7 MB","Jun 20, 2026"],
];

function Frame02({ onNavClick }: any) {
  const [search, setSearch] = useState("");
  const filtered = REPO_ROWS.filter(r=>(r[1] as string).toLowerCase().includes(search.toLowerCase()));
  return (
    <FrameShell active="Repository" crumbs={["Contracts","Repository"]} title="Contract Repository" subtitle="Centralized document storage, version control, and contract management"
      cta={<Btn label="Upload Contract" icon={Upload} primary onClick={()=>toast.success("Upload dialog opened")}/>} onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Total Contracts" value="340" delta="+24 this quarter" up icon={FileText} ic={P} ib="#EFF6FF"/>
        <KPI label="Active Contracts" value="218" delta="64.1% of total" icon={CheckCircle} ic={SU} ib="#F0FDF4"/>
        <KPI label="Archived" value="89" delta="26.2% of total" icon={FileArchive} ic={MU} ib="#F1F5F9"/>
        <KPI label="Expiring Soon" value="33" delta="Within 90 days" up={false} icon={AlertCircle} ic={WA} ib="#FFFBEB"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 210px" }}>
        <Card title="Category Distribution" sub="Contracts by document type" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={152}>
              <BarChart id="c02-bar" data={CAT_DATA} margin={{ left:-22, right:4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="name" tick={{ fontSize:9.5, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/>
                <Bar dataKey="value" name="Contracts" radius={[4,4,0,0]}>{CAT_DATA.map(e=><Cell key={e.name} fill={e.color}/>)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Version History" sub="Recent document updates" style={{ flex:2, overflow:"hidden" }}>
          {[["MSA — Vertex Corp","v3.2→v3.3","2h ago"],["Software License","v1.0","1d ago"],["Vendor Contract","v1.3→v1.4","2d ago"],["Consulting Agmt","v1.0→v1.1","5d ago"],["Employment Contract","v1.0","1wk ago"]].map(([n,v,t],i)=>(
            <div key={i} style={{ padding:"9px 16px", borderBottom:"1px solid #F8FAFC", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:28, height:28, background:"#EFF6FF", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><FileText size={13} color={P}/></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11.5, fontWeight:600, color:TX, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{n}</div>
                <div style={{ fontSize:10, color:MU }}>{v}</div>
              </div>
              <span style={{ fontSize:10, color:"#94A3B8", fontFamily:"monospace", flexShrink:0 }}>{t}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card title="Contract Repository" action={
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ position:"relative" }}>
            <Search size={12} color="#94A3B8" style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search contracts..." style={{ paddingLeft:26, paddingRight:10, paddingTop:6, paddingBottom:6, background:BG, border:`1px solid ${BD}`, borderRadius:7, fontSize:11.5, color:TX, width:180, outline:"none" }}/>
          </div>
          <Btn label="Export" icon={Download} onClick={()=>toast.success("Exporting contract list...")}/>
        </div>
      } style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["ID","Contract Name","Category","Status","Version","Size","Uploaded","Actions"]}/>
          <tbody>
            {filtered.map(([id,name,cat,status,ver,size,date],i)=>{
              const ss:Record<string,any>={Active:"green",Archived:"slate",Expired:"red"};
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <span style={{ fontWeight:600 }}>{name}</span>,
                <span style={{ background:"#F1F5F9", color:MU, padding:"2px 8px", borderRadius:5, fontSize:10.5, fontWeight:600 }}>{cat}</span>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:MU }}>{ver}</span>,
                <span style={{ color:MU }}>{size}</span>,
                <span style={{ color:MU }}>{date}</span>,
                <ActionBtns onView={()=>toast.info(`Viewing ${name}`)} onEdit={()=>toast.info(`Editing ${name}`)} onDelete={()=>toast.error(`Deleted ${name}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
      </Card>
    </FrameShell>
  );
}

// ─── Frame 3: Contract Management ────────────────────────────────────────────

const CONTRACT_STATUS_PIE=[{name:"Active",value:89,color:SU},{name:"Draft",value:34,color:"#94A3B8"},{name:"In Review",value:28,color:P},{name:"Approved",value:67,color:TE},{name:"Expired",value:22,color:ER}];
const CONTRACT_ROWS=[
  ["CTR-001","Enterprise SaaS Agreement","Nexus Technologies","Active","P. Nair","$420,000","Dec 31, 2026","High"],
  ["CTR-002","Professional Services Contract","Apex Consulting","In Review","M. Delgado","$185,000","Aug 15, 2026","Medium"],
  ["CTR-003","Supply Chain Agreement","GlobalSource Ltd","Draft","D. Okafor","$92,500","Sep 30, 2026","Low"],
  ["CTR-004","Data Processing Agreement","CloudVault Inc","Approved","S. Reinholt","$67,000","Mar 31, 2027","Medium"],
  ["CTR-005","IT Infrastructure Contract","TechBuild Solutions","Active","J. Whitfield","$210,000","Jan 31, 2027","High"],
  ["CTR-006","Marketing Partnership","Brand Elevate Co","Draft","T. Essien","$38,500","Oct 15, 2026","Low"],
];

function Frame03({ onNavClick }: any) {
  const [showModal, setShowModal] = useState(false);
  const WORKFLOW=[{step:"Draft",count:34,bg:"#F1F5F9",tx:MU},{step:"Review",count:28,bg:"#EFF6FF",tx:P},{step:"Legal",count:19,bg:"#F5F3FF",tx:VI},{step:"Approved",count:67,bg:"#F0FDF4",tx:SU},{step:"Active",count:89,bg:"#ECFDF5",tx:"#059669"}];
  return (
    <FrameShell active="Contracts" crumbs={["Contracts","Management"]} title="Contract Management" subtitle="Full contract lifecycle from creation through execution and archival"
      cta={<Btn label="Create Contract" icon={FilePlus} primary onClick={()=>setShowModal(true)}/>} onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Draft Contracts" value="34" delta="Awaiting submission" icon={FileText} ic={MU} ib="#F1F5F9"/>
        <KPI label="Under Review" value="28" delta="Pending legal review" icon={Clock} ic={P} ib="#EFF6FF"/>
        <KPI label="Approved" value="67" delta="+12 vs last quarter" up icon={CheckCircle} ic={SU} ib="#F0FDF4"/>
        <KPI label="Active Contracts" value="89" delta="Total value $4.2M" icon={Star} ic={VI} ib="#F5F3FF"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 220px" }}>
        <Card title="Contract Status" sub="Distribution by lifecycle stage" style={{ flex:2 }}>
          <div style={{ padding:"10px 14px" }}>
            <ResponsiveContainer width="100%" height={108}><PieChart id="c03-pie"><Pie data={CONTRACT_STATUS_PIE} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={3} dataKey="value">{CONTRACT_STATUS_PIE.map(e=><Cell key={e.name} fill={e.color}/>)}</Pie><Tooltip content={<CHART_TT/>}/></PieChart></ResponsiveContainer>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px 8px" }}>{CONTRACT_STATUS_PIE.map(({name,value,color})=><div key={name} style={{ display:"flex", alignItems:"center", gap:5 }}><span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }}/><span style={{ fontSize:10, color:MU, flex:1 }}>{name}</span><span style={{ fontSize:10, fontWeight:700, color:TX }}>{value}</span></div>)}</div>
          </div>
        </Card>
        <Card title="Approval Workflow" sub="Current pipeline distribution" style={{ flex:3 }}>
          <div style={{ padding:"16px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:16 }}>
              {WORKFLOW.map((w,i)=>(
                <div key={w.step} style={{ display:"flex", alignItems:"center", flex:1 }}>
                  <div style={{ flex:1, textAlign:"center" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:w.bg, margin:"0 auto 4px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:w.tx }}>{w.count}</div>
                    <div style={{ fontSize:9.5, color:MU }}>{w.step}</div>
                  </div>
                  {i<WORKFLOW.length-1&&<div style={{ width:24, height:1, background:BD, flexShrink:0 }}/>}
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[{label:"Avg. Approval Time",val:"4.2 days",icon:Clock,c:P},{label:"SLA Compliance",val:"94.1%",icon:Target,c:SU},{label:"Pending Signatures",val:"11 contracts",icon:Edit2,c:WA},{label:"Rejected This Month",val:"3 contracts",icon:XCircle,c:ER}].map(({label,val,icon:Icon,c})=>(
                <div key={label} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 12px", background:BG, borderRadius:10 }}>
                  <Icon size={14} color={c}/><div><div style={{ fontSize:9.5, color:MU }}>{label}</div><div style={{ fontSize:12, fontWeight:700, color:TX }}>{val}</div></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card title="Contract Table" action={<Btn label="Filter" icon={Filter} onClick={()=>toast.info("Filters opened")}/>} style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["ID","Contract","Counterparty","Status","Owner","Value","Due Date","Priority","Actions"]}/>
          <tbody>
            {CONTRACT_ROWS.map(([id,name,party,status,owner,value,due,priority],i)=>{
              const ss:Record<string,any>={Active:"green","In Review":"blue",Draft:"slate",Approved:"green",Expired:"red"};
              const ps:Record<string,any>={High:"red",Medium:"amber",Low:"green"};
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <span style={{ fontWeight:600 }}>{name}</span>,
                <span style={{ color:MU }}>{party}</span>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <span style={{ color:MU }}>{owner}</span>,
                <span style={{ fontWeight:700 }}>{value}</span>,
                <span style={{ color:MU }}>{due}</span>,
                <Pill label={priority as string} color={ps[priority as string]||"slate"}/>,
                <ActionBtns onView={()=>toast.info(`Viewing ${name}`)} onEdit={()=>toast.info(`Editing ${name}`)} onDelete={()=>toast.error(`Deleted ${name}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
      </Card>
      {showModal&&<Modal title="Create New Contract" onClose={()=>setShowModal(false)}><FormField label="Contract Title" placeholder="e.g. Enterprise SaaS Agreement"/><FormField label="Counterparty" placeholder="Company name"/><div style={{ marginBottom:14 }}><label style={{ display:"block", fontSize:12, fontWeight:600, color:TX, marginBottom:5 }}>Contract Type</label><select style={{ width:"100%", padding:"9px 12px", border:`1px solid ${BD}`, borderRadius:8, fontSize:13, color:TX, outline:"none" }}><option>Services</option><option>NDA</option><option>Procurement</option><option>Technology</option></select></div><div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:20 }}><Btn label="Cancel" onClick={()=>setShowModal(false)}/><Btn label="Create Contract" icon={FilePlus} primary onClick={()=>{setShowModal(false);toast.success("Contract created successfully");}}/></div></Modal>}
    </FrameShell>
  );
}

// ─── Frame 4: Obligation Tracker ──────────────────────────────────────────────

const OBL_CHART=[{m:"Jan",done:18,pend:12},{m:"Feb",done:24,pend:9},{m:"Mar",done:21,pend:14},{m:"Apr",done:31,pend:8},{m:"May",done:27,pend:11},{m:"Jun",done:35,pend:6},{m:"Jul",done:14,pend:17}];
const OBL_ROWS=[
  ["OBL-001","Quarterly Performance Report","Enterprise SaaS","High","Pending","Jul 15, 2026","P. Nair",60],
  ["OBL-002","Security Audit Submission","Data Processing","High","Overdue","Jun 30, 2026","S. Reinholt",25],
  ["OBL-003","Insurance Certificate Renewal","Vendor Contract","Medium","Completed","Jul 1, 2026","D. Okafor",100],
  ["OBL-004","Monthly Usage Report","Software License","Low","Pending","Jul 31, 2026","M. Delgado",40],
  ["OBL-005","SLA Compliance Review","IT Infrastructure","High","Pending","Aug 5, 2026","J. Whitfield",15],
  ["OBL-006","Marketing Budget Reconciliation","Marketing Pship","Medium","Completed","Jun 28, 2026","T. Essien",100],
];

function Frame04({ onNavClick }: any) {
  const DAYS=[...Array(31)].map((_,i)=>i+1);
  const overdue=[5,12,18]; const dueDays=[7,15,22,28];
  return (
    <FrameShell active="Obligations" crumbs={["Obligations","Tracker"]} title="Obligation Tracker" subtitle="Monitor, manage, and complete all contractual obligations on time"
      cta={<Btn label="Add Obligation" icon={Plus} primary onClick={()=>toast.success("Add obligation form opened")}/>} onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Pending Obligations" value="47" delta="Due this month" icon={ClipboardList} ic={WA} ib="#FFFBEB"/>
        <KPI label="Completed" value="183" delta="+22 vs last month" up icon={CheckSquare} ic={SU} ib="#F0FDF4"/>
        <KPI label="Overdue" value="12" delta="Needs immediate action" up={false} icon={AlertTriangle} ic={ER} ib="#FEF2F2"/>
        <KPI label="High Priority" value="28" delta="Requires attention" icon={Flag} ic={VI} ib="#F5F3FF"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 210px" }}>
        <Card title="Completion Progress" sub="Completed vs pending per month" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={152}><BarChart id="c04-bar" data={OBL_CHART} margin={{ left:-22, right:4 }}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Bar dataKey="done" name="Completed" fill={SU} radius={[3,3,0,0]}/><Bar dataKey="pend" name="Pending" fill={WA} radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Due Date Calendar" sub="July 2026 obligation deadlines" style={{ flex:2 }}>
          <div style={{ padding:"10px 14px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", textAlign:"center", marginBottom:4 }}>{["Mo","Tu","We","Th","Fr","Sa","Su"].map(d=><div key={d} style={{ fontSize:9, fontWeight:700, color:"#94A3B8", padding:"2px 0" }}>{d}</div>)}</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", textAlign:"center", gap:1 }}>
              {["",...DAYS].map((d,i)=>{
                const isToday=d===4; const isOverdue=overdue.includes(d as number); const isDue=dueDays.includes(d as number);
                return <div key={i} style={{ padding:"3px 1px", borderRadius:5, fontSize:10, fontWeight:isToday||isDue||isOverdue?700:400, background:isToday?P:isOverdue?"#FEE2E2":isDue?"#FEF3C7":"transparent", color:isToday?"white":isOverdue?ER:isDue?"#B45309":d?TX:"transparent" }}>{d}</div>;
              })}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:8, paddingTop:8, borderTop:`1px solid ${BD}` }}>
              {[["Today",P,"white"],["Due","#FEF3C7","#B45309"],["Overdue","#FEE2E2",ER]].map(([l,bg,tx]:any)=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:4 }}><span style={{ width:10, height:10, borderRadius:3, background:bg }}/><span style={{ fontSize:9.5, color:MU }}>{l}</span></div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card title="Obligations Table" style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["ID","Obligation","Contract","Priority","Status","Due Date","Owner","Progress","Actions"]}/>
          <tbody>
            {OBL_ROWS.map(([id,title,contract,priority,status,due,owner,pct],i)=>{
              const ss:Record<string,any>={Pending:"amber",Overdue:"red",Completed:"green"};
              const ps:Record<string,any>={High:"red",Medium:"amber",Low:"green"};
              const p=pct as number;
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <span style={{ fontWeight:600 }}>{title}</span>,
                <span style={{ color:MU, fontSize:10.5 }}>{contract}</span>,
                <Pill label={priority as string} color={ps[priority as string]||"slate"}/>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <span style={{ color:MU }}>{due}</span>,
                <span style={{ color:MU }}>{owner}</span>,
                <div style={{ display:"flex", alignItems:"center", gap:6, minWidth:90 }}>
                  <div style={{ flex:1, height:5, background:"#F1F5F9", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", borderRadius:3, background:p===100?SU:(status as string)==="Overdue"?ER:P, width:`${p}%` }}/></div>
                  <span style={{ fontSize:10, fontWeight:700, color:MU, minWidth:28 }}>{p}%</span>
                </div>,
                <ActionBtns onView={()=>toast.info(`Viewing ${title}`)} onEdit={()=>toast.info(`Editing ${title}`)} onDelete={()=>toast.error(`Deleted ${title}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
      </Card>
    </FrameShell>
  );
}

// ─── Frame 5: Renewal Management ─────────────────────────────────────────────

const RENEWAL_CHART=[{m:"Jan",renewed:5,expired:2,upcoming:8},{m:"Feb",renewed:7,expired:1,upcoming:6},{m:"Mar",renewed:4,expired:3,upcoming:9},{m:"Apr",renewed:9,expired:0,upcoming:7},{m:"May",renewed:6,expired:2,upcoming:11},{m:"Jun",renewed:8,expired:1,upcoming:14},{m:"Jul",renewed:3,expired:0,upcoming:18}];
const RENEWAL_ROWS=[
  ["RNW-001","Enterprise SaaS Agreement","Nexus Technologies","Aug 31, 2026","$420,000","Upcoming","60 days"],
  ["RNW-002","Office Lease Agreement","Prestige Properties","Sep 15, 2026","$180,000","Upcoming","72 days"],
  ["RNW-003","Software License Agreement","CloudSys Inc","Oct 1, 2026","$64,000","Upcoming","89 days"],
  ["RNW-004","Marketing Services Agreement","Brand Elevate Co","Jul 31, 2026","$38,500","Upcoming","14 days"],
  ["RNW-005","Security Monitoring Contract","CyberGuard Ltd","Jun 30, 2026","$92,000","Expired","—"],
  ["RNW-006","Cleaning & Facilities","FacilityPro Group","Mar 31, 2026","$24,000","Renewed","Done"],
];

function Frame05({ onNavClick }: any) {
  const reminders=[{name:"Marketing Services",days:"14 days",dot:ER,label:"Critical"},{name:"Enterprise SaaS",days:"60 days",dot:WA,label:"Soon"},{name:"Office Lease",days:"72 days",dot:"#F59E0B",label:"Soon"},{name:"Software License",days:"89 days",dot:P,label:"Upcoming"},{name:"Consulting Agmt",days:"121 days",dot:SU,label:"Planned"}];
  return (
    <FrameShell active="Renewals" crumbs={["Contracts","Renewals"]} title="Renewal Management" subtitle="Track upcoming contract renewals, set reminders, and manage expirations"
      cta={<Btn label="Renew Contract" icon={RotateCcw} primary onClick={()=>toast.success("Renewal wizard opened")}/>} onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Upcoming Renewals" value="28" delta="Next 90 days" icon={RefreshCw} ic={P} ib="#EFF6FF"/>
        <KPI label="Renewed" value="64" delta="+9 vs last quarter" up icon={CheckCircle} ic={SU} ib="#F0FDF4"/>
        <KPI label="Expired" value="11" delta="Needs review" up={false} icon={XCircle} ic={ER} ib="#FEF2F2"/>
        <KPI label="Cancelled" value="5" delta="This fiscal year" icon={AlertCircle} ic={MU} ib="#F1F5F9"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 210px" }}>
        <Card title="Renewal Activity Trend" sub="Monthly outcomes — 2026" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={152}><BarChart id="c05-bar" data={RENEWAL_CHART} margin={{ left:-22, right:4 }}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Bar dataKey="renewed" name="Renewed" fill={SU} radius={[3,3,0,0]}/><Bar dataKey="expired" name="Expired" fill={ER} radius={[3,3,0,0]}/><Bar dataKey="upcoming" name="Upcoming" fill={P} radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Reminder Schedule" sub="Automated renewal alerts" style={{ flex:2 }}>
          {reminders.map((r,i)=>(
            <div key={i} style={{ padding:"9px 16px", borderBottom:"1px solid #F8FAFC", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:3, height:32, borderRadius:4, background:r.dot, flexShrink:0 }}/>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11.5, fontWeight:600, color:TX, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.name}</div>
                <div style={{ fontSize:10, color:MU }}>Expires in {r.days}</div>
              </div>
              <span style={{ fontSize:10, fontWeight:700, color:r.dot, background:r.dot+"22", padding:"2px 8px", borderRadius:20 }}>{r.label}</span>
            </div>
          ))}
        </Card>
      </div>
      <Card title="Renewal Pipeline" action={<Btn label="Set Reminders" icon={Bell} onClick={()=>toast.success("Reminders configured")}/>} style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["ID","Contract","Counterparty","Expiry Date","Value","Status","Notice Period","Actions"]}/>
          <tbody>
            {RENEWAL_ROWS.map(([id,name,party,expiry,value,status,notice],i)=>{
              const ss:Record<string,any>={Upcoming:"blue",Expired:"red",Renewed:"green"};
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <span style={{ fontWeight:600 }}>{name}</span>,
                <span style={{ color:MU }}>{party}</span>,
                <span style={{ color:MU }}>{expiry}</span>,
                <span style={{ fontWeight:700 }}>{value}</span>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <span style={{ fontSize:11, fontWeight:700, color:notice==="14 days"?ER:MU }}>{notice}</span>,
                <ActionBtns onView={()=>toast.info(`Viewing ${name}`)} onEdit={()=>toast.info(`Editing ${name}`)} onDelete={()=>toast.error(`Deleted ${name}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
      </Card>
    </FrameShell>
  );
}

// ─── Frame 6: Compliance Monitoring ──────────────────────────────────────────

const COMP_TREND=[{m:"Jan",score:74},{m:"Feb",score:78},{m:"Mar",score:75},{m:"Apr",score:81},{m:"May",score:83},{m:"Jun",score:87},{m:"Jul",score:89}];
const RISK_PIE=[{name:"Low Risk",value:142,color:SU},{name:"Medium Risk",value:56,color:WA},{name:"High Risk",value:20,color:ER}];
const COMP_ROWS=[
  ["CMP-001","Enterprise SaaS Agreement","Low","Compliant","Jun 15, 2026","Sep 15, 2026",96],
  ["CMP-002","Data Processing Agreement","High","At Risk","May 30, 2026","Jul 15, 2026",62],
  ["CMP-003","Vendor Contract","Medium","Compliant","Jun 22, 2026","Sep 22, 2026",81],
  ["CMP-004","Software License Agreement","Low","Compliant","Jul 1, 2026","Oct 1, 2026",94],
  ["CMP-005","IT Infrastructure Contract","High","Non-Compliant","Jun 1, 2026","Jul 10, 2026",44],
  ["CMP-006","Office Lease Agreement","Medium","Compliant","Jun 28, 2026","Sep 28, 2026",78],
];

function Frame06({ onNavClick }: any) {
  return (
    <FrameShell active="Compliance" crumbs={["Compliance","Monitoring"]} title="Compliance Monitoring" subtitle="Real-time compliance tracking, risk scoring, and regulatory audit management"
      cta={<Btn label="Generate Report" icon={FileBarChart} primary onClick={()=>toast.success("Generating compliance report...")}/>} onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Compliance Score" value="89" suffix="%" delta="+2.3 pts this month" up icon={ShieldCheck} ic={SU} ib="#F0FDF4"/>
        <KPI label="High Risk Contracts" value="20" delta="Needs immediate review" up={false} icon={AlertTriangle} ic={ER} ib="#FEF2F2"/>
        <KPI label="Pending Reviews" value="34" delta="Scheduled this month" icon={Clock} ic={WA} ib="#FFFBEB"/>
        <KPI label="Compliant" value="198" delta="91.7% compliance rate" icon={CheckCircle} ic={P} ib="#EFF6FF"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 210px" }}>
        <Card title="Compliance Score Trend" sub="Overall score over time — 2026" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={152}><AreaChart id="c06-area" data={COMP_TREND} margin={{ left:-22, right:4 }}><defs><linearGradient id="compGrad06" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={SU} stopOpacity={0.15}/><stop offset="95%" stopColor={SU} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis domain={[60,100]} tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Area type="monotone" dataKey="score" name="Compliance %" stroke={SU} strokeWidth={2.5} fill="url(#compGrad06)" dot={{ fill:SU, r:3.5, strokeWidth:2, stroke:"#fff" }}/></AreaChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Risk Distribution" sub="Contracts by risk level" style={{ flex:2 }}>
          <div style={{ padding:"10px 14px" }}>
            <ResponsiveContainer width="100%" height={100}><PieChart id="c06-pie"><Pie data={RISK_PIE} cx="50%" cy="50%" innerRadius={30} outerRadius={48} paddingAngle={3} dataKey="value">{RISK_PIE.map(e=><Cell key={e.name} fill={e.color}/>)}</Pie><Tooltip content={<CHART_TT/>}/></PieChart></ResponsiveContainer>
            <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:5 }}>
              {RISK_PIE.map(({name,value,color})=>(
                <div key={name} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:color, flexShrink:0 }}/><span style={{ fontSize:10, color:MU, flex:1 }}>{name}</span>
                  <div style={{ width:60, height:4, background:"#F1F5F9", borderRadius:2, overflow:"hidden" }}><div style={{ height:"100%", background:color, borderRadius:2, width:`${Math.round(value/218*100)}%` }}/></div>
                  <span style={{ fontSize:10, fontWeight:700, color:TX, minWidth:20, textAlign:"right" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <Card title="Compliance Register" action={<Btn label="Export" icon={Download} onClick={()=>toast.success("Exporting compliance register...")}/>} style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["ID","Contract","Risk Level","Status","Score","Last Review","Next Review","Actions"]}/>
          <tbody>
            {COMP_ROWS.map(([id,name,risk,status,last,next,score],i)=>{
              const ss:Record<string,any>={Compliant:"green","At Risk":"amber","Non-Compliant":"red"};
              const rs:Record<string,any>={Low:"green",Medium:"amber",High:"red"};
              const s=score as number;
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <span style={{ fontWeight:600 }}>{name}</span>,
                <Pill label={risk as string} color={rs[risk as string]||"slate"}/>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <div style={{ display:"flex", alignItems:"center", gap:6 }}><div style={{ width:50, height:5, background:"#F1F5F9", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", borderRadius:3, background:s>=80?SU:s>=60?WA:ER, width:`${s}%` }}/></div><span style={{ fontSize:11, fontWeight:700, color:s>=80?SU:s>=60?WA:ER }}>{s}%</span></div>,
                <span style={{ color:MU }}>{last}</span>,
                <span style={{ color:MU }}>{next}</span>,
                <ActionBtns onView={()=>toast.info(`Viewing ${name}`)} onEdit={()=>toast.info(`Editing ${name}`)} onDelete={()=>toast.error(`Deleted ${name}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
      </Card>
    </FrameShell>
  );
}

// ─── Frame 7: Analytics ───────────────────────────────────────────────────────

const GROWTH_DATA=[{m:"Jan",contracts:28,obligations:45},{m:"Feb",contracts:34,obligations:52},{m:"Mar",contracts:31,obligations:48},{m:"Apr",contracts:42,obligations:63},{m:"May",contracts:48,obligations:71},{m:"Jun",contracts:45,obligations:68},{m:"Jul",contracts:55,obligations:82}];
const DEPT_DATA=[{dept:"Legal",contracts:48,comp:94},{dept:"Finance",contracts:36,comp:88},{dept:"Operations",contracts:29,comp:91},{dept:"HR",contracts:22,comp:97},{dept:"IT",contracts:18,comp:82},{dept:"Marketing",contracts:15,comp:85}];

function Frame07({ onNavClick }: any) {
  const [period, setPeriod] = useState("3M");
  const metrics=[{label:"Contract Execution Rate",val:87,color:P},{label:"On-time Renewals",val:92,color:SU},{label:"Obligation Completion",val:79,color:VI},{label:"Risk Mitigation Rate",val:94,color:TE},{label:"Avg. Approval Cycle",val:68,color:WA}];
  return (
    <FrameShell active="Dashboard" crumbs={["Dashboard","Analytics"]} title="Analytics Overview" subtitle="Business intelligence, performance metrics, and contract portfolio insights"
      cta={<div style={{ display:"flex", gap:8 }}>{["7D","1M","3M","YTD"].map(p=><div key={p} onClick={()=>setPeriod(p)} style={{ padding:"6px 12px", borderRadius:7, background:p===period?P:CA, border:`1px solid ${p===period?P:BD}`, fontSize:11.5, fontWeight:600, color:p===period?"white":TX, cursor:"pointer" }}>{p}</div>)}</div>}
      onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Active Contracts" value="218" delta="+14 this quarter" up icon={FileText} ic={P} ib="#EFF6FF"/>
        <KPI label="Pending Obligations" value="47" delta="-3 vs last month" up={false} icon={ClipboardList} ic={WA} ib="#FFFBEB"/>
        <KPI label="Compliance Rate" value="89" suffix="%" delta="+2.3 pts MoM" up icon={ShieldCheck} ic={SU} ib="#F0FDF4"/>
        <KPI label="Upcoming Renewals" value="28" delta="Next 90 days" icon={RefreshCw} ic={VI} ib="#F5F3FF"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 220px" }}>
        <Card title="Contract Growth & Obligations" sub="Monthly trend — 2026" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={155}><AreaChart id="c07-area" data={GROWTH_DATA} margin={{ left:-22, right:4 }}><defs><linearGradient id="cGrad07" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={P} stopOpacity={0.15}/><stop offset="95%" stopColor={P} stopOpacity={0}/></linearGradient><linearGradient id="oGrad07" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={WA} stopOpacity={0.15}/><stop offset="95%" stopColor={WA} stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Area type="monotone" dataKey="contracts" name="Contracts" stroke={P} strokeWidth={2} fill="url(#cGrad07)"/><Area type="monotone" dataKey="obligations" name="Obligations" stroke={WA} strokeWidth={2} fill="url(#oGrad07)"/></AreaChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Performance Metrics" sub="Key operational KPIs" style={{ flex:2 }}>
          <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:12 }}>
            {metrics.map(({label,val,color})=>(
              <div key={label}><div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}><span style={{ fontSize:11, color:MU, fontWeight:500 }}>{label}</span><span style={{ fontSize:11, fontWeight:700, color:TX }}>{val}%</span></div><div style={{ height:6, background:"#F1F5F9", borderRadius:3, overflow:"hidden" }}><div style={{ height:"100%", borderRadius:3, background:color, width:`${val}%` }}/></div></div>
            ))}
          </div>
        </Card>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 240px" }}>
        <Card title="Department Performance" sub="Contracts & compliance by dept." style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={172}><BarChart id="c07-bar" data={DEPT_DATA} margin={{ left:-22, right:4 }}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="dept" tick={{ fontSize:9.5, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Bar dataKey="contracts" name="Contracts" fill={P} radius={[3,3,0,0]}/><Bar dataKey="comp" name="Compliance%" fill={SU} radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Recent Activities" action={<span style={{ fontSize:11, color:P, fontWeight:600, cursor:"pointer" }} onClick={()=>toast.info("Viewing all activities")}>View all</span>} style={{ flex:2, overflow:"hidden" }}>
          {[{icon:FileText,text:"New contract uploaded",sub:"Enterprise SaaS Agreement",time:"8 min",c:P},{icon:CheckCircle,text:"Obligation completed",sub:"Insurance Certificate",time:"1 hr",c:SU},{icon:AlertTriangle,text:"Compliance risk flagged",sub:"IT Infrastructure",time:"2 hrs",c:ER},{icon:RefreshCw,text:"Renewal reminder sent",sub:"Marketing Services",time:"4 hrs",c:WA},{icon:Shield,text:"Security audit completed",sub:"Data Processing Agmt",time:"Yesterday",c:VI}].map(({icon:Icon,text,sub,time,c},i)=>(
            <div key={i} style={{ padding:"9px 16px", borderBottom:"1px solid #F8FAFC", display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:28, height:28, background:c+"18", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={12} color={c}/></div>
              <div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:11.5, fontWeight:600, color:TX }}>{text}</div><div style={{ fontSize:10, color:MU, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sub}</div></div>
              <span style={{ fontSize:10, color:"#94A3B8", fontFamily:"monospace", flexShrink:0 }}>{time}</span>
            </div>
          ))}
        </Card>
      </div>
    </FrameShell>
  );
}

// ─── Frame 8: Reports ─────────────────────────────────────────────────────────

const RPT_CHART=[{m:"Jan",gen:12,sched:4},{m:"Feb",gen:14,sched:5},{m:"Mar",gen:11,sched:3},{m:"Apr",gen:18,sched:6},{m:"May",gen:16,sched:4},{m:"Jun",gen:22,sched:7},{m:"Jul",gen:9,sched:8}];
const REPORT_ROWS=[
  ["RPT-001","Monthly Compliance Summary","Compliance","Generated","PDF","2.4 MB","Jul 1, 2026","S. Reinholt"],
  ["RPT-002","Contract Expiration Report","Contracts","Generated","Excel","1.8 MB","Jul 3, 2026","M. Delgado"],
  ["RPT-003","Q2 Obligation Completion","Obligations","Generated","PDF","3.1 MB","Jun 30, 2026","P. Nair"],
  ["RPT-004","User Activity Audit Report","Audit","Scheduled","PDF","—","Jul 7, 2026","A. Thornton"],
  ["RPT-005","Risk Assessment Summary","Compliance","Generated","PDF","1.2 MB","Jun 25, 2026","S. Reinholt"],
  ["RPT-006","Annual Contract Performance","Analytics","Pending","PDF","—","Jul 31, 2026","A. Thornton"],
];
const EXPORTS=[{label:"Export Compliance Report",icon:ShieldCheck,fmt:"PDF",bg:P},{label:"Export Contract Summary",icon:FileText,fmt:"Excel",bg:SU},{label:"Export Obligation Report",icon:ClipboardList,fmt:"PDF",bg:VI},{label:"Export User Activity Log",icon:Users,fmt:"Excel",bg:WA},{label:"Export Audit Trail",icon:Shield,fmt:"PDF",bg:"#334155"}];

function Frame08({ onNavClick }: any) {
  return (
    <FrameShell active="Reports" crumbs={["Reports","Management"]} title="Reports Dashboard" subtitle="Generate, schedule, and export compliance and contract reports on-demand"
      cta={<div style={{ display:"flex", gap:8 }}><Btn label="Schedule Report" icon={Calendar} onClick={()=>toast.success("Report scheduler opened")}/><Btn label="New Report" icon={Plus} primary onClick={()=>toast.success("New report wizard opened")}/></div>}
      onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Generated Reports" value="102" delta="+9 this month" up icon={FileBarChart} ic={P} ib="#EFF6FF"/>
        <KPI label="Scheduled Reports" value="14" delta="Next 30 days" icon={Calendar} ic={VI} ib="#F5F3FF"/>
        <KPI label="Downloads" value="348" delta="+42 this month" up icon={Download} ic={SU} ib="#F0FDF4"/>
        <KPI label="Pending Reports" value="7" delta="Awaiting generation" icon={Clock} ic={WA} ib="#FFFBEB"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 215px" }}>
        <Card title="Monthly Report Activity" sub="Generated vs scheduled — 2026" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={155}><BarChart id="c09-bar" data={RPT_CHART} margin={{ left:-22, right:4 }}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Bar dataKey="gen" name="Generated" fill={P} radius={[3,3,0,0]}/><Bar dataKey="sched" name="Scheduled" fill={VI} radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Quick Export" sub="One-click report generation" style={{ flex:2 }}>
          <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:6 }}>
            {EXPORTS.map(({label,icon:Icon,fmt,bg})=>(
              <div key={label} onClick={()=>toast.success(`Exporting ${fmt} report...`)} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:bg, borderRadius:9, cursor:"pointer" }}>
                <Icon size={14} color="white"/><span style={{ flex:1, fontSize:11.5, fontWeight:600, color:"white" }}>{label}</span><span style={{ fontSize:9.5, color:"rgba(255,255,255,0.75)", border:"1px solid rgba(255,255,255,0.3)", padding:"1px 6px", borderRadius:4 }}>{fmt}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Report Library" action={<Btn label="Filter" icon={Filter} onClick={()=>toast.info("Filters opened")}/>} style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["ID","Report Name","Type","Status","Format","Size","Date","Owner","Actions"]}/>
          <tbody>
            {REPORT_ROWS.map(([id,name,type,status,fmt,size,date,owner],i)=>{
              const ss:Record<string,any>={Generated:"green",Scheduled:"violet",Pending:"amber"};
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <span style={{ fontWeight:600 }}>{name}</span>,
                <span style={{ background:"#F1F5F9", color:MU, padding:"2px 8px", borderRadius:5, fontSize:10.5, fontWeight:600 }}>{type}</span>,
                <Pill label={status as string} color={ss[status as string]||"slate"}/>,
                <span style={{ background:(fmt as string)==="PDF"?"#FEF2F2":"#F0FDF4", color:(fmt as string)==="PDF"?"#B91C1C":"#15803D", padding:"2px 8px", borderRadius:5, fontSize:10.5, fontWeight:700 }}>{fmt}</span>,
                <span style={{ color:MU, fontFamily:"monospace", fontSize:10 }}>{size}</span>,
                <span style={{ color:MU }}>{date}</span>,
                <span style={{ color:MU }}>{owner}</span>,
                <ActionBtns onView={()=>toast.info(`Viewing ${name}`)} onEdit={()=>toast.info(`Editing ${name}`)} onDelete={()=>toast.error(`Deleted ${name}`)}/>,
              ]}/>;
            })}
          </tbody>
        </table>
      </Card>
    </FrameShell>
  );
}

// ─── Frame 9: Notifications ───────────────────────────────────────────────────

const NOTIF_CHART=[{m:"Mon",n:12},{m:"Tue",n:18},{m:"Wed",n:9},{m:"Thu",n:24},{m:"Fri",n:15},{m:"Sat",n:6},{m:"Sun",n:8}];
const NOTIF_LIST=[
  {title:"Contract Expiring Soon",body:"Enterprise SaaS expires in 58 days.",type:"Warning",ch:"In-App",time:"5 min ago",read:false},
  {title:"Obligation Overdue",body:"Security Audit was due Jun 30, 2026.",type:"Critical",ch:"Email",time:"1 hr ago",read:false},
  {title:"Compliance Review Scheduled",body:"Data Processing review on Jul 15.",type:"Info",ch:"Email",time:"3 hrs ago",read:false},
  {title:"New Contract Uploaded",body:"Consulting Agreement uploaded by T. Essien.",type:"Info",ch:"In-App",time:"5 hrs ago",read:true},
  {title:"User Account Blocked",body:"Hannah Bremer's account blocked.",type:"Warning",ch:"Email",time:"Yesterday",read:true},
  {title:"Renewal Reminder",body:"Marketing Services renews in 14 days.",type:"Warning",ch:"SMS",time:"2 days ago",read:true},
  {title:"Report Generated",body:"Monthly Compliance Summary ready.",type:"Info",ch:"In-App",time:"3 days ago",read:true},
];
const PREFS=[{ch:"Email Notifications",icon:Mail,on:true,cnt:"124 sent",c:P,bg:"#EFF6FF"},{ch:"SMS Alerts",icon:Smartphone,on:true,cnt:"38 sent",c:SU,bg:"#F0FDF4"},{ch:"In-App",icon:Bell,on:true,cnt:"86 sent",c:VI,bg:"#F5F3FF"},{ch:"Contract Expiry",icon:FileText,on:true,cnt:"Auto",c:WA,bg:"#FFFBEB"},{ch:"Obligation Reminders",icon:ClipboardList,on:true,cnt:"Auto",c:TE,bg:"#F0FDFA"},{ch:"Security Alerts",icon:Shield,on:false,cnt:"Disabled",c:ER,bg:"#FEF2F2"}];

function Frame09({ onNavClick }: any) {
  const [prefs, setPrefs] = useState(PREFS.map(p=>p.on));
  const [filter, setFilter] = useState("All");
  const filtered = filter==="All"?NOTIF_LIST:filter==="Unread"?NOTIF_LIST.filter(n=>!n.read):NOTIF_LIST.filter(n=>n.type===filter);
  return (
    <FrameShell active="Notifications" crumbs={["System","Notifications"]} title="Notification Dashboard" subtitle="Manage alerts, reminders, and notification preferences across all channels"
      cta={<Btn label="Mark All Read" icon={CheckSquare} primary onClick={()=>toast.success("All notifications marked as read")}/>} onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Total Notifications" value="248" delta="Last 30 days" icon={Bell} ic={P} ib="#EFF6FF"/>
        <KPI label="Unread" value="3" delta="Requires attention" up={false} icon={AlertCircle} ic={WA} ib="#FFFBEB"/>
        <KPI label="Email Alerts" value="124" delta="Sent this month" icon={Mail} ic={VI} ib="#F5F3FF"/>
        <KPI label="SMS Alerts" value="38" delta="Sent this month" icon={Smartphone} ic={SU} ib="#F0FDF4"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 205px" }}>
        <Card title="Notification Activity" sub="Alerts sent — this week" style={{ flex:2 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={146}><BarChart id="c10-bar" data={NOTIF_CHART} margin={{ left:-22, right:4 }}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Bar dataKey="n" name="Notifications" fill={P} radius={[4,4,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="Notification Preferences" sub="Channel configuration & toggles" style={{ flex:3 }}>
          <div style={{ padding:"14px 16px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {PREFS.map(({ch,icon:Icon,cnt,c,bg},idx)=>(
              <div key={ch} style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"12px 8px", borderRadius:10, border:`1px solid ${BD}` }}>
                <div style={{ width:36, height:36, background:bg, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:6 }}><Icon size={16} color={c}/></div>
                <div style={{ fontSize:10.5, fontWeight:600, color:TX, textAlign:"center", marginBottom:2 }}>{ch}</div>
                <div style={{ fontSize:9.5, color:MU, marginBottom:7 }}>{cnt}</div>
                <div onClick={()=>setPrefs(p=>{const n=[...p];n[idx]=!n[idx];return n;})} style={{ width:34, height:18, borderRadius:9, background:prefs[idx]?P:"#CBD5E1", display:"flex", alignItems:"center", padding:"0 2px", cursor:"pointer" }}>
                  <div style={{ width:14, height:14, borderRadius:"50%", background:"white", boxShadow:"0 1px 3px rgba(0,0,0,0.2)", marginLeft:prefs[idx]?16:0, transition:"margin 0.2s" }}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Notification Feed" action={
        <div style={{ display:"flex", gap:5 }}>
          {["All","Unread","Warning","Critical"].map(f=><div key={f} onClick={()=>setFilter(f)} style={{ padding:"4px 10px", borderRadius:6, background:f===filter?P:BG, border:`1px solid ${f===filter?P:BD}`, fontSize:11, fontWeight:600, color:f===filter?"white":MU, cursor:"pointer" }}>{f}</div>)}
        </div>
      } style={{ flex:1, overflow:"hidden" }}>
        {filtered.map((n,i)=>{
          const tc:Record<string,[string,any]>={Critical:[ER,AlertTriangle],Warning:[WA,AlertCircle],Info:[P,Info]};
          const [c,Ico]=tc[n.type]||[P,Info];
          return (
            <div key={i} style={{ padding:"11px 18px", borderBottom:"1px solid #F8FAFC", display:"flex", alignItems:"flex-start", gap:12, background:!n.read?c+"08":"transparent" }}>
              <div style={{ width:32, height:32, borderRadius:10, background:c+"18", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}><Ico size={14} color={c}/></div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:12, fontWeight:!n.read?700:600, color:TX }}>{n.title}</span>
                  {!n.read&&<span style={{ width:6, height:6, borderRadius:"50%", background:P, flexShrink:0 }}/>}
                  <Pill label={n.type} color={n.type==="Critical"?"red":n.type==="Warning"?"amber":"blue"}/>
                </div>
                <div style={{ fontSize:11, color:MU, marginTop:1 }}>{n.body}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3, flexShrink:0 }}>
                <span style={{ fontSize:10, color:"#94A3B8", display:"flex", alignItems:"center", gap:4 }}>{n.ch==="Email"?<Mail size={9}/>:n.ch==="SMS"?<Smartphone size={9}/>:<Bell size={9}/>}{n.ch}</span>
                <span style={{ fontSize:10, color:"#94A3B8", fontFamily:"monospace" }}>{n.time}</span>
              </div>
            </div>
          );
        })}
      </Card>
    </FrameShell>
  );
}

// ─── Frame 10: Audit & Activity ───────────────────────────────────────────────

const SEC_CHART=[{m:"Mon",events:4,failed:2},{m:"Tue",events:7,failed:1},{m:"Wed",events:3,failed:0},{m:"Thu",events:9,failed:3},{m:"Fri",events:5,failed:1},{m:"Sat",events:2,failed:0},{m:"Sun",events:1,failed:0}];
const AUDIT_ROWS=[
  ["LOG-4821","Alexandra Thornton","User account blocked","User Mgmt","192.168.1.42","Warning","Jul 4, 09:14 AM"],
  ["LOG-4820","Marcus Delgado","Contract status updated","Contracts","192.168.1.55","Info","Jul 4, 08:52 AM"],
  ["LOG-4819","Priya Nair","Document uploaded","Repository","10.0.0.18","Info","Jul 4, 08:41 AM"],
  ["LOG-4818","Unknown","Failed login attempt","Auth","45.33.22.197","Critical","Jul 4, 07:55 AM"],
  ["LOG-4817","Unknown","Failed login attempt","Auth","45.33.22.197","Critical","Jul 4, 07:54 AM"],
  ["LOG-4816","Sofia Reinholt","Compliance report generated","Compliance","192.168.1.60","Info","Jul 4, 07:40 AM"],
  ["LOG-4815","Derek Okafor","Role permissions modified","User Mgmt","192.168.1.77","Warning","Jul 3, 05:30 PM"],
];
const MONITORS=[{label:"API Server",val:99.9,icon:Server,c:SU,bg:"#F0FDF4"},{label:"Database Cluster",val:100,icon:Database,c:SU,bg:"#F0FDF4"},{label:"Authentication Svc",val:98.2,icon:Lock,c:SU,bg:"#F0FDF4"},{label:"Storage Service",val:94.1,icon:FolderOpen,c:WA,bg:"#FFFBEB"},{label:"Notification Engine",val:100,icon:Bell,c:SU,bg:"#F0FDF4"}];

function Frame10({ onNavClick }: any) {
  const [logSearch, setLogSearch] = useState("");
  const filtered = AUDIT_ROWS.filter(r=>(r[1] as string).toLowerCase().includes(logSearch.toLowerCase())||(r[2] as string).toLowerCase().includes(logSearch.toLowerCase()));
  return (
    <FrameShell active="Audit & Logs" crumbs={["Security","Audit Logs"]} title="Audit & Activity Logs" subtitle="Complete audit trail, security event monitoring, and system activity tracking"
      cta={<div style={{ display:"flex", gap:8 }}><Btn label="Download Logs" icon={Download} onClick={()=>toast.success("Downloading audit logs...")}/><Btn label="Security Report" icon={Shield} primary onClick={()=>toast.success("Generating security report...")}/></div>}
      onNavClick={onNavClick}>
      <div style={{ display:"flex", gap:16 }}>
        <KPI label="Audit Logs" value="4,821" delta="+48 today" icon={Database} ic={P} ib="#EFF6FF"/>
        <KPI label="Security Events" value="31" delta="This month" icon={Shield} ic={VI} ib="#F5F3FF"/>
        <KPI label="Failed Logins" value="7" delta="Last 24 hours" up={false} icon={Lock} ic={ER} ib="#FEF2F2"/>
        <KPI label="User Activities" value="142" delta="Active sessions" icon={Activity} ic={SU} ib="#F0FDF4"/>
      </div>
      <div style={{ display:"flex", gap:16, flex:"0 0 210px" }}>
        <Card title="Security Events This Week" sub="Events and failed login attempts" style={{ flex:3 }}>
          <div style={{ padding:"12px 14px 8px" }}>
            <ResponsiveContainer width="100%" height={152}><BarChart id="c10-sec" data={SEC_CHART} margin={{ left:-22, right:4 }}><CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/><XAxis dataKey="m" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/><Tooltip content={<CHART_TT/>}/><Bar dataKey="events" name="Security Events" fill={P} radius={[3,3,0,0]}/><Bar dataKey="failed" name="Failed Logins" fill={ER} radius={[3,3,0,0]}/></BarChart></ResponsiveContainer>
          </div>
        </Card>
        <Card title="System Monitoring" sub="Real-time infrastructure status" style={{ flex:2 }}>
          <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:11 }}>
            {MONITORS.map(({label,val,icon:Icon,c,bg})=>(
              <div key={label} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:28, height:28, background:bg, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={13} color={c}/></div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}><span style={{ fontSize:11, fontWeight:600, color:TX }}>{label}</span><span style={{ fontSize:11, fontWeight:700, color:val>=99?SU:val>=95?WA:ER }}>{val}%</span></div>
                  <div style={{ height:4, background:"#F1F5F9", borderRadius:2, overflow:"hidden" }}><div style={{ height:"100%", borderRadius:2, background:val>=99?SU:val>=95?WA:ER, width:`${val}%` }}/></div>
                </div>
                <div style={{ width:7, height:7, borderRadius:"50%", background:val>=99?SU:val>=95?WA:ER, flexShrink:0 }}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Audit Log Table" action={
        <div style={{ display:"flex", gap:8 }}>
          <div style={{ position:"relative" }}>
            <Search size={12} color="#94A3B8" style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}/>
            <input value={logSearch} onChange={e=>setLogSearch(e.target.value)} placeholder="Search logs..." style={{ paddingLeft:26, paddingRight:10, paddingTop:5, paddingBottom:5, background:BG, border:`1px solid ${BD}`, borderRadius:7, fontSize:11.5, color:TX, width:150, outline:"none" }}/>
          </div>
          <Btn label="Severity" icon={Filter} onClick={()=>toast.info("Severity filter opened")}/>
        </div>
      } style={{ flex:1, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <THead cols={["Log ID","User","Action","Module","IP Address","Severity","Timestamp"]}/>
          <tbody>
            {filtered.map(([id,user,action,mod,ip,sev,time],i)=>{
              const ss:Record<string,any>={Info:"blue",Warning:"amber",Critical:"red"};
              const isUnknown=user==="Unknown";
              return <TRow key={i} cells={[
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:P, fontWeight:700 }}>{id}</span>,
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  {isUnknown?<div style={{ width:24, height:24, background:"#FEE2E2", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><AlertTriangle size={10} color={ER}/></div>:<div style={{ width:24, height:24, background:P, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:8, fontWeight:700 }}>{(user as string).split(" ").map(n=>n[0]).join("").slice(0,2)}</div>}
                  <span style={{ fontSize:11.5, fontWeight:600, color:isUnknown?ER:TX }}>{user}</span>
                </div>,
                <span style={{ color:MU }}>{action}</span>,
                <span style={{ background:"#F1F5F9", color:MU, padding:"2px 8px", borderRadius:5, fontSize:10.5, fontWeight:600 }}>{mod}</span>,
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:MU }}>{ip}</span>,
                <Pill label={sev as string} color={ss[sev as string]||"slate"}/>,
                <span style={{ fontFamily:"monospace", fontSize:10.5, color:MU }}>{time}</span>,
              ]}/>;
            })}
          </tbody>
        </table>
        <div style={{ padding:"10px 14px", borderTop:`1px solid #F1F5F9`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11, color:MU }}>Showing <b style={{ color:TX }}>{filtered.length}</b> of <b style={{ color:TX }}>4,821</b> entries</span>
          <div style={{ display:"flex", gap:4 }}>{[1,2,"...",482].map((p,i)=><div key={i} style={{ minWidth:26, height:26, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 6px", background:i===0?P:BG, border:`1px solid ${i===0?P:BD}`, fontSize:11, fontWeight:600, color:i===0?"white":MU, cursor:"pointer" }}>{p}</div>)}</div>
        </div>
      </Card>
    </FrameShell>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────

const AUTH_ROLES = ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  Administrator:       ["Full system access", "User management", "All modules"],
  "Legal Manager":     ["Contract management", "Legal review", "Compliance"],
  "Compliance Officer":["Compliance monitoring", "Reports", "Audit logs"],
  "Contract Manager":  ["Contract lifecycle", "Repository", "Obligations"],
  "Department Head":   ["Department contracts", "Analytics", "Renewals"],
  Employee:            ["View contracts", "My obligations", "Notifications"],
};

type AuthView = "login" | "register" | "forgot";

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [view, setView] = useState<AuthView>("login");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Employee");
  const [roleDropOpen, setRoleDropOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const FEATURES = [
    { icon: FileText,    text: "Contract lifecycle management" },
    { icon: ShieldCheck, text: "Compliance monitoring & reporting" },
    { icon: ClipboardList, text: "Obligation tracking & alerts" },
    { icon: BarChart2,   text: "Real-time analytics & insights" },
    { icon: Lock,        text: "JWT-secured authentication" },
    { icon: Users,       text: "Role-based access control" },
  ];

  function () {
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); toast.success("Welcome back! Signing in…"); setTimeout(onLogin, 600); }, 1000);
  }

  function handleRegister() {
    if (!name || !email || !password) { setError("Please fill in all required fields."); return; }
    if (password !== confirmPwd) { setError("Passwords do not match."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); toast.success(`Account created! Welcome, ${name.split(" ")[0]}.`); setTimeout(onLogin, 600); }, 1200);
  }

  function handleReset() {
    if (!resetEmail) { setError("Please enter your email address."); return; }
    setError(""); setLoading(true);
    setTimeout(() => { setLoading(false); setResetSent(true); toast.success("Password reset link sent!"); }, 900);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: `1.5px solid ${BD}`, borderRadius: 10,
    fontSize: 13.5, color: TX, outline: "none", background: "#FAFBFC",
    fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 600, color: TX, marginBottom: 6 };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif", background: BG, overflow: "hidden" }}>
      {/* ── Left branding panel ── */}
      <div style={{ width: 480, flexShrink: 0, background: SB, display: "flex", flexDirection: "column", padding: "48px 44px", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(37,99,235,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(37,99,235,0.06)", pointerEvents: "none" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div style={{ width: 44, height: 44, background: P, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
            <ShieldCheck size={22} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ color: "white", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>ContractIQ</div>
            <div style={{ color: "#60A5FA", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.02em" }}>Enterprise Suite</div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: 36 }}>
          <h1 style={{ color: "white", fontSize: 28, fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.5px", marginBottom: 12 }}>
            Contract Obligation<br />Management Platform
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.6 }}>
            Secure, compliant, and role-based access to your entire contract lifecycle.
          </p>
        </div>

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
          {FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(37,99,235,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} color="#60A5FA" />
              </div>
              <span style={{ color: "#CBD5E1", fontSize: 13.5, fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Role badges */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Access Roles</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {AUTH_ROLES.map(r => (
              <span key={r} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#94A3B8" }}>{r}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8, paddingTop: 20, borderTop: "1px solid #2d3f55" }}>
            <div style={{ width: 22, height: 22, background: "#16A34A22", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Lock size={11} color={SU} />
            </div>
            <span style={{ fontSize: 11.5, color: "#64748B", fontWeight: 500 }}>256-bit TLS · JWT Authentication · RBAC</span>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 60px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          {/* ─ Forgot Password view ─ */}
          {view === "forgot" && (
            <div>
              <div onClick={() => { setView("login"); setError(""); setResetSent(false); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: MU, fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 32 }}>
                <ArrowLeft size={15} />Back to Sign In
              </div>
              <div style={{ width: 48, height: 48, background: "#EFF6FF", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <KeyRound size={22} color={P} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: TX, letterSpacing: "-0.4px", marginBottom: 8 }}>Reset password</div>
              <p style={{ fontSize: 14, color: MU, lineHeight: 1.6, marginBottom: 32 }}>
                Enter your account email and we'll send a reset link.
              </p>
              {resetSent ? (
                <div style={{ padding: "20px 22px", background: "#F0FDF4", border: "1.5px solid #BBF7D0", borderRadius: 12, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <CheckCircle size={16} color={SU} />
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: "#15803D" }}>Reset link sent!</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#166534", margin: 0 }}>Check <b>{resetEmail}</b> for your password reset instructions.</p>
                </div>
              ) : (
                <>
                  {error && <div style={{ padding: "11px 14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 9, fontSize: 13, color: ER, marginBottom: 20 }}>{error}</div>}
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Email address</label>
                    <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
                  </div>
                  <button onClick={handleReset} disabled={loading} style={{ width: "100%", padding: "13px", background: P, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, color: "white", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)", opacity: loading ? 0.75 : 1 }}>
                    {loading ? "Sending…" : "Send Reset Link"}
                  </button>
                </>
              )}
            </div>
          )}

          {/* ─ Login / Register views ─ */}
          {view !== "forgot" && (
            <>
              {/* Header */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: TX, letterSpacing: "-0.5px", marginBottom: 6 }}>
                  {view === "login" ? "Welcome back" : "Create account"}
                </div>
                <p style={{ fontSize: 14, color: MU }}>
                  {view === "login" ? "Sign in to your ContractIQ workspace." : "Join your organization on ContractIQ."}
                </p>
              </div>

              {/* Tab switcher */}
              <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
                {(["login", "register"] as AuthView[]).map(v => (
                  <div key={v} onClick={() => { setView(v); setError(""); }}
                    style={{ flex: 1, textAlign: "center", padding: "9px", borderRadius: 8, background: view === v ? CA : "transparent", boxShadow: view === v ? "0 1px 4px rgba(0,0,0,0.1)" : "none", fontSize: 13.5, fontWeight: 700, color: view === v ? TX : MU, cursor: "pointer", transition: "all 0.15s" }}>
                    {v === "login" ? "Sign In" : "Register"}
                  </div>
                ))}
              </div>

              {/* JWT badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, marginBottom: 24 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: SU }} />
                <span style={{ fontSize: 11.5, fontWeight: 700, color: "#15803D" }}>JWT Secured</span>
                <span style={{ fontSize: 11, color: "#86EFAC", margin: "0 2px" }}>·</span>
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#166534" }}>256-bit TLS encryption</span>
              </div>

              {/* Error */}
              {error && (
                <div style={{ padding: "11px 14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 9, fontSize: 13, color: ER, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <AlertCircle size={14} color={ER} />{error}
                </div>
              )}

              {/* ── Sign In form ── */}
              {view === "login" && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 10, position: "relative" }}>
                    <label style={labelStyle}>Password</label>
                    <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" style={{ ...inputStyle, paddingRight: 44 }} onKeyDown={e => e.key === "Enter" && handleLogin()} />
                    <div onClick={() => setShowPwd(v => !v)} style={{ position: "absolute", right: 14, top: 38, cursor: "pointer", color: MU }}>
                      {showPwd ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", marginBottom: 28 }}>
                    <span onClick={() => { setView("forgot"); setError(""); }} style={{ fontSize: 13, fontWeight: 600, color: P, cursor: "pointer" }}>Forgot password?</span>
                  </div>
                  <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "13px", background: P, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, color: "white", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)", opacity: loading ? 0.75 : 1, marginBottom: 20 }}>
                    {loading ? "Signing in…" : "Sign In →"}
                  </button>
                  {/* Demo quick-access */}
                  <div style={{ padding: "14px 18px", background: "#FAFBFC", border: `1px solid ${BD}`, borderRadius: 12 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: MU, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Demo Access</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[["admin@contractiq.com", "Administrator"], ["legal@contractiq.com", "Legal Manager"], ["compliance@contractiq.com", "Compliance Officer"], ["manager@contractiq.com", "Contract Manager"]].map(([e, r]) => (
                        <div key={e} onClick={() => { setEmail(e); setPassword("Demo@123"); }} style={{ padding: "8px 10px", background: CA, border: `1px solid ${BD}`, borderRadius: 8, cursor: "pointer" }}>
                          <div style={{ fontSize: 10.5, fontWeight: 700, color: P }}>{r}</div>
                          <div style={{ fontSize: 10, color: MU, marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── Register form ── */}
              {view === "register" && (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Full Name <span style={{ color: ER }}>*</span></label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Alexandra Thornton" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Work Email <span style={{ color: ER }}>*</span></label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Role / Access Level <span style={{ color: ER }}>*</span></label>
                    <div style={{ position: "relative" }}>
                      <div onClick={() => setRoleDropOpen(v => !v)} style={{ ...inputStyle, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", userSelect: "none" }}>
                        <span>{role}</span><ChevronDown size={15} color={MU} />
                      </div>
                      {roleDropOpen && (
                        <div style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 4px)", background: CA, border: `1px solid ${BD}`, borderRadius: 12, boxShadow: "0 12px 32px rgba(0,0,0,0.12)", zIndex: 200 }}>
                          {AUTH_ROLES.map(r => (
                            <div key={r} onClick={() => { setRole(r); setRoleDropOpen(false); }}
                              style={{ padding: "10px 16px", fontSize: 13, fontWeight: role === r ? 700 : 400, color: role === r ? P : TX, background: role === r ? "#EFF6FF" : "transparent", cursor: "pointer" }}>
                              <div>{r}</div>
                              <div style={{ fontSize: 10.5, color: MU, fontWeight: 400, marginTop: 1 }}>{ROLE_PERMISSIONS[r]?.join(" · ")}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Permission preview */}
                    <div style={{ marginTop: 8, padding: "9px 12px", background: "#F8FAFC", border: `1px solid ${BD}`, borderRadius: 8 }}>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: MU, marginBottom: 4 }}>Permissions for {role}:</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {ROLE_PERMISSIONS[role]?.map(p => (
                          <span key={p} style={{ padding: "2px 8px", background: "#EFF6FF", color: P, fontSize: 10.5, fontWeight: 600, borderRadius: 5 }}>{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16, position: "relative" }}>
                    <label style={labelStyle}>Password <span style={{ color: ER }}>*</span></label>
                    <input type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" style={{ ...inputStyle, paddingRight: 44 }} />
                    <div onClick={() => setShowPwd(v => !v)} style={{ position: "absolute", right: 14, top: 38, cursor: "pointer", color: MU }}>
                      {showPwd ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                    </div>
                    {/* Strength bar */}
                    {password.length > 0 && (
                      <div style={{ marginTop: 7, display: "flex", gap: 4, alignItems: "center" }}>
                        {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: password.length >= i*3 ? (password.length >= 10 ? SU : password.length >= 7 ? WA : ER) : "#E2E8F0" }} />)}
                        <span style={{ fontSize: 10.5, fontWeight: 600, color: password.length >= 10 ? SU : password.length >= 7 ? WA : ER, marginLeft: 6, whiteSpace: "nowrap" }}>
                          {password.length >= 10 ? "Strong" : password.length >= 7 ? "Good" : "Weak"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginBottom: 24, position: "relative" }}>
                    <label style={labelStyle}>Confirm Password <span style={{ color: ER }}>*</span></label>
                    <input type={showConfirm ? "text" : "password"} value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} placeholder="Re-enter password" style={{ ...inputStyle, paddingRight: 44, borderColor: confirmPwd && confirmPwd !== password ? ER : BD }} />
                    <div onClick={() => setShowConfirm(v => !v)} style={{ position: "absolute", right: 14, top: 38, cursor: "pointer", color: MU }}>
                      {showConfirm ? <EyeOff size={16} /> : <EyeIcon size={16} />}
                    </div>
                    {confirmPwd && confirmPwd !== password && <div style={{ fontSize: 11.5, color: ER, marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}><XCircle size={12} />Passwords do not match</div>}
                    {confirmPwd && confirmPwd === password && <div style={{ fontSize: 11.5, color: SU, marginTop: 5, display: "flex", alignItems: "center", gap: 5 }}><CheckCircle size={12} />Passwords match</div>}
                  </div>
                  <button onClick={handleRegister} disabled={loading} style={{ width: "100%", padding: "13px", background: P, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, color: "white", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.3)", opacity: loading ? 0.75 : 1 }}>
                    {loading ? "Creating account…" : "Create Account →"}
                  </button>
                  <p style={{ fontSize: 12, color: MU, textAlign: "center", marginTop: 14 }}>
                    By registering, you agree to ContractIQ's terms of service and privacy policy.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Frame registry ───────────────────────────────────────────────────────────

const FRAMES = [Frame01, Frame02, Frame03, Frame04, Frame05, Frame06, Frame07, Frame08, Frame09, Frame10];

// ─── Zoom Controls ────────────────────────────────────────────────────────────

function ZoomControls({ zoom, setZoom }: { zoom: number; setZoom: (z: number | ((z: number) => number)) => void }) {
  const pct = Math.round(zoom * 100);
  const btnStyle = (active = false) => ({
    width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
    background: active ? P : "#F1F5F9", border: `1px solid ${active ? P : BD}`,
    cursor: "pointer", transition: "all 0.15s", color: active ? "white" : TX,
  });
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, display: "flex", alignItems: "center", gap: 4, background: CA, borderRadius: 12, padding: "6px 10px", boxShadow: "0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)", border: `1px solid ${BD}` }}>
      <div onClick={() => setZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} style={btnStyle()}>
        <ZoomOut size={14} color={TX} />
      </div>
      <div style={{ minWidth: 48, textAlign: "center", fontSize: 12, fontWeight: 700, color: TX, fontFamily: "monospace" }}>{pct}%</div>
      <div onClick={() => setZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} style={btnStyle()}>
        <ZoomIn size={14} color={TX} />
      </div>
      <div style={{ width: 1, height: 20, background: BD, margin: "0 2px" }} />
      <div onClick={() => setZoom(1)} style={btnStyle(zoom === 1)} title="Fit to screen">
        <Maximize2 size={13} color={zoom === 1 ? "white" : TX} />
      </div>
    </div>
  );
}

// ─── Detail View ──────────────────────────────────────────────────────────────

function DetailView({ frameIdx, onBack, onNavigate }: { frameIdx: number; onBack: () => void; onNavigate: (i: number) => void }) {
  const Cmp = FRAMES[frameIdx];
  return (
    <div style={{ width: "100vw", height: "100vh", background: BG, display: "flex", flexDirection: "column", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      {/* Detail top bar */}
      <div style={{ height: 52, background: CA, borderBottom: `1px solid ${BD}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, flexShrink: 0, zIndex: 100 }}>
        <div onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#F1F5F9", borderRadius: 8, cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: TX }}>
          <ChevronLeft size={14} /><span>Back to Board</span>
        </div>
        <div style={{ width: 1, height: 20, background: BD }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: P }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: TX }}>{FRAME_TITLES[frameIdx]}</span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div onClick={() => frameIdx > 0 && onNavigate(frameIdx - 1)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: frameIdx > 0 ? "#F1F5F9" : "#F8FAFC", border: `1px solid ${BD}`, borderRadius: 7, cursor: frameIdx > 0 ? "pointer" : "not-allowed", fontSize: 12, fontWeight: 600, color: frameIdx > 0 ? TX : "#CBD5E1" }}>
            <ChevronLeft size={13} />Prev
          </div>
          <span style={{ fontSize: 12, color: MU, fontFamily: "monospace" }}>{frameIdx + 1} / {FRAMES.length}</span>
          <div onClick={() => frameIdx < FRAMES.length - 1 && onNavigate(frameIdx + 1)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", background: frameIdx < FRAMES.length - 1 ? "#F1F5F9" : "#F8FAFC", border: `1px solid ${BD}`, borderRadius: 7, cursor: frameIdx < FRAMES.length - 1 ? "pointer" : "not-allowed", fontSize: 12, fontWeight: 600, color: frameIdx < FRAMES.length - 1 ? TX : "#CBD5E1" }}>
            Next<ChevronRightIcon size={13} />
          </div>
        </div>
      </div>
      {/* Full-size frame — scrollable */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ width: FW, minHeight: FH }}>
          <Cmp onNavClick={(label: string) => { const idx = NAV_TO_IDX[label]; if (idx !== undefined) onNavigate(idx); }} />
        </div>
      </div>
    </div>
  );
}

// ─── Frame Preview Card ───────────────────────────────────────────────────────

function PreviewCard({ idx, scale, dw, dh, onClick }: { idx: number; scale: number; dw: number; dh: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const Cmp = FRAMES[idx];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {/* Label above */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ width: 18, height: 18, background: P + "18", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8.5, fontWeight: 800, color: P }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#334155", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: dw - 28 }}>{FRAME_TITLES[idx]}</span>
      </div>
      {/* Frame thumbnail */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: dw, height: dh, borderRadius: 10, overflow: "hidden", cursor: "pointer", position: "relative",
          boxShadow: hovered ? "0 8px 32px rgba(37,99,235,0.18), 0 2px 8px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
          border: `1px solid ${hovered ? P + "60" : BD}`,
          transition: "all 0.2s ease",
          transform: hovered ? "translateY(-2px)" : "none",
        }}
      >
        {/* Scaled inner frame — pointer-events none so clicks pass to outer */}
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: FW, height: FH, pointerEvents: "none" }}>
          <Cmp />
        </div>
        {/* Hover overlay */}
        {hovered && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(37,99,235,0.04)", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
            <div style={{ background: P, color: "white", padding: "6px 14px", borderRadius: 8, fontSize: 11.5, fontWeight: 700, boxShadow: "0 4px 12px rgba(37,99,235,0.35)", display: "flex", alignItems: "center", gap: 6 }}>
              <Maximize2 size={12} />Open
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App (Board) ─────────────────────────────────────────────────────────

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const [activeFrame, setActiveFrame] = useState<number | null>(null);

  // Login gate
  if (!authed) {
    return (
      <>
        <Toaster position="bottom-right" richColors />
        <LoginPage onLogin={() => setAuthed(true)} />
      </>
    );
  }

  // Detail view
  if (activeFrame !== null) {
    return (
      <>
        <Toaster position="bottom-right" richColors />
        <DetailView frameIdx={activeFrame} onBack={() => setActiveFrame(null)} onNavigate={setActiveFrame} />
      </>
    );
  }

  const scale = BASE_SCALE * zoom;
  const dw = Math.floor(FW * scale);
  const dh = Math.floor(FH * scale);
  const cols = 5;
  const gridWidth = cols * dw + (cols - 1) * 16;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>
      <Toaster position="bottom-right" richColors />
      {/* Board header */}
      <div style={{ padding: "28px 48px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${BD}`, background: CA }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: P, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" }}>
            <ShieldCheck size={18} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: TX, letterSpacing: "-0.4px" }}>ContractIQ</div>
            <div style={{ fontSize: 11.5, color: MU, marginTop: 1 }}>Dashboard Design Board · 10 screens</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {[["10 Frames", "#EFF6FF", P], ["1440×1024", "#F5F3FF", VI], ["Click to expand", "#F0FDF4", SU]].map(([l, bg, c]) => (
            <div key={l as string} style={{ padding: "4px 12px", background: bg as string, borderRadius: 7, fontSize: 11.5, fontWeight: 700, color: c as string }}>{l}</div>
          ))}
        </div>
      </div>
      {/* Gallery grid — centered */}
      <div style={{ padding: "28px 48px 80px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: gridWidth }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${dw}px)`, gap: "28px 16px" }}>
            {FRAMES.map((_, idx) => (
              <PreviewCard key={idx} idx={idx} scale={scale} dw={dw} dh={dh} onClick={() => setActiveFrame(idx)} />
            ))}
          </div>
        </div>
      </div>
      {/* Color palette footer */}
      <div style={{ position: "fixed", bottom: 24, left: 48, display: "flex", alignItems: "center", gap: 14 }}>
        {[["Primary", P], ["Success", SU], ["Warning", WA], ["Error", ER], ["Text", TX]].map(([name, color]) => (
          <div key={name as string} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: color as string }} />
            <span style={{ fontSize: 10.5, color: "#94A3B8", fontFamily: "monospace" }}>{color}</span>
          </div>
        ))}
      </div>
      {/* Zoom controls */}
      <ZoomControls zoom={zoom} setZoom={setZoom} />
    </div>
  );
}
