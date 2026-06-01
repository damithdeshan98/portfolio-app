import { useState } from "react";
import useCollectionManager from "../../hooks/useCollectionManager";
import Loader from "../../components/Loader";

const EMPTY = {
  title: "", issuer: "", issueDate: "", icon: "fas fa-certificate",
  credentialUrl: "", imageUrl: "", order: 0, active: true,
};

export default function ManageCertificates() {
  const { rows, loading, saving, message, flash, save, destroy } =
    useCollectionManager("certificates");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const startEdit = (c) => { setEditingId(c.id); setForm({ ...EMPTY, ...c }); };
  const reset = () => { setEditingId(null); setForm(EMPTY); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return flash("error", "Title is required.");

    const data = { ...form, order: Number(form.order) || 0 };
    const ok = await save(editingId, data);
    if (ok) reset();
  };

  const onDelete = async (id) => {
    const c = rows.find((r) => r.id === id);
    await destroy(id, c ? `Delete "${c.title}"? This cannot be undone.` : undefined);
    if (id === editingId) reset();
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Manage Certificates</h1>
        <p className="admin-subtitle">Select a certificate to edit it, or add a new one.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="manage-split">
        <div className="card manage-list-pane">
          <div className="card-title manage-list-head">
            <span><i className="fas fa-list" /> Certificates ({rows.length})</span>
            <button type="button" className="btn-primary btn-sm" onClick={reset}>
              <i className="fas fa-plus" /> New
            </button>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="admin-list">
              {rows.map((c) => (
                <div
                  className={`admin-row selectable${c.id === editingId ? " selected" : ""}`}
                  key={c.id}
                  style={{ opacity: c.active === false ? 0.55 : 1 }}
                >
                  <div className="admin-row-main" onClick={() => startEdit(c)} role="button" tabIndex={0}>
                    <div className="admin-row-title" style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        {c.icon && <i className={c.icon} style={{ marginRight: "0.5rem", color: "var(--teal)" }} />}
                        {c.title}
                      </span>
                      <span className={`status-pill ${c.active === false ? "inactive" : "active"}`} style={{ marginLeft: "auto" }}>
                        {c.active === false ? "Inactive" : "Active"}
                      </span>
                    </div>
                    <div className="admin-row-sub">{c.issuer}</div>
                  </div>
                </div>
              ))}
              {!rows.length && <p className="dash-card-desc">No certificates yet.</p>}
            </div>
          )}
        </div>

        <form className="card manage-form-pane" onSubmit={onSubmit}>
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
            <label>Certificate image URL (optional)</label>
            <input value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} placeholder="https://… or /image.jpg" />
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
