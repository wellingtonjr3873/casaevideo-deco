import { signal } from "@preact/signals";

const toastSucess = signal(false);
const toastError = signal(false);
const toastInfo = signal(false);
const toastWarning = signal(false);
const toastMessage = signal('Mensagem default.');

const state = {
  toastSucess,
  toastError,
  toastInfo,
  toastWarning,
  toastMessage,
};

export const useToast = () => state;
