// deno-lint-ignore ban-ts-comment
// @ts-nocheck
import { handleEvents } from "deco-sites/casaevideo/utils/pmweb/handleEvents.ts";

function configure_pm_web(
  window: Window & typeof globalThis,
  document: Document,
  tag: string,
  pm_name: string,
  pm_key: string,
) {
  window.PMTagObject = pm_name;
  window[pm_name] || (window[pm_name] = function() {
          (window[pm_name].q = window[pm_name].q || []).push(arguments)
      });

  window[pm_name].a = +new Date;
  window[pm_name].aid = pm_key || "";
  const element = document.createElement(tag);

  const container = document.getElementsByTagName(tag)[0];
  element.src = "https://cdn.pmweb.com.br/df/tag.js?id\x3d" + window[pm_name].aid as string;
  element.async = 1;
  container.parentNode.insertBefore(element, container)
}

export const init_pmweb = (key: string) => {
  configure_pm_web(window, document, "script", "pm", key);
  window.pm("init");

  window.addEventListener("message", handleEvents);
}
