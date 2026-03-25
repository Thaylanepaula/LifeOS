import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function IconGear() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19.4 15a8.7 8.7 0 0 0 .1-1l1.7-1.3-1.8-3.1-2 .7a8.8 8.8 0 0 0-1.7-1l-.3-2.1H10.6l-.3 2.1a8.8 8.8 0 0 0-1.7 1l-2-.7-1.8 3.1L5.5 14a8.7 8.7 0 0 0 .1 1l-1.7 1.3 1.8 3.1 2-.7c.5.4 1.1.7 1.7 1l.3 2.1h4.8l.3-2.1c.6-.3 1.2-.6 1.7-1l2 .7 1.8-3.1L19.4 15Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3v3M17 3v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.5 9.2h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6h11c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2h-11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M8 13h3M8 16h6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.8 19.2V4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.8 19.2H19.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 15l3-4 3 2 3-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="15" r="1" fill="currentColor" />
      <circle cx="11" cy="11" r="1" fill="currentColor" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M3.8 9.2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5.6a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V9.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 10.2v3.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4.6 20.2c1.7-3.4 4.3-5.2 7.4-5.2s5.7 1.8 7.4 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLaptop() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.2 7.2h11.6c.9 0 1.6.7 1.6 1.6v6.6H4.6V8.8c0-.9.7-1.6 1.6-1.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M3.8 17.2h16.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 4.8h9.6c1.3 0 2.4 1.1 2.4 2.4v12.2c0 .9-.7 1.6-1.6 1.6H6.6c-1.3 0-2.4-1.1-2.4-2.4V7.2c0-1.3 1.1-2.4 2.4-2.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.6 8.3h7.4M7.6 11.2h7.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.2 7.8V6.6c0-1 .8-1.8 1.8-1.8h4c1 0 1.8.8 1.8 1.8v1.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.2 7.8h11.6c1.1 0 2 .9 2 2v8.2c0 1.1-.9 2-2 2H6.2c-1.1 0-2-.9-2-2V9.8c0-1.1.9-2 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 12.3h4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function PersonaAnalista() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 18V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8.2c0 1.1-.9 2-2 2H9.8L7 20.5c-.4.3-1 .1-1.1-.4L5.4 18H6"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M7.2 15.2c1.8-2.4 3.6-3.6 5.4-3.6 1.4 0 2.6.7 3.8 2.1l2-2.8c.3-.4.8-.5 1.2-.3.4.3.5.8.3 1.2l-2.6 3.6c-.3.4-.9.5-1.3.2-1.1-1-2.1-1.6-3.4-1.6-1.4 0-2.8.9-4.3 2.8-.3.4-.9.4-1.2.1-.4-.3-.4-.9-.1-1.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PersonaFreelancer() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 20.6c-.3 0-.6-.1-.8-.3-.4-.4-.4-1 0-1.4l9.8-9.8c.4-.4 1-.4 1.4 0l1.6 1.6c.4.4.4 1 0 1.4l-9.8 9.8c-.2.2-.5.3-.8.3H6.6Z"
        fill="currentColor"
      />
      <path
        d="M6 21v-3.6c0-.3.1-.5.3-.7l9.6-9.6c.4-.4 1-.4 1.4 0l1.9 1.9c.4.4.4 1 0 1.4l-9.6 9.6c-.2.2-.4.3-.7.3H6Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M15.8 6.6l1.6-1.6c.4-.4 1-.4 1.4 0l1.2 1.2c.4.4.4 1 0 1.4l-1.6 1.6-2.6-2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PersonaGestora() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.8 20.2c-.6 0-1-.4-1-1v-7.6c0-.3.1-.6.3-.8L12 4.2l7.9 6.6c.2.2.3.5.3.8v7.6c0 .6-.4 1-1 1h-4.8c-.6 0-1-.4-1-1v-4.2h-2.8v4.2c0 .6-.4 1-1 1H4.8Z"
        fill="currentColor"
      />
      <path
        d="M9.8 9.8h4.4c.6 0 1 .4 1 1v2.2c0 .6-.4 1-1 1H9.8c-.6 0-1-.4-1-1v-2.2c0-.6.4-1 1-1Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function Auth() {
  const [isAuthView, setIsAuthView] = useState(false);
  const [logoIntroDone, setLogoIntroDone] = useState(false);
  const [mode, setMode] = useState("signin");
  const [signinStep, setSigninStep] = useState(1);
  const [signinDirection, setSigninDirection] = useState("forward");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState("Analista");
  const [emailTouched, setEmailTouched] = useState(false);

  const h = new Date().getHours();
  const base = h < 12 ? 78 : h < 18 ? 62 : 45;
  const disposição = clamp(base, 0, 100);
  const energiaLabel = disposição >= 60 ? "Tarefas Complexas" : "Microtarefas";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasMinLen = password.length >= 8;
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isPasswordStrong = hasMinLen && hasSymbol;

  const personas = [
    { id: "analista", label: "Analista", Node: PersonaAnalista },
    { id: "freelancer", label: "Freelancer", Node: PersonaFreelancer },
    { id: "gestora", label: "Gestora", Node: PersonaGestora },
  ];
  const [personaIdx, setPersonaIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPersonaIdx((i) => (i + 1) % personas.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!isAuthView || logoIntroDone) return;
    const t = setTimeout(() => setLogoIntroDone(true), 1600);
    return () => clearTimeout(t);
  }, [isAuthView, logoIntroDone]);

  useEffect(() => {
    function syncAuthViewWithHash() {
      setIsAuthView(window.location.hash === "#login");
    }

    syncAuthViewWithHash();
    window.addEventListener("hashchange", syncAuthViewWithHash);
    window.addEventListener("popstate", syncAuthViewWithHash);

    return () => {
      window.removeEventListener("hashchange", syncAuthViewWithHash);
      window.removeEventListener("popstate", syncAuthViewWithHash);
    };
  }, []);

  function openLoginView() {
    if (window.location.hash !== "#login") {
      window.location.hash = "login";
    } else {
      setIsAuthView(true);
    }
    setMode("signin");
    setSigninStep(1);
    setSigninDirection("forward");
    setFeedback(null);
  }

  function closeLoginView() {
    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    if (window.location.hash === "#login") {
      window.history.pushState(null, "", cleanUrl);
      setIsAuthView(false);
    } else {
      setIsAuthView(false);
    }
    setSigninStep(1);
    setSigninDirection("forward");
    setFeedback(null);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    setFeedback(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) setFeedback({ type: "error", text: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotPassword() {
    if (!isEmailValid) {
      setFeedback({
        type: "error",
        text: "Digite um e-mail valido para recuperar a senha.",
      });
      return;
    }
    setFeedback(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) {
        setFeedback({ type: "error", text: error.message });
      } else {
        setFeedback({
          type: "success",
          text: "Enviamos um link de recuperacao de senha para seu e-mail.",
        });
      }
    } finally {
      setBusy(false);
    }
  }

  function handleContinueSignInStep() {
    if (!email.trim()) {
      setFeedback({
        type: "error",
        text: "Informe seu e-mail ou numero de telefone para continuar.",
      });
      return;
    }
    setFeedback(null);
    setSigninDirection("forward");
    setSigninStep(2);
  }

  function handleBackToEmailStep() {
    setFeedback(null);
    setSigninDirection("backward");
    setSigninStep(1);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setFeedback(null);
    setBusy(true);
    try {
      const nome = fullName.trim();
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: nome,
            template_profile: selectedProfile,
          },
        },
      });
      if (error) setFeedback({ type: "error", text: error.message });
      else {
        setFeedback({
          type: "success",
          text: "Cadastro enviado. Se precisar confirmar e-mail, confira sua caixa de entrada.",
        });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={`auth-screen auth-screen--landing${
        isAuthView ? " auth-screen--auth-only" : ""
      }`}
    >
      <div className={`auth-landing${isAuthView ? " auth-landing--auth-only" : ""}`}>
        {isAuthView ? (
        <div className="account-auth">
          <header className="account-auth__header">
            <span className="account-auth__brand">Luma</span>
            <nav className="account-auth__nav" aria-label="Acesso e ajuda">
              <button type="button" className="account-auth__nav-link" onClick={openLoginView}>
                Iniciar sessão
              </button>
              <button
                type="button"
                className="account-auth__nav-link"
                onClick={() => setFeedback({ type: "success", text: "Cadastro em breve no Luma." })}
              >
                Crie sua conta
              </button>
              <button type="button" className="account-auth__nav-link">
                Perguntas frequentes
              </button>
            </nav>
          </header>

          <main className="account-auth__main">
            <div className={`account-auth__logo${logoIntroDone ? "" : " account-auth__logo--intro"}`} aria-hidden>
              <span className="auth-logo-mark__star" />
            </div>
            <h2 className="account-auth__title">Conta Luma</h2>
            <p className="account-auth__sub">Gerencie sua conta Luma e hábitos.</p>

            <form className="account-auth__form" onSubmit={(e) => e.preventDefault()}>
              <div
                key={`signin-step-${signinStep}`}
                className={`auth-step-panel auth-step-panel--slide-${
                  signinDirection === "forward" ? "right" : "left"
                }`}
              >
                {signinStep === 1 ? (
                  <label className="auth-field">
                    <span className="sr-only">E-mail</span>
                    <input
                      className="auth-field__input account-auth__input"
                      type="text"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="E-mail"
                      required
                      disabled={busy}
                    />
                  </label>
                ) : (
                  <label className="auth-field">
                    <span className="sr-only">Senha</span>
                    <input
                      className="auth-field__input account-auth__input"
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Senha"
                      required
                      minLength={8}
                      disabled={busy}
                    />
                  </label>
                )}
              </div>

              <p className="account-auth__privacy">
                As informações da sua Conta Luma são usadas para permitir que você inicie sessão
                com segurança e acesse seus dados.
              </p>

              <div className="account-auth__actions">
                {signinStep === 1 ? (
                  <button
                    type="button"
                    className="auth-submit account-auth__continue"
                    onClick={handleContinueSignInStep}
                    disabled={busy}
                  >
                    Continuar
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="auth-secondary account-auth__back"
                      onClick={handleBackToEmailStep}
                      disabled={busy}
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="auth-submit account-auth__continue"
                      onClick={handleSignIn}
                      disabled={busy}
                    >
                      {busy ? "Aguarde…" : "Entrar"}
                    </button>
                  </>
                )}

              </div>

              {feedback ? (
                <p
                  className={`auth-feedback auth-feedback--${feedback.type}`}
                  role="status"
                >
                  {feedback.text}
                </p>
              ) : null}
            </form>
          </main>
        </div>
        ) : (
        <>
        <header className="landing-topbar auth-landing__fade" aria-label="Barra superior da landing">
          <span className="landing-topbar__spacer" aria-hidden />
          <span className="landing-topbar__mark" aria-hidden>
            <span className="auth-logo-mark__star" />
          </span>
          <button
            type="button"
            className="landing-topbar__login"
            onClick={openLoginView}
          >
            Iniciar sessão
          </button>
        </header>

        <section
          className="icloud-hero auth-landing__fade"
          aria-label="Luma"
        >
          <h1 className="icloud-brand">Luma</h1>
          <p className="icloud-subtitle">Seu ecossistema de produtividade</p>

          <p className="auth-landing__value-line auth-landing__value-line--hero">
            Hoje: 3 tarefas essenciais selecionadas pela IA
          </p>
        </section>

        <section
          className="auth-landing__info auth-landing__fade"
          aria-label="Informativos"
        >
          <div className="icloud-cards" aria-label="Cards informativos">
            <div className="icloud-card">
            <div className="icloud-card__icon" aria-hidden="true">
              <IconBolt />
            </div>
            <h2 className="icloud-card__title">
              Sua Performance — Curador de Prioridades
            </h2>
            <p className="icloud-card__desc">
              Visualize seu nível de energia e produtividade. O Luma ajuda você a
              decidir o que fazer agora para evitar a paralisia de decisão
            </p>
            </div>

            <div className="icloud-card">
            <div className="icloud-card__icon" aria-hidden="true">
              <IconBattery />
            </div>
            <h2 className="icloud-card__title">Bateria de Energia</h2>
            <div className="energy-meter" role="group" aria-label="Bateria de energia">
              <div className="energy-meter__bar" aria-hidden="true">
                <div
                  className="energy-meter__fill"
                  style={{ width: `${disposição}%` }}
                />
              </div>
              <div className="energy-meter__row">
                <span className="energy-meter__value">{disposição}%</span>
                <span className="energy-meter__pill">{energiaLabel}</span>
              </div>
              <p className="energy-meter__hint">
                {energiaLabel === "Tarefas Complexas"
                  ? "Aproveite o pico de foco para decisões e tarefas profundas."
                  : "Hoje é melhor avançar com passos pequenos e consistentes."}
              </p>
            </div>
            </div>
          </div>
        </section>

        <footer
          className="auth-landing__footer auth-landing__fade"
          aria-label="Templates do Luma"
        >
          <div className="template-row" role="list">
            <button type="button" className="template-item template-item--minimal" role="listitem">
              <span className="template-item__icon" aria-hidden="true">
                <IconPerson />
              </span>
              <span className="template-item__label">Analista</span>
            </button>
            <button type="button" className="template-item template-item--minimal" role="listitem">
              <span className="template-item__icon" aria-hidden="true">
                <IconLaptop />
              </span>
              <span className="template-item__label">Freelancer</span>
            </button>
            <button type="button" className="template-item template-item--minimal" role="listitem">
              <span className="template-item__icon" aria-hidden="true">
                <IconBook />
              </span>
              <span className="template-item__label">Estudante</span>
            </button>
            <button type="button" className="template-item template-item--minimal" role="listitem">
              <span className="template-item__icon" aria-hidden="true">
                <IconBriefcase />
              </span>
              <span className="template-item__label">Gestora</span>
            </button>
          </div>
        </footer>
        </>
        )}
      </div>
    </div>
  );
}
