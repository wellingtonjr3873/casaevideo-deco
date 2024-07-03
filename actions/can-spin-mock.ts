const URL_HOST = "https://api-roleta-black-friday.lebiscuit.io";
type Props = {
  email: string;
};
type Res = {
  error: boolean;
};
const MOCK_VALUE = false;

async function action(
  props: Props,
  _req: Request,
): Promise<Res | undefined> {
  const res: boolean = await new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(MOCK_VALUE);
    }, 3000);
  });
  return { error: res };
}

export default action;
