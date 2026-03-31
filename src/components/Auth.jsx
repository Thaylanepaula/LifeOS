import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";

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

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function IconGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const AUTH_HASHES = new Set(["#login", "#signup"]);

/** Definição interna de módulos ao criar conta (sem escolha na UI). */
const DEFAULT_ACTIVE_MODULES = ["home", "today", "tasks", "calendar"];
const INTERNAL_DEFAULT_TEMPLATE = "Analista";

function authRedirectUrl() {
  return `${window.location.origin}/dashboard`;
}

export function Auth() {
  const navigate = useNavigate();
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

  const h = new Date().getHours();
  const base = h < 12 ? 78 : h < 18 ? 62 : 45;
  const disposição = clamp(base, 0, 100);
  const energiaLabel = disposição >= 60 ? "Tarefas Complexas" : "Microtarefas";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasMinLen = password.length >= 8;
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const isPasswordStrong = hasMinLen && hasSymbol;

  useEffect(() => {
    if (!isAuthView || logoIntroDone) return;
    const t = setTimeout(() => setLogoIntroDone(true), 1600);
    return () => clearTimeout(t);
  }, [isAuthView, logoIntroDone]);

  useEffect(() => {
    function syncAuthViewWithHash() {
      const hash = window.location.hash;
      if (AUTH_HASHES.has(hash)) {
        setIsAuthView(true);
        setMode(hash === "#signup" ? "signup" : "signin");
      } else {
        setIsAuthView(false);
      }
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

  function openSignupView() {
    if (window.location.hash !== "#signup") {
      window.location.hash = "signup";
    } else {
      setIsAuthView(true);
    }
    setMode("signup");
    setSigninStep(1);
    setSigninDirection("forward");
    setFeedback(null);
  }

  function closeLoginView() {
    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    if (AUTH_HASHES.has(window.location.hash)) {
      window.history.pushState(null, "", cleanUrl);
      setIsAuthView(false);
    } else {
      setIsAuthView(false);
    }
    setMode("signin");
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
      if (error) {
        setFeedback({ type: "error", text: error.message });
      } else {
        navigate("/dashboard", { replace: true });
      }
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
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: authRedirectUrl() }
      );
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

  async function handleGoogleSignIn() {
    setFeedback(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: authRedirectUrl(),
          queryParams: { prompt: "select_account" },
        },
      });
      if (error) setFeedback({ type: "error", text: error.message });
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
    if (!fullName.trim()) {
      setFeedback({ type: "error", text: "Informe seu nome completo." });
      return;
    }
    if (!isEmailValid) {
      setFeedback({ type: "error", text: "Digite um e-mail válido." });
      return;
    }
    if (!isPasswordStrong) {
      setFeedback({
        type: "error",
        text: "A senha precisa de pelo menos 8 caracteres e um símbolo.",
      });
      return;
    }
    setBusy(true);
    try {
      const nome = fullName.trim();
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: nome,
            template_profile: INTERNAL_DEFAULT_TEMPLATE,
            active_modules: DEFAULT_ACTIVE_MODULES,
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
            <Link
              to="/"
              className="account-auth__brand account-auth__brand--link"
              onClick={(e) => {
                e.preventDefault();
                closeLoginView();
              }}
            >
              Luma
            </Link>
            <nav className="account-auth__nav" aria-label="Acesso e ajuda">
              <button
                type="button"
                className={`account-auth__nav-link${
                  mode === "signin" ? " account-auth__nav-link--active" : ""
                }`}
                onClick={openLoginView}
              >
                Iniciar sessão
              </button>
              <button
                type="button"
                className={`account-auth__nav-link${
                  mode === "signup" ? " account-auth__nav-link--active" : ""
                }`}
                onClick={openSignupView}
              >
                Crie sua conta
              </button>
              <button type="button" className="account-auth__nav-link">
                Perguntas frequentes
              </button>
            </nav>
          </header>

          <main className="account-auth__main">
            <button
              type="button"
              className="account-auth__close"
              aria-label="Fechar login"
              onClick={closeLoginView}
            >
              ×
            </button>
            <div className={`account-auth__logo${logoIntroDone ? "" : " account-auth__logo--intro"}`} aria-hidden>
              <span className="auth-logo-mark__star" />
            </div>
            <h2 className="account-auth__title">
              {mode === "signup" ? "Crie sua conta" : "Conta Luma"}
            </h2>
            <p className="account-auth__sub">
              {mode === "signup"
                ? "Preencha os dados para criar sua Conta Luma."
                : "Gerencie sua conta Luma e hábitos."}
            </p>

            {mode === "signin" ? (
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

              {signinStep === 1 ? (
                <div className="account-auth__forgot-row">
                  <button
                    type="button"
                    className="account-auth__forgot"
                    onClick={handleForgotPassword}
                    disabled={busy}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              ) : null}

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

              {signinStep === 1 ? (
                <>
                  <p className="account-auth__oauth-divider" aria-hidden>
                    ou
                  </p>
                  <button
                    type="button"
                    className="account-auth__google"
                    onClick={handleGoogleSignIn}
                    disabled={busy}
                  >
                    <IconGoogle />
                    Continuar com Google
                  </button>
                </>
              ) : null}

              {feedback ? (
                <p
                  className={`auth-feedback auth-feedback--${feedback.type}`}
                  role="status"
                >
                  {feedback.text}
                </p>
              ) : null}
            </form>
            ) : (
            <form className="account-auth__form" onSubmit={handleSignUp}>
              <div className="account-auth__field-stack">
                <label className="auth-field">
                  <span className="sr-only">Nome completo</span>
                  <input
                    className="auth-field__input account-auth__input"
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nome completo"
                    required
                    disabled={busy}
                  />
                </label>
                <label className="auth-field">
                  <span className="sr-only">E-mail</span>
                  <input
                    className="auth-field__input account-auth__input"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                    disabled={busy}
                  />
                </label>
                <label className="auth-field">
                  <span className="sr-only">Senha</span>
                  <input
                    className="auth-field__input account-auth__input"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha (mín. 8 caracteres e um símbolo)"
                    required
                    minLength={8}
                    disabled={busy}
                  />
                </label>
              </div>

              <p className="account-auth__privacy">
                Ao criar uma conta, você concorda com o uso dos seus dados conforme necessário
                para autenticação e personalização do Luma.
              </p>

              <div className="account-auth__actions account-auth__actions--stack">
                <button
                  type="submit"
                  className="auth-submit account-auth__continue account-auth__continue--wide"
                  disabled={busy}
                >
                  {busy ? "Aguarde…" : "Criar conta"}
                </button>
                <p className="account-auth__oauth-divider" aria-hidden>
                  ou
                </p>
                <button
                  type="button"
                  className="account-auth__google"
                  onClick={handleGoogleSignIn}
                  disabled={busy}
                >
                  <IconGoogle />
                  Continuar com Google
                </button>
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
            )}
          </main>
        </div>
        ) : (
        <>
        <header className="landing-topbar auth-landing__fade" aria-label="Barra superior da landing">
          <span className="landing-topbar__spacer" aria-hidden />
          <span className="landing-topbar__mark" aria-hidden>
            <span className="auth-logo-mark__star" />
          </span>
          <div className="landing-topbar__actions">
            <button
              type="button"
              className="landing-topbar__link"
              onClick={openSignupView}
            >
              Crie sua conta
            </button>
            <button
              type="button"
              className="landing-topbar__login"
              onClick={openLoginView}
            >
              Iniciar sessão
            </button>
          </div>
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
        </>
        )}
      </div>
    </div>
  );
}
