/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "amarela"         : "bg-brand-terciary-1 ring-brand-terciary-1",
  "azul"            : "bg-[#4169E1] ring-[#4169E1]",
  "azul-claro"      : "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-escuro"     : "bg-[#00008B] ring-[#00008B]",
  "azul-marinho"    : "bg-[#000080] ring-[#000080]",
  "azul-bebe"       : "bg-[#87CEEB] ring-[#87CEEB]",
  "branca"          : "bg-[#FFFFFF] ring-[#FFFFFF]","branco": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza"           : "bg-[#808080] ring-[#808080]",
  "cinza-escura"    : "bg-[#A9A9A9] ring-[#A9A9A9]",
  "dourado"         : "bg-[#FFAC33] ring-[#FFAC33]",
  "dourada"         : "bg-[#FFAC33] ring-[#FFAC33]",
  "grafite"         : "bg-[#2F4F4F] ring-[#2F4F4F]",
  "laranja"         : "bg-[#FF5E00] ring-[#FF5E00]",
  "lilac"           : "bg-[#C8A2C8] ring-[#C8A2C8]",
  "lilas"           : "bg-[#C8A2C8] ring-[#C8A2C8]",
  "marrom"          : "bg-[#8B4513] ring-[#8B4513]",
  "marsala"         : "bg-[#8B4513] ring-[#8B4513]",
  "nude"            : "bg-[#D2B48C] ring-[#D2B48C]",
  "preta"           : "bg-[#161616] ring-[#161616]","preto":"bg-[#161616] ring-[#161616]",
  "preta-prata"     : "bg-[#464444] ring-[#464444]","preto-prata": "bg-[#464444] ring-[#464444]",
  "prata"           : "bg-[#C0C0C0] ring-[#C0C0C0]",
  "rose"            : "bg-[#FFC0CB] ring-[#FF69B4]","rosa": "bg-[#FFC0CB] ring-[#FF69B4]",
  "roxa"            : "bg-[#800080] ring-[#800080]",
  "roxo"            : "bg-[#6A0DAD] ring-[#6A0DAD]",
  "tita-nio"        : "bg-[#778899] ring-[#778899]",
  "verde"           : "bg-[#008000] ring-[#008000]",
  "verde-claro"     : "bg-[#90EE90] ring-[#90EE90]",
  "vermelho"        : "bg-[#FF0000] ring-[#FF0000]","vermelha": "bg-[#FF0000] ring-[#FF0000]",
  "vermelho-magenta": "bg-[#FF00FF] ring-[#FF00FF]",
  "violeta"         : "bg-[#8A2BE2] ring-[#701DBD]",
  "warm-gray-coza"  : "bg-[#C4BEBE] ring-[#C4BEBE]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-neutral-50 text-brand-primary-700",
  "disabled": "bg-neutral-50 text-neutral",
  "default": "bg-neutral-50 text-brand-secondary-500 hover:text-brand-primary-700",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "text-brand-terciary-700 border-brand-primary-700 border-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-brand-secondary-100 hover:border-brand-primary-700",
};

function Avatar({ content, variant = "default" }: Props) {
  const isColor = content.includes("Cor:") ;
  const parsedContent = content.split(';Image: ');
  const imageUrl = parsedContent?.[1];
  const imageContent = parsedContent[0];

  return (
    <div class="avatar placeholder md:small-regular body-regular">
      <div
        class={`rounded-md border-brand-primary-700 ${isColor ? 'w-[40px]': 'w-[90px]'} h-[40px] b ${colors[content] ?? colors[variant]} a ${variants[variant]} c`}
      >
        {isColor ? (
          <img src={imageUrl} alt={imageContent.replace("Cor: ", "")} />
        ) : (
          <span class={`uppercase text-xs`}>
            {colors[content] ? "" : content}
          </span>
        )} 
      </div>
    </div>
  );
}

export default Avatar;
