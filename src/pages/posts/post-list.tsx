import {Index, splitProps} from 'solid-js';
import TPost from '~/types/post';
import Post from './post';

export default function PostList(props: {data: TPost[]}) {
  const [local] = splitProps(props, ['data']);

  return (
    <div class="flex flex-col gap-3 md:gap-4">
      <Index each={local.data}>
        {(post) => {
          return <Post data={post()} />;
        }}
      </Index>
    </div>
  );
}
