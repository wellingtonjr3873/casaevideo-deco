import Icon from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

const ATENDIMENTO_LABEL = "Atendimento";
export default function FooterItems(
  { sections, justify = false, categories }: {
    sections: Section[];
    categories: { link: string; label: string }[];
    justify: boolean;
  },
) {
  const formatedCategories = {
    label: "Categorias",
    items: categories.map((item) => ({ label: item.label, href: item.link })),
  };
  const sectionsAndCategories = [...sections, formatedCategories].filter(
    (item) => item.label !== ATENDIMENTO_LABEL,
  );
  const sectionAtendimento = sections.find((item) =>
    item.label === ATENDIMENTO_LABEL
  );
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li>
                <div class="flex flex-col gap-[24px]">
                  <span class="small-bold text-brand-secondary-900">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block py-1 link link-hover small-regular"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden">
            {sectionsAndCategories.map((section) => (
              <li class="border-b border-brand-secondary-50 last:border-b">
                <div class="collapse collapse-arrow !rounded-none border-b border-neutral-50">
                  <input type="checkbox" class="min-h-[0" />
                  <div class="collapse-title min-h-[0] !p-0 flex gap-2">
                    <span class=" py-[26px] px-[16px] w-[100%] small-bold">
                      {section.label}
                    </span>
                  </div>
                  <div class="!p-0 collapse-content">
                    <ul
                      class="flex flex-col pt-2 bg-brand-secondary-50"
                    >
                      {section.items?.map((item) => (
                        <li class="border-b border-neutral-50 last:border-b-0">
                          <a
                            href={item.href}
                            class="block py-[10px] link link-hover small-regular text-brand-secondary-900 pl-[24px]"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}

            <li class="relative">
              <a
                href="#header"
                class="flex  h-[24px] w-[24px] text-[white] items-center justify-center rounded-[6px] bg-brand-primary-1 gap-[8px] absolute right-[12px] top-[32px]"
              >
                <Icon id="ChevronTop" size={16} fill="white" />
              </a>
              <p class="small-bold mb-[24px] text-brand-secondary-900 text-center mt-[32px]">
                {sectionAtendimento?.label}
              </p>

              <ul class="flex flex-col items-center justify-center gap-[16px] mb-[32px]">
                {sectionAtendimento?.items.map((item) => {
                  return (
                    <li>
                      <a href={item.href} class="small-regular">
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div class="flex flex-col gap-[8px] items-center justify-center">
                <p class="flex gap-[8px] items-center">
                  <Icon id="Padlock" size={25} />
                  <a class="small-underline text-brand-secondary-900" href="/">
                    Política de privacidade
                  </a>
                </p>
                <p>
                  <a class="small-underline text-brand-secondary-900" href="/">
                    Termos de uso
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </>
      )}
    </>
  );
}
