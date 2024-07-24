
type pmfn = {
  (args: unknown): void; // Function that can accept any arguments
  q?: unknown[]; // Array to store queued function calls
  a?: number; // Timestamp when the object was created
  aid?: string; // Optional property for PM key
}
declare global {
  interface Window {
    pm: pmfn;
    PMTagObject: string;
    dataLayer: unknown[];
  }
}

function configure_pm_web(
  window: Window & typeof globalThis,
  document: Document,
  pm_key: string,
) {
  const pm_name = "pm";
  window.PMTagObject = pm_name;
  window[pm_name] || (window[pm_name] = function() {
          (window[pm_name].q = window[pm_name].q || []).push(arguments)
      });

  window[pm_name].a = +new Date;
  window[pm_name].aid = pm_key || "";

  const element = document.createElement("script");

  const container = document.getElementsByTagName("script")[0];
  element.src = "https://cdn.pmweb.com.br/df/tag.js?id\x3d" + window[pm_name].aid as string;
  element.async = true;
  container?.parentNode?.insertBefore(element, container)
}

export const init_pmweb = (key: string) => {
  configure_pm_web(window, document, key);
  window.pm("init");
}