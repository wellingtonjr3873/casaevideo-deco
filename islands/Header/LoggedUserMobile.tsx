import Icon from "$store/components/ui/Icon.tsx";
import { useUserLogged } from "deco-sites/casaevideo/sdk/useUserLogged.ts";

const LoggedUserMobile = () => {
    const { userLogged } = useUserLogged()

    return <a
    class="flex items-center justify-center"
    href={userLogged.value ? '/account#' : "/login"}
    aria-label="Log in"
  >
    <Icon
      id="User"
      strokeWidth={0.4}
      size={24}
      class="text-neutral-900 fill-transparent"
    />
  </a> 
}

export default LoggedUserMobile