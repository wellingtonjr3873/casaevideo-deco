const URL_HOST = "https://localhost:3000";

type Props = {
  email: string;
};
type Res = {
  data: {
    error: boolean;
  };
};

async function action(
  props: Props,
  _req: Request,
): Promise<Res | undefined> {
  const url = `${URL_HOST}/roleta-black-friday/check_user`;

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
    console.log(`error`, error);
    console.error("Error fetching data:", error);
  }
}

export default action;
