import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { useEffect } from "preact/hooks";

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => {

  useEffect(() => {
    console.log('oi');
    scriptAsDataURI(
      (id: string, event: AnalyticsEvent) => {
        const elem = document.getElementById(id);

        if (!elem) {
          return console.warn(
            `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
          );
        }

        elem.addEventListener("click", () => {
          window.DECO.events.dispatch(event);
        });
      },
      id,
      event,
    );
  }, []);

  return <></>;
}

export const SendEventOnView = <E extends AnalyticsEvent>(
  { event, id }: { event: E; id: string },
) => {

  useEffect(() => {
    scriptAsDataURI(
      (id: string, event: E) => {
        const elem = document.getElementById(id);

        if (!elem) {
          return console.warn(
            `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
          );
        }

        const observer = new IntersectionObserver((items) => {
          for (const item of items) {
            if (!item.isIntersecting) continue;

            window.DECO.events.dispatch(event);
            observer.unobserve(elem);
          }
        });

        observer.observe(elem);
      },
      id,
      event,
    );
  }, []);

  return <></>;
}