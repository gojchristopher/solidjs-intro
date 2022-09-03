import {useParams} from '@solidjs/router';

type Params = {
  id: string;
};

export default function Post() {
  const {id} = useParams<Params>();

  return null;
}
