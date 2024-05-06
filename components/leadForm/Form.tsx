import { useSignal } from "@preact/signals";
import { useRef } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import Spinner from "deco-sites/casaevideo/components/ui/Spinner.tsx";

export interface Props {
    campaing?: string;
    tabelaMd: string;
}

function Form({ campaing = "NÃO DEFINIDO NO SITE EDITOR", tabelaMd = "LL" }: Props) {
    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const documentRef = useRef<HTMLInputElement>(null)
    const loading = useSignal(false)
    const resultMessage = useSignal<string>("Cadastrar");

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = phoneMask(e.target.value);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = cpfMask(e.target.value);
    };

    const phoneMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4,5})(\d)/, '$1-$2')
            .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    const cpfMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    const _submitForm = async () => {
        const email = emailRef.current?.value
        const name = nameRef.current?.value
        const phone = phoneRef.current?.value
        const document = documentRef.current?.value
        const twoSeconds = 2000

        try {
            loading.value = true
            await invoke["deco-sites/casaevideo"].actions.tableMasterdata({
                tableId: tabelaMd,
                campaign: campaing,
                cpf: document,
                email: email,
                name: name,
                phone: phone,
            });
        } catch (err) {
            console.error(err)
            resultMessage.value = "Erro ao se cadastrar"            
            setTimeout(() => {
                resultMessage.value = "Cadastrar"
            }, twoSeconds);
        } finally {
            resultMessage.value = "Cadastrado com sucesso!"
            loading.value = false

            setTimeout(() => {
                resultMessage.value = "Cadastrar"
            }, twoSeconds);
        }
    }

    return (
        <section class="absolute md:top-1/2 bottom-[-310px] max-[768px]:left-[50%] md:right-[60px] md:transform md:-translate-y-1/2 -translate-x-1/2 md:-translate-x-0 rounded-[30px] bg-[#FFF] md:max-w-[400px] w-[95%] px-2 md:px-0 max-h-[540px]">
            <form
                class="flex flex-col gap-8 p-9"
                onSubmit={(e) => {
                    e.preventDefault();
                    _submitForm();
                }}
            >
                <span class="h5-bold text-center">Cadastre-se</span>
                <input ref={nameRef} type="text" class="bg-[#f5f5f5] p-4 font-bold text-sm" name="name" placeholder="Nome" required />
                <input ref={emailRef} type="email" class="bg-[#f5f5f5] p-4 font-bold text-sm" name="email" placeholder="E-mail" required />
                <input onChange={handlePhoneChange} ref={phoneRef} type="tel" maxLength={15} class="bg-[#f5f5f5] p-4 font-bold text-sm" name="phone" placeholder="Telefone (xx) xxxxx-xxxx" required />
                <input onChange={handleCpfChange} ref={documentRef} type="text" maxLength={14} class="bg-[#f5f5f5] p-4 font-bold text-sm" name="cpf" placeholder="CPF (Opcional)" required />
                <button class="button bg-[#eb3139] p-4 font-bold text-[#FFF] rounded-[35px]" type="submit">{loading.value ? <Spinner size={24} /> : resultMessage.value}</button>
            </form>
        </section>
    );
}

export default Form;