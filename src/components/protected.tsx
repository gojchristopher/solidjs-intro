import {useNavigate} from '@solidjs/router';
import {createEffect, ParentProps} from 'solid-js';
import {authState} from '~/lib/auth';

export default function Protected({children}: ParentProps) {
  const navigate = useNavigate();

  createEffect(() => {
    if (authState().status === 'unauthenticated') {
      navigate('/login');
    }
  });

  return children;
}
