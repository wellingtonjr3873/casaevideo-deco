import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import * as Sentry from "@sentry/react";

function GeoLocationPoint() {
    const { displayGeoLocationPointPopup } = useUI();
    const [cep, setCep] = useState('')
    const [cepForm, setCepForm] = useState({ value: '', open: false })
    const [userCurrentCep, setUserCurrentCep] = useState({ value: '', loading: false })
    const timeout = 1000;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newCep = (e.target as HTMLInputElement).value;
        newCep = newCep.replace(/\D/g, '');
        newCep = newCep.replace(/^(\d{5})(\d)/, '$1-$2');
        setCep(newCep);
        setCepForm((prev) => ({ ...prev, value: newCep }))
    };

    function submitCep(value: string) {
        if (value.length != 9) return
        const validCep = value.replace('-', '')
        setUserCurrentCep((prev) => ({ ...prev, loading: true }))
        fetch('/api/sessions', {
            method: 'PATCH',
            body: JSON.stringify({
                public: {
                    country: {
                        value: 'BRA',
                    },
                    postalCode: {
                        value: validCep,
                    },
                },
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then(() => {
                if (IS_BROWSER) {
                    localStorage?.setItem("USER_CEP", value)
                }
                setUserCurrentCep(() => ({ value: value, loading: false }))
                setTimeout(() => {
                    displayGeoLocationPointPopup.value = false
                    location.reload();
                }, timeout);
            })
            .catch((err) => {
                Sentry.captureException(err);
                console.error('ocorreu um erro', err)
                if (IS_BROWSER) {
                    localStorage?.setItem("USER_CEP", value)
                }
                setUserCurrentCep(() => ({ value: value, loading: false }))
                setTimeout(() => {
                    displayGeoLocationPointPopup.value = false
                }, timeout);
            })
    }


    function submitedCep(e: Event) {
        e.preventDefault()
        submitCep(cepForm.value)
    }

    useEffect(() => {
        const currentCepIsExist = localStorage.getItem("USER_CEP")
        if (currentCepIsExist) {
            setUserCurrentCep((prev) => ({ ...prev, value: currentCepIsExist }))
        }
    }, [])

    return (
        <>
            {/* Backdrop do pop-up geo location point */}
            {displayGeoLocationPointPopup.value &&
                <div
                    class={`inset-0 fixed z-20 bg-black bg-opacity-40 overflow-hidden`}
                    onClick={() => {
                        displayGeoLocationPointPopup.value = false
                    }}
                />
            }

            <div class="flex items-center justify-between">
                <button
                    class="flex items-center justify-between relative gap-1 items-center text-neutral-50 small-regular w-full lg:w-auto"
                    onClick={() => {
                        displayGeoLocationPointPopup.value = true
                    }}
                >
                    <Icon width={24} height={24} id={"LocationPoint"} />

                    {userCurrentCep.value.length == 9 ?
                        `Ofertas para: ${userCurrentCep.value}`
                        :
                        "Ver ofertas para a região"
                    }

                    {/* Pop-up do geo location point */}
                    {displayGeoLocationPointPopup.value &&
                        <div class="absolute bg-neutral-50 rounded-lg p-4 flex flex-col z-30 top-8 gap-4 left-[0] right-4 md:top-8 md:left-[0] w-[300px] lg:w-[342px] h-[164px]">
                            <div class="absolute w-5 min-h-[20px] bg-neutral-50 block -top-2.5 rotate-45"></div>

                            <p class="body-bold text-neutral-1 text-left">Informe seu CEP para ver ofertas exclusivas na sua região</p>

                            <form
                                class="flex gap-1 flex-col relative items-start"
                                onSubmit={submitedCep}
                            >
                                <label for="cep" class="body-regular text-neutral-1">Digite seu CEP</label>
                                <fieldset class="flex relative gap-3 items-center">
                                    <input
                                        class="bg-white border border-solid border-complementary-5 rounded-lg px-4 py-2 font-lato font-normal text-base leading-normal flex items-center text-gray-600 outline-none flex-1 w-[175px] lg:w-auto text-neutral-1"
                                        type="text"
                                        value={cep}
                                        placeholder="00000-000"
                                        maxlength={9}
                                        onChange={handleChange}
                                    />

                                    <button class="bg-white border border-gray-800 rounded-lg px-4 py-2 w-full max-w-[105px] cursor-pointer font-lato font-semibold text-base leading-normal text-center text-black min-w-[78px] w-[78px] h-[42px]" type="submit">
                                        {userCurrentCep.loading ?
                                            <div class="loading loading-spinner "></div>
                                            :
                                            "Salvar"
                                        }
                                    </button>
                                </fieldset>
                            </form>

                        </div>
                    }
                </button>
            </div>

        </>
    )
}

export default GeoLocationPoint;
