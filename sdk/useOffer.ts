import type {
  AggregateOffer,
  Offer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;

  return `${billingDuration}x de R$ ${billingIncrement.toFixed(2).replace('.', ',')} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

function getPixPrice(offer: Offer, listPrice: number) {
  const tesearPixPercentage = offer?.teasers
    ?.find((teaser) => teaser.name.toUpperCase().includes("PIX"))
    ?.effects.parameters[0].value || 0;

  const teaserPixPrice = listPrice * (1 - Number(tesearPixPercentage) / 100);
  const pixPrice = offer
    .priceSpecification.find((priceSpec) =>
      priceSpec.name?.toUpperCase() === "PIX"
    )
    ?.price || listPrice;

  return Math.min(pixPrice, teaserPixPrice);
}

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer?.availability;
  const pixPrice = getPixPrice(offer as Offer, listPrice?.price || 0);

  return {
    price,
    listPrice: listPrice?.price,
    pixPrice,
    availability,
    seller,
    installments: installment && price
      ? installmentToString(installment, price)
      : null,
  };
};
