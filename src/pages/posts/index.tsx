import {Link} from '@solidjs/router';
import {
  createEffect,
  createResource,
  createSignal,
  Index,
  onCleanup,
  Show,
  splitProps,
} from 'solid-js';
import ChatBubbleOutlineIcon from '~/components/icons/chat-bubble-outline';
import CloseSolidIcon from '~/components/icons/close-icon-solid';
import Protected from '~/components/protected';
import toast from '~/lib/toast';
import commentService from '~/services/comment';
import postService from '~/services/post';
import type TPost from '~/types/post';
import {
  fetchingMorePosts,
  hasMorePosts,
  limit,
  mutatePosts,
  offset,
  posts,
  refetchPosts,
  setFetchingMorePosts,
  setHasMorePosts,
  setLimit,
  setOffset,
  userId,
} from './store';

export default function Posts() {
  createEffect(async function fetchMorePosts() {
    if (offset() === 0) return;

    setFetchingMorePosts(true);

    try {
      const nextPosts = await postService.findAll({
        limit: limit(),
        offset: offset(),
        userId: userId(),
      });

      if (!nextPosts.length) return setHasMorePosts(false);

      mutatePosts<TPost[]>((currPosts = []) => [...currPosts, ...nextPosts]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast(message, 'danger');
    } finally {
      setFetchingMorePosts(false);
    }
  });

  onCleanup(() => {
    refetchPosts();
    setFetchingMorePosts(false);
    setHasMorePosts(true);
    setOffset(0);
    setLimit(5);
  });

  return (
    <Protected>
      <div>
        <PostList />

        <Show when={hasMorePosts()}>
          <div class="flex justify-center mt-4">
            <button
              class="disabled:text-gray-400"
              disabled={fetchingMorePosts()}
              onClick={() => setOffset(offset() + 5)}
            >
              {fetchingMorePosts() ? 'Loading...' : 'Load more'}
            </button>
          </div>
        </Show>
      </div>
    </Protected>
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
  const [deleting, setDeleting] = createSignal(false);

  return (
    <Link
      href={`/posts/${local.data.id}`}
      class="block relative p-4 rounded-md border border-gray-300 group"
      classList={{
        'bg-gray-200 border-gray-200 opacity-50': deleting(),
      }}
    >
      <h2 class="text-xl">{local.data.title}</h2>
      <p class="mt-1 text-sm line-clamp-2 text-gray-600">{local.data.body}</p>

      <div class="mt-2 flex gap-4">
        <span class="flex gap-2 items-center">
          <ChatBubbleOutlineIcon class="w-4 h-4" />
          <span class="text-sm">{comments().length}</span>
        </span>
      </div>

      <Show when={!deleting()}>
        <button
          tabIndex={-1}
          disabled={deleting()}
          class="absolute -top-2.5 -right-2.5 bg-black bg-opacity-60 rounded-full p-1 scale-0 group-hover:scale-100 transition-all duration-150 hover:bg-opacity-75"
          onClick={async (e) => {
            e.preventDefault();

            setDeleting(true);

            try {
              await postService.remove(local.data.id);

              mutatePosts((currPosts = []) =>
                currPosts.filter((post) => {
                  return post.id !== local.data.id;
                }),
              );

              toast('Post has been deleted');
            } catch (error) {
              const message = error instanceof Error ? error.message : 'Something went wrong';
              toast(message, 'danger');
            } finally {
              setDeleting(false);
            }
          }}
        >
          <CloseSolidIcon class="fill-white w-4 h-4" />
        </button>
      </Show>
    </Link>
  );
}
