import { default as MenuButtonComponent } from "$store/components/header/Buttons/Menu.tsx";
import { default as SearchButtonComponent } from "$store/components/header/Buttons/Search.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

export function MenuButton() {
  const { user } = useUser();
  const loggedUser = user?.value?.email ? true : false;
  console.log("aqui - MenuButton - loggedUser", loggedUser);
  console.log("aqui - user 2", user?.value?.email);

  return (
    <>
      <MenuButtonComponent />
      banana
    </>
  );
}

export function SearchButton() {
  return <SearchButtonComponent />;
}
