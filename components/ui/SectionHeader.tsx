interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title &&
              (
                <h1
                  class={`small-bold md:h5-bold text-left
                  ${
                    props.colorReverse
                      ? "text-neutral-50"
                      : "text-neutral-900"
                  }
                  ${props.fontSize === "Normal" ? "lg:text-3xl" : "lg:text-4xl"}
                `}
                >
                  {props.title}
                </h1>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
