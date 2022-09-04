import {Route, Router, Routes} from '@solidjs/router';
import {ErrorBoundary} from 'solid-js';
import ErrorFallback from './components/error-fallback';
import Layout from './components/layout';
import Landing from './pages/landing';
import Login from './pages/login';
import Post from './pages/post';
import Posts from './pages/posts';

export default function App() {
  return (
    <Router>
      <ErrorBoundary fallback={ErrorFallback}>
        <Routes>
          <Route path="" component={Layout}>
            <Route path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/posts" component={Posts} />
            <Route path="/posts/:id" component={Post} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}
