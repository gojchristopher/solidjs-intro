import {useNavigate} from '@solidjs/router';
import axios from 'axios';
import {batch, createSignal} from 'solid-js';
import Button from '~/components/button';
import Input from '~/components/input';
import {setAuthState} from '~/hooks/use-auth-state';
import useToast from '~/hooks/use-toast';
import TUser from '~/types/user';

const prefix = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = createSignal('');
  const [pending, setPending] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    setPending(true);

    try {
      const {data} = await axios.get<TUser[]>(`${prefix}/users?email=${email()}`);
      const user = data.at(0);

      if (!user) throw new Error('User does not exist');

      batch(() => {
        navigate('/posts');
        setAuthState({
          user,
          loggedIn: true,
        });
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast(message, 'danger');
    } finally {
      setPending(false);
    }
  };

  return (
    <div class="w-[350px] max-w-full mx-auto py-16">
      <div class="mb-8">
        <h1 class="font-medium text-4xl">Login</h1>
        <p>Please login to continue</p>
      </div>

      <form method="post" onSubmit={handleSubmit} noValidate class="flex flex-col gap-6">
        <Input
          type="email"
          placeholder="Email"
          value={email()}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />

        <Button type="submit" disabled={pending()}>
          {pending() ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
