import { signal } from "@preact/signals";
import type { Resolved } from "deco/engine/core/resolver.ts";
import { useCallback } from "preact/compat";
import { invoke } from "../runtime.ts";
import { IntelligenseSearch } from "deco-sites/casaevideo/loaders/search/intelligenseSearch.ts";
import * as Sentry from "@sentry/react";
const payload = signal<IntelligenseSearch | null>(null);
const loading = signal<boolean>(false);

let queue = Promise.resolve();
let latestQuery = "";

const NULLABLE: Resolved<null> = {
  __resolveType: "resolved",
  data: null,
};

const doFetch = async (
  query: string,
  { __resolveType, ...extraProps }: Resolved<IntelligenseSearch | null> =
    NULLABLE,
) => {
  // Debounce query to API speed
  if (latestQuery !== query) return;

  try {
    // Figure out a better way to type this loader
    // deno-lint-ignore no-explicit-any
    const invokePayload: any = {
      key: __resolveType,
      props: { query, ...extraProps },
    };
    payload.value = await invoke(invokePayload) as IntelligenseSearch | null;
  } catch (error) {
    console.error(
      "Something went wrong while fetching IntelligenseSearchs \n",
      error,
    );

    Sentry.captureException(error);
  } finally {
    loading.value = false;
  }
};

export const useSuggestions = (
  loader: Resolved<IntelligenseSearch | null>,
) => {
  const setQuery = useCallback((query: string) => {
    loading.value = true;
    latestQuery = query;
    queue = queue.then(() => doFetch(query, loader));
  }, [loader]);

  return {
    loading,
    payload,
    setQuery,
  };
};
