const handleLoadScript = (src: string, onLoadCallback: () => void) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;

  script.onload = () => {
    onLoadCallback();
  };

  document.head.appendChild(script);
};

const handleLoadCss = (styles: string) => {
  const style = document.createElement("style");
  style.innerHTML = styles;
  document.head.appendChild(style);
};

const handleSetScope = () => {
  // deno-lint-ignore ban-ts-comment
  // @ts-expect-error
  window.vtexid.setScope("a14a513d-a29c-4ae7-bf2b-95f3c81dd75f");
  // deno-lint-ignore ban-ts-comment
  // @ts-expect-error
  window.vtexid.setScopeName("casaevideonewio");
};

export const loadVtexIdScripts = (callback: () => void) => {
  handleLoadCss(
    `
    /*LOGIN ESTILIZADO:*/
          
    `,
  );
  handleLoadScript(
    "https://io.vtex.com.br/front-libs/jquery/1.8.3/jquery-1.8.3.min.js?v=1.5.87.2539",
    () => {
      handleLoadScript(
        "https://io.vtex.com.br/vtex-id-ui/3.27.1/vtexid-jquery.min.js?v=1.5.87.2539",
        () => {
          handleSetScope();
          callback();
        },
      );
    },
  );
};
