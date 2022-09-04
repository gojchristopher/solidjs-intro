import {Link} from '@solidjs/router';
import {createEffect, createResource, Index, onCleanup, Show, splitProps} from 'solid-js';
import ChatBubbleOutlineIcon from '~/components/icons/chat-bubble-outline';
import useToast from '~/hooks/use-toast';
import commentService from '~/services/comment';
import postService from '~/services/post';
import TPost from '~/types/post';
import {
  loadingMorePosts,
  mutatePosts,
  offset,
  posts,
  setLoadingMorePosts,
  setOffset,
  userId,
} from './store';

export default function Posts() {
  const toast = useToast();

  createEffect(async function fetchMorePosts() {
    if (offset() <= 0) return;

    setLoadingMorePosts(true);

    try {
      const nextPosts = await postService.findAll({
        userId,
        offset: offset(),
        limit: 5,
      });

      mutatePosts<TPost[]>((currPosts = []) => [...currPosts, ...nextPosts]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast(message, 'danger');
    } finally {
      setLoadingMorePosts(false);
    }
  });

  onCleanup(() => {
    setLoadingMorePosts(false);
    mutatePosts([]);
    setOffset(0);
  });

  return (
    <div>
      <PostList />

      <Show when={posts().length}>
        <div class="flex justify-center mt-4">
          <button
            class="disabled:text-gray-400"
            disabled={loadingMorePosts()}
            onClick={() => setOffset(offset() + 5)}
          >
            {loadingMorePosts() ? 'Loading...' : 'Load more'}
          </button>
        </div>
      </Show>
    </div>
  );
}

function PostList() {
  return (
    <div class="flex flex-col gap-3 md:gap-4">
      <Index each={posts()}>
        {(post) => {
          return <Post data={post()} />;
        }}
      </Index>
    </div>
  );
}

function Post(props: {data: TPost}) {
  const [local] = splitProps(props, ['data']);

  const postId = local.data.id;

  const [comments] = createResource({postId}, commentService.findAll, {initialValue: []});

  return (
    <Link href={`/posts/${local.data.id}`} class="block p-4 rounded-md border border-gray-300">
      <h2 class="text-xl">{local.data.title}</h2>
      <p class="mt-1 text-sm line-clamp-2 text-gray-600">{local.data.body}</p>

      <div class="mt-2 flex gap-4">
        <span class="flex gap-2 items-center">
          <ChatBubbleOutlineIcon class="w-4 h-4" />
          <span class="text-sm">{comments().length}</span>
        </span>
      </div>
    </Link>
  );
}
