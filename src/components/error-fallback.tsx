import {Link} from '@solidjs/router';
import ArrowLeftSolidIcon from './icons/arrow-left-solid';

export default function ErrorFallback(exception: Error) {
  console.error(exception);

  return (
    <div class="min-h-screen flex flex-col items-center justify-center">
      <h2 class="text-6xl font-bold">Error 503</h2>
      <p class="text-gray-600 font-light">Something went wrong with the server</p>
      <Link
        href="/"
        class="mt-4 border border-gray-300 p-3 w-[200px] hover:border-gray-400 focus:border-sky-400 outline-none transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <ArrowLeftSolidIcon />
        Go home
      </Link>
    </div>
  );
}
