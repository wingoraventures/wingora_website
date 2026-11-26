import { useEffect, useMemo, useState } from "react";
import { Download, LogOut, MessageCircle, Phone, Plus, Search, Trash2, X } from "lucide-react";
import { LEADS_LOGIN, isSignedIn, leadsToCsv, loadLeads, newLead, saveLeads, setSignedIn } from "../data/leadsStore";
import { Logo } from "../components/navbar";

const STATUSES = [
    { value: "Not contacted", style: "bg-slate-100 text-slate-700 border-slate-200" },
    { value: "Contacted", style: "bg-sky-50 text-sky-800 border-sky-200" },
    { value: "Busy / call later", style: "bg-amber-50 text-amber-800 border-amber-200" },
    { value: "Demo confirmed", style: "bg-violet-50 text-violet-800 border-violet-200" },
    { value: "Confirmed", style: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    { value: "Not interested", style: "bg-rose-50 text-rose-800 border-rose-200" },
];
const statusStyle = (value) => STATUSES.find((s) => s.value === value)?.style ?? STATUSES[0].style;

const field =
    "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-soft/60 outline-none focus:border-wing focus:ring-3 focus:ring-wing/15";

// wa.me needs digits with a country code; assume India for 10-digit numbers.
function waLink(number) {
    let digits = number.replace(/\D/g, "");
    if (digits.length === 10) digits = `91${digits}`;
    return `https://wa.me/${digits}`;
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function SignIn({ onSignIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (email.trim().toLowerCase() === LEADS_LOGIN.email && password === LEADS_LOGIN.password) {
            setSignedIn(true);
            onSignIn();
        } else {
            setError("Email or password is incorrect.");
        }
    };

    return (
        <form onSubmit={submit} className="mx-auto mt-16 w-full max-w-sm rounded-2xl border border-line bg-white p-6">
            <h1 className="text-2xl font-semibold tracking-tight text-ink">Sign in to Leads</h1>
            <p className="mt-1 text-ink-soft">For the Wingora team only.</p>
            <label className="mt-6 block font-medium text-ink">
                Email
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-1.5`} required />
            </label>
            <label className="mt-4 block font-medium text-ink">
                Password
                <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} mt-1.5`} required />
            </label>
            {error && <p className="mt-3 text-sm text-ascent">{error}</p>}
            <button className="mt-6 h-12 w-full rounded-lg bg-wing font-medium text-white hover:bg-wing-deep">Sign in</button>
        </form>
    );
}

function AddLead({ onAdded, onClose }) {
    const [form, setForm] = useState({ name: "", whatsapp: "", status: STATUSES[0].value, notes: "" });
    const [error, setError] = useState("");
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.whatsapp.trim()) {
            setError("Add a name and a WhatsApp number.");
            return;
        }
        onAdded(newLead({ ...form, name: form.name.trim(), whatsapp: form.whatsapp.trim() }));
    };

    return (
        <form onSubmit={submit} className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-ink">New lead</h2>
                <button type="button" onClick={onClose} aria-label="Close" className="-mr-1 p-1 text-ink-soft hover:text-ink">
                    <X className="size-5" />
                </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input placeholder="Name" value={form.name} onChange={set("name")} className={field} autoFocus />
                <input placeholder="WhatsApp number" type="tel" inputMode="tel" value={form.whatsapp} onChange={set("whatsapp")} className={field} />
                <select value={form.status} onChange={set("status")} className={`${field} sm:col-span-2`}>
                    {STATUSES.map((s) => (
                        <option key={s.value}>{s.value}</option>
                    ))}
                </select>
                <textarea placeholder="Notes (optional)" rows={3} value={form.notes} onChange={set("notes")} className={`${field} resize-none sm:col-span-2`} />
            </div>
            {error && <p className="mt-3 text-sm text-ascent">{error}</p>}
            <button className="mt-4 h-12 w-full rounded-lg bg-wing font-medium text-white hover:bg-wing-deep sm:w-auto sm:px-6">
                Save lead
            </button>
        </form>
    );
}

