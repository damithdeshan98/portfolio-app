import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import { uploadFile } from "../../services/firestoreService";
import Loader from "../../components/Loader";

const EMPTY = {
  title: "", period: "", icon: "fas fa-folder", description: "",
  techStack: "", imageUrl: "", liveUrl: "", githubUrl: "", order: 0, featured: false,
};

export default function ManageProjects() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("projects");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      ...EMPTY,
      ...p,
      techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : p.techStack || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => { setEditingId(null); setForm(EMPTY); setFile(null); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return flash("error", "Title is required.");

    let imageUrl = form.imageUrl;
    if (file) {
      setUploading(true);
      try {
        imageUrl = await uploadFile(`projects/${Date.now()}_${file.name}`, file);
      } catch (err) {
        setUploading(false);
        return flash("error", "Image upload failed: " + (err?.message || ""));
      }
      setUploading(false);
    }

    const data = {
      ...form,
      imageUrl,
      order: Number(form.order) || 0,
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Projects</h1>
        <p className="admin-subtitle">Add and edit the projects shown on your portfolio.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <form className="card" onSubmit={onSubmit}>
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
          <div className="form-group">
            <label>Project image (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          </div>
          <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "0.6rem" }}>
            <input id="featured" type="checkbox" style={{ width: "auto" }} checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} />
            <label htmlFor="featured" style={{ margin: 0 }}>Featured (wide card)</label>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-primary btn-sm" type="submit" disabled={saving || uploading}>
            {uploading ? "Uploading…" : saving ? "Saving…" : editingId ? "Update project" : "Add project"}
          </button>
          {editingId && <button type="button" className="btn-ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="card">
        <div className="card-title"><i className="fas fa-list" /> Existing projects ({rows.length})</div>
        {loading ? (
          <Loader />
        ) : (
          <div className="admin-list">
            {rows.map((p) => (
              <div className="admin-row" key={p.id}>
                <div className="admin-row-main">
                  <div className="admin-row-title">{p.title} {p.featured && "★"}</div>
                  <div className="admin-row-sub">{p.period} · {(p.techStack || []).join(", ")}</div>
                </div>
                <div className="admin-row-actions">
                  <button className="icon-btn" onClick={() => startEdit(p)} title="Edit"><i className="fas fa-pen" /></button>
                  <button className="icon-btn danger" onClick={() => destroy(p.id)} title="Delete"><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
            {!rows.length && <p className="dash-card-desc">No projects yet. Add one above.</p>}
          </div>
        )}
      </div>
    </>
  );
}
