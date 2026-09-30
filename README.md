# Vulnerabilidades: estudo de SQL Injection, paginação e qualidade de código

API REST em Node.js criada em disciplina de Sistemas de Informação (UniFOA) para **demonstrar, testar e analisar vulnerabilidades** de acesso a banco de dados, comparando código inseguro com implementações corretas.

> ⚠️ **Projeto educacional.** As rotas marcadas como vulneráveis existem de propósito, para estudo. Não use este código em produção.

## O que o projeto demonstra

| Tema | Implementação |
|---|---|
| **SQL Injection** | Rotas `/admin/clientes/teste/:id` e `/admin/login` montam SQL por concatenação de strings (vulneráveis) |
| **Correção** | Consultas parametrizadas (`?`) nas rotas de paginação |
| **Paginação por offset** | `GET /admin/clientesPage?page=N` |
| **Paginação por cursor** | `GET /admin/clientesCursor` |
| **Testes automatizados** | Testes de ponta a ponta com **Poku** (página válida e página inválida com HTTP 400) |
| **Análise estática** | **SonarQube** para detectar vulnerabilidades e code smells |

## Stack

Node.js, Express 5, MySQL (mysql2) e SQL Server (mssql), Poku, start-server-and-test, SonarQube Scanner.

## Arquitetura

```
src/
├── routes/        # definição das rotas
├── controllers/   # validação de entrada e respostas HTTP
├── repositories/  # acesso ao banco
├── database/      # conexão, scripts SQL, procedures e consultas
└── server.js
tests/
└── paginatione2e.test.js
```

## Como rodar

```bash
git clone https://github.com/wesleybalb/vulnerabilidades.git
cd vulnerabilidades
npm install
# crie um .env com os dados de conexão e rode src/database/LOJA_VIRTUAL.sql
npm start
```

### Testes

```bash
npm run test:server   # sobe a API e executa os testes com Poku
```

### Análise com SonarQube

Com um SonarQube local em `http://localhost:9000`, defina o token em variável de ambiente (`SONAR_TOKEN`) e execute o scanner.

## Aprendizados

- Por que concatenação de SQL permite bypass de login (`' OR '1'='1`)
- Validação de entrada na camada de controller
- Diferença de desempenho entre paginação por offset e por cursor
- Uso de análise estática para achar falhas antes do deploy

## Autor

Wesley Balbino · [LinkedIn](https://www.linkedin.com/in/wesley-balbino) · [GitHub](https://github.com/wesleybalb)
