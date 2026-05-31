export default function CertificatesSection({ certificates }) {
  return (
    <section id="certificates">
      <div className="section-header reveal">
        <div className="section-tag">Credentials</div>
        <h2 className="section-title">Certifi<span className="highlight">cations</span></h2>
      </div>
      <div className="cert-grid">
        {certificates.map((c, i) => (
          <div className={`cert-card reveal${i % 3 ? ` delay-${i % 3}` : ""}`} key={c.id || i}>
            <div className="cert-icon">
              {c.imageUrl ? <img src={c.imageUrl} alt={c.title} /> : <i className={c.icon || "fas fa-certificate"} />}
            </div>
            <div className="cert-body">
              <div className="cert-name">{c.title}</div>
              <div className="cert-issuer">{c.issuer}</div>
            </div>
            {c.credentialUrl && (
              <a href={c.credentialUrl} target="_blank" rel="noopener" className="cert-verify">
                <i className="fas fa-external-link-alt" /> Verify
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
