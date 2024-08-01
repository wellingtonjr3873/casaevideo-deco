import { useContext } from "preact/compat";
import Account from '$home/context.tsx';

export const useAccount = () => {
    const isCv = useContext(Account).name === "casaevideo"; 
    return isCv
}