import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../../stores/auth/slice';
import { selectAuthLoading } from '../../stores/auth/selectors/selectAuthLoading';
import { selectAuthError } from '../../stores/auth/selectors/selectAuthError';
import type { AppDispatch } from '../../stores/store';
import { AuthForm } from '../../components/AuthForm/AuthForm';

export function AuthContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  function handleSubmit(email: string, password: string) {
    const action = mode === 'signIn' ? signIn : signUp;
    void dispatch(action({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        void navigate('/catalogue');
      }
    });
  }

  return (
    <AuthForm
      mode={mode}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onToggleMode={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
    />
  );
}
