// import Image from "apps/website/components/Image.tsx";
// import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";

// export interface Props{
//     imgBox: ImageWidget;
//     alt: string;
//     content: HTMLWidget;
// }

export default function BaixeOApp() {
 

  return (
    <div className="flex flex-col items-center bg-[#7c07f3] text-white font-sans">

        <div className="flex justify-center items-center p-4 text-center">
                <img className="max-w-[227px] md:max-w-[517px] max-h-[157px] z-[2] md:max-h-[357px]" src="https://casaevideonewio.vteximg.com.br/arquivos/baixeoapp-woman.png" alt="foto de uma mulher" />
                <img className="max-w-[131px] max-h-[137px] md:max-w-[298px] md:max-h-[312px] z-[2] ml-[-40px] md:ml-[-110px]" src="https://casaevideonewio.vteximg.com.br/arquivos/baixaoapp-man.png" alt="foto de um homem" />
                <div className="hidden md:flex justify-center pb-[15px] items-center w-[746px] rounded-[39px] ml-[-200px] m-auto border-solid border-[6px] border-[#fff] h-[239px]">
                <p className=" text-[#fff] text-[46px] p-[80px] text-center font-bold">BAIXE O APP CASA&VIDEO</p>
        </div>
        </div>

        <div className="flex justify-center mt-[-100px] md:hidden mb-[16px] pb-[15px] w-[287px] rounded-[39px] m-auto items-end border-solid border-[3px] border-[#fff] h-[140px]">
                <p className=" text-[#fff] text-[20px] text-center font-bold">BAIXE O APP CASA&VIDEO</p>
        </div>

        <div className="flex md:hidden items-center px-[20px] bg-[#fe0d90] mb-[5px] rounded-[100px] text-center  max-w-[348px] m-auto">
            <p className="text-[20px] text-[#fff]">GANHE<span className=" ml-[5px] text-[24px] font-bold text-[#fff]">10% DE DESCONTO</span> </p>
        </div>

        <div className="hidden md:flex items-center px-[20px] bg-[#fe0d90] mb-[60px] rounded-[100px] text-center h-[75px] max-w-[1020px] m-auto px-[37px]" >
            <p className="text-[38px] text-[#fff]">GANHE<span className=" ml-[5px] text-[45px] font-bold text-[#fff]">10% DE DESCONTO</span> NA PRIMEIRA COMPRA</p>
        </div>

        <p className="md:hidden text-[20px] text-center mb-[7px] text-[#fff]">NA PRIMEIRA COMPRA</p>

        <p className="text-[13px] md:text-[22px] md:text-left max-w-[292px] md:max-w-[1366px] m-auto text-center mb-[7px] text-[#fff]">*Desconto de 10% na primeira compra no APP, válido apenas para produtos vendidos e entregues pela CASA&VIDEO. Exceto celulares, smartphones, tablets, linha game, informática, alimentos e bebidas, linha Casa inteligente, notebook, consoles, Tvs e SmartTVs. Preços e condições de pagamento exclusivos para compras via internet, podendo variar nas lojas físicas. Cupom válido para um CPF e e-mail. Em caso de os produtos apresentem divergências de valores, o preço válido é o da sacola de compras. Vendas sujeitas a análise e confirmação de dados.</p>

        <div className="flex gap-[15px] items-center">

            <img className="max-w-[236px] md:max-w-full m-auto" src="https://casaevideonewio.vteximg.com.br/arquivos/baixe-celular.png" alt="foto de um celular" />

            <div className="hidden md:flex flex-col" >
                <p className="text-[16px] md:text-[34px] ml-[20px] mb-[30px] max-w-[295px] md:max-w-[379px] m-auto text-center md:text-left text-[#fff]">No <span className="text-[16px] md:text-[34px] text-center font-bold text-[#fff]">APP Casa&Video</span>, voce encontra todos os itens da nossa loja em suas mãos e garante <span className="text-[16px] md:text-[34px] text-center font-bold text-[#fff] ">descontos exclusivos!</span></p>

                <div className="flex bg-[#fff] justify-center items-center max-w-[396px] rounded-[39px] flex-col">
                    <p className="text-center text-[22px] text-[#7c07f3] m-[30px]">Aponte a câmera do seu celular para o QR Code e <span className="font-bold">baixe agora!</span></p>
                    <img className="max-w-[227px] md:max-w-[517px] max-h-[157px] pb-[15px] z-[2] md:max-h-[357px]" src="https://casaevideonewio.vteximg.com.br/arquivos/qr-code-baixe-app.png" alt="qr code" />
                </div>
            </div>

        </div>

        <p className=" md:hidden text-[16px] max-w-[295px] m-auto mb-[9px] text-center text-[#fff]">No <span className="text-[16px] text-center font-bold text-[#fff]">APP Casa&Video</span>, voce encontra todos os itens da nossa loja em suas mãos e garante <span className="text-[16px] text-center font-bold text-[#fff]">descontos exclusivos!</span></p>

        <div className=" md:hidden  pb-[80px]">
            <a href="https://casaevideo.onelink.me/zJCx/aggpfxpn" className="flex items-center justify-center h-[40px] w-[153px] m-auto bg-[#fff] rounded-[7px]">
                <span className="text-[#7c07f3] font-bold text-[18px]">BAIXE AGORA</span>
            </a>

        </div>
        
            
    </div>
  );
}


