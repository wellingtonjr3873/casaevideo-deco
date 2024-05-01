import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import Spinner from "deco-sites/casaevideo/components/ui/Spinner.tsx";

export interface Props {
    campaing: string;
    tabelaMd: string;
}

function Form({campaing = "NÃO DEFINIDO NO SITE EDITOR", tabelaMd = "LL" }: Props) {
    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const documentRef = useRef<HTMLInputElement>(null)
    const loading = useSignal(false)
    const result = useSignal<null | boolean>(null);

    const _submitForm = async () => {
        const email = emailRef.current?.value
        console.log('aqui - const_submitForm= - email', email)
        const name = nameRef.current?.value
        console.log('aqui - const_submitForm= - name', name)
        const phone = phoneRef.current?.value
        console.log('aqui - const_submitForm= - phone', phone)
        const document = documentRef.current?.value
        console.log('aqui - const_submitForm= - document', document)


        // try {
        //     loading.value = true
        //     await invoke["deco-sites/casaevideo"].actions.tableMasterdata({
        //         tableId: tabelaMd,
        //         campaign: campaing,
        //         cpf: document,
        //         email: email,
        //         name: name,
        //         phone: phone,
        //     });
        // } catch (err) {
        //     console.error(err)
        //     result.value = false
        // } finally {
        //     loading.value = false
        // }
    }

    return (
        <section class="absolute top-1/2 right-[60px] transform -translate-y-1/2 rounded-[30px] bg-[#FFF] max-w-[400px] w-full">
            <form
                class="flex flex-col gap-8 p-9"
                onSubmit={(e) => {
                    e.preventDefault();
                    _submitForm()
                }}
            >
                <span class="h5-bold text-center">Cadastre-se</span>
                <input ref={nameRef} type="text" class="bg-[#f5f5f5] p-4 font-bold text-sm" name="name" placeholder="Nome" required />
                <input ref={emailRef} type="email" class="bg-[#f5f5f5] p-4 font-bold text-sm" name="email" placeholder="E-mail" required />
                <input ref={phoneRef} type="tel" maxLength={15} class="bg-[#f5f5f5] p-4 font-bold text-sm" name="phone" placeholder="Telefone (xx) xxxxx-xxxx" required />
                <input ref={documentRef} type="text" maxLength={14} class="bg-[#f5f5f5] p-4 font-bold text-sm" name="cpf" placeholder="CPF (Opcional)" required />
                <button class="button bg-[#eb3139] p-4 font-bold text-[#FFF] rounded-[35px]" type="submit">{loading.value ? <Spinner size={24} /> : "Cadastrar"}</button>
            </form>
        </section>
    );
}

export default Form;