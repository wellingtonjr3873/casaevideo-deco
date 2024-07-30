import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-sm btn-ghost flex p-0"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon
        id="Hamburguer"
        size={24}
        strokeWidth={0.01}
        class="text-color-header"
      />
      <span class="small-bold hover:underline-offset-1 hidden md:block text-color-header">
        Categorias
      </span>
    </Button>
  );
}
