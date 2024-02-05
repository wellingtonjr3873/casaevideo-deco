import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost w-full h-6 flex items-center"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon
        id="Hamburguer"
        size={24}
        strokeWidth={0.01}
        class="text-neutral-900"
      />
      <span class="small-bold hover:underline-offset-1">
        Categorias
      </span>
    </Button>
  );
}
