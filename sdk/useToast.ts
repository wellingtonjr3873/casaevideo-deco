import { signal } from "@preact/signals";

const toastSucess = signal(false);
const toastError = signal(false);
const toastInfo = signal(false);
const toastWarning = signal(false);

const state = {
  toastSucess,
  toastError,
  toastInfo,
  toastWarning,
};

export const useToast = () => state;
