
import { useRef } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";

type Props = {
  buttonText: string
  placeholder: string
}


function Newsletter(props: Props) {
  const emailRef = useRef<HTMLInputElement>(null)
  const _submitForm = async () => {
    const email = emailRef.current?.value
    try{
        await invoke['deco-sites/casaevideo'].loaders.newslettter({email: email!})
    }catch(err){
      console.error(err)
    }
  }

  return <form class="h-[48px] flex gap-2 items-center w-full max-w-[593px] justify-center" onSubmit={(e) => {
    e.preventDefault();
    _submitForm()
  }}>
  <input ref={emailRef} type="text" class="h-full rounded-lg w-full  max-w-[172px] lg:max-w-[485px] pl-4 border border-neutral-100 body-regular text-neultral-900 outline-none" placeholder={props.placeholder}/>
  <button class="h-full bg-brand-primary-1 px-4 body-regular rounded-md text-neutral-50" type="submit" >{props.buttonText}</button>
</form>
}

export default Newsletter;
