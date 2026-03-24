import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [busy, setBusy] = useState(false);

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

  async function handleSignUp(e) {
    e.preventDefault();
    setFeedback(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
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
    <div className="auth-screen">
      <div className="auth-card">
        <header className="auth-card__head">
          <h1 className="auth-card__title">Entrar no LifeOS</h1>
          <p className="auth-card__sub">E-mail e senha (mín. 6 caracteres).</p>
        </header>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <label className="auth-field">
            <span className="auth-field__label">E-mail</span>
            <input
              className="auth-field__input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={busy}
            />
          </label>
          <label className="auth-field">
            <span className="auth-field__label">Senha</span>
            <input
              className="auth-field__input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={busy}
            />
          </label>

          {feedback ? (
            <p
              className={`auth-feedback auth-feedback--${feedback.type}`}
              role="status"
            >
              {feedback.text}
            </p>
          ) : null}

          <div className="auth-actions">
            <button
              type="submit"
              className="auth-submit"
              onClick={handleSignIn}
              disabled={busy}
            >
              {busy ? "Aguarde…" : "Entrar"}
            </button>
            <button
              type="button"
              className="auth-secondary"
              onClick={handleSignUp}
              disabled={busy}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Auth({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!ignore) {
        setSession(s);
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="auth-loading" aria-live="polite">
        Carregando…
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="auth-layout">
      <div className="auth-bar">
        <span className="auth-bar__email">{session.user.email}</span>
        <button
          type="button"
          className="auth-bar__out"
          onClick={() => supabase.auth.signOut()}
        >
          Sair
        </button>
      </div>
      {children}
    </div>
  );
}
