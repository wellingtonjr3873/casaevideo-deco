import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { useEffect } from "preact/hooks";
import * as Sentry from "@sentry/react";
import { sendEvent } from "deco-sites/casaevideo/sdk/analytics.tsx";
import { emitPMWebEvent } from "deco-sites/casaevideo/utils/pmweb/events.ts";

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => {

  useEffect(() => {
    const elem = document.getElementById(id);
    if (!elem) {
      return console.warn(
        `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
      );
    }
    elem.addEventListener("click", () => {
        
      emitPMWebEvent(event);
      sendEvent(event)
      // window.DECO.events.dispatch(event); // erro SERVICE_ENDPOINT
    });
    // scriptAsDataURI(
    //   (id: string, event: AnalyticsEvent) => {
        
    //   },
    //   id,
    //   event,  
    // );
  }, []);

  return <></>;
}

export const SendEventOnView = <E extends AnalyticsEvent>(
  { event, id }: { event: E; id: string },
) => {

  useEffect(() => {

    const elem = document.getElementById(id);

    if (!elem) {
      return console.warn(
        `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
      );
    }

    const observer = new IntersectionObserver((items) => {
      for (const item of items) {
        if (!item.isIntersecting) continue;

        emitPMWebEvent(event);
        sendEvent(event)
        // window.DECO.events.dispatch(event); // erro SERVICE_ENDPOINT
        observer.unobserve(elem);
      }
    });

    observer.observe(elem);
    
  }, []);

  return <></>;
}

export const SendEventOnLoad = <E extends AnalyticsEvent>(
  { event }: { event: E },
) => {
  useEffect(() => {
    globalThis.addEventListener("load", () => sendEvent(event))
  }, []);

  return <></>;
}