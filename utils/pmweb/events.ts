import { 
  AddToCartEvent, AnalyticsEvent, AnalyticsItem,
  RemoveFromCartEvent, SelectItemEvent, ViewItemEvent,
  ViewItemListEvent, LoginEvent,
} from "apps/commerce/types.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";

function productViewEvent(event: ViewItemEvent) {
  const product = event.params.items?.[0] as AnalyticsItem;

  try {
    window.pm({
      detail: [{
        id: ('item_id' in product) ? product?.item_id : '',
        name: ('item_name' in product) ? product?.item_name : '',
        price: product?.price,
        brand: product?.item_brand,
        category: [
          product?.item_category, product?.item_category2, product?.item_category3, product?.item_category4, product?.item_category5
        ],
      }]
    });
  } catch (err) {
    console.error(err);
  }
}

function productImpressionEvent(event: ViewItemListEvent) {
  const products = event.params.items.map((item) => ({
    id: ('item_id' in item) ? item?.item_id : '',
    name: ('item_name' in item) ? item?.item_name : '',
    brand: item.item_brand,
    price: item.price,
    position: item.index,
    category: [
      item?.item_category, item?.item_category2, item?.item_category3, item?.item_category4, item?.item_category5
    ],
    list: "List of products"
  }));

  try {
    window.pm({
      view: products
    });
  } catch (err) {
    console.error("rocking tag error", err);
  }
}

function addToCart(event: AddToCartEvent) {
  const cartItems = event.params.items;

  const cart = cartItems.map((item) => ({
    id: ('item_id' in item) ? item?.item_id : '',
    variant: ('item_id' in item) ? item?.item_id : '',
    name: ('item_name' in item) ? item?.item_name : '',
    brand: item.item_brand,
    price: item.price,
    position: item.index,
    category: [
      item?.item_category, item?.item_category2, item?.item_category3, item?.item_category4, item?.item_category5
    ],
    quantity: item.quantity,
  }));

  try {
    window.pm({
      cart,
    });
  } catch (err) {
    console.error("rocking tag error", err);
  }
}

function removeFromCart(event: RemoveFromCartEvent) {
  const removedItems = event.params.items;
  const remove = removedItems.map((item) => ({
    id: ('item_id' in item) ? item?.item_id : '',
    variant: ('item_id' in item) ? item?.item_id : '',
    name: ('item_name' in item) ? item?.item_name : '',
    brand: item.item_brand,
    price: item.price,
    category: [
      item?.item_category, item?.item_category2, item?.item_category3, item?.item_category4, item?.item_category5
    ],
    quantity: item.quantity,
  }));


  try {
    window.pm({
      remove,
    });
  } catch (err) {
    console.error("rocking tag error", err);
  }
}

function productClick(event: SelectItemEvent) {
  const item = event.params.items[0];

  try {
    window.pm({
      click: {
        id: ('item_id' in item) ? item?.item_id : '',
        name: ('item_name' in item) ? item?.item_name : '',
        brand: item.item_brand,
        price: item.price,
        category: [
          item?.item_category, item?.item_category2, item?.item_category3, item?.item_category4, item?.item_category5
        ],
      }
    });
  } catch (err) {
    console.error("rocking tag error", err);
  }
}

function userData() {
  const { user } = useUser();
  const email = user?.value?.email;

  if (!email) return;

  try {
    window.pm({
      match: {
        email
      }
    });
  } catch (e) {
    console.error(e);
  }
}


export function emitPMWebEvent<E extends AnalyticsEvent>(event: E) {
  const eventName = event.name;

  switch (eventName) {
    case "view_item":
      productViewEvent(event);
      return;
    case "view_item_list":
      productImpressionEvent(event);
      return;
    case "add_to_cart":
      addToCart(event);
      return;
    case "remove_from_cart":
      removeFromCart(event);
      return;
    case "select_item":
      productClick(event);
      return;
    case "login":
      userData();
      return;
    default:
      return;
  }
}