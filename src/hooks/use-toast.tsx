import toast from 'solid-toast';
import CheckCircleSolidIcon from '~/components/icons/check-circle-solid';
import CloseSolidIcon from '~/components/icons/close-icon-solid';

type ToastVariant = 'danger' | 'success';

export default function useToast() {
  return (message: string, variant: ToastVariant = 'success') => {
    toast.dismiss();
    toast.custom(
      ({id}) => (
        <div
          class="shadow-md p-4 w-[350px] max-w-[450px] flex gap-2"
          classList={{
            'bg-teal-100': variant === 'success',
            'bg-rose-100': variant === 'danger',
          }}
        >
          <CheckCircleSolidIcon
            class="w-5 h-5 grow-0 shrink-0"
            classList={{
              'fill-teal-400': variant === 'success',
              'fill-rose-400': variant === 'danger',
            }}
          />

          <p
            class="grow leading-5"
            classList={{
              'text-teal-600': variant === 'success',
              'text-rose-600': variant === 'danger',
            }}
          >
            {message}
          </p>

          <button>
            <CloseSolidIcon
              class="w-5 h-5 grow-0 shrink-0"
              classList={{
                'fill-teal-400': variant === 'success',
                'fill-rose-400': variant === 'danger',
              }}
              onClick={() => toast.dismiss(id)}
            />
          </button>
        </div>
      ),
      {
        position: 'top-center',
        unmountDelay: 0,
        duration: 3000,
      },
    );
  };
}
