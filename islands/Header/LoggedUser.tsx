import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";
import MyAccountButton from "$store/islands/MyAccountButton.tsx";
import { useUserLogged } from "deco-sites/casaevideo/sdk/useUserLogged.ts";

const LoggedUser = () => {

  const { userLogged, userLoading, userEmail, userFirstName } = useUserLogged()

  const visiblePopup = useSignal(false);
  const handleSetVisibblePopUp = () => visiblePopup.value = !visiblePopup.value

  return !userLoading.value ? <>{!userLogged.value ?
    <>
      <MyAccountButton />
    </> :
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
            class="text-color-header"
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
                    <a href="/api/vtexid/pub/logout?scope=casaevideonewio&returnUrl=/">Sair</a>
                  </li>
                </ul>
              </nav>
            </>
          }
        </div>

        <div class="flex flex-col gap-1 items-start">
          <span class="x-small-regular text-neutral-900">Olá,</span>
          <h3 class="small-bold text-neutral-900 max-w-[108px] truncate ...">{userFirstName.value || userEmail.value}</h3>
        </div>
      </button>
      {/* meus pedidos */}
      <a href="/account/#/orders" aria-label="Meus pedidos">
        <Icon id="MyOrders" size={32} class="text-color-header" alt="Visualize seus pedidos aqui" />
      </a>
      {/* wishlist */}
      <a href="/account/#/wishlist" aria-label="Meus favoritos">
        <Icon id="Wishlist" size={32} class="text-color-header" alt="veja quais são seus produtos favoritos" />
      </a>
    </div>}</> : <div class="w-[216px] h-[35px] flex items-center justify-center"><div class="loading loading-spinner w-5" /></div>
}

export default LoggedUser