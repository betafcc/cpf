type Brand<K, T> = K & { __brand: T }

type CpfString = Brand<string, 'CpfString'>

const ufs = {
  AC: 2,
  AL: 4,
  AP: 2,
  AM: 2,
  BA: 5,
  CE: 3,
  DF: 1,
  ES: 7,
  GO: 1,
  MA: 3,
  MT: 0,
  MS: 1,
  MG: 6,
  PA: 2,
  PB: 4,
  PR: 9,
  PE: 4,
  PI: 3,
  RJ: 7,
  RN: 4,
  RS: 0,
  RO: 2,
  RR: 2,
  SC: 9,
  SP: 8,
  SE: 5,
  TO: 1
} as const

type Uf = keyof typeof ufs

export default class Cpf {
  /**
   * Relação do dígito que representa a Uf de origem
   * @see https://janio.sarmento.org/curiosidade-identificacao-de-cpf-conforme-o-estado/
   */
  static ufs = ufs

  /**
   * Retorna `true` se o argumento é uma `string` com um cpf válido
   *
   *
   * Com pontuação:
   * ```ts
   * Cpf.isValid('453.178.287-91') // true
   * ```
   *
   * Sem pontuação:
   * ```ts
   * Cpf.isValid('45317828791') // true
   * ```
   *
   * Dígito verificador inválido:
   * ```ts
   * Cpf.isValid('45317828792') // false
   * ```
   *
   *
   * @param cpf
   * @returns `true` if argument is a valid cpf
   */
  static isValid(cpf: unknown): cpf is CpfString {}

  /**
   * Gera um objeto Cpf
   *
   * Possíveis assinaturas:
   * ```ts
   * Cpf.from('453.178.287-91') // Completo e pontuado
   * Cpf.from('45317828791') // Completo e não pontuado
   * Cpf.from('453.178.287') // Sem os dígitos verificadores
   * Cpf.from('453.178.28', 'RJ') // Específicando a UF pela sigla
   * ```
   *
   * @param cpf
   * @param [uf]
   */
  static from(cpf: string, uf?: Uf): Cpf {}

  /**
   * Gera um Cpf aleatório
   *
   * ```ts
   * Cpf.random() // Cpf { __cpf: '453.178.287-91' }
   * Cpf.random('RJ') // Cpf { __cpf: '453.178.287-91' }
   * ```
   *
   * @param [uf]
   */
  static random(uf?: Uf): Cpf {}

  private constructor(private readonly __cpf: CpfString) {}

  /**
   * ```ts
   * Cpf.from('453.178.287-91').strip() // '45317828791'
   * ```
   */
  strip(): CpfString {}

  /**
   * ```ts
   * Cpf.from('45317828791').format() // '453.178.287-91'
   * ```
   */
  format(): CpfString {}

  /**
   * Retorna as possíveis UFs de origem
   * @see https://janio.sarmento.org/curiosidade-identificacao-de-cpf-conforme-o-estado/
   *
   * ```ts
   * Cpf.from('453.178.287-91').possibleUfs() // Set {"RJ", "ES"}
   * ```
   */
  possibleUfs(): Set<Uf> {}
}
