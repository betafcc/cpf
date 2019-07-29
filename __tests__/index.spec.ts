import Cpf from '../src'

describe(Cpf.isValid, () => {
  test('Com pontuação', () => expect(Cpf.isValid('453.178.287-91')).toBe(true))

  test('Sem pontuação', () => expect(Cpf.isValid('45317828791')).toBe(true))

  test('Dígito verificador inválido', () =>
    expect(Cpf.isValid('45317828792')).toBe(false))
})
