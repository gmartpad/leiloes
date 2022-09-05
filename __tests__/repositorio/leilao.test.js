import { obtemLeiloes } from '../../src/repositorio/leilao'
import apiLeiloes from '../../src/servicos/apiLeiloes'

jest.mock('../../src/servicos/apiLeiloes')

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
  describe("obtemLeiloes", () => {
    it("deve retornar uma lista de leilões", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes))
      const leiloes = await obtemLeiloes()
      expect(leiloes).toEqual(mockLeiloes)
    })
    it("deve retornar uma lista de vazia quando a req falhar", async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro())
      const leiloes = await obtemLeiloes()
      expect(leiloes).toEqual([])
    })
  })
})