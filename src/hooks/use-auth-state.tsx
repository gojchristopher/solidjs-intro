import {createSignal} from 'solid-js';
import TUser from '~/types/user';

type AuthState = {loggedIn: true; user: TUser} | {loggedIn?: false; user: null};

const [authState, setAuthState] = createSignal<AuthState>({
  user: null,
  loggedIn: false,
});

export {authState, setAuthState};
