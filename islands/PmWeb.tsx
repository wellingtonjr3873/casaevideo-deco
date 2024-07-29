
import { useEffect } from "preact/hooks";
import { init_pmweb } from "deco-sites/casaevideo/utils/pmweb/init.ts";

export const PmWeb = ({ key }: { key: string }) => {
  const pmweb_key = key || 'PM-N929DLT';

  useEffect(() => {
    init_pmweb(pmweb_key)
  }, []);

  return <></>;
}