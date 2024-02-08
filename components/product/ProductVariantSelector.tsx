import Avatar from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf, isSimilarTo } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);

  const colorVariants = isSimilarTo?.reduce((acc, cur) => {
    const key = `Cor: ${cur.name};Image: ${cur.image?.[0].url}`;
    acc[key] = cur.url || '';

    return acc;
  }, {} as Record<string, string>) || {};

  if (Object.keys(colorVariants).length > 0) {
    possibilities['Cor'] = colorVariants;
  }

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="x-small-bold md:small-bold text-neutral-900">
            {name}:
            <strong class="pl-1 text-brand-primary-1">
              {Object.entries(possibilities[name]).find(([_value, link]) => link === url)?.[0]}
            </strong>
          </span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => (
              <li>
                <button f-partial={link} f-client-nav>
                  <Avatar
                    content={value}
                    variant={link === url
                      ? "active"
                      : link
                      ? "default"
                      : "disabled"}
                  />
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
