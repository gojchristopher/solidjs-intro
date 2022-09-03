import toast from 'solid-toast';
import CheckCircleSolidIcon from '~/components/icons/check-circle-solid';
import CloseSolidIcon from '~/components/icons/close-icon-solid';

type ToastVariant = 'error' | 'success';

export default function useToast() {
  return (message: string, _variant: ToastVariant = 'success') => {
    toast.custom(
      <div class="bg-teal-100 shadow-md p-4 w-[350px] max-w-[450px] flex items- gap-2">
        <CheckCircleSolidIcon class="fill-teal-500 w-5 h-5 grow-0 shrink-0" />

        <p class="grow text-teal-700 leading-5">{message}</p>

        <button>
          <CloseSolidIcon class="fill-teal-500 w-5 h-5 grow-0 shrink-0" />
        </button>
      </div>,
      {
        position: 'top-center',
        unmountDelay: 3000,
      },
    );
  };
}
