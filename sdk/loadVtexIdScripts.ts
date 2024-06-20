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
          h4.vtexIdUI-heading {
              color: transparent;
              margin: 0;
              line-height: 1;
              width: 100%;
              position: relative;
              height: 10px;
          }
          h4.vtexIdUI-heading::after {
              content: "Escolha uma opção para entrar";
              color: #393939;
              font-family: var(--font-family);
              font-size: 16px;
              font-weight: 700;
              display: flex;
              justify-content: center;
              position: absolute;
              top: 0;
              width: 100%;
              margin: 0 auto;
          }


          #vtexIdContainer .vtexIdUI .modal-header {
              background: #FFFFFF;
              border: unset;
              padding: 32px 16px 16px;
          }

          .vtexIdUI.ng-scope.vtexIdUI-show-app {
              width: 364px;
              border-radius: 8px;
              box-shadow: unset;
              border: unset;
              font-family: 'Lato';
              height: 340px !important;
          }

          div#vtexIdUI-global-loader {
              display: none !important;
          }

          #vtexIdContainer button.close.vtexIdUI-close {
              background: #FFF;
              color: #000;
              font-size: 30px;
          }

          .vtexIdUI .modal-header .close:hover{
              background: unset;
          }

          #vtexIdContainer .vtexIdUI .vtexIdUI-providers-list {
              display: flex;
              flex-direction: column;
              gap: 16px;
          }

          #vtexIdContainer .vtexIdUI .vtexIdUI-providers-list li, .vtexIdUI .account-list li {
              margin-bottom: 0;
          }

          #vtexIdContainer .vtexIdUI .btn-block {
              border-radius: 6px;
              height: 40px;
              background: #fff !important;
              border: 1px solid #9B9B9B !important;
              color: #393939;
              font-size: 14px;
              text-shadow: unset;
              box-shadow: unset;
              padding: 0;
              min-height: 40px;
              font-weight: 400;
          }

          .vtexIdUI .vtexIdUI-providers-list .btn i, .vtexIdUI .account-list .btn i {
              display: none;
          }

          .vtexIdUI .vtexid-icon-lock.bottom-icon {
              display: none;
          }

          .vtexIdUI-confirm-email.vtexIdUI-page.ng-scope.vtexIdUI-page-active::after, .vtexIdUI-auth-code.vtexIdUI-page.ng-scope.vtexIdUI-page-active::after, .vtexIdUI-classic-login.vtexIdUI-page.ng-scope.vtexIdUI-page-active::after {
              display: none;
          }

          .vtexIdUI-page.ng-scope.vtexIdUI-page-active::after{
              content: "Ao acessar, você está de acordo com os Termos de Uso e a Política de privacidade";
              display: block;
              width: 100%;
              height: 40px;
              color: #444444;
              position: absolute;
              font-size: 14px;
              bottom: -15px;
              left: 0;
              padding: 0 50px;
              text-align: center;
          }

          div#vtexIdContainer {
              width: 0;
              height: 0;
              left: unset;
              top: 120px;
              right: clamp(15.75rem, -10.25rem + 39.0625vi, 57.25rem);
          }
          #vtexIdContainer::after{
              content: "";
              display: block;
              width: 20px;
              height: 20px;
              background: #fff;
              position: absolute;
              z-index: 99999;
              top: -10px;
              right: -100px;
              transform: rotate(45deg);
          }
          .vtexIdUI .vtexIdUI-heading[data-i18n="vtexid.getEmailTitle"]{
              font-size: 0;
              width: 100%;
          }
          .vtexIdUI .vtexIdUI-heading[data-i18n="vtexid.getEmailTitle"]::after{
              content: "Digite seu e-mail para receber  o código de acesso";
              display: block;
              font-size: 16px;
              width: 100%;
              text-align: center;
              color: #393939;
              font-weight: 700;
              font-family: 'Lato';
              padding: 0px 54px;
              line-height: 22.4px;
          }

          .vtexIdUI .vtexIdUI-heading[data-i18n="vtexid.accessTokenTitle"]{
              font-size: 0;
              width: 100%;
          }
          .vtexIdUI .vtexIdUI-heading[data-i18n="vtexid.accessTokenTitle"]::after{
              content: "Digite o código enviado para o seu e-mail";
              display: block;
              font-size: 16px;
              width: 100%;
              text-align: center;
              color: #393939;
              font-weight: 700;
              font-family: 'Lato';
              padding: 0px 54px;
              line-height: 22.4px;
          }

          .vtexIdUI .vtexIdUI-heading[data-i18n="vtexid.classicAuthText"]{
              font-size: 0;
              width: 100%;
          }
          .vtexIdUI .vtexIdUI-heading[data-i18n="vtexid.classicAuthText"]::after{
              content: "Entrar com e-mail e senha";
              display: block;
              font-size: 16px;
              width: 100%;
              text-align: center;
              color: #393939;
              font-weight: 700;
              font-family: 'Lato';
              padding: 0px 54px;
              line-height: 22.4px;
          }

          #vtexIdContainer .vtexIdUI h4 {
              line-height: 1;
              height: 20px;
              display: flex;
              margin: 0 0 10px;
          }

          .vtexIdUI input[type="text"]:focus, .vtexIdUI input[type="password"]:focus, .vtexIdUI input[type="email"]:focus{
              border-color: #B10200 !important;
              box-shadow: unset;
          }

          .vtexIdUI input[type="text"], .vtexIdUI input[type="password"], .vtexIdUI input[type="email"]{
              border-color: #C6C6C6
          }
          .vtexIdUI input.input-block-level::placeholder{
              content: "teste";
          }

          #vtexIdContainer .vtexIdUI .modal-footer{
              background: #FFF;
              border: unset;
              padding: 0 16px;
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: space-between;
          }

          #vtexIdContainer .vtexIdUI .vtexId-link, .vtexIdUI a{
              color: #B10200;
          }

          #vtexIdContainer .vtexIdUI .btn-success{
              background: #B10200;
              border-radius: 6px;
              box-shadow: unset;
              border: unset;
              height: 40px;
              min-height: 40px;
          }

          .vtexIdUI .modal-footer:before, .vtexIdUI .modal-footer:after{
              display: none;
          }
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
