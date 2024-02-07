import MobileApps from "$store/components/footer/MobileApps.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";





export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "Youtube";
  link: string;
}

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Pix"
    | "Visa"
    | "Hypercard"
    | "Picpay"
    | "Casaevideo"
    | "AmericanExpress";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface Security {
  images?: ImageWidget[];
}

export interface DevelopedBy {
  images?: ImageWidget[];
}

export interface Props {
  categories?: {
    label: string;
    link: string;
  }[];
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  security?: Security;
  aboutEnterprise?: string;
  footerRodapeText?: string;
  developedBy?: DevelopedBy;
}

function Footer({
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }, {
      label: "Facebook",
      link: "/",
    }, { label: "Youtube", link: "/" }],
  },
  payments = {
    items: [
      { "label": "Casaevideo" },
      { "label": "Diners" },
      { "label": "Elo" },
      { "label": "Mastercard" },
      { "label": "Visa" },
      { "label": "Hypercard" },
      { "label": "Picpay" },
      { "label": "AmericanExpress" },
      { "label": "Pix" },
    ],
  },
  mobileApps = { apple: "/", android: "/" },
  security,
  categories = [
    { label: "Telefonias e Celulares", link: "/" },
    { label: "Telefonias e Celulares", link: "/" },
    { label: "Telefonias e Celulares", link: "/" },
    { label: "Telefonias e Celulares", link: "/" },
    { label: "Telefonias e Celulares", link: "/" },
  ],
  aboutEnterprise =
    `Casa e Video Brasil S/A - CNPJ: 11.114.284/0001-63 - Rua da Assembléia, 100 (7º, 8º e 9º andar) - Rio de Janeiro/RJ - CEP 20.011-904
  Os preços, promoções e condições de pagamento são válidos durante o dia de hoje, para o site e Televendas, não valendo necessariamente para nossa rede de lojas físicas.
  O frete não está incluído no preço do produto. Ofertas válidas enquanto durarem nossos estoques. As fotos de produtos são meramente ilustrativas.`,
  footerRodapeText =
    `2022 . Casa e Video Brasil S/A © Todos os direitos reservados`,
  developedBy,
}: Props) {


  return (
    <footer class="w-full flex flex-col">
      <div class="w-full max-w-[1355px] my-0 mx-auto mb-[32px] lg:px-[16px] min-[1371px]:px-0">
        {/* {top-content-desktop} */}
        <div class="flex flex-col-reverse lg:flex-row lg:justify-between">
          <FooterItems
            sections={sections}
            categories={categories}
            justify={false}
          />
          {/* {mobile-apps} */}
          <div class="flex flex-col bg-neutral-50 lg:bg-[white] items-center py-[16px] lg:py-0">
            <h2 class="small-bold text-left mb-[8px]">Baixe o app</h2>
            <MobileApps content={mobileApps} />
            <h2 class="small-bold text-left mb-[8px]">
              Siga-nos nas mídias sociais
            </h2>
            <div class="flex gap-[8px] items-center justify-start">
              {social.items.map((item) => {
                return (
                  <a href={item.link} class="p-[8px]">
                    <Icon
                      size={32}
                      id={item.label}
                      class="text-brand-secondary-900 md:h-max md:w-max"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/*categories */}
        <div class="mt-[32px] hidden lg:block">
          <h2 class="small-bold mb-[24px]">Categorias</h2>
          <ul class="grid grid-cols-4 gap-y-[12px]">
            {categories.map((item) => {
              return (
                <li>
                  <a class="small-regular text-neutral-900" href={item.link}>
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div class="mt-[32px] px-[16px] lg:p-0 flex flex-col lg:flex-row gap-[32px] lg:gap-[72px] lg:items-center mb-[32px] lg:mb-0">
          {/* pagamentop */}
          <div>
            <h2 class="small-bold mb-[12px]">Pagamento</h2>
            <ul class="flex flex-row flex-wrap max-w-[280px] lg:max-w-none">
              {payments.items.map((item) => {
                return (
                  <li class="w-[40px] h-[40px] flex items-center justify-center">
                    <Icon width={26.7} height={19.7} id={item.label} />
                  </li>
                );
              })}
            </ul>
          </div>
          {/* segurança */}
          <div>
            <h2 class="small-bold mb-[8px] lg:hidden">Segurança</h2>

            <ul class="flex flex-wrap items-center lg:gap-[12px] lg:flex-nowrap">
              {security?.images?.map((item) => {
                return (
                  <li>
                    <img src={item} />
                  </li>
                );
              })}
            </ul>
          </div>
          {/* voltar ao topo 8*/}
          <a
            href="#1654193389"
            class="w-[136px] hidden lg:flex py-[8px] px-[12px] small-regular text-[white] items-center justify-center rounded-[6px] bg-brand-primary-1 gap-[8px] text-nowrap"
          >
            Voltar ao topo
            <Icon id="ChevronTop" size={16} fill="white" />
          </a>
        </div>
        <div class="flex flex-col gap-[16px] items-center mb-[32px ]">
          <p class="text-center x-small-regular text-brand-secondary-900 px-[24px]">
            {aboutEnterprise}
          </p>
          <div class="flex gap-[16px]">
            <p class="flex gap-[8px] small-underline text-brand-secondary-900">
              <Icon id="Padlock" size={25} />
              <a href="">Politica de privacide</a>
            </p>
            <span class="h-[23px] w-[1px] bg-brand-secondary-300" />
            <a href="" class="small-underline text-brand-secondary-900">
              Termos de uso
            </a>
          </div>
        </div>
        {/* sobre a empresa */}
        <div>
        </div>
      </div>

      {/* rodape */}
      <div class="h-[60px] lg:h-[46px] flex items-center justify-center bg-brand-terciary-1 ">
        <div class="lg:grid grid-cols-3 w-full flex justify-center">
          <span />
          <p class="xx-small-bold lg:x-small-bold text-center text-brand-secondary-900">
            {footerRodapeText}
          </p>
          <div class="gap-[8px] mr-[50%]  hidden lg:flex">
            <p class="x-small-regular">Desenvolvido por</p>{" "}
            <div class="flex">
              {developedBy?.images?.map((item) => <img src={item} />)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
