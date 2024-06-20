import { useUI } from "deco-sites/casaevideo/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";

const MyAccountButton = () => {
  const { vtexIdScriptsLoaded } = useUI();

  return (
      <a
        class={`flex items-center justify-center gap-1 cursor-pointer`}
        href={`#`}
        onClick={async (e) => {
          e.preventDefault();
          const execute = () => {
            vtexIdScriptsLoaded.value = true;
            // deno-lint-ignore ban-ts-comment
            // @ts-expect-error
            window.vtexid.start({
              userEmail: "",
              locale: "pt-BR",
              forceReload: true,
            });
          };
          if (!vtexIdScriptsLoaded.value) {
            const { loadVtexIdScripts } = await import(
              "deco-sites/casaevideo/sdk/loadVtexIdScripts.ts"
            );
            loadVtexIdScripts(execute);
          } else {
            execute();
          }
        }}
      >
        <Icon
          id="User"
          size={32}
          class="text-neutral-900 "
          alt="Acesse sua conta agora"
        />
        <div class="flex flex-col">
          <span class="small-regular">Bem vindo!</span>
          <span class="x-small-underline">Entre ou cadastre-se</span>
        </div>
        {/* meus pedidos */}
        <a href="/account/#/orders" aria-label="Meus pedidos">
          <Icon id="MyOrders" size={32} class="text-neutral-900" alt="Visualize seus pedidos aqui" />
        </a>
        {/* wishlist */}
        <a href="/account/#/wishlist" aria-label="Meus favoritos">
          <Icon id="Wishlist" size={32} class="text-transparent" alt="veja quais são seus produtos favoritos" />
        </a>
      </a>
  );
};

export default MyAccountButton;
