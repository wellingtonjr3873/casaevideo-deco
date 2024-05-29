
import { useRef } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import { useSignal } from "@preact/signals";
import Spinner from "deco-sites/casaevideo/components/ui/Spinner.tsx";
import * as Sentry from "@sentry/react";

type Props = {
  buttonText: string
  placeholder: string
}


function Newsletter(props: Props) {
  const emailRef = useRef<HTMLInputElement>(null)
  const loading = useSignal(false)
  const emailError = useSignal(false);
  const result = useSignal<null | boolean>(null);


  const validEmail = (value: string) => {
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const validateEmail = regex.test(value);
    
    return !validateEmail
  }

  const _submitForm = async () => {
    const email = emailRef.current?.value

    if(validEmail(email!)) {
      emailError.value = true
      result.value = false
      return
    }else{
      emailError.value = false
    }


    try{
        loading.value = true
        const res = await invoke['deco-sites/casaevideo'].loaders.newslettter({email: email!})
        result.value = res
    }catch(err){
      console.error(err)
      Sentry.captureException(err);

      result.value = false
    }finally{
      loading.value = false
      
    }
  }

  const message = (() => {
    if(emailError.value){
      return "Email inválido"
    } 
    else if(result.value){
      return "Cadastrado com sucesso"
    }
    return "Erro ao cadastrar-se"
  })()

  const isRequestAlreadyMake = typeof(result.value) === "boolean"

  return <form class="h-[48px] flex gap-2 items-center w-full max-w-[593px] justify-center" onSubmit={(e) => {
    e.preventDefault();
    _submitForm()
  }}>
    <div class="max-w-[172px] lg:max-w-[485px] w-full h-[48px]">
       <input ref={emailRef} type="text" class="h-full rounded-lg w-full pl-4 border border-neutral-100 body-regular text-neultral-900 outline-none" placeholder={props.placeholder}/>
        {isRequestAlreadyMake && <span class={`pl-4 small-regular mt-1 ${result.value ? "text-success" : "text-error"}`}>{message}</span>}
    </div>
  <button class="h-full bg-brand-primary-1 px-4 body-regular rounded-md text-neutral-50 w-[100px]" type="submit" >{loading.value ? <Spinner size={24} /> : props.buttonText}</button>
</form>
}

export default Newsletter;
