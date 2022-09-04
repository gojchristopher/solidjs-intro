import axios from 'axios';
import constants from '~/lib/constants';
import TPost from '~/types/post';

type FindAllQuery = {
  limit: number;
  offset: number;
  userId: number;
};

async function findAll(params?: Partial<FindAllQuery>) {
  const {data} = await axios.get<TPost[]>('/posts', {
    baseURL: constants.apiBaseUrl,
    params: {
      _limit: params?.limit,
      _start: params?.offset,
      userId: params?.userId,
    },
  });

  return data;
}

async function find(postId: number) {
  const {data} = await axios.get<TPost>(`/posts/${postId}`, {
    baseURL: constants.apiBaseUrl,
  });

  return data;
}

async function remove(postId: number) {
  await axios.delete(`/posts/${postId}`, {
    baseURL: constants.apiBaseUrl,
  });
}

const postService = {
  find,
  findAll,
  remove,
};

export default postService;
