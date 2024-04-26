import { Person } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import { useUser } from "apps/vtex/hooks/useUser.ts";


type Props = {
  user: Person | null
}


const LoggedUser = ({ user }: Props) => {

  const { user: UserTesting } = useUser();
  console.log(UserTesting, `loggin user in loggedUser`)

  const visiblePopup = useSignal(false);
  const handleSetVisibblePopUp = () => visiblePopup.value = !visiblePopup.value

  return !UserTesting.value ?
    <>
      <a
        class="flex items-center justify-center gap-1"
        href="/login"
        aria-label="Log in"
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
        <a href="/wishlist" aria-label="Meus favoritos">
          <Icon id="Wishlist" size={32} class="text-neutral-900" alt="veja quais são seus produtos favoritos" />
        </a>
      </a></> :
    <div class="flex items-center justify-center gap-1">
      <button class="flex items-center justify-start center gap-1 cursor-pointer w-[154px]" onClick={handleSetVisibblePopUp}>
        {visiblePopup.value && <div class="inset-0 fixed z-20 overflow-hidden cursor-default" onClick={(e) => {
          e.stopPropagation();
          handleSetVisibblePopUp();
        }} />}
        <div class="relative z-20">
          <Icon
            id="User"
            size={32}
            class="text-neutral-900 "
            alt="Acesse sua conta agora"
          />
          {
            visiblePopup.value && <>
              <nav class="absolute bg-neutral-0 w-[214px] rounded-2xl right-[-40px] top-[50px] transition ease-in-out">
                <div class="absolute w-10 h-10 bg-neutral-0 rounded-md right-[35px] top-[-5px] rotate-45" />
                <ul class="flex flex-col p-4">
                  <li class="h6-regular text-neutral-900 py-2 border-b border-neutral-100 text-left">
                    <a href="/account#">Minha conta</a>
                  </li>
                  <li class="h6-regular text-neutral-900 py-2 border-b border-neutral-100 text-left">
                    <a href="/account#/orders">Meus pedidos</a>
                  </li>
                  <li class="h6-regular text-neutral-900 py-2 border-b border-neutral-100 text-left">
                    <a href="/account#/addresses">Meus endereços</a>
                  </li>
                  <li class="h6-regular text-neutral-900 pt-2 text-left">
                    <a href="/no-cache/user/logout">Sair</a>
                  </li>
                </ul>
              </nav>
            </>
          }
        </div>

        <div class="flex flex-col gap-1 items-start">
          <span class="x-small-regular text-neutral-900">Olá,</span>
          <h3 class="small-bold text-neutral-900">{UserTesting.value.name || "Usuario"}</h3>
        </div>
      </button>
      {/* meus pedidos */}
      <a href="/account/#/orders" aria-label="Meus pedidos">
        <Icon id="MyOrders" size={32} class="text-neutral-900" alt="Visualize seus pedidos aqui" />
      </a>
      {/* wishlist */}
      <a href="/wishlist" aria-label="Meus favoritos">
        <Icon id="Wishlist" size={32} class="text-neutral-900" alt="veja quais são seus produtos favoritos" />
      </a>
    </div>
}

export default LoggedUser