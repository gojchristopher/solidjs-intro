import {Link} from '@solidjs/router';
import {createResource, splitProps} from 'solid-js';
import ChatBubbleOutlineIcon from '~/components/icons/chat-bubble-outline';
import commentService from '~/services/comment';
import TPost from '~/types/post';

export default function Post(props: {data: TPost}) {
  const [local] = splitProps(props, ['data']);

  const [comments] = createResource(
    {
      postId: local.data.id,
      offset: 0,
    },
    commentService.findAll,
    {initialValue: []},
  );

  return (
    <Link href={`/posts/${local.data.id}`} class="block p-4 rounded-md border border-gray-300">
      <h2 class="text-xl">{local.data.title}</h2>
      <p class="mt-1 text-sm line-clamp-2 text-gray-600">{local.data.body}</p>

      <div class="mt-2 flex gap-4">
        <span class="flex gap-2 items-center">
          <ChatBubbleOutlineIcon class="w-4 h-4" />
          <span class="text-sm">{comments().length}</span>
        </span>
      </div>
    </Link>
  );
}
