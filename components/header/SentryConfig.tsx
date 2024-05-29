import { sentryConfig } from "deco-sites/casaevideo/utils/sentry-config.ts";
import { useEffect } from "preact/hooks";

// deno-lint-ignore ban-types
export type Props = {};

function SentryConfig(props: Props) {
  useEffect(() => {
    sentryConfig();
  }, [])

  return <></>;
}

export default SentryConfig;