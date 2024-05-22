import Seo from "apps/website/components/Seo.tsx";
import {
  renderTemplateString,
  SEOSection,
} from "apps/website/components/Seo.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";
import { AppContext } from "apps/commerce/mod.ts";
import { Teaser } from "apps/vtex/utils/types.ts";

const agregateValeusInTeasers = (teasers: Teaser[]) => {
  const agregateDiscount = teasers.map((item) => {
    const effects = item?.effects?.parameters?.map((item) => {
      return item.value;
    });

    return effects;
  });

  const res = agregateDiscount.reduce((acumulator: number, item) => {
    const agregateEffects: number = item.reduce((acumulator: number, item) => {
      acumulator += Number(item);

      return acumulator;
    }, 0);

    acumulator += agregateEffects;

    return acumulator;
  }, 0);

  return res;
};

const getPixDiscountValue = (teasers: Teaser[], value: number) => {
  const pixDiscountPercentage =
  agregateValeusInTeasers(teasers) / 100;

  const lowPrice = Number(
    (value * (1 - pixDiscountPercentage)).toFixed(2),
  );

  return lowPrice
}

export interface Props {
  /** @title Data Source */
  jsonLD: ProductDetailsPage | null;
  omitVariants?: boolean;
  /** @title Title Override */
  title?: string;
  /** @title Description Override */
  description?: string;
  /**
   * @title Disable indexing
   * @description In testing, you can use this to prevent search engines from indexing your site
   */
  noIndexing?: boolean;
}

/** @title Product details */
export function loader(props: Props, _req: Request, ctx: AppContext) {
  const {
    titleTemplate = "",
    descriptionTemplate = "",
    ...seoSiteProps
  } = ctx.seo ?? {};
  const {
    title: titleProp,
    description: descriptionProp,
    jsonLD: originalJsonLD,
    omitVariants,
  } = props;

  const jsonLD = JSON.parse(JSON.stringify(originalJsonLD));

  
  const title = renderTemplateString(
    titleTemplate,
    titleProp || jsonLD?.seo?.title || "",
  );
  const description = renderTemplateString(
    descriptionTemplate,
    descriptionProp || jsonLD?.seo?.description || "",
  );
  const image = jsonLD?.product.image?.[0]?.url;
  const canonical = jsonLD?.seo?.canonical
    ? jsonLD?.seo?.canonical
    : jsonLD?.breadcrumbList
    ? canonicalFromBreadcrumblist(jsonLD?.breadcrumbList)
    : undefined;
  const noIndexing = props.noIndexing || !jsonLD || jsonLD.seo?.noIndexing;
  
  if (omitVariants && jsonLD?.product.isVariantOf?.hasVariant) {
    jsonLD.product.isVariantOf.hasVariant = [];
  }

  // if(jsonLD){
  //   // jsonLD.product.additionalProperty = []
  //   // jsonLD.product.isVariantOf?.hasVariant.forEach((variant) => {
  //   //     variant.additionalProperty = []
  //   //     variant.offers?.offers.map((offer) => {
  //   //       offer.priceSpecification = []
  //   //     })
  //   //   })
  //   //   jsonLD.product.offers?.offers.map((offer) => {
  //   //     offer.priceSpecification = []
  //   //   })
  //   }


    delete jsonLD.product.brand["id@"];

    const HIGH_PRICE_SPECIFICATION_LABEL = "https://schema.org/ListPrice";
    const LOW_PRICE_SPECIFICATION_LABEL = "https://schema.org/SalePrice";




    const offersList = [];
    const [baseOffer] = jsonLD.product.offers.offers;
    const highPriceInSpecification = baseOffer.priceSpecification.find(item => item.priceType === HIGH_PRICE_SPECIFICATION_LABEL);
    const lowPriceSpecificationLabel = baseOffer.priceSpecification.find(item => item.priceType === LOW_PRICE_SPECIFICATION_LABEL);

    const lowPriceWithDiscountPix = getPixDiscountValue(baseOffer.teasers, lowPriceSpecificationLabel.price);

    
    offersList.push({
      '@type': 'Offer',
      price: lowPriceWithDiscountPix,
      priceCurrency: "BRL",
      availability: baseOffer.availability,
      sku: jsonLD.product.sku,
      itemCondition: 'http://schema.org/NewCondition',
      priceValidUntil: baseOffer.priceValidUntil,
      seller: {
        '@type': 'Organization',
        name: baseOffer.sellerName
      },
    })
    
    const offers = (() => {
      if(lowPriceWithDiscountPix !== lowPriceSpecificationLabel || lowPriceWithDiscountPix !== highPriceInSpecification){
        return {
          "@type": "AggregateOffer",
          "priceCurrency": "BRL",
          "highPrice": highPriceInSpecification.price,
          "lowPrice": lowPriceWithDiscountPix,
          "offerCount": 1,
          offers: offersList
        }
      }
      return [offersList]
    })();  
    
    const tratedJsonLD = {
      '@type': 'Product',
      '@id': `${jsonLD.product.url.replace(`?skuId=${jsonLD.product.sku}`, "")}`,
      brand: jsonLD.product.brand,
      category: jsonLD.product.category,
      name: jsonLD.product.name,
      image: image,
      description: jsonLD.product.description,
      mpn: jsonLD.product.productID,
      sku: jsonLD.product.sku,
      offers: offers,
    };
  
    return {
      ...seoSiteProps,
      title,
      description,
      image,
      canonical,
      noIndexing,
      jsonLDs: [tratedJsonLD],
   };
}

function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from "apps/website/components/_seo/Preview.tsx";

export default Section;
