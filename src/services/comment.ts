import axios from 'axios';
import constants from '~/lib/constants';
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
      _limit: params?.limit,
      _start: params?.offset,
      postId: params?.postId,
    },
  });

  return data;
}

const commentService = {
  findAll,
};

export default commentService;
