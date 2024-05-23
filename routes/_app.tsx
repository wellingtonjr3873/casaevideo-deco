import { AppProps } from "$fresh/server.ts";
import GlobalTags from "$store/components/GlobalTags.tsx";
import Theme from "$store/sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

function App(props: AppProps) {
  const urlCanonical = props.url.origin.replace("http", "https") + props.url.pathname;

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <GlobalTags url={urlCanonical}/>

      {/* Rest of Preact tree */}
      <props.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
      <script>
        {`;(function () {
                    const script = document.createElement('script')
                    
                    script.type = 'text/javascript'
                    script.id = 'dt-widget'
                    script.async = true
                    script.src =
                        'https://www13.directtalk.com.br/clientes/custom/casaeVideo/widget.min.js'
                    document.getElementsByTagName('BODY')[0].appendChild(script) 
                    })(document)
                    `}
      </script>

      <script>
        {`
          (function(v, t, e, x, a, f, s) {
            f = v.vtexaf = v.vtexaf || function () {
              (f.q = f.q || []).push(arguments)
            };
            f.l = +new Date;
            s = t.createElement(e);
            s.async = !0;
            s.src = x;
            an = 'casaevideonewio';
            s.setAttribute('an', an);
            a = t.getElementsByTagName(e)[0];
            a.parentNode.insertBefore(s, a)
          })(window, document, 'script', 'https://activity-flow.vtex.com/af/af.js');
        `}
      </script>


    </>
  );
}

export default App;
