import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = {
  degree: "", institution: "", location: "", year: "", yearTag: "",
  description: "", icon: "fas fa-graduation-cap", primary: false, order: 0, active: true,
};

export default function ManageQualifications() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("qualifications");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const startEdit = (q) => { setEditingId(q.id); setForm({ ...EMPTY, ...q }); };
  const reset = () => { setEditingId(null); setForm(EMPTY); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.degree.trim()) return flash("error", "Degree is required.");
    const data = { ...form, order: Number(form.order) || 0 };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  const onDelete = async (id) => {
    const q = rows.find((r) => r.id === id);
    await destroy(id, q ? `Delete "${q.degree}"? This cannot be undone.` : undefined);
    if (id === editingId) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Qualifications</h1>
        <p className="admin-subtitle">Select a qualification to edit it, or add a new one.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="manage-split">
        <div className="card manage-list-pane">
          <div className="card-title manage-list-head">
            <span><i className="fas fa-list" /> Qualifications ({rows.length})</span>
            <button type="button" className="btn-primary btn-sm" onClick={reset}>
              <i className="fas fa-plus" /> New
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin-list">
              {rows.map((q) => (
                <div
                  className={`admin-row selectable${q.id === editingId ? " selected" : ""}`}
                  key={q.id}
                  style={{ opacity: q.active === false ? 0.55 : 1 }}
                >
                  <div className="admin-row-main" onClick={() => startEdit(q)} role="button" tabIndex={0}>
                    <div className="admin-row-title" style={{ display: "flex", alignItems: "center" }}>
                      <span>{q.degree} {q.primary && "★"}</span>
                      <span className={`status-pill ${q.active === false ? "inactive" : "active"}`} style={{ marginLeft: "auto" }}>
                        {q.active === false ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <div className="admin-row-sub">{q.institution} · {q.year}</div>
                  </div>
                </div>
              ))}
              {!rows.length && <p className="dash-card-desc">No qualifications yet.</p>}
            </div>
          )}
        </div>

        <form className="card manage-form-pane" onSubmit={onSubmit}>
          <div className="card-title">
            <i className="fas fa-graduation-cap" /> {editingId ? "Edit qualification" : "Add qualification"}
          </div>
          <div className="form-grid">
          <div className="form-group full">
            <label>Degree / Title *</label>
            <input value={form.degree} onChange={(e) => set("degree", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Institution</label>
            <input value={form.institution} onChange={(e) => set("institution", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input value={form.location} onChange={(e) => set("location", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Year (full)</label>
            <input value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="Jul 2021 – Aug 2023" />
          </div>
          <div className="form-group">
            <label>Year tag (corner)</label>
            <input value={form.yearTag} onChange={(e) => set("yearTag", e.target.value)} placeholder="2021–2023" />
          </div>
          <div className="form-group full">
            <label>Description (optional)</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Icon class</label>
            <input value={form.icon} onChange={(e) => set("icon", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Display order</label>
            <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </div>
          <div className="form-group toggle-row">
            <label htmlFor="primary" style={{ margin: 0 }}>Primary (wide card)</label>
            <label className="switch">
              <input id="primary" type="checkbox" checked={!!form.primary} onChange={(e) => set("primary", e.target.checked)} />
              <span className="slider" />
            </label>
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
