import { useCallback, useEffect, useState } from "react";
import { getAll, getAllFromCache, add, update, remove } from "../services/firestoreService";
import { useConfirm } from "../context/ConfirmContext";

/**
 * Generic list+CRUD state for an admin "Manage X" page.
 * Returns the rows plus helpers that also surface success/error messages.
 */
export default function useCollectionManager(collectionName) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text }
  const confirm = useConfirm();

  const flash = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const load = useCallback(async () => {
    // Show locally cached rows immediately so the list paints without waiting
    // on the network, then refresh from the server in the background.
    const cached = await getAllFromCache(collectionName);
    if (cached) {
      setRows(cached);
      setLoading(false);
    } else {
      setLoading(true);
    }
    try {
      setRows(await getAll(collectionName));
    } catch (err) {
      flash("error", err?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => { load(); }, [load]);

  const save = async (id, data) => {
    setSaving(true);
    try {
      if (id) {
        await update(collectionName, id, data);
        flash("success", "Updated successfully.");
      } else {
        await add(collectionName, data);
        flash("success", "Added successfully.");
      }
      await load();
      return true;
    } catch (err) {
      flash("error", err?.message || "Save failed.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const destroy = async (id, confirmText) => {
    const ok = await confirm({
      title: "Delete item",
      message: confirmText || "Delete this item? This cannot be undone.",
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    try {
      await remove(collectionName, id);
      flash("success", "Deleted.");
      await load();
    } catch (err) {
      flash("error", err?.message || "Delete failed.");
    }
  };

  return { rows, loading, saving, message, flash, load, save, destroy };
}
