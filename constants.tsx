// TODO: Support Preact's VNode
// deno-lint-ignore no-explicit-any
export type VNode = any;

export const grid = {
  gap: {
    mobile: {
      "1": "gap-1",
      "2": "gap-2",
      "4": "gap-4",
      "8": "gap-8",
      "12": "gap-12",
      "16": "gap-16",
    },
    desktop: {
      "1": "sm:gap-1",
      "2": "sm:gap-2",
      "4": "sm:gap-4",
      "8": "sm:gap-8",
      "12": "sm:gap-12",
      "16": "sm:gap-16",
    },
  },
  cols: {
    mobile: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "7": "grid-cols-7",
      "8": "grid-cols-8",
      "9": "grid-cols-9",
      "10": "grid-cols-10",
      "11": "grid-cols-11",
      "12": "grid-cols-12",
      "none": "grid-cols-none",
    },
    desktop: {
      "1": "sm:grid-cols-1",
      "2": "sm:grid-cols-2",
      "3": "sm:grid-cols-3",
      "4": "sm:grid-cols-4",
      "5": "sm:grid-cols-5",
      "6": "sm:grid-cols-6",
      "7": "sm:grid-cols-7",
      "8": "sm:grid-cols-8",
      "9": "sm:grid-cols-9",
      "10": "sm:grid-cols-10",
      "11": "sm:grid-cols-11",
      "12": "sm:grid-cols-12",
      "none": "sm:grid-cols-none",
    },
  },
  rows: {
    mobile: {
      "1": "grid-rows-1",
      "2": "grid-rows-2",
      "3": "grid-rows-3",
      "4": "grid-rows-4",
      "5": "grid-rows-5",
      "6": "grid-rows-6",
      "none": "grid-rows-none",
    },
    desktop: {
      "1": "sm:grid-rows-1",
      "2": "sm:grid-rows-2",
      "3": "sm:grid-rows-3",
      "4": "sm:grid-rows-4",
      "5": "sm:grid-rows-5",
      "6": "sm:grid-rows-6",
      "none": "sm:grid-rows-none",
    },
  },
  flow: {
    mobile: {
      "col": "grid-flow-col",
      "row": "grid-flow-row",
      "dense": "grid-flow-dense",
      "col-dense": "grid-flow-col-dense",
      "row-dense": "grid-flow-row-dense",
    },
    desktop: {
      "col": "sm:grid-flow-col",
      "row": "sm:grid-flow-row",
      "dense": "sm:grid-flow-dense",
      "col-dense": "sm:grid-flow-col-dense",
      "row-dense": "sm:grid-flow-row-dense",
    },
  },
  placeItems: {
    mobile: {
      "center": "place-items-center",
      "start": "place-items-start",
      "end": "place-items-end",
      "baseline": "place-items-baseline",
      "stretch": "place-items-stretch",
    },
    desktop: {
      "center": "sm:place-items-center",
      "start": "sm:place-items-start",
      "end": "sm:place-items-end",
      "baseline": "sm:place-items-baseline",
      "stretch": "sm:place-items-stretch",
    },
  },
  rowStart: {
    mobile: {
      "1": "row-start-1",
      "2": "row-start-2",
      "3": "row-start-3",
      "4": "row-start-4",
      "5": "row-start-5",
      "6": "row-start-6",
      "7": "row-start-7",
      "auto": "row-start-auto",
    },
    desktop: {
      "1": "sm:row-start-1",
      "2": "sm:row-start-2",
      "3": "sm:row-start-3",
      "4": "sm:row-start-4",
      "5": "sm:row-start-5",
      "6": "sm:row-start-6",
      "7": "sm:row-start-7",
      "auto": "sm:row-start-auto",
    },
  },
  rowSpan: {
    mobile: {
      "1": "row-span-1",
      "2": "row-span-2",
      "3": "row-span-3",
      "4": "row-span-4",
      "5": "row-span-5",
      "6": "row-span-6",
      "full": "row-span-full",
    },
    desktop: {
      "1": "sm:row-span-1",
      "2": "sm:row-span-2",
      "3": "sm:row-span-3",
      "4": "sm:row-span-4",
      "5": "sm:row-span-5",
      "6": "sm:row-span-6",
      "full": "sm:row-span-full",
    },
  },
  colStart: {
    mobile: {
      "1": "col-start-1",
      "2": "col-start-2",
      "3": "col-start-3",
      "4": "col-start-4",
      "5": "col-start-5",
      "6": "col-start-6",
      "7": "col-start-7",
      "auto": "col-start-auto",
    },
    desktop: {
      "1": "sm:col-start-1",
      "2": "sm:col-start-2",
      "3": "sm:col-start-3",
      "4": "sm:col-start-4",
      "5": "sm:col-start-5",
      "6": "sm:col-start-6",
      "7": "sm:col-start-7",
      "auto": "sm:col-start-auto",
    },
  },
  colSpan: {
    mobile: {
      "1": "col-span-1",
      "2": "col-span-2",
      "3": "col-span-3",
      "4": "col-span-4",
      "5": "col-span-5",
      "6": "col-span-6",
      "full": "col-span-full",
    },
    desktop: {
      "1": "sm:col-span-1",
      "2": "sm:col-span-2",
      "3": "sm:col-span-3",
      "4": "sm:col-span-4",
      "5": "sm:col-span-5",
      "6": "sm:col-span-6",
      "full": "sm:col-span-full",
    },
  },
};

export const flex = {
  gap: {
    mobile: {
      "1": "gap-1",
      "2": "gap-2",
      "4": "gap-4",
      "8": "gap-8",
      "12": "gap-12",
      "16": "gap-16",
    },
    desktop: {
      "1": "sm:gap-1",
      "2": "sm:gap-2",
      "4": "sm:gap-4",
      "8": "sm:gap-8",
      "12": "sm:gap-12",
      "16": "sm:gap-16",
    },
  },
  direction: {
    mobile: {
      "row": "flex-row",
      "col": "flex-col",
    },
    desktop: {
      "row": "sm:flex-row",
      "col": "sm:flex-col",
    },
  },
  justify: {
    mobile: {
      "center": "justify-center",
      "start": "justify-start",
      "end": "justify-end",
    },
    desktop: {
      "center": "sm:justify-center",
      "start": "sm:justify-start",
      "end": "sm:justify-end",
    },
  },
  wrap: {
    mobile: {
      "wrap": "flex-wrap",
      "nowrap": "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    desktop: {
      "wrap": "sm:flex-wrap",
      "nowrap": "sm:flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
};


export const DEFAULT_WISHLIST_LIST_NAME = "Meus favoritos"