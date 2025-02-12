/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */
import type { Product } from "apps/commerce/types.ts";
import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySubMenu = signal(false);
const displaySubMenuIndex = signal(-1);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayGeoLocationPointPopup = signal(false);
const layoutSelected = signal("grid");
const productMinicartShelf = signal<Product[] | null>(null);

const state = {
  displayCart,
  displayMenu,
  displaySubMenu,
  displaySubMenuIndex,
  displaySearchPopup,
  displaySearchDrawer,
  displayGeoLocationPointPopup,
  layoutSelected,
  productMinicartShelf,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
