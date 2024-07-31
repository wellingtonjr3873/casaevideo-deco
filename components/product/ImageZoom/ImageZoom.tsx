import Image from "apps/website/components/Image.tsx";

function zoom(event: MouseEvent) {
  const imagem = document.getElementById('imagem') as HTMLElement;
  const container = document.querySelector('.img-container') as HTMLElement;

  const rect = container.getBoundingClientRect();

  // Calcula a posição do mouse em relação ao container
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Calcula o percentual do zoom baseado na posição do mouse
  const percentualZoom = 1.5; // Ajuste conforme necessário

  // Calcula a nova posição da imagem
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const offsetX = centerX - (mouseX * percentualZoom);
  const offsetY = centerY - (mouseY * percentualZoom);

  // Aplica o zoom e a nova posição na imagem
  imagem.style.transformOrigin = 'center center';
  imagem.style.transform = `scale(${percentualZoom}) translate(${offsetX}px, ${offsetY}px)`;
}


function reset() {
  const imagem = document.getElementById('imagem') as HTMLElement;
  imagem.style.width = '';
  imagem.style.height = '';
  imagem.style.transform = '';
  imagem.style.marginLeft = '';
  imagem.style.marginTop = '';
}

export interface Props {
  url: string;
  alternateName: string
  title?: string;
  width: number;
  height: number;
  index: number;
}

export default function ImageZoom(image: Props) {
  const { 
    url,
    alternateName,
    width,
    height,
    index,
  } = image;

  return (
    <div
     onMouseMove={zoom}
     onMouseLeave={reset}
     class="img-container max-h-[440px]">
      <Image
        id="imagem"
        class="w-full max-h-[inherit]"
        src={url!}
        title={image.title}
        alt={alternateName}
        width={width}
        height={height}
        // Preload LCP image for better web vitals
        preload={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        
      />
    </div>
  );
}