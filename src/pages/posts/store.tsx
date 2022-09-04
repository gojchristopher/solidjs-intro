import {createResource, createSignal} from 'solid-js';
import {authState} from '~/lib/auth';
import postService from '~/services/post';

const userId = () => authState().user?.id;

const [limit, setLimit] = createSignal(5);
const [offset, setOffset] = createSignal(0);

const [posts, {mutate: mutatePosts, refetch: refetchPosts}] = createResource(
  {
    limit: limit(),
    offset: offset(),
    userId: userId(),
  },
  postService.findAll,
  {initialValue: []},
);

const [hasMorePosts, setHasMorePosts] = createSignal(true);
const [fetchingMorePosts, setFetchingMorePosts] = createSignal(false);

export {
  userId,
  limit,
  setLimit,
  offset,
  setOffset,
  posts,
  mutatePosts,
  refetchPosts,
  hasMorePosts,
  setHasMorePosts,
  fetchingMorePosts,
  setFetchingMorePosts,
};
