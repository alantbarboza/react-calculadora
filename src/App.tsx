import './App.css'
import { useState } from 'react';

type Operacao = "+" | "-" | "x" | "÷";

function App(){
  const [numeroAtual, setNumeroAtual] = useState("0");
  const [limparNumero, setLimparNumero] = useState(false);
  const [expressao, setExpressao] = useState("");
  const [temResultado, setTemResultado] = useState(false);

  function clicarNumero(numero: string){
    if(limparNumero || temResultado){
      setExpressao(temResultado ? numero : expressao + numero);
      setNumeroAtual(numero);
      setLimparNumero(false);
      setTemResultado(false);
    }else{
      setNumeroAtual(numeroAtual === "0" ? numero : numeroAtual + numero);
      setExpressao(expressao === "0" ? numero : expressao + numero);
    }
  }

  function limparTudo(){
    setNumeroAtual("0");
    setLimparNumero(false);
    setExpressao("");
    setTemResultado(false);
  }

  function apagarUltimo(){
    if(numeroAtual.length === 1){
      setNumeroAtual("0");
      setExpressao(expressao.slice(0, -1));
      return;
    }

    setNumeroAtual(numeroAtual.slice(0, -1));
    setExpressao(expressao.slice(0, -1));
  }

  function clicarOperacao(operacao: Operacao){
    if(temResultado){
      setExpressao(numeroAtual + operacao);
      setTemResultado(false);
      setLimparNumero(true);
      return;
    }

    if(limparNumero){
      setExpressao(expressao.slice(0, -1) + operacao);
      return;
    }

    setExpressao(expressao + operacao);
    setLimparNumero(true);
  }

  function calcular(){
    if(expressao === "" || temResultado) return;

    let resultado = 0;
    let numeroTexto = "";
    let operacaoAtual: Operacao | null = null;

    for(const letra of expressao){
      if(letra === "+" || letra === "-" || letra === "x" || letra === "÷"){
        const numero = Number(numeroTexto);

        if(operacaoAtual === null){
          resultado = numero;
        }else{
          resultado = aplicarOperacao(resultado, operacaoAtual, numero);
        }

        numeroTexto = "";
        operacaoAtual = letra;

      }else{
        numeroTexto += letra;
      }
    }

    const ultimoNumero = Number(numeroTexto);

    if(operacaoAtual === null){
      resultado = ultimoNumero;
    }else{
      resultado = aplicarOperacao(resultado, operacaoAtual, ultimoNumero);
    }

    const resultadoTexto = Number(resultado.toFixed(10)).toString();

    setNumeroAtual(resultadoTexto);
    setExpressao(expressao + " = " + resultadoTexto);
    setLimparNumero(true);
    setTemResultado(true);
  }

  function aplicarOperacao(primeiro: number, operacao: Operacao, segundo: number){
    if(operacao === "+") return primeiro + segundo;
    if(operacao === "-") return primeiro - segundo;
    if(operacao === "x") return primeiro * segundo;
    return segundo === 0 ? 0 : primeiro / segundo;
  }

  function trocarPorcentagem(){
    const porcentagem = Number(numeroAtual) / 100;
    setNumeroAtual(String(porcentagem));
    setExpressao(expressao.slice(0, expressao.length - numeroAtual.length) + porcentagem);
  }

  function trocarSinal(){
    const novoNumero = Number(numeroAtual) * -1;
    setNumeroAtual(String(novoNumero));
  }

  function adicionarDecimal(){
    if(limparNumero){
      setNumeroAtual("0.");
      setExpressao(temResultado ? "0." : expressao + "0.");
      setLimparNumero(false);
      setTemResultado(false);
      return;
    }

    if(!numeroAtual.includes(".")){
      setNumeroAtual(numeroAtual + ".");
      setExpressao(expressao + ".");
    }
  }

  return (
    <div className="calculadora">
      <div className="tela">
        <div className="conta-anterior">{expressao}</div>
        <div className="numero-atual">{numeroAtual}</div>
      </div>

      <div className="botoes">
        <button className="botao botao-limpar" onClick={trocarPorcentagem}>%</button>
        <button className="botao botao-limpar" onClick={limparTudo}>AC</button>
        <button className="botao botao-limpar" onClick={apagarUltimo}>⌫</button>
        <button className="botao botao-operacao" onClick={() => clicarOperacao("÷")}>÷</button>

        <button className="botao botao-numero" onClick={() => clicarNumero("7")}>7</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("8")}>8</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("9")}>9</button>
        <button className="botao botao-operacao" onClick={() => clicarOperacao("x")}>x</button>

        <button className="botao botao-numero" onClick={() => clicarNumero("4")}>4</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("5")}>5</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("6")}>6</button>
        <button className="botao botao-operacao" onClick={() => clicarOperacao("-")}>-</button>

        <button className="botao botao-numero" onClick={() => clicarNumero("1")}>1</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("2")}>2</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("3")}>3</button>
        <button className="botao botao-operacao" onClick={() => clicarOperacao("+")}>+</button>

        <button className="botao botao-limpar" onClick={trocarSinal}>±</button>
        <button className="botao botao-numero" onClick={() => clicarNumero("0")}>0</button>
        <button className="botao botao-limpar" onClick={adicionarDecimal}>.</button>
        <button className="botao botao-igual" onClick={calcular}>=</button>
      </div>
    </div>
  )
}

export default App
