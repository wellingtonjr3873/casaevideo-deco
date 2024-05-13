export interface Text {
  /** @format html */
  text: string;
}

const DEFAULT_PROPS = {
  text: "DEFAULT"  
};

export default function SimpleText(props: Text) {
  const {
    text
  } = { ...DEFAULT_PROPS, ...props };

  return (
      <div
        class="w-full container px-4 py-8 flex flex-col gap-4 lg:gap-8 lg:py-10 lg:px-0"
        dangerouslySetInnerHTML={{ __html: text }}
      />
  );
}
