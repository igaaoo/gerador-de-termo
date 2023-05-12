import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const printRef = useRef<any>();
  const [nome, setNome] = React.useState('');
  const [nomeLoja, setNomeLoja] = React.useState('');
  const [assinatura, setAssinatura] = React.useState<any>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await handleMakePDf();
  }

  async function handleMakePDf() {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, width, height, '', 'FAST');
    pdf.save(`Termo de Consentimento - ${nome}.pdf`);
  }

  const data = new Date();
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();
  const dataAtual = `${dia}/${mes}/${ano}`;

  return (
    <>
      <form onSubmit={handleSubmit} className="m-auto flex flex-col w-[760px] mt-2">
        <div
          className=" px-10 py-4 min-h-[800px] shadow-lg rounded-lg shadow-black"
          ref={printRef}
        >
          <img src="logo.png" alt="Logo Grupo X" className="w-32" />
          <p className="font-bold text-center text-lg py-2">
            EXEMPLO DE TERMO OU CONTRATO COM ASSINATURA
          </p>
          <div className="flex items-center py-1">
            <label htmlFor="nome" className="font-bold text-lg mr-4  align-bottom">
              Nome:
            </label>
            <input
              type="text"
              name="nome"
              id="nome"
              className="border-b border-black flex-1 h-8"
              onChange={event => setNome(event.target.value)}
            />
          </div>
          <div className="flex items-center py-1">
            <label htmlFor="telefone" className="font-bold text-lg mr-4">
              Telefone:
            </label>
            <input
              type="tel"
              name="telefone"
              maxLength={11}
              id="telefone"
              className="border-b border-black flex-1 h-8"
            />
            <p className=" ml-2 text-lg font-bold ">WhatsApp?</p>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" value="zap" className="sr-only peer" />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center py-1">
            <label htmlFor="email" className="font-bold text-lg mr-4  align-bottom">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-b border-black flex-1 h-8"
            />
          </div>
          <div className="flex items-center py-1">
            <label htmlFor="telefone" className="font-bold text-lg w-46 mr-4">
              Cliente da Marca?
            </label>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" value="cliente" className="sr-only peer" />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <p className=" ml-2 text-lg font-bold mr-2 ">Se sim, Qual?</p>
            </label>
            <input type="text" className="border-b border-black flex-1 h-8" />
          </div>
          <div className="flex items-center py-1">
            <label htmlFor="nome" className="font-bold text-lg w-46  mr-4">
              Nome da(o) Recepcionista:
            </label>
            <input
              type="text"
              name="recepcionista"
              id="recepcionista"
              className="border-b border-black flex-1 h-8"
            />
          </div>
          <div className="flex items-center py-1">
            <label htmlFor="nome" className="font-bold text-lg  align-bottom  w-46  mr-4">
              Nome do Vendedor:
            </label>
            <input
              type="text"
              name="vendedor"
              id="vendedor"
              className="border-b border-black flex-1 h-8 "
            />
          </div>
          <div className="flex items-center py-1">
            <label htmlFor="nome" className="font-bold text-lg  w-46  mr-4">
              Modelo de Interesse:
            </label>
            <input
              type="text"
              name="interesse"
              id="interesse"
              className="border-b border-black flex-1 h-8"
            />
          </div>

          <select
            id="filial"
            className=" mt-3  rounded h-12  w-full p-2 bg-gray-700 text-white "
            onChange={event => {
              setNomeLoja(event.target.selectedOptions[0].text);
            }}
          >
            <option>Selecione a Filial</option>
            <option value="">Matriz</option>
            <option value="">Teresina</option>
            <option value="">Service</option>
            <option value="">Sobral</option>
            <option value="">Picos</option>
            <option value="">Juazeiro</option>
            <option value="">Teresina Sul</option>
          </select>
          <p className="leading-5 mt-2 text-lg">
            Nossos clientes tem o direito legal de determinar por quais meios eles querem
            ser contatados, selecione a(s) forma(s) de contato(s):
          </p>
          <div className="mt-3 flex justify-between">
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5  dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <p className=" ml-2 text-lg font-bold">Ligações</p>
            </label>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <p className=" ml-2 text-lg font-bold ">E-mail</p>
            </label>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <p className=" ml-2 text-lg font-bold ">WhatsApp/SMS</p>
            </label>
          </div>
          <p className="text-[12px]  leading-3 mt-3">
            O Grupo X se preocupa com os dados dos seus clientes, tratando tais dados
            pessoais de maneira sigilosa, bem como protegendo-os nos termos da lei para
            respeitar a sua privacidade. Precisamos desses dados para entrar em contato
            com nossos clientes para fins de ações de marketing, promoções, oferta de
            produtos e serviços do Grupo X. <br></br> <br></br> As informações fornecidas
            poderão ser compartilhadas, para o mesmo propósito, com as empresas
            pertencentes ao Grupo X, empresas contratadas para ações de relacionamento
            junto aos clientes e/ou parceiros. Lembrando que estes dados ficarão
            armazenados em nosso banco de dados, mas que a qualquer momento nossos
            clientes podem solicitar sua exclusão, alteração ou bloqueio através do e-mail
            x@gmail.com.br. <br></br> <br></br> Para saber mais, nossa Política de
            Privacidade para clientes e Potenciais Clientes está disponível em nosso
            Showroom, bem como no site www.x.com.br/politica-de-privacidade .
          </p>
          <div className="flex justify-end py-3 px-8">
            <p className="text-end font-semibold overflow-visible">{nomeLoja}, </p>
            <p className="font-semibold">{dataAtual}</p>
          </div>
          <div className="border-2 border-gray-700 rounded">
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                height: 150,
                width: 670,
                className: 'sigCanvas',
              }}
              ref={ref => {
                setAssinatura(ref);
              }}
            />
          </div>
          <div className="mt-2 flex">
            <button
              type="button"
              onClick={() => assinatura.clear()}
              className="bg-red-800 bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-600 rounded mb-2"
              data-html2canvas-ignore="true"
            >
              Limpar
            </button>

            <p className="text-center text-sm border-t border-black leading-4 w-96 mx-auto mb-2">
              Assinatura do Titular dos Dados ou Responsável Legal
            </p>
          </div>
          <div className="flex justify-end">
            <button
              data-html2canvas-ignore="true"
              type="submit"
              className="bg-red-800 hover:bg-red-600 w-72 text-white font-bold py-2 px-4 border-b-4 border-red-900 hover:border-red-600 rounded"
            >
              Gerar Consentimento
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
