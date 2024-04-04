import { createGraphqlClient } from "apps/utils/graphql.ts";
import { newslettterMutation } from "deco-sites/casaevideo/graphql/mutations/newsletter.ts";

type Props = {
  email: string;
};

const accountDictionary = {
  "LB": "https://www.lebiscuit.com.br/_v/segment/graphql/v1",
  "CV":
    "https://casaevideonewio.vtexcommercestable.com.br/api/io/_v/private/graphql/v1",
};

const loader = async (props: Props): Promise<true | null> => {
  const client = createGraphqlClient({
    endpoint: accountDictionary["CV"],
  });

  try {
    await client.query({
      query: newslettterMutation(props.email),
    });
    return true;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default loader;
