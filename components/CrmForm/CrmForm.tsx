import { useRef } from "preact/hooks";
import { invoke } from "deco-sites/casaevideo/runtime.ts";
import * as Sentry from "@sentry/react";
import { useSignal } from "@preact/signals";
import { Props as DataProps } from "../../actions/tableMasterdata.ts"
import Spinner from "deco-sites/casaevideo/components/ui/Spinner.tsx";

function LeadForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const loading = useSignal(false)
  const resultMessage = useSignal<string>("Enviar");
  const twoSeconds = 2000
  const fiveSeconds = 5000

  const sendData = async (data: { [key: string]: string | number | boolean }) => {
    loading.value = true
    try {
      loading.value = true;
      await invoke["deco-sites/casaevideo"].actions.tableMasterdata(data as DataProps);
    } catch (err) {
      Sentry.captureException(err);
      resultMessage.value = "Erro ao se cadastrar"
      setTimeout(() => {
        resultMessage.value = "Enviar"
      }, twoSeconds);
    } finally {
      resultMessage.value = "Cadastrado com sucesso!"
      loading.value = false

      setTimeout(() => {
        resultMessage.value = "Cadastrar"
      }, fiveSeconds);
    }
  };

  const _submitForm = async () => {
    const form = formRef.current;

    if (form) {
      const formData = new FormData(form);
      const data: { [key: string]: string | number | boolean } = {};

      formData.forEach((value, key) => {
        if (key === "interest") {
          data[key] = formData.getAll("interest").join(",");
        } else {
          data[key] = value as string;
        }
      });

      data["tableId"] = "CF";

      await sendData(data as DataProps);
    }
  };


  return (
    <section class="bg-[url('https://casaevideonewio.vteximg.com.br/arquivos/bg-form-crm.png')] h-[100%] md:h-[100vh]">
      <header class="h-[76px] flex items-center justify-center bg-white">
        <a href="/">
          <img src="https://casaevideonewio.vteximg.com.br/arquivos/form-crm-logo.png" alt="Casa & Video" />
        </a>
      </header>
      <main class="flex w-full justify-center items-center crm-form">
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            _submitForm();
          }}
          class="mx-[10px] my-[50px] md:mt-[51px] w-full max-w-[956px] p-4 bg-[#FFF] flex gap-8 flex-wrap rounded-[16px] md:mb-[30px]"
        >
          <div class="bg-[#F3F3F3] flex justify-center items-center flex-col p-4 gap-1 w-full">
            <h2 class="text-[#393939] text-[20px] font-bold m-0">Te conhecer faz toda a diferença!</h2>
            <p class="text-[#393939] text-center text-[16px] m-0">Queremos entender suas preferências para oferecer os melhores benefícios e condições para você.</p>
          </div>
          <div class="flex flex-col gap-1 items-start w-full">
            <label for="name">Nome completo <span class="text-[#B10200]">*</span></label>
            <input type="text" id="name" name="name" placeholder="Seu nome" required class="w-full border border-[#C6C6C6] bg-white h-[40px] px-4 text-[#5E5E5E] text-[14px] font-normal leading-[140%] cursor-pointer rounded-[6px]" />
          </div>
          <div class="flex gap-8 w-full flex-col md:flex-row">
            <div class="flex flex-col gap-1 items-start w-full">
              <label for="email">E-mail <span class="text-[#B10200]">*</span></label>
              <input type="email" id="email" name="email" placeholder="exemplo@mail.com" required class="w-full border border-[#C6C6C6] bg-white h-[40px] px-4 text-[#5E5E5E] text-[14px] font-normal leading-[140%] cursor-pointer rounded-[6px]" />
            </div>
            <div class="flex flex-col gap-1 items-start w-full">
              <label for="date">Data de Nascimento <span class="text-[#B10200]">*</span></label>
              <input type="date" id="date" name="date" required class="w-full border border-[#C6C6C6] bg-white h-[40px] px-4 text-[#5E5E5E] text-[14px] font-normal leading-[140%] cursor-pointer rounded-[6px]" />
            </div>
            <div class="flex flex-col gap-1 items-start w-full">
              <label for="phone">Celular <span class="text-[#B10200]">*</span></label>
              <input type="phone" id="phone" name="phone" placeholder="(99) 99999-9999" required class="w-full border border-[#C6C6C6] bg-white h-[40px] px-4 text-[#5E5E5E] text-[14px] font-normal leading-[140%] cursor-pointer rounded-[6px]" />
            </div>
          </div>
          <div class="flex gap-8 w-full flex-col md:flex-row">
            <div class="flex flex-col gap-1 items-start w-full">
              <label for="state">Estado</label>
              <select id="state" name="state" class="w-full border border-[#C6C6C6] bg-white h-[40px] px-4 text-[#5E5E5E] text-[14px] font-normal leading-[140%] cursor-pointer rounded-[6px]">
                <option value="">Selecione um estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
              </select>
            </div>
            <div class="flex flex-col gap-1 items-start w-full">
              <label for="city">Cidade</label>
              <select id="city" name="city" class="w-full border border-[#C6C6C6] bg-white h-[40px] px-4 text-[#5E5E5E] text-[14px] font-normal leading-[140%] cursor-pointer rounded-[6px]">
                <option value="">Selecione</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
              </select>
            </div>
          </div>
          <div>
            <label class="flex">Áreas de Interesse <span class="text-[#B10200] mb-[15px] flex">*</span></label>
            <div class="flex w-full md:gap-[100px] flex-col md:flex-row">
              <div class="flex flex-col gap-0.5">
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Ar e Ventilação" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" /><span></span>Ar e Ventilação</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Automotivo" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Automotivo</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Áudio" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Áudio</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Beleza e Saúde" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Beleza e Saúde</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Brinquedos" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Brinquedos</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Cama, Mesa e Banho" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Cama, Mesa e Banho</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Decoração" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Decoração</label>
              </div>
              <div class="flex flex-col gap-0.5">
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Jardim e Varanda" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Jardim e Varanda</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Eletrodomésticos" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Eletrodomésticos</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Móveis" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Móveis</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Eletroportáteis" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Eletroportáteis</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Panelas, Frigideiras e Assadeiras" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Panelas, Frigideiras e Assadeiras</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Esporte e Lazer" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Esporte e Lazer</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Papelaria" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Papelaria</label>
              </div>
              <div class="flex flex-col gap-0.5">
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Ferramentas e Construção" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Ferramentas e Construção</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Telefones e Celulares" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Telefones e Celulares</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Informática" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Informática</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="TV e Vídeo" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />TV e Vídeo</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Conveniência" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Conveniência</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Limpeza e Organização" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Limpeza e Organização</label>
                <label class="flex items-center gap-1 text-[#393939] text-[14px] font-normal cursor-pointer"><input type="checkbox" name="interest" value="Utilidades domésticas" class="appearance-none w-[20px] h-[20px] cursor-pointer border-2 border-[#C6C6C6] rounded-[4px] flex items-center justify-center p-0" />Utilidades domésticas</label>
              </div>
            </div>
          </div>
          <div class="w-full flex items-center justify-center">
            <button type="submit" class="rounded-[6px] bg-[#B10200] w-[150px] h-[48px] border-none text-[#FFF] text-[16px] font-bold leading-[140%] cursor-pointer">{loading.value ? <Spinner size={24} /> : resultMessage.value}</button>
          </div>
        </form>
      </main>
    </section>
  );
}

export default LeadForm;