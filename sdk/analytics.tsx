import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { emitPMWebEvent } from "deco-sites/casaevideo/utils/pmweb/events.ts";

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  window.DECO.events.dispatch(event);
  emitPMWebEvent(event);
};