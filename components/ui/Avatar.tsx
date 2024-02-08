/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

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
  active: "text-brand-primary-700 border-brand-primary-700 border-2",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "border border-brand-secondary-500 hover:border-brand-primary-700",
};

function Avatar({ content, variant = "default" }: Props) {
  const isColor = content.includes("Cor:") ;
  const parsedContent = content.split(';Image: ');
  const imageUrl = parsedContent?.[1];
  const imageContent = parsedContent[0];

  return (
    <div class="avatar placeholder md:small-regular body-regular">
      <div
        class={`rounded-md ${isColor ? 'w-[40px]': 'w-[90px]'} h-[40px] ${colors[content] ?? colors[variant]} ${
          variants[variant]
        }`}
      >
        {isColor ? (
          <img src={imageUrl} alt={imageContent.replace("Cor: ", "")} />
        ) : (
          <span class={`uppercase`}>
            {colors[content] ? "" : content}
          </span>
        )} 
      </div>
    </div>
  );
}

export default Avatar;
