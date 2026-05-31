import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = {
  degree: "", institution: "", location: "", year: "", yearTag: "",
  description: "", icon: "fas fa-graduation-cap", primary: false, order: 0,
};

export default function ManageQualifications() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("qualifications");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const startEdit = (q) => { setEditingId(q.id); setForm({ ...EMPTY, ...q }); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => { setEditingId(null); setForm(EMPTY); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.degree.trim()) return flash("error", "Degree is required.");
    const data = { ...form, order: Number(form.order) || 0 };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Qualifications</h1>
        <p className="admin-subtitle">Education and academic background.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <form className="card" onSubmit={onSubmit}>
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
          <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "0.6rem" }}>
            <input id="primary" type="checkbox" style={{ width: "auto" }} checked={!!form.primary} onChange={(e) => set("primary", e.target.checked)} />
            <label htmlFor="primary" style={{ margin: 0 }}>Primary (wide card)</label>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-primary btn-sm" type="submit" disabled={saving}>
            {saving ? "Saving…" : editingId ? "Update" : "Add"}
          </button>
          {editingId && <button type="button" className="btn-ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="card">
        <div className="card-title"><i className="fas fa-list" /> Qualifications ({rows.length})</div>
        {loading ? (
          <Loader />
        ) : (
          <div className="admin-list">
            {rows.map((q) => (
              <div className="admin-row" key={q.id}>
                <div className="admin-row-main">
                  <div className="admin-row-title">{q.degree} {q.primary && "★"}</div>
                  <div className="admin-row-sub">{q.institution} · {q.year}</div>
                </div>
                <div className="admin-row-actions">
                  <button className="icon-btn" onClick={() => startEdit(q)}><i className="fas fa-pen" /></button>
                  <button className="icon-btn danger" onClick={() => destroy(q.id)}><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
            {!rows.length && <p className="dash-card-desc">No qualifications yet.</p>}
          </div>
        )}
      </div>
    </>
  );
}
