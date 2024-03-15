import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  icon?: ImageWidget;
}

const DEFAULT_PROPS: Props = {
  title: "Newsletter C&V",
  description: "Receba todas as novidades e vantagens exclusivas da nossa loja. Deixe seu e-mail com a gente.",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },

};

export default function Newsletter(props: Props) {
  const { title, description, form, icon } = { ...DEFAULT_PROPS, ...props };

  return (<div class="flex flex-col lg:flex-row max-w-[1280px] mx-auto w-full items-center  gap-4 lg:gap-28 bg-neutral-50 lg:bg-transparent pt-3 px-6 pb-5 mt-6 lg:my-12 md:px-6 xl-b:px-0">

    <div class="flex gap-4 items-center">
      <figure class="hidden lg:block">
        <img src={icon} decoding="async" loading="lazy" preload="false"/>
      </figure>

      <div class="flex flex-col gap-2 items-center lg:items-start">
        <h2 class="h4-bold text-[24px]">
          {title}
        </h2>
        <p class="small-regular lg:body-regular text-center lg:text-left text-[14px] lg:text-[16px]">{description}</p>
      </div>
    </div>

    <form class="h-[48px] flex gap-2 items-center w-full max-w-[593px] justify-center">
      <input type="text" class="h-full rounded-lg w-full  max-w-[172px] lg:max-w-[485px] pl-4 border border-neutral-100 body-regular text-neultral-900 outline-none" placeholder={form?.placeholder}/>
      <button class="h-full bg-brand-primary-1 px-4 body-regular rounded-md text-neutral-50">{form?.buttonText}</button>
    </form>

  </div>
  );
}
