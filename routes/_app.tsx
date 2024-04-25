import { AppProps } from "$fresh/server.ts";
import GlobalTags from "$store/components/GlobalTags.tsx";
import Theme from "$store/sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

function App(props: AppProps) {
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <GlobalTags />

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
    </>
  );
}

export default App;
