import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

function GeoLocationPoint() {
    const { displayGeoLocationPointPopup } = useUI();

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
                    Ver ofertas para a região

                    {/* Pop-up do geo location point */}
                    {displayGeoLocationPointPopup.value &&
                        <div class="absolute bg-neutral-50 rounded-lg p-4 flex flex-col z-30 top-8 gap-4 left-[0] right-4 md:top-8 md:left-[0] w-[342px] h-[164px]">
                            <div class="absolute w-5 min-h-[20px] bg-neutral-50 block -top-2.5 rotate-45"></div>

                            <p class="body-bold text-neutral-1 text-left">Informe seu CEP para ver ofertas exclusivas na sua região</p>

                            <form class="flex gap-1 flex-col relative items-start">
                                <label for="cep" class="body-regular text-neutral-1">Digite seu CEP</label>
                                <fieldset class="flex relative gap-3 items-center">
                                    <input class="bg-white border border-solid border-complementary-5 rounded-lg px-4 py-2 font-lato font-normal text-base leading-normal flex items-center text-gray-600 outline-none flex-1" placeholder="00000-000" value="" />

                                    <button class="bg-white border border-gray-800 rounded-lg px-4 py-2 w-full max-w-[105px] cursor-pointer font-lato font-semibold text-base leading-normal text-center text-black" type="submit">Salvar</button>
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
