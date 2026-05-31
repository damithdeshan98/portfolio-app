export default function Footer({ name = "H.K. Damith Deshan", location = "Matara, Sri Lanka" }) {
  return (
    <footer className="site-footer">
      <span>{name}</span>
      <div>
        Designed &amp; Built with <span>♥</span> · {location}
      </div>
      <div>© {new Date().getFullYear()} All rights reserved</div>
    </footer>
  );
}
