import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { USER_ALREADY_GO__TO_LOGIN_KEY } from "deco-sites/casaevideo/constants.tsx";

const displayRoullete = signal(false);

const state = {
  displayRoullete,
};

if (IS_BROWSER) {
  const item = localStorage.getItem(USER_ALREADY_GO__TO_LOGIN_KEY);

  if (item) {
    const res: { expire: number } = JSON.parse(item);
    if (new Date().getTime() < res.expire) {
      displayRoullete.value = true;
    }else{
      localStorage.removeItem(USER_ALREADY_GO__TO_LOGIN_KEY)
    }
  }
}

export const useRoullete = () => state;
