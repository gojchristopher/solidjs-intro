import {Route, Router, Routes} from '@solidjs/router';
import {ErrorBoundary} from 'solid-js';
import {Toaster} from 'solid-toast';
import Navbar from '~/components/navbar';
import Landing from '~/pages/landing';
import ErrorFallback from './components/error-fallback';
import Login from './pages/login';
import Post from './pages/post';
import Posts from './pages/posts';

export default function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Router>
        <Navbar />

        <main class="max-w-[900px] mx-auto p-16">
          <Routes>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/posts" component={Posts} />
            <Route path="/posts/:id" component={Post} />
          </Routes>

          <Toaster />
        </main>
      </Router>
    </ErrorBoundary>
  );
}
