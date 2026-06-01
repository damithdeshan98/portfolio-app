import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = {
  role: "", company: "", location: "", startDate: "", endDate: "",
  period: "", bullets: "", order: 0, active: true,
};

export default function ManageExperience() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("experience");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (x) => {
    setEditingId(x.id);
    setForm({
      ...EMPTY,
      ...x,
      bullets: Array.isArray(x.bullets) ? x.bullets.join("\n") : x.bullets || "",
    });
  };

  const reset = () => { setEditingId(null); setForm(EMPTY); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.role.trim() || !form.company.trim()) return flash("error", "Role and company are required.");
    const data = {
      ...form,
      order: Number(form.order) || 0,
      bullets: form.bullets.split("\n").map((b) => b.trim()).filter(Boolean),
    };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  const onDelete = async (id) => {
    const x = rows.find((r) => r.id === id);
    await destroy(id, x ? `Delete "${x.role}"? This cannot be undone.` : undefined);
    if (id === editingId) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Experience</h1>
        <p className="admin-subtitle">Select an entry to edit it, or add a new one.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="manage-split">
        <div className="card manage-list-pane">
          <div className="card-title manage-list-head">
            <span><i className="fas fa-list" /> Entries ({rows.length})</span>
            <button type="button" className="btn-primary btn-sm" onClick={reset}>
              <i className="fas fa-plus" /> New
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin-list">
              {rows.map((x) => (
                <div
                  className={`admin-row selectable${x.id === editingId ? " selected" : ""}`}
                  key={x.id}
                  style={{ opacity: x.active === false ? 0.55 : 1 }}
                >
                  <div className="admin-row-main" onClick={() => startEdit(x)} role="button" tabIndex={0}>
                    <div className="admin-row-title" style={{ display: "flex", alignItems: "center" }}>
                      <span>{x.role}</span>
                      <span className={`status-pill ${x.active === false ? "inactive" : "active"}`} style={{ marginLeft: "auto" }}>
                        {x.active === false ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <div className="admin-row-sub">{x.company} · {x.period || `${x.startDate} — ${x.endDate}`}</div>
                  </div>
                </div>
              ))}
              {!rows.length && <p className="dash-card-desc">No experience entries yet.</p>}
            </div>
          )}
        </div>

        <form className="card manage-form-pane" onSubmit={onSubmit}>
          <div className="card-title">
            <i className="fas fa-briefcase" /> {editingId ? "Edit experience" : "Add experience"}
          </div>
          <div className="form-grid">
          <div className="form-group">
            <label>Role *</label>
            <input value={form.role} onChange={(e) => set("role", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Company *</label>
            <input value={form.company} onChange={(e) => set("company", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input value={form.location} onChange={(e) => set("location", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Period label</label>
            <input value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="May 2024 — Present" />
          </div>
          <div className="form-group">
            <label>Start date</label>
            <input value={form.startDate} onChange={(e) => set("startDate", e.target.value)} placeholder="2024-05" />
          </div>
          <div className="form-group">
            <label>End date</label>
            <input value={form.endDate} onChange={(e) => set("endDate", e.target.value)} placeholder="Present" />
          </div>
          <div className="form-group full">
            <label>Bullet points (one per line)</label>
            <textarea value={form.bullets} onChange={(e) => set("bullets", e.target.value)} rows={4} />
          </div>
          <div className="form-group">
            <label>Display order</label>
            <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </div>
          <div className="form-group toggle-row">
            <label htmlFor="active" style={{ margin: 0 }}>Active (visible on site)</label>
            <label className="switch">
              <input id="active" type="checkbox" checked={form.active !== false} onChange={(e) => set("active", e.target.checked)} />
              <span className="slider" />
            </label>
          </div>
        </div>
          <div className="form-actions">
            <button className="btn-primary btn-sm" type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Update" : "Add"}
            </button>
            {editingId && <button type="button" className="btn-ghost" onClick={reset}>Cancel</button>}
            {editingId && (
              <button type="button" className="btn-danger" style={{ marginLeft: "auto" }} onClick={() => onDelete(editingId)}>
                <i className="fas fa-trash" /> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
