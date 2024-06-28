import { TOTAL_PRIZES } from "deco-sites/casaevideo/constants.tsx";

const URL_HOST = "https://api-roleta-black-friday.lebiscuit.io";
type Props = {
  email: string;
};
type Res = {
  error: boolean;
  value?: {
    clusterWinned: keyof typeof TOTAL_PRIZES;
  };
};

const MOCK_VALUE = {
  error: true,
  value: {
    clusterWinned: TOTAL_PRIZES[1],
  },
};

async function action(
  props: Props,
  _req: Request,
): Promise<Res | undefined> {
  const res: typeof MOCK_VALUE = await new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(MOCK_VALUE);
    }, 3000);
  });

  return res;
}

export default action;
