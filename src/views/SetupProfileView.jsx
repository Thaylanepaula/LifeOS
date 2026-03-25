function IconAnalista() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.8 18.8h18.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 12.5l2.2-2.8 2 1.5 3.6-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconFreelancer() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5.2 18.8l6.3-1.3 7.4-7.4a1.6 1.6 0 0 0 0-2.2l-2.7-2.7a1.6 1.6 0 0 0-2.2 0l-7.4 7.4-1.4 6.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12.8 6.5l4.7 4.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconGestora() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.2" y="5" width="15.6" height="14.8" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.8v2.5M16 3.8v2.5M4.2 9.6h15.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.3 13h3.3M8.3 16h6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const PROFILE_OPTIONS = [
  {
    id: "Analista",
    title: "Analista",
    description: "Rotina fixa com foco em tarefas diarias, contas e foco profissional.",
    modules: ["home", "today", "tasks", "calendar"],
    Icon: IconAnalista,
  },
  {
    id: "Freelancer",
    title: "Freelancer",
    description: "Renda variavel, projetos simultaneos e metas de faturamento.",
    modules: ["home", "tasks", "calendar"],
    Icon: IconFreelancer,
  },
  {
    id: "Gestora",
    title: "Gestora",
    description: "Casa + trabalho + familia com agenda e rotina priorizadas.",
    modules: ["home", "today", "calendar"],
    Icon: IconGestora,
  },
];

export function SetupProfileView({ busy = false, onSelectProfile }) {
  return (
    <section className="setup-screen" aria-label="Setup em 1 Minuto">
      <header className="setup-head">
        <p className="setup-head__eyebrow">Setup em 1 minuto</p>
        <h1 className="setup-head__title">Escolha seu perfil de produtividade</h1>
        <p className="setup-head__sub">
          Selecione um estilo e o Luma ativa automaticamente os modulos ideais para voce.
        </p>
      </header>

      <div className="setup-cards" role="list">
        {PROFILE_OPTIONS.map((profile) => {
          const Icon = profile.Icon;
          return (
            <button
              key={profile.id}
              type="button"
              className="setup-card"
              role="listitem"
              onClick={() => onSelectProfile?.(profile)}
              disabled={busy}
            >
              <span className="setup-card__icon">
                <Icon />
              </span>
              <span className="setup-card__content">
                <strong className="setup-card__title">{profile.title}</strong>
                <span className="setup-card__desc">{profile.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
