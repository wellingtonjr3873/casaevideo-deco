import { ImageWidget } from "apps/admin/widgets.ts";

export interface Tags {
  active?: boolean;
  id?: string;
  icon?: ImageWidget[];
  text?: string;
  bgColor: string;
}
