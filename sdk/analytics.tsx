import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { emitPMWebEvent } from "deco-sites/casaevideo/utils/pmweb/events.ts";

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  console.log(JSON.stringify(event, null, 2));

  emitPMWebEvent(event);

  const doSend = window.DECO_SITES_STD &&
    window.DECO_SITES_STD.sendAnalyticsEvent;

  if (typeof doSend === "function") {
    console.log('senddd', doSend)
    return doSend(event);
  }
  console.info(
    "Cannot find Analytics section in your page. Press `.` to add Analytics and supress this warning",
  );
};