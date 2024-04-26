import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

const LoggedUserMobile = () => {
    const { user } = useUser();

    return <a
    class="flex items-center justify-center"
    href={user.value ? '/account#' : "/login"}
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