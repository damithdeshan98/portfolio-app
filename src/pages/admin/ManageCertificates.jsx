import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import { uploadFile } from "../../services/firestoreService";
import Loader from "../../components/Loader";

const EMPTY = {
  title: "", issuer: "", issueDate: "", icon: "fas fa-certificate",
  credentialUrl: "", imageUrl: "", order: 0,
};

export default function ManageCertificates() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("certificates");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const startEdit = (c) => { setEditingId(c.id); setForm({ ...EMPTY, ...c }); setFile(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const reset = () => { setEditingId(null); setForm(EMPTY); setFile(null); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return flash("error", "Title is required.");

    let imageUrl = form.imageUrl;
    if (file) {
      setUploading(true);
      try {
        imageUrl = await uploadFile(`certificates/${Date.now()}_${file.name}`, file);
      } catch (err) {
        setUploading(false);
        return flash("error", "Image upload failed: " + (err?.message || ""));
      }
      setUploading(false);
    }

    const data = { ...form, imageUrl, order: Number(form.order) || 0 };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Certificates</h1>
        <p className="admin-subtitle">Credentials with verification links.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <form className="card" onSubmit={onSubmit}>
        <div className="card-title">
          <i className="fas fa-certificate" /> {editingId ? "Edit certificate" : "Add certificate"}
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Title *</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Issuer</label>
            <input value={form.issuer} onChange={(e) => set("issuer", e.target.value)} placeholder="Coursera, Cisco…" />
          </div>
          <div className="form-group">
            <label>Issue date</label>
            <input value={form.issueDate} onChange={(e) => set("issueDate", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Credential URL</label>
            <input value={form.credentialUrl} onChange={(e) => set("credentialUrl", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Icon class</label>
            <input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="fab fa-python" />
          </div>
          <div className="form-group">
            <label>Display order</label>
            <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} />
          </div>
          <div className="form-group full">
            <label>Certificate image (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-primary btn-sm" type="submit" disabled={saving || uploading}>
            {uploading ? "Uploading…" : saving ? "Saving…" : editingId ? "Update" : "Add"}
          </button>
          {editingId && <button type="button" className="btn-ghost" onClick={reset}>Cancel</button>}
        </div>
      </form>

      <div className="card">
        <div className="card-title"><i className="fas fa-list" /> Certificates ({rows.length})</div>
        {loading ? (
          <Loader />
        ) : (
          <div className="admin-list">
            {rows.map((c) => (
              <div className="admin-row" key={c.id}>
                <div className="admin-row-main">
                  <div className="admin-row-title">
                    {c.icon && <i className={c.icon} style={{ marginRight: "0.5rem", color: "var(--teal)" }} />}
                    {c.title}
                  </div>
                  <div className="admin-row-sub">{c.issuer}</div>
                </div>
                <div className="admin-row-actions">
                  <button className="icon-btn" onClick={() => startEdit(c)}><i className="fas fa-pen" /></button>
                  <button className="icon-btn danger" onClick={() => destroy(c.id)}><i className="fas fa-trash" /></button>
                </div>
              </div>
            ))}
            {!rows.length && <p className="dash-card-desc">No certificates yet.</p>}
          </div>
        )}
      </div>
    </>
  );
}
