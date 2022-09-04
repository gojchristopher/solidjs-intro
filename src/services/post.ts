import axios from 'axios';
import constants from '~/config/constants';
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
      _start: params?.offset ?? 0,
      _limit: params?.limit ?? 10,
      userId: params?.userId,
    },
  });

  return data;
}

const postService = {
  findAll,
};

export default postService;
