# @betafcc/cpf

Micro-utilitário para validação e geração de CPFs

## Install

```sh
npm i @betafcc/cpf
```

## Usage

```ts
import { Cpf } from '@betafcc/cpf'
```

ou

```ts
const { Cpf } = require('@betafcc/cpf')
```

### static **from**(`cpf`: string, `uf?`: Uf): *Cpf*

Gera um objeto Cpf

Possíveis assinaturas:

```ts
Cpf.from('453.178.287-91') // Completo e pontuado
Cpf.from('45317828791') // Completo e não pontuado
Cpf.from('453.178.287') // Sem os dígitos verificadores
Cpf.from('453.178.28', 'RJ') // Específicando a UF pela sigla
```

___

### static **isValid**(`cpf`: unknown): *boolean*

Retorna `true` se o argumento é uma `string` com um cpf válido

Com pontuação:

```ts
Cpf.isValid('453.178.287-91') // true
```

Sem pontuação:

```ts
Cpf.isValid('45317828791') // true
```

Dígito verificador inválido:

```ts
Cpf.isValid('45317828792') // false
```

___

### static **random**(`uf?`: Uf): *Cpf*

Gera um Cpf aleatório

```ts
Cpf.random() // Cpf { __cpf: '453.178.287-91' }
Cpf.random('RJ') // Cpf { __cpf: '453.178.287-91' }
```

___

### **format**(): *CpfString*

```ts
Cpf.from('45317828791').format() // '453.178.287-91'
```

___

### **strip**(): *CpfString*

```ts
Cpf.from('453.178.287-91').strip() // '45317828791'
```

___

### **equals**(`other`: Cpf): *boolean*

___

### **possibleUfs**(): *`Set<Uf>`*

Retorna as possíveis UFs de origem

**`see`** <https://janio.sarmento.org/curiosidade-identificacao-de-cpf-conforme-o-estado/>

```ts
Cpf.from('453.178.287-91').possibleUfs() // Set {"RJ", "ES"}
```

___
