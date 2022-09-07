import { obtemLancesDoLeilao, adicionaLance } from '../../src/repositorio/lance'
import apiLeiloes from '../../src/servicos/apiLeiloes'

jest.mock('../../src/servicos/apiLeiloes')

const mockLeiloes = [
  {
    "valor": 1000,
    "leilaoId": 1,
    "id": 1
  },
  {
    "valor": 1000.01,
    "leilaoId": 1,
    "id": 2
  },
]

const mockLeilao = {
  "valor": 1000,
  "leilaoId": 1,
  "id": 1
}

const mockRequisicao = (resposta) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: resposta
      })
    }, 100)
  })
}

const mockRequisicaoComErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject()
    }, 100)
  })
}

describe("/repositorio/lance", () => {

  beforeEach(() => {
    apiLeiloes.get.mockClear()
    apiLeiloes.post.mockClear()
  })

  describe("obtemLancesDoLeilao", () => {
    it("deve retornar uma lista de lances", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes))
      const id = 1
      const leiloes = await obtemLancesDoLeilao(id)
      expect(leiloes).toEqual(mockLeiloes)
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/lances?leilaoId=${id}&_sort=valor&_order=desc`)
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    })
    it("deve retornar uma lista vazia quando a req falhar", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoComErro())
      const id = 1
      const leiloes = await obtemLancesDoLeilao(id)
      expect(leiloes).toEqual([])
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/lances?leilaoId=${id}&_sort=valor&_order=desc`)
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    })
  })

  describe("adicionaLance", () => {
    it("deve retornar um valor true após post do lance", async () => {
      apiLeiloes.post.mockImplementation(() => mockRequisicao(mockLeilao))
      const retornoBooleano = await adicionaLance(mockLeilao)
      expect(retornoBooleano).toEqual(true)
      expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLeilao)
      expect(apiLeiloes.post).toHaveBeenCalledTimes(1)
    })
    it("deve retornar um valor false após erro com o req", async () => {
      apiLeiloes.post.mockImplementation(() => mockRequisicaoComErro())
      const retornoBooleano = await adicionaLance(mockLeilao)
      expect(retornoBooleano).toEqual(false)
      expect(apiLeiloes.post).toHaveBeenCalledWith('/lances', mockLeilao)
      expect(apiLeiloes.post).toHaveBeenCalledTimes(1)
    })
  })
})