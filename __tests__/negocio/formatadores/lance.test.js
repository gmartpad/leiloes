import { formataMaiorLanceDoLeilao } from "../../../src/negocio/formatadores/lance";

describe("negocio/formatadores/lance", () => {
  describe("formataMaiorLanceDoLeilao", () => {
    it("ao inserir os lances retorna 26 como maiorLance", () => {
      const lances = [{ valor: 5 }, { valor: 12 }, { valor: 2 }, { valor: 26 }]
      const resultado = formataMaiorLanceDoLeilao(lances, lances[0].valor)
      expect(resultado).toBe(26)
    })
  })
})