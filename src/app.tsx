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
    <Router>
      <ErrorBoundary fallback={ErrorFallback}>
        <Navbar />

        <main class="max-w-[600px] mx-auto p-4 md:p-8 lg:p-12">
          <Routes>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/posts" component={Posts} />
            <Route path="/posts/:id" component={Post} />
          </Routes>

          <Toaster />
        </main>
      </ErrorBoundary>
    </Router>
  );
}
