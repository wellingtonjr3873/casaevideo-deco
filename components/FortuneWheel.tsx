import { useUser } from "apps/vtex/hooks/useUser.ts";
import { useSignal } from "@preact/signals";
import { useEffect  } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import { useRoullete } from "deco-sites/casaevideo/sdk/display-roullete.ts";
import { USER_ALREADY_GO__TO_LOGIN_KEY } from "deco-sites/casaevideo/constants.tsx";

type FortuneWheelProps = {
  activeWheel: boolean;
  winText: string;
};


const ROTATION_DEG = {
  "50-reais": [0],
  "tente-outra-vez": [45, 135, 225, 315],
  "150-reais": [90],
  "100-reais": [180],
  "frete-gratis": [270]
}

const TWO_SPIN_DEG = 720
const TWO_MINUTES = 120000;

const FortuneWheel = ({
  activeWheel,
  winText,
}: FortuneWheelProps) => {

  const FIVE_SECONDS = 5000;
  const {displayRoullete} = useRoullete();

  if(!activeWheel || !displayRoullete.value) return <></>

  const degreesRotate = useSignal(0);
  const spinning = useSignal(false);
  const prizeResult = useSignal(false);
  const error = useSignal(false);
  const loading = useSignal(true);

  const { user } = useUser();

  const spinWheel = async () => {
    loading.value = true
    spinning.value = true;
  
    try{
     const spin =  await invoke["deco-sites/casaevideo"].actions['spin']({email: user.value!.email});

    if (spin.error) {
      const rotationDegValue = ROTATION_DEG["tente-outra-vez"];

      degreesRotate.value = rotationDegValue[Math.floor(Math.random() * (1 + (rotationDegValue.length  - 1 ) - 0)) + 0] + TWO_SPIN_DEG
    
      setTimeout(() => {
        error.value = true;
        spinning.value = false;
      }, FIVE_SECONDS);

      return;
    } 

      const rotationDegValue = ROTATION_DEG[spin.value!.clusterWinned as keyof typeof ROTATION_DEG]
      degreesRotate.value = rotationDegValue[Math.floor(Math.random() * (1 + (rotationDegValue.length  - 1 ) - 0)) + 0] + TWO_SPIN_DEG

      setTimeout(() => {
        prizeResult.value = true;
        spinning.value = false;
      }, FIVE_SECONDS);

    }catch(err){
      console.error(err)
    }finally{
      loading.value = false
    }
  };

  const goToLogin = () => {
    localStorage.setItem(USER_ALREADY_GO__TO_LOGIN_KEY, JSON.stringify({
      expire: new Date().getTime() + TWO_MINUTES
    }))
    window.location.replace('/login?returnUrl=%2F')
  }

  useEffect(() => {
      console.log(user.value?.email, 'see value')
      if(!user.value?.email){
        loading.value = false;
        return
      }

      invoke["deco-sites/casaevideo"].actions["can-spin"]({email: user.value?.email})
      .then((res) => {
        error.value = res.error;
        if(res.error) throw new Error(res.message);
      })
      .catch(console.error)
      .finally(() => {
        loading.value = false;
      });
  }, [user.value])
  

  return (
    <>
        <div className={"wheelContainerModal"}>
          <div className={"wheelContainerModalBody"}>
            <div className={"headerModal"}>
              <button
                className={"modalCloseButton"}
                onClick={() => displayRoullete.value = false }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none">
                  <path
                    d="M11.75 4.25L4.25 11.75"
                    stroke="#BABCBE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.25 4.25L11.75 11.75"
                    stroke="#BABCBE"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {loading.value ? (
              <>
                <div className={"wheel"}>
                  <img
                    className={"centerWheelArrow"}
                    src="https://casaevideonewio.vteximg.com.br/arquivos/pino-cv.png"
                  />
                  <img
                    loading="eager"
                    className={`wheelImg wheelImgLoading`}
                    src={"/arquivos/circulo-full.png?v=2"}
                    alt="Roda de prêmios"
                    title="Roda de prêmios"
                  />
                </div>
                <span className={"modalText"}>Carregando...</span>
              </>
            ) : (
              <>
                <h2 className={"modalTitle"}>Roleta de Ofertas!</h2>
                <span className={"modalText"}>
                  {error.value
                    ? 'TENTE OUTRA VEZ'
                    : 'Concorra a descontos uma vez ao dia!'}
                </span>

                <div className={"wheel"}>
                  <img
                    className={"centerWheelArrow"}
                    src="https://casaevideonewio.vteximg.com.br/arquivos/pino-cv.png"
                  />
                  <img
                    style={{
                      transform: `rotate(${degreesRotate.value}deg)`
                    }}
                    className={`wheelImg`}
                    src={"/arquivos/circulo-full.png?v=2"}
                    alt="Roda de prêmios"
                    title="Roda de prêmios"
                  />
                </div>

                {error.value ? (
                  <>
                    <span className={"messageSorted"}>
                      Volte amanhã para girar novamente!
                    </span>
                  </>
                ) : (
                  <>
                    {user.value?.email ? (
                      <>
                        {prizeResult.value ? (
                          <span className={"messageSorted"}>
                            {winText}
                          </span>
                        ) : (
                          <button
                            disabled={spinning.value}
                            className={"wheelButton"}
                            onClick={spinWheel}>
                            {spinning.value ? 'Carregando...' : 'Girar a Roleta'}
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <span className={"messageSorted"}> 
                          Você precisa entrar na sua conta para girar a roda!
                        </span>
                        <button
                          onClick={goToLogin}
                          className={`wheelButton wheelButtonLogin`}>
                          Entrar na conta
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
    </>
  );
};

export default FortuneWheel;