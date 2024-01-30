import { default as MenuButtonComponent } from "$store/components/header/Buttons/Menu.tsx";
import { default as SearchButtonComponent } from "$store/components/header/Buttons/Search.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export function MenuButton() {
  return <MenuButtonComponent />;
}

export function SearchButton() {
  return <SearchButtonComponent />;
}
