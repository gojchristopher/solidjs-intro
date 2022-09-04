import type {ComponentProps} from 'solid-js';
import {splitProps} from 'solid-js';

export default function Button(props: ComponentProps<'button'>) {
  const [local, others] = splitProps(props, ['disabled', 'children']);

  return (
    <button
      class="p-3 bg-sky-400 text-white hover:opacity-75 focus:opacity-75 transition-opacity duration-300 outline-none disabled:opacity-40 disabled:cursor-not-allowed"
      disabled={local.disabled}
      {...others}
    >
      {local.children}
    </button>
  );
}
