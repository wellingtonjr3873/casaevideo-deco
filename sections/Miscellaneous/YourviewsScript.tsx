import { useEffect } from 'preact/compat';

function YourviewsScript() {
  const runYourViews = () => {
    const yvs = document.createElement("script");
    yvs.type = "text/javascript";
    yvs.async = true;
    yvs.id = "_yvsrc";
    yvs.src = "//service.yourviews.com.br/script/0637964e-a16a-478b-827e-ab283e0e2fcd/yvapi.js";

    const yvs_script = document.getElementsByTagName("script")[0];

    if (yvs_script && yvs_script.parentNode) {
      yvs_script.parentNode.insertBefore(yvs, yvs_script);
      console.log('aqui enter IFFFF');
    } else {
      console.log('aqui enter ELSEEEEEE');
      console.error('Script element not found');
    }
  };

  useEffect(() => {
    console.log('aqui rodou os cript')
    runYourViews();
  }, []);

  return (
    <script>
      <script type="text/javascript" async id="_yvsrc" src="//service.yourviews.com.br/script/0637964e-a16a-478b-827e-ab283e0e2fcd/yvapi.js"></script>
    </script>
  )
}

export default YourviewsScript;