import axios from 'axios';
import constants from '~/config/constants';
import TComment from '~/types/comment';

type FindAllQuery = {
  limit: number;
  offset: number;
  postId: number;
};

async function findAll(params?: Partial<FindAllQuery>) {
  const {data} = await axios.get<TComment[]>('/comments', {
    baseURL: constants.apiBaseUrl,
    params: {
      _start: params?.offset ?? 0,
      _limit: params?.limit ?? 10,
      postId: params?.postId,
    },
  });

  return data;
}

const commentService = {
  findAll,
};

export default commentService;
