import { useEffect, useState } from "react";
import { subscribeVisits, pruneOldVisits, remove } from "../../services/firestoreService";
import { useConfirm } from "../../context/ConfirmContext";
import Loader from "../../components/Loader";

// Firestore Timestamp | null -> "1 Jun 2026, 14:32:05"
function fmt(ts) {
  if (!ts?.toDate) return "—";
  return ts.toDate().toLocaleString(undefined, {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
}

// Seconds -> "1h 04m", "12m 30s", "45s"
function duration(sec) {
  if (sec == null) return "—";
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = s % 60;
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m) return `${m}m ${String(r).padStart(2, "0")}s`;
  return `${r}s`;
}

export default function Visitors() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const confirm = useConfirm();

  useEffect(() => {
    // Auto-clean: drop anything older than 3 months each time the log is opened.
    pruneOldVisits().catch(() => {});
    const unsub = subscribeVisits(
      (data) => { setRows(data); setLoading(false); },
      () => setLoading(false)
    );
    return () => unsub && unsub();
  }, []);

  const onDelete = async (v) => {
    const ok = await confirm({
      title: "Delete visit",
      message: `Delete the visit from ${v.ip || "unknown"}? This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    try { await remove("visits", v.id); } catch { /* ignore */ }
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Visitors</h1>
        <p className="admin-subtitle">Public-site sessions from the last 3 months — older ones are removed automatically.</p>
      </div>

      <div className="card">
        <div className="card-title manage-list-head">
          <span><i className="fas fa-users-viewfinder" /> Visits ({rows.length})</span>
        </div>

        {loading ? (
          <Loader />
        ) : !rows.length ? (
          <p className="dash-card-desc">No visits recorded yet.</p>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Login IP</th>
                  <th>Visit At</th>
                  <th>Close At</th>
                  <th>Duration</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((v) => (
                  <tr key={v.id}>
                    <td className="mono">
                      {v.ip || "unknown"}
                      {!v.closeAt && <span className="status-pill active" style={{ marginLeft: "0.5rem" }}>Live</span>}
                    </td>
                    <td>{fmt(v.visitAt)}</td>
                    <td>{fmt(v.closeAt)}</td>
                    <td className="mono">{duration(v.durationSec)}</td>
                    <td style={{ textAlign: "right" }}>
                      <button type="button" className="icon-btn danger" title="Delete" onClick={() => onDelete(v)}>
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
