import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export function Auth() {
  const [mode, setMode] = useState("signin");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
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
      const nome = fullName.trim();
      const data = birthDate;
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: nome,
            birth_date: data,
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
    <div className="auth-screen">
      <div className="auth-card">
        <header className="auth-card__head">
          <h1 className="auth-card__title">
            {mode === "signin" ? "Entrar no LifeOS" : "Criar conta"}
          </h1>
          <p className="auth-card__sub">
            {mode === "signin"
              ? "E-mail e senha (mín. 6 caracteres)."
              : "Preencha nome, data de nascimento, e-mail e senha."}
          </p>
        </header>

        <div className="auth-card__modes" role="tablist" aria-label="Modo de acesso">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signin"}
            className={`auth-mode${mode === "signin" ? " is-active" : ""}`}
            onClick={() => {
              setMode("signin");
              setFeedback(null);
            }}
          >
            Entrar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "signup"}
            className={`auth-mode${mode === "signup" ? " is-active" : ""}`}
            onClick={() => {
              setMode("signup");
              setFeedback(null);
            }}
          >
            Cadastrar
          </button>
        </div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          {mode === "signup" ? (
            <>
              <label className="auth-field">
                <span className="auth-field__label">Nome completo</span>
                <input
                  className="auth-field__input"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={mode === "signup"}
                  disabled={busy}
                />
              </label>
              <label className="auth-field">
                <span className="auth-field__label">Data de nascimento</span>
                <input
                  className="auth-field__input auth-field__input--date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required={mode === "signup"}
                  disabled={busy}
                />
              </label>
            </>
          ) : null}

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
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
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
            {mode === "signin" ? (
              <button
                type="submit"
                className="auth-submit auth-submit--wide"
                onClick={handleSignIn}
                disabled={busy}
              >
                {busy ? "Aguarde…" : "Entrar"}
              </button>
            ) : (
              <button
                type="submit"
                className="auth-submit auth-submit--wide"
                onClick={handleSignUp}
                disabled={busy}
              >
                {busy ? "Aguarde…" : "Criar conta"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
