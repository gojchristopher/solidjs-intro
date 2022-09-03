import {createResource, Index} from 'solid-js';
import {authState} from '~/hooks/use-auth-state';
import postService from '~/services/post';

const userId = authState().user?.id;

export default function Posts() {
  const [posts] = createResource({userId}, postService.findAll);

  console.log(posts());

  return (
    <div class="flex flex-col gap-4">
      <Index each={posts()} fallback={Loader}>
        {(post) => (
          <div class="p-4 border border-gray-200 rounded-md">
            <h2 class="text-xl">{post().title}</h2>
            <p class="mt-1 text-sm">{post().body}</p>
          </div>
        )}
      </Index>
    </div>
  );
}

function Loader() {
  return <div>Loading...</div>;
}
