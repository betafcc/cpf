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

const checkDigit = (numbers: string): number => {
  const n =
    11 -
    (Array.from(numbers)
      .reverse()
      .reduce((acc, n, i) => acc + Number.parseInt(n, 10) * (i + 2), 0) %
      11)

  return n > 9 ? 0 : n
}

const checkDigits = (cpfBaseStripped: string): string => {
  const a = checkDigit(cpfBaseStripped)

  return '' + a + checkDigit(cpfBaseStripped + a)
}

const strip = (cpf: string) => cpf.replace(/[.-]/g, '')

const isValidStripped = (stripped: string): stripped is CpfString =>
  !!stripped.match(/^\d{11}$/) &&
  stripped.slice(-2) === checkDigits(stripped.slice(0, -2))

const format = (s: string): CpfString =>
  `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9, 11)}` as CpfString

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
  static isValid(cpf: unknown): cpf is CpfString {
    if (typeof cpf !== 'string') return false
    else return isValidStripped(strip(cpf))
  }

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
  static from(cpf: string, uf?: Uf): Cpf {
    if (typeof cpf !== 'string') throw TypeError(`first argument must be string`)
    if (uf !== undefined && !Ufs.hasOwnProperty(uf)) {
      throw RangeError(`Invalid uf ${uf}`)
    }

    let stripped = strip(cpf)

    if (!stripped.match(/^\d+$/)) {
      throw RangeError(`first argument must contain only numbers, '.' and '-'`)
    }

    if (stripped.length === 8) {
      if (uf === undefined) {
        throw TypeError(`Must provide an Uf if first argument has 8 digits`)
      }
      stripped += ufs[uf]
    }
    if (stripped.length === 9) stripped += checkDigits(stripped)
    if (stripped.length === 11 && isValidStripped(stripped)) {
      return new Cpf(format(stripped))
    }

    throw Error(`Invalid arguments`)
  }

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

  equals(other: Cpf): boolean {
    return this.format() === other.format()
  }

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
