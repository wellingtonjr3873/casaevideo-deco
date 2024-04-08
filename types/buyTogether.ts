export interface BuyTogetherProduct {
  productID: string;
  name: string;
  seller: string;
  quantity: number;
  add: boolean;
  image: {
    url: string;
    alt: string;
  };
  listPrice: number;
  installments: string;
  price: number;
  availability: boolean;
}
