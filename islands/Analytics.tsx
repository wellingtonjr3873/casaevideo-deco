import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { useEffect } from "preact/hooks";
import { sendEvent } from "deco-sites/casaevideo/sdk/analytics.tsx";

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
        sendEvent(event)
        // window.DECO.events.dispatch(event); // erro SERVICE_ENDPOINT
        observer.unobserve(elem);
      }
    });

    observer.observe(elem);
    
  }, []);

  return <></>;
}

export const SendPageViewEvent = () => {
  useEffect(() => {
    const eventId = window?.dataLayer?.[window.dataLayer.length - 1];

    const event = {
      event: "pageView",
      "gtm.uniqueEventId": eventId,
      location: window.location.origin,
      originalLocation: window.location.origin,
      originalReferrer: "",
      page: window.location.pathname,
      referrer: "",
      title: document.title,
    } as unknown as AnalyticsEvent;

    globalThis.addEventListener("load", () => {
      window.dataLayer.push(event)
      // sendEvent(event) deco apps does not send page view correclty to dataLake
    });
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