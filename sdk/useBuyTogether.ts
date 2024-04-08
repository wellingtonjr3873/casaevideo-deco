import { signal } from "@preact/signals";

const addToCartState = signal<boolean[]>([true, true]);

export const useBuyTogether = () => ({ addToCartState });
