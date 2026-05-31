import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = {
  role: "", company: "", location: "", startDate: "", endDate: "",
  period: "", bullets: "", order: 0,
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Experience</h1>
        <p className="admin-subtitle">Your professional work history timeline.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <form className="card" onSubmit={onSubmit}>
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
        </div>
        <div className="form-actions">
          <button className="btn-primary btn-sm" type="submit" disabled={saving}>
            {saving ? "Saving…" : editingId ? "Update" : "Add"}
          </button>
          {editingId && <button type="button" className="btn-ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="card">
        <div className="card-title"><i className="fas fa-list" /> Entries ({rows.length})</div>
        {loading ? (
          <Loader />
        ) : (
          <div className="admin-list">
            {rows.map((x) => (
              <div className="admin-row" key={x.id}>
                <div className="admin-row-main">
                  <div className="admin-row-title">{x.role}</div>
                  <div className="admin-row-sub">{x.company} · {x.period || `${x.startDate} — ${x.endDate}`}</div>
                </div>
                <div className="admin-row-actions">
                  <button className="icon-btn" onClick={() => startEdit(x)}><i className="fas fa-pen" /></button>
                  <button className="icon-btn danger" onClick={() => destroy(x.id)}><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
            {!rows.length && <p className="dash-card-desc">No experience entries yet.</p>}
          </div>
        )}
      </div>
    </>
  );
}
