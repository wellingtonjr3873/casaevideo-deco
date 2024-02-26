import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export function PickingExpressIcon() {
  return (
    <div class="h-[24px] bg-information gap-1 small-regular rounded-md flex text-neutral-50 justify-between px-2 items-center">
      {/* <Icon id="ExpressPicking" width={24} height={24} /> bugado */}
      <svg id="ExpressPicking" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5.28 11.3139V18.9487H18.51V11.354M10.94 18.9487V14.616C10.94 13.7429 10.2326 13.035 9.36 13.035H9.15C8.27739 13.035 7.57 13.7429 7.57 14.616V18.9487M13.94 12.995H15.01C15.8329 12.995 16.5 13.6625 16.5 14.4859V14.6961C16.5 15.5195 15.8329 16.187 15.01 16.187H13.94C13.1171 16.187 12.45 15.5195 12.45 14.6961V14.4859C12.45 13.6625 13.1171 12.995 13.94 12.995ZM6.46 5H17.53L20 9.20263H4.01L6.46 5ZM4 9.20263C4 9.20263 4.07 11.2739 5.68 11.354C7.29 11.434 7.82 10.4934 7.9 9.20263H4ZM8.03 9.20263C8.03 9.20263 8.1 11.2739 9.71 11.354C11.32 11.434 11.85 10.4934 11.93 9.20263H8.03ZM12.06 9.20263C12.06 9.20263 12.13 11.2739 13.74 11.354C15.35 11.434 15.88 10.4934 15.96 9.20263H12.06ZM16.09 9.20263C16.09 9.20263 16.16 11.2739 17.77 11.354C19.38 11.434 19.91 10.4934 19.99 9.20263H16.09Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Retirada Expressa
    </div>
  );
}
