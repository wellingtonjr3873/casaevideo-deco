import * as Sentry from "@sentry/react";

export type Props = Record<string, string | number | boolean>;
export type Res = {
  product: number;
};

const action = async (
  props: Props,
  _req: Request,
): Promise<Res | null> => {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const { tableId, ...restProps } = props;

  try {
    const res = await fetch(`https://casaevideonewio.myvtex.com/api/dataentities/${tableId}/documents`, {
      signal,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...restProps, // Usa restProps sem tableId
        "cnpj": "Não informado", // Adiciona ou modifica propriedades conforme necessário
      }),
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
    Sentry.captureException(err);

    return null;
  }
};

export default action;
