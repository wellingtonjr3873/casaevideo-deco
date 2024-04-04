
export type Props = {
    productId: string,
    userId: string,
    tenant: "CV" | "LB"
}
const loader = async (props: Props): Promise<any> => {
    const pathsDictionary = {
        "CV": "",
        "LB": ""
    }

    const payload = JSON.stringify({
        productId: props.productId,
        skuId: props.skuId
    });

    const res = await fetch(pathsDictionary[props.tenant], {
        method: "POST",
        body: payload,
        headers: {
        }
    })

    return res
}

export default loader