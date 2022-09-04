import type {ComponentProps} from 'solid-js';

export default function Input(props: ComponentProps<'input'>) {
  return (
    <input
      class="border border-gray-300 outline-none py-3 px-4 hover:border-gray-400 focus:border-sky-400 transition-all duration-300"
      {...props}
    />
  );
}
