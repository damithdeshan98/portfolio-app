import { createContext, useCallback, useContext, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

const ConfirmContext = createContext(null);

/**
 * Returns an async confirm(message | options) => Promise<boolean>.
 * Falls back to window.confirm if no provider is mounted.
 */
export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  return (
    ctx?.confirm ||
    (async (opts) => window.confirm(typeof opts === "string" ? opts : opts?.message))
  );
}

export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null); // { ...options, resolve }

  const confirm = useCallback((opts) => {
    const options = typeof opts === "string" ? { message: opts } : opts || {};
    return new Promise((resolve) => setDialog({ ...options, resolve }));
  }, []);

  const settle = (result) => {
    setDialog((d) => {
      d?.resolve(result);
      return null;
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {dialog && (
        <ConfirmDialog
          {...dialog}
          onConfirm={() => settle(true)}
          onCancel={() => settle(false)}
        />
      )}
    </ConfirmContext.Provider>
  );
}
