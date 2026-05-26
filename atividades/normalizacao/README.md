# Atividade Pratica: Normalizacao de Dados e Arquitetura de Software

## Objetivo

Aplicar os conceitos de 1FN, 2FN e 3FN para reduzir redundancias, evitar anomalias e estruturar modelos de dados mais consistentes para futuras APIs.

> Observacao: as respostas foram ajustadas com base nas figuras enviadas no enunciado.

---

## Bloco 1 - Fundamentos de Normalizacao

### 1. Tabela de Matriculas - Diagnostico 1FN

#### Tarefa A - Regra violada

A tabela viola a Primeira Forma Normal (1FN), pois possui atributos multivalorados ou grupos repetidos em uma mesma coluna.

Na figura, as colunas `disciplinas` e `professores` armazenam varios valores em uma unica celula.

Exemplo:

```txt
disciplinas: Calculo, Fisica, Programacao
professores: Prof. Joao, Prof. Marta, Prof. Carlos
```

Na 1FN, cada campo deve guardar apenas um valor indivisivel.

#### Tarefa B - Atributo atomico

Um atributo atomico e um campo que armazena um unico valor, sem listas, agrupamentos ou informacoes compostas.

Exemplo atomico a partir da tabela:

| matricula_id | aluno_nome | disciplina | professor |
| --- | --- | --- | --- |
| 1 | Ana Lima | Calculo | Prof. Joao |

Exemplo nao atomico:

| matricula_id | aluno_nome | disciplinas | professores |
| --- | --- | --- | --- |
| 1 | Ana Lima | Calculo, Fisica, Programacao | Prof. Joao, Prof. Marta, Prof. Carlos |

A segunda tabela falha porque `disciplinas` e `professores` contem listas dentro da mesma celula.

#### Tarefa C - Tabela normalizada

Tabela original:

| matricula_id | aluno_nome | disciplinas | professores |
| --- | --- | --- | --- |
| 1 | Ana Lima | Calculo, Fisica, Programacao | Prof. Joao, Prof. Marta, Prof. Carlos |
| 2 | Pedro Souza | Calculo, Quimica | Prof. Joao, Prof. Sara |

Modelo em 1FN:

| matricula_id | aluno_nome | disciplina | professor |
| --- | --- | --- | --- |
| 1 | Ana Lima | Calculo | Prof. Joao |
| 1 | Ana Lima | Fisica | Prof. Marta |
| 1 | Ana Lima | Programacao | Prof. Carlos |
| 2 | Pedro Souza | Calculo | Prof. Joao |
| 2 | Pedro Souza | Quimica | Prof. Sara |

Ao final, a ficha da aluna Ana Lima tera 3 linhas, uma para cada par disciplina/professor.

---

### 2. Tabela de Vendas - Diagnostico 3FN

#### Tarefa A - Cadeia de dependencias

Na figura, a tabela possui:

```txt
venda_id (PK), vendedor_id, vendedor_nome, departamento, gerente_depto, valor_venda
```

Tabela original:

| venda_id (PK) | vendedor_id | vendedor_nome | departamento | gerente_depto | valor_venda |
| --- | --- | --- | --- | --- | --- |
| 101 | 5 | Carla | Eletronicos | Marcos | R$ 1.200 |
| 102 | 5 | Carla | Eletronicos | Marcos | R$ 850 |
| 103 | 8 | Bruno | Roupas | Fernanda | R$ 300 |

A cadeia de dependencia transitiva e:

```txt
venda_id -> vendedor_id -> vendedor_nome
```

e tambem:

```txt
venda_id -> departamento -> gerente_depto
```

Ou seja, o nome do vendedor depende do vendedor, nao da venda. E o gerente depende do departamento, nao diretamente da venda.

#### Tarefa B - Problema pratico

Se o gerente do departamento "Eletronicos" for substituido e o nome do gerente estiver gravado em todas as vendas, sera necessario atualizar todas as vendas desse departamento.

Problemas causados:

- redundancia;
- risco de atualizar algumas linhas e esquecer outras;
- historico inconsistente;
- anomalia de atualizacao.

#### Tarefa C - Schema final em 3 tabelas

