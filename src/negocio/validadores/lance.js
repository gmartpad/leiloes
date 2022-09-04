import {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_OU_IGUAL_AOS_LANCES
} from "../constantes/estadosLance";

export function validaFormatoNumericoDoLance(valorEmTexto) {
  if (valorEmTexto.match(/^[1-9]+[0-9]*(\,[0-9]{1,2})?$/)) {
    return VALIDO;
  }

  return INVALIDO;
}

export function validaLance(valor, { lances, valorInicial }) {
  const lanceMaiorQueLances = validaLanceMaiorQueLances(valor, lances);
  const lanceMaiorOuIgualAoInicial = validaLanceMaiorOuIgualAoInicial(valor, valorInicial);
  
  if(lanceMaiorQueLances !== VALIDO) {
    return lanceMaiorQueLances;
  }
  
  if(lanceMaiorOuIgualAoInicial !== VALIDO) {
    return lanceMaiorOuIgualAoInicial;
  }

  return lanceMaiorQueLances;
}

export function validaLanceMaiorOuIgualAoInicial(valor, valorInicial) {
  if (valor >= valorInicial) {
    return VALIDO;
  }

  return MENOR_QUE_VALOR_INICIAL;
}

export function validaLanceMaiorQueLances(valor, lances) {
  const lanceMaiorQueValor = lances.find(lance => lance.valor >= valor);
  if (!lanceMaiorQueValor) {
    return VALIDO;
  }

  return MENOR_OU_IGUAL_AOS_LANCES;
}
