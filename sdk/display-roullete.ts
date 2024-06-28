import { signal } from "@preact/signals";

const displayRoullete = signal(false);

const state = {
  displayRoullete,
};

export const useRoullete = () => state;
