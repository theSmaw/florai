import { useState } from 'react';
import styles from './AuthForm.module.css';

export interface AuthFormProps {
  mode: 'signIn' | 'signUp';
  loading: boolean;
  error: string | null;
  onSubmit: (email: string, password: string) => void;
  onToggleMode: () => void;
}

export function AuthForm({ mode, loading, error, onSubmit, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(email, password);
  }

  const isSignUp = mode === 'signUp';

  return (
    <div className={styles.root} data-cy="auth-form">
      <div className={styles.card}>
        <h1 className={styles.title}>Florai</h1>
        <p className={styles.subtitle}>{isSignUp ? 'Create your account' : 'Welcome back'}</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              data-cy="auth-email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete={isSignUp ? 'email' : 'username'}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              data-cy="auth-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && (
            <p className={styles.error} data-cy="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            data-cy="auth-submit"
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className={styles.toggle}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            data-cy="auth-toggle-mode"
            type="button"
            className={styles.toggleLink}
            onClick={onToggleMode}
            disabled={loading}
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
