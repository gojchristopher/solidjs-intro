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
    <div class="p-4 border border-gray-300 rounded-md">
      <h2 class="text-xl">{local.data.title}</h2>
      <p class="mt-1 text-sm">{local.data.body}</p>

      <div class="mt-2 flex gap-4">
        <span class="flex gap-2 items-center">
          <ChatBubbleOutlineIcon class="w-4 h-4" />
          <span class="text-sm">{comments().length}</span>
        </span>
      </div>
    </div>
  );
}
