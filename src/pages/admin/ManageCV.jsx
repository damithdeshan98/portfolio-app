import { useEffect, useState } from "react";
import { getOne, setDocument, uploadFile } from "../../services/firestoreService";
import { seedProfile } from "../../data/seed";
import Loader from "../../components/Loader";

export default function ManageCV() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const flash = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage(null), 4000); };

  useEffect(() => {
    (async () => {
      try {
        const p = await getOne("profile", "main");
        setProfile(p || { ...seedProfile });
      } catch {
        setProfile({ ...seedProfile });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
  const setSocial = (k, v) =>
    setProfile((p) => ({ ...p, socialLinks: { ...(p.socialLinks || {}), [k]: v } }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const data = { ...profile };

      if (cvFile) {
        if (cvFile.type !== "application/pdf") throw new Error("CV must be a PDF file.");
        data.cvUrl = await uploadFile("cv/cv.pdf", cvFile);
      }
      if (imgFile) {
        data.profileImageUrl = await uploadFile(`profile/${Date.now()}_${imgFile.name}`, imgFile);
      }
      // Normalise "about" + "roles" if edited as multiline text.
      if (typeof data.about === "string") data.about = data.about.split("\n\n").map((s) => s.trim()).filter(Boolean);
      if (typeof data.roles === "string") data.roles = data.roles.split("\n").map((s) => s.trim()).filter(Boolean);

      await setDocument("profile", "main", data);
      setProfile(data);
      setCvFile(null);
      setImgFile(null);
      flash("success", "Profile saved.");
    } catch (err) {
      flash("error", err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  const aboutText = Array.isArray(profile.about) ? profile.about.join("\n\n") : profile.about || "";
  const rolesText = Array.isArray(profile.roles) ? profile.roles.join("\n") : profile.roles || "";
  const social = profile.socialLinks || {};

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">CV &amp; Profile</h1>
        <p className="admin-subtitle">Upload your CV and edit the profile shown across the site.</p>
      </div>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <form onSubmit={onSubmit}>
        <div className="card">
          <div className="card-title"><i className="fas fa-file-pdf" /> Curriculum Vitae</div>
          {profile.cvUrl && (
            <p className="dash-card-desc" style={{ marginBottom: "1rem" }}>
              Current CV:{" "}
              <a href={profile.cvUrl} target="_blank" rel="noopener" style={{ color: "var(--teal)" }}>
                {profile.cvUrl}
              </a>
            </p>
          )}
          <div className="form-group">
            <label>Upload new CV (PDF)</label>
            <input type="file" accept="application/pdf" onChange={(e) => setCvFile(e.target.files[0] || null)} />
          </div>
        </div>

        <div className="card">
          <div className="card-title"><i className="fas fa-id-badge" /> Profile details</div>
          <div className="form-grid">
            <div className="form-group">
              <label>Full name</label>
              <input value={profile.fullName || ""} onChange={(e) => set("fullName", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input value={profile.title || ""} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={profile.email || ""} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={profile.phone || ""} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input value={profile.location || ""} onChange={(e) => set("location", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Languages</label>
              <input value={profile.languages || ""} onChange={(e) => set("languages", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Hero tagline</label>
              <input value={profile.tagline || ""} onChange={(e) => set("tagline", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Profile image</label>
              <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files[0] || null)} />
            </div>
            <div className="form-group full">
              <label>Hero description</label>
              <textarea value={profile.heroDesc || ""} onChange={(e) => set("heroDesc", e.target.value)} />
            </div>
            <div className="form-group full">
              <label>Typed roles (one per line)</label>
              <textarea value={rolesText} onChange={(e) => set("roles", e.target.value)} rows={4} />
            </div>
            <div className="form-group full">
              <label>About (separate paragraphs with a blank line)</label>
              <textarea value={aboutText} onChange={(e) => set("about", e.target.value)} rows={6} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title"><i className="fas fa-share-nodes" /> Social links</div>
          <div className="form-grid">
            <div className="form-group">
              <label>GitHub</label>
              <input value={social.github || ""} onChange={(e) => setSocial("github", e.target.value)} />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input value={social.linkedin || ""} onChange={(e) => setSocial("linkedin", e.target.value)} />
            </div>
            <div className="form-group">
              <label>Twitter / X</label>
              <input value={social.twitter || ""} onChange={(e) => setSocial("twitter", e.target.value)} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary btn-sm" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save profile & CV"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
