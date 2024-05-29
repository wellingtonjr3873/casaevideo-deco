import { createGraphqlClient } from "apps/utils/graphql.ts";
import { newslettterMutation } from "deco-sites/casaevideo/graphql/mutations/newsletter.ts";
import * as Sentry from "@sentry/react";
type Props = {
  email: string;
};

const accountDictionary = {
  "LB": "https://www.lebiscuit.com.br/_v/segment/graphql/v1",
  "CV":
    "https://casaevideonewio.vtexcommercestable.com.br/api/io/_v/private/graphql/v1",
};

const loader = async (props: Props): Promise<boolean | null> => {
  const client = createGraphqlClient({
    endpoint: accountDictionary["CV"],
  });

  try {
    const { subscribeNewsletter } = await client.query<
      { subscribeNewsletter: boolean },
      unknown
    >({
      query: newslettterMutation(props.email),
    });
    return subscribeNewsletter;
  } catch (err) {
    Sentry.captureException(err);
    console.error(err);
    return false;
  }
};

export default loader;
