import {Link, useLocation, useNavigate} from '@solidjs/router';
import {batch, Show} from 'solid-js';
import {authState, logout} from '~/lib/auth';

export default function Navbar() {
  const location = useLocation();

  return (
    <header class="border-b border-gray-300">
      <div class="px-4 md:px-6 lg:px-8 py-4 max-w-[1100px] mx-auto flex items-center justify-between">
        <Link href="/">
          <h2 class="text-2xl font-semibold">Logo</h2>
        </Link>

        <nav class="flex gap-3 items-center">
          <Show when={authState().status === 'authenticated'}>
            <div>Hello, {authState().user?.name}</div>
            <Divider />
          </Show>

          <ul>
            <Show when={authState().status === 'authenticated'}>
              <li>
                <Logout />
              </li>
            </Show>

            <Show when={authState().status === 'unauthenticated' && location.pathname === '/'}>
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

function Divider() {
  return <div class="rounded-full w-[4px] h-[4px] bg-gray-400" />;
}

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    batch(() => {
      logout();
      navigate('/login');
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}
