export interface Props {
  tableId: string;
  campaign: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export type Res = {
  product: number;
};

const action = async (
  props: Props,
  _req: Request,
): Promise<Res | null> => {
  const { tableId, name, email, phone, cpf, campaign } = props;
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const res = await fetch(`/api/dataentities/${tableId}/documents`, {
      signal,
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        "campaign": campaign,
        "cnpj": "Não informado",
        "cpf": cpf,
        "email": email,
        "name": name,
        "phone": phone,
      }),
    });
    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default action;
