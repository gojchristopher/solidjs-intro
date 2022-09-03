import axios from 'axios';
import TPost from '~/types/post';

type FindAllQuery = {
  _limit: number;
  _start: number;
  userId: number;
};

const baseURL = import.meta.env.VITE_API_URL;

async function findAll(params?: Partial<FindAllQuery>) {
  const {data} = await axios.get<TPost[]>('/posts', {
    params,
    baseURL,
  });

  return data;
}

const postService = {
  findAll,
};

export default postService;
