import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = {
  title: "", period: "", icon: "fas fa-folder", description: "",
  techStack: "", imageUrl: "", liveUrl: "", githubUrl: "", order: 0, featured: false, active: true,
};

export default function ManageProjects() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("projects");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      ...EMPTY,
      ...p,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack || "",
    });
  };

  const reset = () => { setEditingId(null); setForm(EMPTY); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return flash("error", "Title is required.");

    const data = {
      ...form,
      order: Number(form.order) || 0,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  const onDelete = async (id) => {
    await destroy(id);
    if (id === editingId) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Projects</h1>
        <p className="admin-subtitle">Select a project from the list to edit it, or add a new one.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="manage-split">
        {/* ---- Left: project list ---- */}
        <div className="card manage-list-pane">
          <div className="card-title manage-list-head">
            <span><i className="fas fa-list" /> Projects ({rows.length})</span>
            <button type="button" className="btn-primary btn-sm" onClick={reset}>
              <i className="fas fa-plus" /> New
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin-list">
              {rows.map((p) => (
                <div
                  className={`admin-row selectable${p.id === editingId ? " selected" : ""}`}
                  key={p.id}
                  style={{ opacity: p.active === false ? 0.55 : 1 }}
                >
                  <div className="admin-row-main" onClick={() => startEdit(p)} role="button" tabIndex={0}>
                    <div className="admin-row-title">
                      {p.title} {p.featured && "★"}
                      <span className={`status-pill ${p.active === false ? "inactive" : "active"}`}>
                        {p.active === false ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <div className="admin-row-sub">{p.period} · {(p.techStack || []).join(", ")}</div>
                  </div>
                  <div className="admin-row-actions">
                    <button
                      className="icon-btn"
                      onClick={() => save(p.id, { active: p.active === false })}
                      title={p.active === false ? "Activate" : "Deactivate"}
                    >
                      <i className={`fas ${p.active === false ? "fa-eye-slash" : "fa-eye"}`} />
                    </button>
                    <button className="icon-btn danger" onClick={() => onDelete(p.id)} title="Delete"><i className="fas fa-trash" /></button>
                  </div>
                </div>
              ))}
              {!rows.length && <p className="dash-card-desc">No projects yet. Add one on the right.</p>}
            </div>
          )}
        </div>

        {/* ---- Right: editor for the selected project ---- */}
        <form className="card manage-form-pane" onSubmit={onSubmit}>
          <div className="card-title">
            <i className="fas fa-folder-plus" /> {editingId ? "Edit project" : "Add new project"}
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Title *</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Period</label>
              <input value={form.period} onChange={(e) => set("period", e.target.value)} placeholder="Jan 2025 — Feb 2025" />
            </div>
            <div className="form-group full">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
            <div className="form-group full">
              <label>Tech stack (comma separated)</label>
              <input value={form.techStack} onChange={(e) => set("techStack", e.target.value)} placeholder="Java, HL7, FHIR" />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input value={form.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Live URL</label>
              <input value={form.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Icon class (Font Awesome)</label>
              <input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="fas fa-flask" />
            </div>
            <div className="form-group">
              <label>Display order</label>
              <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
            </div>
            <div className="form-group full">
              <label>Project image URL (optional)</label>
              <input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="https://… or /image.jpg" />
            </div>
            <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "0.6rem" }}>
              <input id="featured" type="checkbox" style={{ width: "auto" }} checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} />
              <label htmlFor="featured" style={{ margin: 0 }}>Featured (wide card)</label>
            </div>
            <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "0.6rem" }}>
              <input id="active" type="checkbox" style={{ width: "auto" }} checked={form.active !== false} onChange={(e) => set("active", e.target.checked)} />
              <label htmlFor="active" style={{ margin: 0 }}>Active (visible on site)</label>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary btn-sm" type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Update project" : "Add project"}
            </button>
            {editingId && <button type="button" className="btn-ghost" onClick={reset}>Cancel</button>}
          </div>
        </form>
      </div>
    </>
  );
}
