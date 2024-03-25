import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export function CVCreditCardBanner() {
  return (
    <div 
      class="w-full h-10 hidden md:flex items-center justify-center rounded-lg bg-gradient-to-l from-brand-terciary-1 from-[76%] to-[#ffff0000] to-[90%] relative"
    >
      <Icon class="absolute top-1/2 -translate-y-1/2 left-0 rotate-[-17deg] w-[51px] h-[43px]" id="CVCreditCard" width="51" height="43" />

      <a href="https://www.casaevideo.com.br/cartaocasaevideo">
        <span class="body-regular">Faça o seu cartão Casa&Video</span>
      </a>
    </div>
  )
}
