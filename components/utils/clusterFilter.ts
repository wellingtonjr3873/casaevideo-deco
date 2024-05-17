import { PropertyValue } from "apps/commerce/types.ts";

export function clusterFilter(objects: PropertyValue[]): string[] {
  return objects
    .filter((obj) => obj.name === "cluster")
    .map((obj) => obj.propertyID ?? "");
}
