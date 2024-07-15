// deno-lint-ignore ban-ts-comment
// @ts-nocheck
function getSeller(product: any, selectedSku: any) {
  if (selectedSku) {
    return selectedSku.sellers[0];
  }

  return product.items[0].sellers[0];
}

export function handleEvents(e: any) {
  switch (e.data.eventName) {
    case "vtex:productView":
      {
        var product = e.data.product;
        var price = getSeller(product, product.selectedSku).commertialOffer.Price;

        try {
          window.pm({
            detail: [{
              name: product.productName,
              id: product.selectedSku.itemId,
              price: price,
              brand: product.brand,
              category: product.categories.join(" ")
            }]
          });
        } catch (err) {
          console.error(err);
        }

        return;
      }

    case "vtex:productClick":
      {
        var _product = e.data.product;
        var _price = getSeller(_product, _product.sku).commertialOffer.Price;

        try {
          window.pm({
            click: {
              name: _product.productName,
              id: _product.sku.itemId,
              price: _price,
              brand: _product.brand,
              category: _product.categories.join(" ")
            }
          });
        } catch (err) {
          console.error("rocking tag error", err);
        }

        return;
      }

    case "vtex:addToCart":
      {
        var items = e.data.items;
        var products = items.map(function (item) {
          return {
            brand: item.brand,
            category: item.category,
            id: item.skuId,
            variant: item.skuId,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          };
        });

        try {
          window.pm({
            cart: products
          });
        } catch (err) {
          console.error("rocking tag error", err);
        }

        return;
      }

    case "vtex:removeFromCart":
      {
        var _items = e.data.items;

        var _products = _items.map(function (item) {
          return {
            brand: item.brand,
            category: item.category,
            id: item.skuId,
            variant: item.skuId,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          };
        });

        try {
          window.pm({
            remove: _products
          });
        } catch (err) {
          console.error("rocking tag error", err);
        }

        return;
      }

    case "vtex:orderPlaced":
      {
        var order = e.data;

        var _products2 = order.transactionProducts.map(function (product) {
          return {
            id: product.sku,
            brand: product.brand,
            category: product.category,
            name: product.name,
            price: product.price,
            quantity: product.quantity
          };
        });

        try {
          window.pm({
            purchase: _products2,
            transaction: {
              id: order.transactionId
            }
          });
        } catch (err) {
          console.error("rocking tag error", err);
        }

        return;
      }

    case "vtex:productImpression":
      {
        var _e$data = e.data,
            list = _e$data.list,
            impressions = _e$data.impressions;

        var _products3 = impressions.map(function (item) {
          return {
            id: item.product.sku.itemId,
            brand: item.product.brand,
            name: item.product.productName,
            price: getSeller(item.product, item.product.sku).commertialOffer.Price,
            position: item.position,
            category: item.product.categories.join(" "),
            list: list
          };
        });

        console.log("_products3", _products3);
        try {
          window.pm({
            view: _products3
          });
        } catch (err) {
          console.error("rocking tag error", err);
        }

        return;
      }

    case "vtex:userData":
      {
        var w = e.data;
        if (!w.isAuthenticated) return;
        var f = w.email;

        try {
          window.pm({
            match: {
              email: f
            }
          });
        } catch (e) {
          console.error(e);
        }

        break;
      }

    default:
      {
        break;
      }
  }
}