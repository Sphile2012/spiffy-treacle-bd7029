// API client — uses localStorage for data storage (no backend required)
// To connect a real backend, replace the localStorage calls with fetch() calls to your API.

const DB_KEY = 'bloom_bookings';

function getAll() {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || '[]'); } catch { return []; }
}
function saveAll(items) {
  localStorage.setItem(DB_KEY, JSON.stringify(items));
}
function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const BookingEntity = {
  filter: async (params = {}) => {
    let items = getAll();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) items = items.filter(i => i[k] === v);
    });
    return items;
  },
  create: async (data) => {
    const items = getAll();
    const item = { ...data, id: genId(), created_date: new Date().toISOString() };
    items.push(item);
    saveAll(items);
    return item;
  },
  update: async (id, data) => {
    const items = getAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...data, updated_date: new Date().toISOString() };
      saveAll(items);
      return items[idx];
    }
    throw new Error('Not found');
  },
  delete: async (id) => {
    const items = getAll().filter(i => i.id !== id);
    saveAll(items);
    return { success: true };
  },
};

const ADMIN_SESSION_KEY = 'bloom_admin_session';

export const base44 = {
  entities: {
    Booking: BookingEntity,
  },
  functions: {
    invoke: async (name, _payload) => {
      // Serverless functions not available — notifications handled via WhatsApp/email buttons
      console.info(`[functions] ${name} — handled client-side`);
    },
  },
  auth: {
    me: async () => {
      const s = localStorage.getItem(ADMIN_SESSION_KEY);
      if (!s) throw Object.assign(new Error('Not authenticated'), { status: 401 });
      return JSON.parse(s);
    },
    redirectToLogin: (returnTo) => {
      // Redirect to admin page where password login is handled
      window.location.href = '/admin';
    },
    logout: () => {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      window.location.href = '/';
    },
  },
};