function LeadCard({ lead, onChange, onDelete }) {
    const [notes, setNotes] = useState(lead.notes);
    const [saving, setSaving] = useState("");

    useEffect(() => setNotes(lead.notes), [lead.notes]);

    const update = (patch) => {
        const ok = onChange({ ...lead, ...patch, updated_at: new Date().toISOString() });
        setSaving(ok ? "Saved" : "Not saved: this browser's storage is full or blocked.");
        setTimeout(() => setSaving(""), ok ? 1500 : 4000);
    };

    const remove = () => {
        if (window.confirm(`Delete ${lead.name}? This can't be undone.`)) onDelete(lead.id);
    };

    return (
        <li className="rounded-2xl border border-line bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-ink">{lead.name}</p>
                    <p className="mt-0.5 text-ink-soft">{lead.whatsapp}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                    <a href={waLink(lead.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${lead.name}`}
                        className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                        <MessageCircle className="size-5" />
                    </a>
                    <a href={`tel:${lead.whatsapp.replace(/[^\d+]/g, "")}`} aria-label={`Call ${lead.name}`}
                        className="flex size-10 items-center justify-center rounded-full bg-wing-tint text-wing hover:bg-wing/15">
                        <Phone className="size-[18px]" />
                    </a>
                </div>
            </div>

            <select
                value={lead.status}
                onChange={(e) => update({ status: e.target.value })}
                aria-label={`Status for ${lead.name}`}
                className={`mt-4 h-11 w-full rounded-lg border px-3 text-base font-medium outline-none focus:ring-3 focus:ring-wing/15 ${statusStyle(lead.status)}`}
            >
                {STATUSES.map((s) => (
                    <option key={s.value}>{s.value}</option>
                ))}
            </select>

            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => notes !== lead.notes && update({ notes })}
                placeholder="Add a note"
                rows={2}
                aria-label={`Notes for ${lead.name}`}
                className={`${field} mt-3 resize-none text-[0.95rem]`}
            />

            <div className="mt-3 flex items-center justify-between text-sm text-ink-soft">
                <span>
                    Added {formatDate(lead.created_at)}
                    {saving && <span className="ml-2 text-wing">{saving}</span>}
                </span>
                <button onClick={remove} className="flex items-center gap-1 p-1 hover:text-ascent" aria-label={`Delete ${lead.name}`}>
                    <Trash2 className="size-4" /> Delete
                </button>
            </div>
        </li>
    );
}

function Leads() {
    const [leads, setLeads] = useState(loadLeads);
    const [adding, setAdding] = useState(false);
    const [filter, setFilter] = useState("All");
    const [query, setQuery] = useState("");

    // Every change is written straight to localStorage; returns false if it couldn't be saved.
    const commit = (next) => {
        setLeads(next);
        return saveLeads(next);
    };

    useEffect(() => {
        // Stay in sync if the page is open in another tab of the same browser.
        const onStorage = () => setLeads(loadLeads());
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const downloadCsv = () => {
        const blob = new Blob([leadsToCsv(leads)], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `wingora-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const counts = useMemo(() => {
        const c = { All: leads.length };
        for (const l of leads) c[l.status] = (c[l.status] ?? 0) + 1;
        return c;
    }, [leads]);

    const visible = leads.filter((l) => {
        if (filter !== "All" && l.status !== filter) return false;
        const q = query.trim().toLowerCase();
        return !q || l.name.toLowerCase().includes(q) || l.whatsapp.includes(q) || l.notes.toLowerCase().includes(q);
    });

    const replace = (lead) => commit(leads.map((l) => (l.id === lead.id ? lead : l)));

    return (
        <>
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-ink">Leads</h1>
                    <p className="mt-1 text-ink-soft">{leads.length} total</p>
                </div>
                {!adding && (
                    <button onClick={() => setAdding(true)} className="flex h-11 items-center gap-1.5 rounded-lg bg-wing px-4 font-medium text-white hover:bg-wing-deep">
                        <Plus className="size-5" /> Add lead
                    </button>
                )}
            </div>

            {adding && (
                <div className="mt-5">
                    <AddLead
                        onClose={() => setAdding(false)}
                        onAdded={(lead) => {
                            commit([lead, ...leads]);
                            setAdding(false);
                        }}
                    />
                </div>
            )}

            <div className="relative mt-6">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, number, or note" className={`${field} pl-10`} />
            </div>

            <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by status">
                {["All", ...STATUSES.map((s) => s.value)].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        aria-pressed={filter === s}
                        className={`h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-sm ${
                            filter === s ? "border-ink bg-ink text-paper" : "border-line bg-white text-ink-soft"
                        }`}
                    >
                        {s} <span className="opacity-60">{counts[s] ?? 0}</span>
                    </button>
                ))}
            </div>

            {visible.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-line p-8 text-center text-ink-soft">
                    {leads.length === 0 ? "No leads yet. Add your first one." : "No leads match this filter."}
                </div>
            ) : (
                <ul className="mt-5 grid gap-3 lg:grid-cols-2">
                    {visible.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} onChange={replace} onDelete={(id) => commit(leads.filter((l) => l.id !== id))} />
                    ))}
                </ul>
            )}

            <div className="mt-10 flex flex-col items-center gap-3 text-center text-sm text-ink-soft">
                <button onClick={downloadCsv} disabled={!leads.length} className="flex h-10 items-center gap-1.5 rounded-lg border border-line bg-white px-4 font-medium text-ink hover:border-ink/30 disabled:opacity-50">
                    <Download className="size-4" /> Download CSV backup
                </button>
                <p className="max-w-sm">Leads are saved in this browser only. Download a backup now and then.</p>
            </div>
        </>
    );
}

export default function LeadsPage() {
    const [signedIn, setSignedInState] = useState(isSignedIn);

    useEffect(() => {
        document.title = "Leads | Wingora Ventures";
        // Keep this private page out of search results.
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex, nofollow";
        document.head.appendChild(robots);
        return () => robots.remove();
    }, []);

    return (
        <div className="min-h-svh bg-paper">
            <header className="border-b border-line bg-white">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
                    <Logo />
                    {signedIn && (
                        <button
                            onClick={() => {
                                setSignedIn(false);
                                setSignedInState(false);
                            }} className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
                            <LogOut className="size-4" /> Sign out
                        </button>
                    )}
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                {signedIn ? <Leads /> : <SignIn onSignIn={() => setSignedInState(true)} />}
            </main>
        </div>
    );
}