Tabela `vendedores`:

| Campo | Tipo | Chave |
| --- | --- | --- |
| id | UUID/int | PK |
| nome | string |  |

Tabela `departamentos`:

| Campo | Tipo | Chave |
| --- | --- | --- |
| id | UUID/int | PK |
| nome | string |  |
| gerente_depto | string |  |

Tabela `vendas`:

| Campo | Tipo | Chave |
| --- | --- | --- |
| id | UUID/int | PK |
| vendedor_id | UUID/int | FK |
| departamento_id | UUID/int | FK |
| valor_venda | decimal |  |

---

## Bloco 2 - Normalizacao em Cadeia

### 3. Sistema de Restaurante - 1FN -> 2FN -> 3FN

#### Passo 1 - 1FN

Na figura, a tabela possui:

| pedido_id | mesa | itens_pedidos | garcom_nome | garcom_turno | total |
| --- | --- | --- | --- | --- | --- |
| 1 | 5 | Pizza, Suco, Sorvete | Lucas | Noite | R$ 72,00 |
| 2 | 3 | Hamburguer, Refrigerante | Ana | Tarde | R$ 38,00 |

O problema de 1FN esta em `itens_pedidos`, pois a coluna contem varios itens dentro de uma unica celula.

Normalizacao para 1FN:

| pedido_id | mesa | item_pedido | garcom_nome | garcom_turno | total |
| --- | --- | --- | --- | --- | --- |
| 1 | 5 | Pizza | Lucas | Noite | R$ 72,00 |
| 1 | 5 | Suco | Lucas | Noite | R$ 72,00 |
| 1 | 5 | Sorvete | Lucas | Noite | R$ 72,00 |
| 2 | 3 | Hamburguer | Ana | Tarde | R$ 38,00 |
| 2 | 3 | Refrigerante | Ana | Tarde | R$ 38,00 |

Cada linha representa apenas um item do pedido.

#### Passo 2 - 2FN

Se a chave composta for:

```txt
(pedido_id, item_pedido)
```

entao campos como `mesa`, `garcom_nome`, `garcom_turno` e `total` dependem apenas de `pedido_id`, nao da chave inteira.

Separacao:

Tabela `pedidos`:

| Campo | Chave |
| --- | --- |
| id | PK |
| mesa_id | FK |
| garcom_id | FK |

Observacao: o campo `total` foi identificado como dependente de `pedido_id`, mas nao deve ser mantido no modelo final se puder ser calculado pelos itens do pedido.

Tabela `itens_pedido`:

| Campo | Chave |
| --- | --- |
| pedido_id | PK/FK |
| item_id | PK/FK |
| quantidade |  |
| preco_unitario |  |

Tabela `itens`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |

#### Passo 3 - 3FN

Remover dependencias transitivas.

Exemplos:

```txt
pedido_id -> garcom_id -> garcom_nome
pedido_id -> garcom_id -> garcom_turno
```

O turno do garcom nao deve ficar repetido em todos os pedidos. Ele deve pertencer ao cadastro do garcom.

Schema final em 3FN:

Tabela `mesas`:

| Campo | Chave |
| --- | --- |
| id | PK |
| numero |  |

Tabela `garcons`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| turno |  |

Tabela `itens_cardapio`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| preco_atual |  |

Tabela `pedidos`:

| Campo | Chave |
| --- | --- |
| id | PK |
| mesa_id | FK |
| garcom_id | FK |

Tabela `itens_pedido`:

| Campo | Chave |
| --- | --- |
| pedido_id | PK/FK |
| item_id | PK/FK |
| quantidade |  |
| preco_unitario |  |

Observacao: `preco_unitario` representa o valor cobrado no momento do pedido. Mesmo que o preco atual do item mude no cardapio depois, o pedido antigo continua preservando o valor historico correto.

#### Desafio - O campo total deve ser armazenado?

Em regra, o campo `total` deve ser calculado via query:

```txt
SUM(quantidade * preco_unitario)
```

Justificativa:

- evita redundancia;
- evita divergencia entre itens e total;
- reduz anomalias de atualizacao.

