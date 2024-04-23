import { useEffect, useState } from "preact/hooks";
import CountDownTimer from "deco-sites/casaevideo/components/ui/CountDownTimer.tsx";
import ProductShelf, { Props as ProductShelfProps } from "$store/components/product/ProductShelf.tsx";

export interface Props {
    /** @title Inicio da Oferta */
    /** @description Data inicial da oferta */
    /** @format datetime */
    startOffer?: string;
    /** @title Fim da Oferta */
    /** @description Data final da oferta quando a vitrine será substituida pela vitrine normal*/
    /** @format datetime */
    endOffer?: string;
    shelfProps: ProductShelfProps;
    shelfPropsOffer?: ProductShelfProps;
}

function ProductShelfTimedOffers({
    startOffer,
    endOffer,
    shelfProps,
    shelfPropsOffer
}: Props) {

    const [offerValid, setOfferValid] = useState<boolean>(false);

    useEffect(() => {
        const startDate = new Date(startOffer!);
        const finalDate = new Date(endOffer!);
        const now = new Date();

        const isOfferValid = now >= startDate && now <= finalDate;
        setOfferValid(isOfferValid);
    }, [startOffer, endOffer]);

    return (
        <div class="container w-full mx-auto max-w-[1280px] md:px-6 xl-b:px-0">
            {offerValid ?
                <>
                    <CountDownTimer endOffer={endOffer} />
                    {shelfPropsOffer ? <ProductShelf {...shelfPropsOffer} /> : <ProductShelf {...shelfProps} />}
                </>
                :
                shelfProps ? <ProductShelf {...shelfProps} /> : <span class="loading loading-spinner loading-lg"></span>
            }
        </div>
    );
}

export default ProductShelfTimedOffers;
