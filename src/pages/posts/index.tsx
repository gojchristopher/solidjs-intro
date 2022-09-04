import {createEffect, createResource, createSignal, onCleanup} from 'solid-js';
import {authState} from '~/hooks/use-auth-state';
import useToast from '~/hooks/use-toast';
import postService from '~/services/post';
import TPost from '~/types/post';
import PostList from './post-list';

const userId = authState().user?.id;

export default function Posts() {
  const toast = useToast();

  const [offset, setOffset] = createSignal(0);
  const [posts, {mutate}] = createResource(
    {
      userId,
      offset: offset(),
      limit: 5,
    },
    postService.findAll,
    {initialValue: []},
  );

  const [loading, setLoading] = createSignal(false);

  createEffect(async function fetchMore() {
    if (offset() <= 0) return;

    setLoading(true);

    try {
      const nextPosts = await postService.findAll({
        userId,
        offset: offset(),
        limit: 5,
      });

      mutate<TPost[]>((currPosts = []) => [...currPosts, ...nextPosts]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast(message, 'danger');
    } finally {
      setLoading(false);
    }
  });

  onCleanup(() => {
    setLoading(false);
    setOffset(0);
    mutate([]);
  });

  return (
    <div>
      <PostList data={posts()} />

      <div class="flex justify-center mt-4">
        <button
          class="disabled:text-gray-400"
          disabled={loading()}
          onClick={() => setOffset(offset() + 5)}
        >
          {loading() ? 'Loading...' : 'Load more'}
        </button>
      </div>
    </div>
  );
}
