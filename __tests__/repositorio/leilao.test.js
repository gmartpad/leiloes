import { obtemLeiloes, obtemLeilao } from '../../src/repositorio/leilao'
import apiLeiloes from '../../src/servicos/apiLeiloes'

jest.mock('../../src/servicos/apiLeiloes')

const mockLeilao = {
  id: 1,
  nome: 'Leilão',
  descricao: 'Descrição do leilão'
}

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descricao: 'Descrição do leilão'
  }
]

const mockRequisicao = (resposta) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: resposta
      })
    }, 100)
  })
}

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject()
    }, 100)
  })
}

describe("repositorio/leilao", () => {

  beforeEach(() => {
    apiLeiloes.get.mockClear()
  })

  describe("obtemLeiloes", () => {
    it("deve retornar uma lista de leilões", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes))
      const leiloes = await obtemLeiloes()
      expect(leiloes).toEqual(mockLeiloes)
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    })
    it("deve retornar uma lista de vazia quando a req falhar", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro())
      const leiloes = await obtemLeiloes()
      expect(leiloes).toEqual([])
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes')
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    })
  })

  describe("obtemLeilao", () => {
    it("deve retornar um leilao", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeilao))
      const id = 1
      const leilao = await obtemLeilao(id)
      expect(leilao).toEqual(mockLeilao)
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/${id}`)
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    })
    it("deve retornar um objeto vazio quando a req falhar", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro())
      const id = 1
      const leilao = await obtemLeilao(id)
      expect(leilao).toEqual({})
      expect(apiLeiloes.get).toHaveBeenCalledWith(`/leiloes/${id}`)
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1)
    })
  })
})