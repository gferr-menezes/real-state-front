import { Notify } from 'quasar';

const notification = () => {
  return {
    error: (
      message = 'Erro ao realizar operação !',
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined,
    ) => {
      Notify.create({
        type: 'negative',
        message,
        position: !position ? 'top' : position,
        progress: true,
        closeBtn: '',
      });
    },
    success: (
      message?: string | null,
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined,
    ) => {
      Notify.create({
        type: 'positive',
        message: !message ? 'Operação realizada com sucesso !' : message,
        position: !position ? 'top' : position,
        progress: true,
        closeBtn: '',
        icon: 'check',
      });
    },
    info: (
      message: any,
      position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right' | 'center' | undefined,
    ) => {
      Notify.create({
        type: 'info',
        message,
        position: !position ? 'top' : position,
        progress: true,
        closeBtn: '',
      });
    },
  };
};

export default notification();
