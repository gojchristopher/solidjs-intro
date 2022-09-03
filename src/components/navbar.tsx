import {useNavigate} from '@solidjs/router';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header class="border-b border-gray-300">
      <div class="px-8 py-4 max-w-[1100px] mx-auto flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Logo</h2>

        <nav>
          <ul>
            <li>
              <button onClick={() => navigate('/login')}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
