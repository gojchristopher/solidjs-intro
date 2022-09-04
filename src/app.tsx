import {Route, Router, Routes} from '@solidjs/router';
import {ErrorBoundary, lazy, Suspense} from 'solid-js';
import ErrorFallback from '~/components/error-fallback';

const Post = lazy(() => import('~/pages/post'));
const Posts = lazy(() => import('~/pages/posts'));
const Login = lazy(() => import('~/pages/login'));
const Landing = lazy(() => import('~/pages/landing'));
const Layout = lazy(() => import('~/components/layout'));

export default function App() {
  return (
    <Suspense fallback={Loader}>
      <Router>
        <ErrorBoundary fallback={ErrorFallback}>
          <Routes>
            <Route path="/" component={Layout}>
              <Route path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/posts" component={Posts} />
              <Route path="/posts/:id" component={Post} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
    </Suspense>
  );
}

function Loader() {
  return <div class="p-2 text-sm text-gray-500">Loading...</div>;
}
