import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import ProductShelfMinicart from "$store/components/minicart/ProductShelfMinicart.tsx"
import { invoke } from "$store/runtime.ts";
import { Props as MinicartProps } from "$store/components/minicart/ProductShelfMinicart.tsx";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import * as Sentry from "@sentry/react";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
  minicartProps?: MinicartProps;
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
  minicartProps,
}: Props) {
  const { displayCart, productMinicartShelf } = useUI();
  const isEmpty = items.length === 0;
  async function handleShelf(){
    let shelfProducts;
    try {
      const result = await invoke.vtex.loaders.intelligentSearch.productList({
        "props": { "collection": minicartProps?.collectionId || "", "count": minicartProps?.count || 0 }
      });
      shelfProducts = result;
    }catch{
      console.error("Erro ao exibir vitrine de produtos.");
      Sentry.captureException("Erro ao exibir vitrine de produtos.");
    }
    if(shelfProducts){
      productMinicartShelf.value = shelfProducts;
    }

    return shelfProducts;
    }
  
    handleShelf()

    async function handleVoltage(item: Item){
      let voltageProduct, voltageName;
      let product;
      try {
        const result = await invoke.vtex.loaders.intelligentSearch.productList({
          "props": { "ids": [item.productID || ""] }
        });
        product = result;
      }catch{
        console.error("Erro ao exibir vitrine de produtos.")
        Sentry.captureException("Erro ao exibir vitrine de produtos.");
      }
      if(product){
        voltageName = product[0].additionalProperty?.find(property => property.name == "Voltagem");
        voltageProduct = voltageName?.value;
      }
  
      return voltageProduct;
      }
  return (
    <>
    <div
      class={`flex flex-col ${isEmpty ? "justify-end" : "justify-center"} items-center overflow-hidden`}
    >
      {isEmpty
        ? (
          <>
            <div class="flex flex-col gap-4 px-4 items-center justify-center">
              <Icon id="Cart" width={48} height={45} strokeWidth={2} />
              <span class="text-base font-bold text-neutral-dark">Seu carrinho está vazio</span>
              <p class={`text-base font-normal text-neutral-dark text-center`}>Navegue por nossa loja e
adicione produtos ao carrinho.</p>
            </div>
          </>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            {/* <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div> */}

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-4 px-2 flex-grow overflow-y-scroll h-[267px] lg:px-4 lg:h-[50vh] flex flex-col gap-2 w-full"
            >
              {items.map((item, index) => {
                const voltagem = handleVoltage(item);
                return(
                  <li key={index}>
                    <CartItem
                      item={item}
                      voltagem={voltagem}
                      index={index}
                      locale={locale}
                      currency={currency}
                      onUpdateQuantity={onUpdateQuantity}
                      itemToAnalyticsItem={itemToAnalyticsItem}
                    />
                  </li>
              )})}
            </ul>
            {minicartProps &&
              <ProductShelfMinicart {...minicartProps}/>
            }
            {/* Cart Footer */}
            <div class="w-full">
              {/* Subtotal */}
              <div class={`flex justify-between items-center px-4`}>
                <div class="py-2 flex flex-col">
                    <span class={`text-lg text-neutral-dark font-bold`}>Subtotal</span>
                    <span class={`text-sm text-neutral-400 font-normal`}>Frete a calcular</span>
                </div>
                <div class="py-2 flex flex-col">
                    <span class="text-base text-neutral-dark font-bold text-right">
                      {formatPrice(subtotal, currency, locale)}
                    </span>
                    <span class="text-base text-neutral-dark font-normal text-right">
                      {formatPrice(subtotal, currency, locale)} no cartão
                    </span>
                </div>
              </div>
              <div class="p-4">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn-primary btn-block hover:bg-brand-primary-1 bg-brand-primary-1 text-base text-neutral-50 font-normal"
                    disabled={loading || isEmpty}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Ir para o carrinho
                  </Button>
                </a>
              </div>
            </div>
          </>
        )}
    </div>
    {isEmpty && minicartProps &&
      <div class={`flex flex-col w-full mx-auto max-w-[100vw] lg:max-w-[410px] justify-end mb-10`}>
        <ProductShelfMinicart {...minicartProps}/>
      </div>
  	}
    </>
  );
}

export default Cart;
