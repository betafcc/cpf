import Cpf from '../src'

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
})
