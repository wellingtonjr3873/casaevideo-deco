import { logger } from "deco/observability/otel/config.ts";
import { ROLETA_API_URL } from "deco-sites/casaevideo/constants.tsx";
import { Res } from "deco-sites/casaevideo/types/api-roleta.d.ts";
type Props = {
  email: string;
};


async function action(
  props: Props,
  _req: Request,
): Promise<Res<{
  userCanSpin: boolean
}>> {
  const url = `${ROLETA_API_URL}/roleta-black-friday/check_user`;

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "x-provider": "casaevideo", //MUDE O VENDOR
    },
    body: JSON.stringify({ email: props.email }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(error.message)
    return {
      error: true,
      message: error.message
    }
  }
}

export default action;
