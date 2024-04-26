import { useToast } from "deco-sites/casaevideo/sdk/useToast.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export interface Props{
    className?: string; 
}

export function ToastSucess({ className }: Props){
    const { toastSucess, toastMessage } = useToast();

    if(toastSucess.value){
        setInterval(() => {
            toastSucess.value = false;
        }, 700000);

        return(
            <>
                <div class={`${className} toast-slide duration-200 z-50 flex pr-4 items-center fixed bg-success-light border border-success rounded-lg h-10 w-64 text-xs lg:text-base lg:h-[60px] lg:w-auto gap-2`}>
                    <div class={`flex gap-2 h-full w-full items-center`}>
                        <div class={`h-full flex items-center rounded-l-md bg-success px-4`}>
                            <Icon id="sucessToast" size={16}/>
                        </div>
                        <span>{`${toastMessage.value || 'Mensagem default.'}`}</span>
                    </div>
                    <button onClick={() => {
                        toastSucess.value = false;
                    }}>
                        <Icon id="closeToast" size={16}/>
                    </button>
                </div>
            </>
        )
    }

    return (<></>);
}

export function ToastInfo({ className }: Props){
    const { toastInfo, toastMessage } = useToast();

    if(toastInfo.value){
        setInterval(() => {
            toastInfo.value = false;
        }, 7000);

        return(
            <>
                <div class={`${className} toast-slide duration-200 z-50 flex pr-4 items-center fixed bg-information-light border border-information rounded-lg h-10 w-64 text-xs lg:text-base lg:h-[60px] lg:w-80`}>
                    <div class={`flex gap-2 h-full w-full items-center`}>
                        <div class={`h-full flex items-center rounded-l-md bg-information px-4`}>
                            <Icon id="infoToast" size={16}/>
                        </div>
                        <span>{`${toastMessage.value || 'Mensagem default.'}`}</span>
                    </div>
                    <button onClick={() => {
                        toastInfo.value = false;
                    }}>
                        <Icon id="closeToast" size={16}/>
                    </button>
                </div>
            </>
        )
    }

    return (<></>);
}

export function ToastWarning({ className }: Props){
    const { toastWarning, toastMessage } = useToast();

    if(toastWarning.value){
        setInterval(() => {
            toastWarning.value = false;
        }, 7000);

        return(
            <>
                <div class={`${className} toast-slide duration-200 z-50 flex pr-4 items-center fixed bg-warning-light border border-warning rounded-lg h-10 w-64 text-xs lg:text-base lg:h-[60px] lg:w-80`}>
                    <div class={`flex gap-2 h-full w-full items-center`}>
                        <div class={`h-full flex items-center rounded-l-md bg-warning px-4`}>
                            <Icon id="warningToast" size={16}/>
                        </div>
                        <span>{`${toastMessage.value || 'Mensagem default.'}`}</span>
                    </div>
                    <button onClick={() => {
                        toastWarning.value = false;
                    }}>
                        <Icon id="closeToast" size={16}/>
                    </button>
                </div>
            </>
        )
    }

    return (<></>);
}

export function ToastError({ className }: Props){
    const { toastError, toastMessage } = useToast();

    if(toastError.value){
        setInterval(() => {
            toastError.value = false;
        }, 7000);

        return(
            <>
                <div class={`${className} toast-slide duration-200 z-50 flex pr-4 items-center fixed bg-error-light border border-error rounded-lg h-10 w-64 text-xs lg:text-base lg:h-[60px] lg:w-80`}>
                    <div class={`flex gap-2 h-full w-full items-center`}>
                        <div class={`h-full flex items-center rounded-l-md bg-error px-4`}>
                            <Icon id="infoToast" size={16}/>
                        </div>
                        <span>{`${toastMessage.value || 'Mensagem default.'}`}</span>
                    </div>
                    <button onClick={() => {
                        toastError.value = false;
                    }}>
                        <Icon id="closeToast" size={16}/>
                    </button>
                </div>
            </>
        )
    }

    return (<></>);
}