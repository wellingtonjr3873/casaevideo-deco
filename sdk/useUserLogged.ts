import { signal } from "@preact/signals";

const userLogged = signal(false);
const userLoading = signal(false);
const userEmail = signal("");
const userFirstName = signal("")

const state = {
  userLogged,
  userLoading,
  userEmail,
  userFirstName,
};


export const useUserLogged = () => state;
