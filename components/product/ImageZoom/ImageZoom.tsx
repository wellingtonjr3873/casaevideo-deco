import Image from "apps/website/components/Image.tsx";

function zoom(event) {
  const imagem = document.getElementById('imagem') as any;
  const container = document.querySelector('.img-container');

  const rect = container?.getBoundingClientRect();

  // Calcula a posição do mouse em relação ao container
  //@ts-ignore
  const mouseX = event.clientX - rect?.left;
  //@ts-ignore
  const mouseY = event.clientY - rect?.top;

  // Calcula o percentual do zoom baseado na posição do mouse
  const percentualZoom = 2; // Ajuste conforme necessário
  const novoTamanho = (100 * percentualZoom) + '%';

  // Calcula a nova posição da imagem
  const novaPosicaoX = Math.min(0, -((mouseX * percentualZoom) - mouseX)) + 'px';
  const novaPosicaoY = Math.min(0, -((mouseY * percentualZoom) - mouseY)) + 'px';

  // Aplica o zoom e a nova posição na imagem
  imagem.style.width = novoTamanho;
  imagem.style.height = novoTamanho;
  imagem.style.transformOrigin = mouseX + 'px ' + mouseY + 'px';
  imagem.style.transform = 'scale(' + percentualZoom + ')';
  imagem.style.marginLeft = novaPosicaoX;
  imagem.style.marginTop = novaPosicaoY;
}

function reset() {
  const imagem = document.getElementById('imagem') as any;
  imagem.style.width = '';
  imagem.style.height = '';
  imagem.style.transform = '';
  imagem.style.marginLeft = '';
  imagem.style.marginTop = '';
}

export interface Props {
  url: string;
  alternateName: string
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
  const aspectRatio = `${width} / ${height}`;

  return (
    <div
     onmousemove={zoom}
     onmouseleave={reset}
     class="img-container" style="overflow: hidden;object-fit: scale-down;position: relative;width: 100%;height: 400px;">
      <Image
        id="imagem"
        class="w-full"
        sizes="(max-width: 640px) 100vw, 40vw"
        style={` aspectRatio: ${aspectRatio}; transform-origin: 816px 296px;`}
        src={url!}
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