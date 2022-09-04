import {Outlet} from '@solidjs/router';
import Navbar from './navbar';

export default function Layout() {
  return (
    <div class="min-h-screen">
      <Navbar />

      <main class="max-w-[600px] mx-auto p-4 md:p-8 lg:p-12">
        <Outlet />
      </main>
    </div>
  );
}
