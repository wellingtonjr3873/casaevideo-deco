
// import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";

import type { VideoWidget } from "apps/admin/widgets.ts";


export interface ModalVideoProps {
    // srcMobile: VideoWidget;
    srcDesktop?: VideoWidget;
    
  }

export default function ModalVideo( props: ModalVideoProps ) {
  const isOpen = useSignal(false);

  const openModal = () => isOpen.value=true;
  const closeModal = () => isOpen.value=false;

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Vídeo
      </button>
      {isOpen.value && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative w-full h-[525px] md:w-[795px] top-20 mx-auto p-4 border-0 md:border shadow-lg rounded-md bg-neutral-50">
            <div className="text-center flex flex-col items-center">
              <h2 className="mb-4 md:mb-8 h6-bold">Nome do Produto</h2>  
              <video className="rounded-lg w-[296px] md:w-[599px] h-[351px] md:h-[337px]" controls>
                <source src={props.srcDesktop} type="video/mp4" />
                
              </video>
              <div className="mt-8 flex-col-reverse md:flex-row flex gap-2.5">
                <button
                  className="w-[296px] md:w-[180px] h-[44px] md:h-[48px] border-[1px] rounded-md border-neutral-400"
                  onClick={closeModal}
                >
                  Voltar
                </button>
                <button className="flex  w-[296px] md:w-[180px] h-[44px] md:h-[48px] border-[1px] rounded-md items-center justify-center bg-brand-primary-1 text-[white]">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_11896_15940)">
                            <path d="M10.4999 18.6666C10.8681 18.6666 11.1666 18.3682 11.1666 18C11.1666 17.6318 10.8681 17.3333 10.4999 17.3333C10.1317 17.3333 9.83325 17.6318 9.83325 18C9.83325 18.3682 10.1317 18.6666 10.4999 18.6666Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.8334 18.6666C18.2016 18.6666 18.5001 18.3682 18.5001 18C18.5001 17.6318 18.2016 17.3333 17.8334 17.3333C17.4652 17.3333 17.1667 17.6318 17.1667 18C17.1667 18.3682 17.4652 18.6666 17.8334 18.6666Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.16675 4.66669H7.83341L9.62008 13.5934C9.68104 13.9003 9.84802 14.176 10.0918 14.3722C10.3355 14.5684 10.6405 14.6727 10.9534 14.6667H17.4334C17.7463 14.6727 18.0513 14.5684 18.2951 14.3722C18.5388 14.176 18.7058 13.9003 18.7667 13.5934L19.8334 8.00002H8.50008" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_11896_15940">
                                <rect width="16" height="16" fill="white" transform="translate(4.5 4)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    Comprar
                </button>
              </div>
            </div>

            <svg
              onClick={closeModal}
              className="absolute top-4 right-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.6 9.6L14.4 14.4M14.4 9.6L9.6 14.4M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="#393939" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

        </div>
      )}
    </div>
  );
}
