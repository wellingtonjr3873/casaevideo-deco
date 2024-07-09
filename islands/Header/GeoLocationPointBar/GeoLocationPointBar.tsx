import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import GeoLocationPoint from "./GeoLocationPoint.tsx";
import { useUI } from "$store/sdk/useUI.ts";

function GeoLocationPointBar() {
  const { displayGeoLocationPointPopup } = useUI();

  return (
    <>
      <a href="https://wa.me/5521991043269" target="_blank">
        <div class="flex items-center justify-center gap-10 w-full py-1 px-2 h-10 bg-brand-secondary-900 border-b border-neutral-200 flex-col lg:hidden">
          <div class="flex items-center self-stretch justify-between w-full gap-1 px-2 lg:px-0">
            <button class="flex justify-between pl-1 relative gap-2 items-center text-neutral-50 small-regular lg:w-auto">
              <Icon width={16} height={16} id={"Whatsapp"} />
              Compre pelo WhatsApp: (21) 99104-3269
            </button>
            <Icon width={16} height={16} id={"ArrowDirectionRight"} />
          </div>
        </div>
      </a>

      <div class="flex items-center w-full py-1 px-2 h-10 bg-brand-secondary-900">
        <div class="flex items-center justify-between w-full max-w-[1280px] mx-auto px-2 lg:px-0">
          {/* Geo Location Point */}
          <div>
            <GeoLocationPoint />
          </div>

          {/* Televendas Links */}
          <div class="flex items-center gap-8 hidden lg:flex">
            <a class="flex gap-1 items-center text-neutral-50 small-underline" href="/televendas">
              <Icon width={24} height={24} id={"Televenda"} />
              Televendas: (21) 4002-3535
            </a>
            <a class="flex gap-1 items-center text-neutral-50 small-underline" href="https://wa.me/5521991043269" target="_blank">
              <Icon width={24} height={24} id={"Whatsapp"} />
              Compre pelo WhatsApp: (21) 99104-3269
            </a>
          </div>
          <button
            class="lg:hidden"
            onClick={() => {
              displayGeoLocationPointPopup.value = true
            }}
          >
            <Icon width={16} height={16} id={"ArrowDirectionRight"} />
          </button>
        </div>
      </div>
    </>

  )
}

export default GeoLocationPointBar;
