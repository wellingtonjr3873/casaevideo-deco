
import { Signal } from "@preact/signals";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { OpenModalType } from "deco-sites/casaevideo/components/product/ProductImageZoom.tsx";
import { useId } from "deco-sites/casaevideo/sdk/useId.ts";
import Modal from "deco-sites/casaevideo/components/ui/Modal.tsx";


export interface Modal3DProps {
  open: Signal<OpenModalType>;
  imageSource?: ImageWidget;
    
}

export default function Modal3D(props: Modal3DProps ) {
  const { open, imageSource } = props;
  const id = useId();

  return (
    <div id={id}>
      <Modal
        loading="lazy"
        open={open.value === "Product3D"}
        onClose={() => open.value = "None"}
      >
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative w-full h-[579px] md:w-[795px] top-20 mx-auto p-4 border-0 md:border shadow-lg rounded-md bg-neutral-50">
            <div className="text-center flex flex-col items-center">
              <h2 className="mb-4 md:mb-8 h6-bold">Nome do Produto</h2>  
              <img
                class="w-[296px] md:w-[264px] h-[233px] md:h-[291px]"
                src={imageSource}
                decoding="async"
                loading="lazy"
              />
              <div className="flex gap-8 w-[296px] md:w-[535px] border-[1px] rounded-lg  border-neutral-400 p-4 mt-8">

                <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_11908_26571)">
                    <path d="M0.0106771 29.7888C0.95026 27.7805 1.88984 25.7721 2.81875 23.7638C4.64453 19.8222 6.47031 15.8807 8.27474 11.9392C8.48828 11.4774 8.76588 11.2948 9.26771 11.3163C9.75885 11.3485 10.25 11.3163 10.7518 11.327C11.2216 11.3377 11.4779 11.5633 11.4779 11.9499C11.4672 12.3151 11.2323 12.5299 10.7732 12.5299C10.4529 12.5406 10.1326 12.5513 9.81224 12.5299C9.47057 12.4976 9.29974 12.6265 9.15026 12.938C6.77995 18.0931 4.38828 23.2482 2.00729 28.4034C1.86849 28.7041 1.72969 29.0048 1.55885 29.3807C1.7724 29.3807 1.93255 29.3807 2.08203 29.3807C4.90078 29.3807 7.70885 29.3807 10.5276 29.3807C10.6771 29.3807 10.8266 29.37 10.9654 29.3914C11.2643 29.4344 11.4458 29.6277 11.4672 29.9284C11.4885 30.2291 11.3497 30.4547 11.0615 30.5406C10.912 30.5836 10.7411 30.5836 10.5917 30.5836C7.64479 30.5836 4.69792 30.5836 1.75104 30.5836C1.59089 30.5836 1.43073 30.5836 1.24922 30.5836C1.24922 31.0454 1.24922 31.475 1.24922 31.9583C1.42005 31.9583 1.56953 31.9583 1.72969 31.9583C4.67656 31.9583 7.62344 31.9583 10.5703 31.9583C10.6984 31.9583 10.8372 31.9475 10.9654 31.969C11.2643 32.0227 11.4458 32.1945 11.4672 32.506C11.4885 32.8067 11.3497 33.0322 11.0615 33.1182C10.9227 33.1611 10.7732 33.1611 10.6237 33.1611C7.36719 33.1611 4.11068 33.1611 0.854167 33.1719C0.491146 33.1719 0.202865 33.0859 0 32.7745C0.0106771 31.7757 0.0106771 30.7769 0.0106771 29.7888Z" fill="black"/>
                    <path d="M41.0113 32.764C40.8085 33.0754 40.5202 33.1614 40.1572 33.1614C36.9006 33.1506 33.6441 33.1506 30.3876 33.1506C30.2381 33.1506 30.0887 33.1506 29.9499 33.1077C29.6616 33.0217 29.5228 32.7962 29.5441 32.4955C29.5655 32.184 29.747 32.0122 30.046 31.9585C30.1741 31.937 30.3129 31.9478 30.441 31.9478C33.3772 31.9478 36.3134 31.9478 39.2496 31.9478C39.4098 31.9478 39.5699 31.9478 39.7621 31.9478C39.7621 31.4967 39.7621 31.0671 39.7621 30.573C39.6233 30.573 39.4632 30.573 39.3137 30.573C36.3561 30.573 33.3879 30.573 30.4303 30.573C30.2702 30.573 30.11 30.573 29.9605 30.5301C29.6723 30.4442 29.5228 30.2294 29.5548 29.9179C29.5762 29.6065 29.7577 29.4239 30.0566 29.3809C30.1954 29.3594 30.3449 29.3702 30.4944 29.3702C33.2918 29.3702 36.0999 29.3702 38.8973 29.3702C39.0574 29.3702 39.2176 29.3702 39.4418 29.3702C39.3777 29.2091 39.3457 29.0909 39.2923 28.9835C36.8046 23.6136 34.3168 18.233 31.8397 12.863C31.7223 12.6053 31.5835 12.5086 31.2952 12.5193C30.9322 12.5408 30.5798 12.5301 30.2168 12.5193C29.7897 12.5086 29.5548 12.2938 29.5441 11.9394C29.5335 11.5635 29.779 11.3272 30.2275 11.3165C30.772 11.3057 31.3165 11.3272 31.8717 11.3057C32.2881 11.295 32.5337 11.4776 32.7046 11.8535C33.7509 14.1518 34.8186 16.4394 35.8863 18.727C37.552 22.3141 39.2069 25.912 40.8618 29.4991C40.9046 29.5957 40.9579 29.6816 41.0113 29.7783C41.0113 30.7771 41.0113 31.7759 41.0113 32.764Z" fill="black"/>
                    <path d="M12.8456 19.6183C12.8456 16.0849 12.8456 12.5407 12.8456 9.00732C12.8456 7.19228 13.8706 6.16125 15.6644 6.16125C18.9102 6.16125 22.1454 6.16125 25.3912 6.16125C27.1316 6.16125 28.1779 7.20302 28.1779 8.96436C28.1779 16.0956 28.1779 23.2161 28.1779 30.3474C28.1779 32.1087 27.1316 33.1505 25.3912 33.1505C22.1347 33.1505 18.8782 33.1505 15.6217 33.1505C13.8813 33.1505 12.835 32.098 12.835 30.3474C12.8456 26.771 12.8456 23.1947 12.8456 19.6183ZM16.6787 7.36412C16.305 7.36412 15.974 7.36412 15.6324 7.36412C14.5433 7.36412 14.0415 7.86889 14.0415 8.96436C14.0415 16.0849 14.0415 23.2161 14.0415 30.3367C14.0415 31.4321 14.5433 31.9369 15.6217 31.9369C18.8462 31.9369 22.0813 31.9369 25.3058 31.9369C26.4909 31.9369 26.9714 31.4536 26.9714 30.2508C26.9714 23.1839 26.9714 16.1064 26.9714 9.03954C26.9714 8.85696 26.9714 8.66364 26.9394 8.48106C26.8326 7.89037 26.4803 7.493 25.9037 7.40708C25.4019 7.34264 24.8787 7.39634 24.3235 7.39634C24.3235 7.63262 24.3342 7.83667 24.3235 8.05147C24.2701 9.17915 23.512 9.9202 22.391 9.93094C21.1097 9.94168 19.8285 9.94168 18.5472 9.93094C17.5756 9.9202 16.8282 9.22211 16.7214 8.25553C16.6894 7.97629 16.6894 7.69705 16.6787 7.36412ZM23.117 7.39634C21.3553 7.39634 19.6469 7.39634 17.9173 7.39634C17.9173 7.6541 17.8959 7.87963 17.9173 8.10517C17.96 8.4918 18.1842 8.72808 18.5686 8.72808C19.8605 8.73882 21.1524 8.73882 22.4443 8.72808C22.8394 8.72808 23.0636 8.4918 23.1063 8.10517C23.1383 7.89037 23.117 7.6541 23.117 7.39634Z" fill="black"/>
                    <path d="M15.4176 20.9283C15.4176 20.112 15.4282 19.2958 15.4176 18.4796C15.4069 18.0715 15.5457 17.803 15.9087 17.5989C17.2967 16.7934 18.6634 15.9772 20.0407 15.1502C20.3824 14.9462 20.6707 14.9462 21.0017 15.1502C22.3683 15.9772 23.7457 16.7934 25.1337 17.5989C25.486 17.803 25.6249 18.0822 25.6249 18.4796C25.6142 20.1228 25.6142 21.7767 25.6249 23.4199C25.6249 23.828 25.486 24.0965 25.1337 24.3006C23.767 25.0953 22.4004 25.9116 21.0444 26.7278C20.6814 26.9533 20.3717 26.9426 20.0087 26.7171C18.6527 25.8901 17.286 25.0846 15.9087 24.2898C15.567 24.0965 15.4176 23.8388 15.4176 23.4521C15.4282 22.6144 15.4176 21.7767 15.4176 20.9283ZM16.6134 22.5607C16.7202 22.5178 16.7736 22.5178 16.8056 22.4856C17.7665 21.9163 18.7381 21.3471 19.6884 20.7672C19.8058 20.692 19.8913 20.4987 19.8913 20.3483C19.9126 19.5858 19.9019 18.8233 19.9019 18.0607C19.9019 17.6097 19.9019 17.1586 19.9019 16.7183C19.8272 16.7183 19.7952 16.6968 19.7738 16.7075C18.7702 17.2982 17.7665 17.8782 16.7842 18.4903C16.6775 18.5548 16.6134 18.7481 16.6134 18.8877C16.592 19.6395 16.6027 20.3913 16.6027 21.1323C16.6134 21.5941 16.6134 22.056 16.6134 22.5607ZM24.3756 22.5822C24.397 22.4748 24.4077 22.4533 24.4077 22.4319C24.4077 21.5619 24.3329 20.6813 24.429 19.8221C24.5358 18.877 24.2155 18.3292 23.3506 17.9426C22.5926 17.6097 21.9092 17.1049 21.1298 16.6538C21.1191 16.8471 21.1084 16.976 21.1084 17.1049C21.1084 17.8674 21.1832 18.6407 21.0871 19.3925C20.9696 20.3698 21.3006 20.939 22.1975 21.3364C22.9556 21.6586 23.6282 22.1419 24.3756 22.5822ZM23.8311 23.6669C22.742 23.0225 21.7277 22.4211 20.7027 21.8197C20.6173 21.766 20.4571 21.7445 20.3824 21.7875C19.336 22.3889 18.3004 23.0118 17.2113 23.6669C18.3111 24.3113 19.3467 24.9342 20.3931 25.5357C20.4678 25.5786 20.6066 25.5679 20.6814 25.5249C21.7064 24.9342 22.7314 24.3113 23.8311 23.6669Z" fill="black"/>
                    <path d="M20.4894 12.5192C19.1014 12.5192 17.7133 12.5192 16.3253 12.5192C16.1758 12.5192 15.9943 12.5621 15.8982 12.487C15.7167 12.3473 15.4605 12.154 15.4498 11.9714C15.4284 11.7781 15.6313 11.5311 15.8021 11.3808C15.9089 11.2841 16.1331 11.3163 16.304 11.3163C19.1014 11.3163 21.8988 11.3163 24.7068 11.3163C24.8029 11.3163 24.899 11.3163 24.9844 11.3163C25.3581 11.3485 25.6037 11.5955 25.6037 11.9285C25.6037 12.2614 25.3581 12.5084 24.9738 12.5192C24.1303 12.5299 23.2975 12.5299 22.454 12.5299C21.8027 12.5192 21.1514 12.5192 20.4894 12.5192Z" fill="black"/>
                    <path d="M20.552 29.3698C21.908 29.3698 23.2747 29.3698 24.6307 29.3698C24.7481 29.3698 24.8762 29.3698 24.9937 29.3698C25.3567 29.3912 25.5809 29.6168 25.6023 29.939C25.6129 30.2719 25.378 30.5619 25.0044 30.5619C22.0041 30.5726 19.0038 30.5726 16.0036 30.5619C15.6405 30.5619 15.395 30.2612 15.4163 29.9282C15.4377 29.5953 15.6833 29.3698 16.0676 29.3698C17.5624 29.3698 19.0572 29.3698 20.552 29.3698Z" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_11908_26571">
                      <rect width="41" height="38" fill="white" transform="translate(0 0.666504)"/>
                    </clipPath>
                  </defs>
                </svg>


                <p className="text-left x-small-regular md:small-regular self-center ml-4 max-w-[191px] md:max-w-[430px] md:ml-0">
                  Você está vendo uma versão 3D do produto, você pode rotaciona-lo para ver em outros angulos!
                </p>

              </div>
              <div className="mt-8 flex-col-reverse md:flex-row flex gap-2.5">
                <button
                  className="w-[296px] md:w-[180px] h-[44px] md:h-[48px] border-[1px] rounded-md border-neutral-400"
                  onClick={() => open.value = "None"}
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

            <button
              onClick={() => open.value = "None"}
              className="absolute cursor-pointer top-4 right-4" 
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.6 9.6L14.4 14.4M14.4 9.6L9.6 14.4M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="#393939" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </Modal>
    </div>
  );
}