Uma excecao aceitavel seria armazenar o total como snapshot em sistemas financeiros, quando existe necessidade de auditoria, fechamento fiscal ou preservacao historica do valor exato no momento da compra.

---

## Bloco 3 - Diagnostico de Engenharia

### 4. Gestao de Biblioteca - Conceito de 2FN

#### Tarefa A - Dependencias

Na figura, a tabela possui:

```txt
livro_id (PK), usuario_id (PK), data_emprestimo, titulo_livro, isbn, usuario_email
```

Tabela original:

| livro_id (PK) | usuario_id (PK) | data_emprestimo | titulo_livro | isbn | usuario_email |
| --- | --- | --- | --- | --- | --- |
| 427 | 7 | 2024-01-10 | Clean Code | 978-0132 | ana@email.com |
| 557 | 7 | 2024-03-01 | DDD | 978-0321 | ana@email.com |

Dependencias:

| Campo | Depende de |
| --- | --- |
| titulo_livro | apenas `livro_id` |
| isbn | apenas `livro_id` |
| usuario_email | apenas `usuario_id` |
| data_emprestimo | do relacionamento entre `livro_id` e `usuario_id` |

Logo, `titulo_livro`, `isbn` e `usuario_email` violam a 2FN se estiverem na tabela de emprestimos, pois dependem apenas de parte da chave composta.

#### Tarefa B - Anomalia de insercao

Se a tabela mistura livros e emprestimos, nao e possivel cadastrar um livro novo sem tambem cadastrar um emprestimo.

Isso gera uma anomalia de insercao, pois o sistema obrigaria a existencia de um usuario e uma data de emprestimo para registrar um livro que ainda nao foi emprestado.

#### Tarefa C - Schema final normalizado

Tabela `livros`:

| Campo | Chave |
| --- | --- |
| id | PK |
| titulo |  |
| isbn | UNIQUE |

Tabela `usuarios`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| email |  |

Tabela `emprestimos`:

| Campo | Chave |
| --- | --- |
| id | PK |
| livro_id | FK |
| usuario_id | FK |
| data_emprestimo |  |

---

### 5. Desafio Master - Sistema de Clinica

Estrutura original:

```txt
consulta_id,
paciente_nome,
paciente_cpf,
plano_saude,
plano_cobertura,
medico_nome,
medico_crm,
especialidade,
sala_numero,
sala_andar,
procedimentos
```

#### Tarefa 1 - Violacoes encontradas

Violacao de 1FN:

- `procedimentos` pode conter varios valores em uma unica consulta.
- Exemplo: `Raio-X, Exame de sangue, Ultrassom`.
- Deve ser separado em uma tabela associativa.

Violacao de 2FN:

- Se a consulta tiver varios procedimentos e a chave composta envolver `consulta_id` e `procedimento_id`, campos como `paciente_nome`, `medico_nome`, `sala_numero` dependem apenas de `consulta_id`, nao da chave inteira.

Violacao de 3FN:

- `paciente_cpf -> paciente_nome`
- `plano_saude -> plano_cobertura`
- `medico_crm -> medico_nome`
- `medico_crm -> especialidade`
- `sala_numero -> sala_andar`

Esses campos nao devem ficar repetidos na tabela de consultas.

#### Tarefa 2 - Tabelas em 3FN

Tabela `planos_saude`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| cobertura_percentual |  |

Tabela `pacientes`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| cpf | UNIQUE |
| plano_id | FK |

Tabela `especialidades`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |

Tabela `medicos`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| crm | UNIQUE |
| especialidade_id | FK |

Tabela `salas`:

| Campo | Chave |
| --- | --- |
| id | PK |
| numero | UNIQUE |
| andar |  |

Tabela `consultas`:

| Campo | Chave |
| --- | --- |
| id | PK |
| paciente_id | FK |
| medico_id | FK |
| sala_id | FK |
| data_hora |  |

Tabela `procedimentos`:

| Campo | Chave |
| --- | --- |
| id | PK |
| nome |  |
| valor |  |

Tabela `consulta_procedimentos`:

| Campo | Chave |
| --- | --- |
| consulta_id | PK/FK |
| procedimento_id | PK/FK |

