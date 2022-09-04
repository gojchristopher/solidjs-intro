import {Link, useLocation, useNavigate} from '@solidjs/router';
import {Show} from 'solid-js';
import {authState, setAuthState} from '~/hooks/use-auth-state';

export default function Navbar() {
  const location = useLocation();

  return (
    <header class="border-b border-gray-300">
      <div class="px-4 md:px-6 lg:px-8 py-4 max-w-[1100px] mx-auto flex items-center justify-between">
        <Link href="/">
          <h2 class="text-2xl font-semibold">Logo</h2>
        </Link>

        <nav>
          <ul>
            <Show when={authState().loggedIn}>
              <li>
                <Logout />
              </li>
            </Show>

            <Show when={!authState().loggedIn && location.pathname === '/'}>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </Show>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Logout() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate('/login');
        setAuthState({
          user: null,
          loggedIn: false,
        });
      }}
    >
      Logout
    </button>
  );
}
