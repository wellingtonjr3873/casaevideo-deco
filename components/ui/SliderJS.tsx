import { useEffect } from "preact/hooks";

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
  "data-dots-slider": "data-dots-slider",
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
  // deno-lint-ignore no-explicit-any
  typeof (x as any).offsetLeft === "number";

const   setup = ({ rootId, scroll, interval, infinite }: Props) => {
  let dotsDebounceTimer: number;
  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dotContainer = root?.querySelector(
    `[${ATTRIBUTES["data-dots-slider"]}]`,
  );
  
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);


  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, rootId },
    );

    return;
  }

  const fixDotsScroll = (index: number) => {
    if (!dots || !dotContainer) return;

    const item = dots.item(index);

    if (!isHTMLElement(item) || !isHTMLElement(dotContainer)) {
      console.warn(
        `Dot at index ${index} is not an html element.`,
      );

      return;
    }

    const left = (item.offsetLeft - dotContainer.offsetLeft) -
      item.getBoundingClientRect().width;

    clearTimeout(dotsDebounceTimer);
    dotsDebounceTimer = setTimeout(() => {
      dotContainer.scrollTo({
        top: 0,
        left,
        behavior: scroll,
      });
    }, 300);
  };

  const getElementsInsideContainer = () => {
    const indices: number[] = [];
    const sliderRect = slider.getBoundingClientRect();

    for (let index = 0; index < items.length; index++) {
      const item = items.item(index);
      const rect = item.getBoundingClientRect();

      const ratio = intersectionX(
        rect,
        sliderRect,
      ) / rect.width;

      if (ratio > THRESHOLD) {
        indices.push(index);
      }
    }

    return indices;
  };

  const goToItem = (index: number) => {
    const item = items.item(index);

    if (!isHTMLElement(item)) {
      console.warn(
        `Element at index ${index} is not an html element. Skipping carousel`,
      );

      return;
    }

    const diff = (item.offsetLeft - root.scrollLeft) - slider.scrollLeft;

    const diffAbs = Math.abs(diff);


    const left = diff < 0
      ? slider.scrollLeft - diffAbs
      : slider.scrollLeft + diffAbs;

    slider.scrollTo({
      top: 0,
      left,
      behavior: scroll,
    });
  };

  const onClickPrev = () => {
    const indices = getElementsInsideContainer();
    console.log(indices, "indice aqui")
    // Wow! items per page is how many elements are being displayed inside the container!!
    const itemsPerPage = indices.length;
    console.log(itemsPerPage, "perpage aqui")


    const isShowingFirst = indices[0] === 0;
    console.log(isShowingFirst, "showing aqui")
    const pageIndex = Math.floor(indices[indices.length - 1] / itemsPerPage);
    console.log(pageIndex, "page aqui")


    goToItem(
      isShowingFirst ? items.length - 1 : (pageIndex - 1) * itemsPerPage,
    );
  };

  const onClickNext = () => {
    const indices = getElementsInsideContainer();
    // Wow! items per page is how many elements are being displayed inside the container!!
    const itemsPerPage = indices.length;

    const isShowingLast = indices[indices.length - 1] === items.length - 1;
    const pageIndex = Math.floor(indices[0] / itemsPerPage);

    goToItem(isShowingLast ? 0 : (pageIndex + 1) * itemsPerPage);
  };

  const observer = new IntersectionObserver(
    (elements) =>
      elements.forEach((item) => {
        const index = Number(item.target.getAttribute("data-slider-item")) || 0;
        const dot = dots?.item(index);

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
        } else {
          dot?.removeAttribute("disabled");
        }

        fixDotsScroll(index);

        if (!infinite) {
          if (index === 0) {
            if (item.isIntersecting) {
              prev?.setAttribute("disabled", "");
            } else {
              prev?.removeAttribute("disabled");
            }
          }
          if (index === items.length - 1) {
            if (item.isIntersecting) {
              next?.setAttribute("disabled", "");
            } else {
              next?.removeAttribute("disabled");
            }
          }
        }
      }),
    { threshold: THRESHOLD, root: slider },
  );

  Array.from(items).reverse().forEach((item) => observer.observe(item));

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToItem(it));
  }

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
    }

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);

    observer.disconnect();

    clearInterval(timeout);
  };
};

function Slider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
}: Props) {
  useEffect(() => setup({ rootId, scroll, interval, infinite }), [
    rootId,
    scroll,
    interval,
    infinite,
  ]);

  return <div data-slider-controller-js />;
}

export default Slider;
