import { Cpf } from '../src'

describe(Cpf.isValid, () => {
  test('Com pontuação', () => expect(Cpf.isValid('453.178.287-91')).toBe(true))

  test('Sem pontuação', () => expect(Cpf.isValid('45317828791')).toBe(true))

  test('Dígito verificador inválido', () =>
    expect(Cpf.isValid('45317828792')).toBe(false))
})

describe(Cpf.from, () => {
  test('Possíveis assinaturas', () => {
    const formatted = Cpf.from('453.178.287-91')
    const stripped = Cpf.from('45317828791')
    const withoutDvs = Cpf.from('453.178.287')
    const withUf = Cpf.from('453.178.28', 'RJ')

    expect(
      formatted.equals(stripped) &&
        formatted.equals(withoutDvs) &&
        formatted.equals(withUf)
    ).toBe(true)
  })

  test('Gera _tag', () => expect(Cpf.from('453.178.287-91')._tag).toBe('Cpf'))
})

describe(Cpf.random, () => {
  test('Gera cpf válido', () => expect(Cpf.isValid(Cpf.random().format())).toBe(true))

  test('Gera cpf válido com Uf', () =>
    expect(Cpf.random('RJ').format()[10]).toBe(Cpf.ufs['RJ']))
})

describe(Cpf, () => {
  test('strip', () => expect(Cpf.from('453.178.287-91').strip()).toBe('45317828791'))
  test('format', () => expect(Cpf.from('45317828791').format()).toBe('453.178.287-91'))
  test('equals', () => {
    const formatted = Cpf.from('453.178.287-91')
    const stripped = Cpf.from('45317828791')

    expect(formatted.equals(stripped)).toBe(true)
  })
})