#### Tarefa 3 - Reflexao

Se o plano "Unimed" alterar sua cobertura de 80% para 70%, no modelo normalizado sera necessario alterar apenas uma linha na tabela `planos_saude`.

No modelo original, a cobertura estaria repetida em varias consultas ou pacientes, exigindo atualizacao em muitos registros.

Vantagens do modelo normalizado:

- menos redundancia;
- menor risco de inconsistencia;
- manutencao mais simples;
- regras de negocio centralizadas;
- integridade dos dados mais forte.

---

## Complemento - Arquitetura de Software com Node.js e Zod

Para conectar a modelagem normalizada a uma API robusta, a aplicacao pode ser organizada em camadas. Essa separacao evita misturar regra de negocio, validacao e acesso ao banco no mesmo arquivo.

### Estrutura sugerida

```txt
src/
  server.ts
  routes/
    pacientes.routes.ts
    medicos.routes.ts
    consultas.routes.ts
  controllers/
    pacientes.controller.ts
    medicos.controller.ts
    consultas.controller.ts
  services/
    pacientes.service.ts
    medicos.service.ts
    consultas.service.ts
  repositories/
    pacientes.repository.ts
    medicos.repository.ts
    consultas.repository.ts
  schemas/
    paciente.schema.ts
    medico.schema.ts
    consulta.schema.ts
  middlewares/
    validate.ts
```

### Responsabilidade de cada camada

| Camada | Responsabilidade |
| --- | --- |
| `routes` | Define os endpoints da API |
| `controllers` | Recebe a requisicao e devolve a resposta HTTP |
| `services` | Concentra regras de negocio |
| `repositories` | Faz acesso ao banco de dados |
| `schemas` | Define validacoes com Zod |
| `middlewares` | Executa validacoes e tratamentos reutilizaveis |

### Exemplo de schema Zod - Paciente

```ts
import { z } from "zod";

export const createPacienteSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve conter 11 digitos"),
  plano_id: z.number().int().positive().optional()
});

export type CreatePacienteInput = z.infer<typeof createPacienteSchema>;
```

Esse schema protege a entidade `pacientes`, garantindo que dados invalidos nao cheguem ao service nem ao banco.

### Exemplo de schema Zod - Consulta

```ts
import { z } from "zod";

export const createConsultaSchema = z.object({
  paciente_id: z.number().int().positive(),
  medico_id: z.number().int().positive(),
  sala_id: z.number().int().positive(),
  data_hora: z.string().datetime(),
  procedimentos: z.array(
    z.object({
      procedimento_id: z.number().int().positive(),
      quantidade: z.number().int().positive().default(1)
    })
  ).min(1, "A consulta deve ter pelo menos um procedimento")
});

export type CreateConsultaInput = z.infer<typeof createConsultaSchema>;
```

Esse schema respeita o modelo normalizado, pois a consulta referencia paciente, medico, sala e procedimentos por IDs, em vez de repetir nomes, CPF, CRM, andar da sala ou cobertura do plano.

### Middleware de validacao

```ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Dados invalidos",
        errors: result.error.flatten()
      });
    }

    req.body = result.data;
    return next();
  };
}
```

### Exemplo de rota

```ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createConsultaSchema } from "../schemas/consulta.schema";
import { createConsultaController } from "../controllers/consultas.controller";

const router = Router();

router.post("/consultas", validate(createConsultaSchema), createConsultaController);

export { router as consultasRoutes };
```

### Relacao entre normalizacao e API

| Decisao de modelagem | Impacto na API |
| --- | --- |
| Usar FKs em vez de repetir nomes | Payloads menores e dados mais consistentes |
| Separar tabelas em 3FN | Services mais simples e menos regras de correcao |
| Validar com Zod antes do banco | Menos registros invalidos persistidos |
| Calcular totais via query quando possivel | Evita divergencia entre itens e total |
| Centralizar regras em services | Facilita manutencao e testes |

Assim, a normalizacao melhora a integridade dos dados no banco, enquanto o Zod garante que a API receba entradas coerentes antes de executar as regras de negocio.
