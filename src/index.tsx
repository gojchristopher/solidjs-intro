/* @refresh reload */
import {Router} from '@solidjs/router';
import {render} from 'solid-js/web';
import {Toaster} from 'solid-toast';
import '~/styles/tailwind.css';
import App from './app';

render(
  () => (
    <Router>
      <App />
      <Toaster />
    </Router>
  ),
  document.getElementById('root') as HTMLElement,
);
