import {createSignal} from 'solid-js';
import type TUser from '~/types/user';

type AuthState =
  | {user?: null; status: 'unauthenticated'}
  | {user: TUser; status: 'authenticated'};

const id = '__AuthState__';

export const [authState, setAuthState] = createSignal<AuthState>(
  JSON.parse(
    localStorage.getItem(id) ??
      JSON.stringify({
        status: 'unauthenticated',
      }),
  ),
);

export const login = (user: TUser) => {
  const state: AuthState = {
    user,
    status: 'authenticated',
  };

  localStorage.setItem(id, JSON.stringify(state));
  setAuthState(state);
};

export const logout = () => {
  localStorage.removeItem(id);
  setAuthState({
    status: 'unauthenticated',
  });
};
