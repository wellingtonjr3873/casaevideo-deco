export interface ProductVtexRest {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl: unknown;
  linkText: string;
  productReference: string;
  productReferenceCode: string;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  releaseDate: string;
  clusterHighlights: ClusterHighlights;
  productClusters: ProductClusters;
  searchableClusters: SearchableClusters;
  categories: string[];
  categoriesIds: string[];
  link: string;
  Seller: string[];
  "Especificações Técnicas ConectaLá": string[];
  allSpecifications: string[];
  allSpecificationsGroups: string[];
  description: string;
  items: Item[];
}

export interface ClusterHighlights {
  [key: string]: string;
}

export interface ProductClusters {
  [key: string]: string;
}

export interface SearchableClusters {
  [key: string]: string;
}

export interface Item {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  referenceId: ReferenceId[];
  measurementUnit: string;
  unitMultiplier: number;
  modalType: unknown;
  isKit: boolean;
  images: Image[];
  sellers: Seller[];
  Videos: unknown[];
  estimatedDateArrival: unknown;
}

export interface ReferenceId {
  Key: string;
  Value: string;
}

export interface Image {
  imageId: string;
  imageLabel: unknown;
  imageTag: string;
  imageUrl: string;
  imageText: string;
  imageLastModified: string;
}

export interface Seller {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: unknown;
  Installments: unknown[];
  DiscountHighLight: unknown[];
  GiftSkuIds: unknown[];
  Teasers: unknown[];
  PromotionTeasers: unknown[];
  BuyTogether: unknown[];
  ItemMetadataAttachment: unknown[];
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  FullSellingPrice: unknown;
  RewardValue: number;
  PriceValidUntil: unknown;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  DeliverySlaSamples: unknown[];
  GetInfoErrorMessage: string;
  CacheVersionUsedToCallCheckout: string;
  PaymentOptions: unknown;
}
