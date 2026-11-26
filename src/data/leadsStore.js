// Leads for the /leads page, kept in this browser's localStorage for now.
// Each device and browser has its own copy; use the CSV download to back up.

// A fixed login that only hides the page from casual visitors. It is visible
// in the site's JavaScript, so it is not real security; the leads themselves
// never leave the browser they were added in. Change these values here.
export const LEADS_LOGIN = {
    email: "wingoraventures@gmail.com",
    password: "Wg-KqMAQlgmlD",
};

const LEADS_KEY = "wingora_leads_v1";
const SIGNED_IN_KEY = "wingora_leads_signed_in";

function read(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function write(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

export const loadLeads = () => read(LEADS_KEY, []);
export const saveLeads = (leads) => write(LEADS_KEY, leads);

export const isSignedIn = () => read(SIGNED_IN_KEY, false) === true;
export const setSignedIn = (value) => (value ? write(SIGNED_IN_KEY, true) : localStorage.removeItem(SIGNED_IN_KEY));

export function newLead({ name, whatsapp, status, notes }) {
    const now = new Date().toISOString();
    return { id: crypto.randomUUID(), name, whatsapp, status, notes, created_at: now, updated_at: now };
}

export function leadsToCsv(leads) {
    const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows = [["Name", "WhatsApp", "Status", "Notes", "Added", "Updated"]];
    for (const l of leads) rows.push([l.name, l.whatsapp, l.status, l.notes, l.created_at, l.updated_at]);
    return rows.map((r) => r.map(cell).join(",")).join("\n");
}
