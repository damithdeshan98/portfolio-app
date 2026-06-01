import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = { name: "", category: "Core", level: 70, icon: "", order: 0, active: true };

export default function ManageSkills() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("skills");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const startEdit = (s) => { setEditingId(s.id); setForm({ ...EMPTY, ...s }); };
  const reset = () => { setEditingId(null); setForm(EMPTY); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return flash("error", "Skill name is required.");
    const data = { ...form, level: Number(form.level) || 0, order: Number(form.order) || 0 };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  const onDelete = async (id) => {
    const s = rows.find((r) => r.id === id);
    await destroy(id, s ? `Delete "${s.name}"? This cannot be undone.` : undefined);
    if (id === editingId) reset();
  };

  const isTool = form.category === "Tools";

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Skills</h1>
        <p className="admin-subtitle">"Core" skills show as bars; "Tools" show as icon chips.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="manage-split">
        <div className="card manage-list-pane">
          <div className="card-title manage-list-head">
            <span><i className="fas fa-list" /> Skills ({rows.length})</span>
            <button type="button" className="btn-primary btn-sm" onClick={reset}>
              <i className="fas fa-plus" /> New
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin-list">
              {rows.map((s) => (
                <div
                  className={`admin-row selectable${s.id === editingId ? " selected" : ""}`}
                  key={s.id}
                  style={{ opacity: s.active === false ? 0.55 : 1 }}
                >
                  <div className="admin-row-main" onClick={() => startEdit(s)} role="button" tabIndex={0}>
                    <div className="admin-row-title" style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        {s.icon && <i className={s.icon} style={{ marginRight: "0.5rem", color: "var(--teal)" }} />}
                        {s.name}
                      </span>
                      <span className={`status-pill ${s.active === false ? "inactive" : "active"}`} style={{ marginLeft: "auto" }}>
                        {s.active === false ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <div className="admin-row-sub">{s.category}{s.category !== "Tools" ? ` · ${s.level}%` : ""}</div>
                  </div>
                </div>
              ))}
              {!rows.length && <p className="dash-card-desc">No skills yet.</p>}
            </div>
          )}
        </div>

        <form className="card manage-form-pane" onSubmit={onSubmit}>
          <div className="card-title">
            <i className="fas fa-layer-group" /> {editingId ? "Edit skill" : "Add skill"}
          </div>
          <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}>
              <option value="Core">Core (progress bar)</option>
              <option value="Tools">Tools (icon chip)</option>
            </select>
          </div>
          {!isTool && (
            <div className="form-group full">
              <label>Level: {form.level}%</label>
              <input type="range" min="0" max="100" value={form.level} onChange={(e) => set("level", e.target.value)} />
            </div>
          )}
          {isTool && (
            <div className="form-group">
              <label>Icon class (Font Awesome)</label>
              <input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="fab fa-react" />
            </div>
          )}
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
