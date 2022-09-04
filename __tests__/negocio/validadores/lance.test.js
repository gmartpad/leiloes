import {
  VALIDO,
  INVALIDO,
  MENOR_QUE_VALOR_INICIAL,
  MENOR_OU_IGUAL_AOS_LANCES
} from "../../../src/negocio/constantes/estadosLance"

import { 
  validaFormatoNumericoDoLance, 
  validaLance,
  validaLanceMaiorOuIgualAoInicial,
  validaLanceMaiorQueLances 
} from "../../../src/negocio/validadores/lance";

describe("negocio/validadores/lance", () => {
  describe("validaFormatoNumericoDoLance", () => {
    it("retorna 'Lance válido'", () => {
      const valorEmTexto = "11,00" 
      const resultado = validaFormatoNumericoDoLance(valorEmTexto)
      expect(resultado).toBe(VALIDO)
    })

    it("retorna 'Lance inválido, digite um valor como: \"100\" ou \"99,99\"'", () => {
      const valorEmTexto = "11.00"
      const resultado = validaFormatoNumericoDoLance(valorEmTexto)
      expect(resultado).toBe(INVALIDO)
    })
  })

  describe("validaLanceMaiorOuIgualAoInicial", () => {
    it("retorna 'Lance válido'", () => {
      const valor = 5
      const valorInicial = 2
      const resultado = validaLanceMaiorOuIgualAoInicial(valor, valorInicial)
      expect(resultado).toBe(VALIDO)
    })

    it("retorna 'Lance menor que o valor inicial'", () => {
      const valor = 1
      const valorInicial = 2
      const resultado = validaLanceMaiorOuIgualAoInicial(valor, valorInicial)
      expect(resultado).toBe(MENOR_QUE_VALOR_INICIAL)
    })
  })

  describe("validaLanceMaiorQueLances", () => {
    it("retorna 'Lance válido'", () => {
      const valor = 42
      const lances = [{ valor: 5 }, { valor: 12 }, { valor: 2 }, { valor: 26 }]
      const resultado = validaLanceMaiorQueLances(valor, lances)
      expect(resultado).toBe(VALIDO)
    })

    it("retorna 'Lance menor que o maior lance já realizado'", () => {
      const valor = 15
      const lances = [{ valor: 5 }, { valor: 12 }, { valor: 2 }, { valor: 26 }]
      const resultado = validaLanceMaiorQueLances(valor, lances)
      expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES)
    })
  })

  describe("validaLance", () => {
    const lances = [{ valor: 5 }, { valor: 12 }, { valor: 2 }, { valor: 26 }]
    const valorInicial = 30

    it("retorna 'Lance menor que o maior lance já realizado'", () => {
      const valor = 15
      const resultado = validaLance(valor, { lances, valorInicial })
      expect(resultado).toBe(MENOR_OU_IGUAL_AOS_LANCES)
    })

    it("retorna 'Lance menor que o valor inicial'", () => {
      const valor = 27
      const resultado = validaLance(valor, { lances, valorInicial })
      expect(resultado).toBe(MENOR_QUE_VALOR_INICIAL)
    })

    it("retorna 'Lance válido'", () => {
      const valor = 42
      const resultado = validaLance(valor, { lances, valorInicial })
      expect(resultado).toBe(VALIDO)
    })
  })
})