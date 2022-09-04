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
      _limit: params?.limit,
      _start: params?.offset,
      userId: params?.userId,
    },
  });

  return data;
}

const postService = {
  findAll,
};

export default postService;
