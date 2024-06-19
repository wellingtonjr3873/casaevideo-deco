import { useEffect } from "preact/hooks";

export type Props = {
  scope?: string;
}

const DemoUpButtonCustom = ({
  scope = 'casaevideo.com.br'
}: Props) => {

  useEffect(() => {
    (function() { var s=document.createElement('script');
    s.async=true;s.className='demoup_stage1_script';
    s.src='//static.demoup.com/api/stages/1711/stage1.js?url='+encodeURI(document.URL);
    var m=document.getElementsByTagName('head')[0];m?.parentNode?.insertBefore(s, m);})();
  }, [])

  return (
    <script async id='demoup_stage2_script' src={`//static.demoup.com/${scope}/stage2.min.js`} />
  )
}

export default DemoUpButtonCustom;