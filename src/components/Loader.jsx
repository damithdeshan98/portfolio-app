export default function Loader({ full = false }) {
  return (
    <div className={`loader-wrap${full ? " full" : ""}`}>
      <div className="loader-ring" />
    </div>
  );
}
