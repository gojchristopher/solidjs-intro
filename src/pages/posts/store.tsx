import {createResource, createSignal} from 'solid-js';
import {authState} from '~/lib/auth';
import postService from '~/services/post';

const userId = authState().user?.id;

const [limit, setLimit] = createSignal(5);
const [offset, setOffset] = createSignal(0);

const [posts, {mutate: mutatePosts, refetch: refetchPosts}] = createResource(
  {
    userId,
    offset: offset(),
    limit: 5,
  },
  postService.findAll,
  {initialValue: []},
);

const [loadingMorePosts, setLoadingMorePosts] = createSignal(false);

export {
  limit,
  setLimit,
  offset,
  setOffset,
  posts,
  mutatePosts,
  refetchPosts,
  loadingMorePosts,
  setLoadingMorePosts,
};
