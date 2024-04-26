import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

type Props = {
    isAdded: boolean
}

const AddOrRemoveWishlistButton = (props: Props) => {
    return <button>
        <Icon id="Wishlist" size={24} class="text-[#E20613]" />
    </button>
}

export default AddOrRemoveWishlistButton