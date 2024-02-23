# Sobre o Projeto
Esta é uma aplicação para check-ins em academias desenvolvida baseada nos conceitos de SOLID, Design Patterns, Docker para iniciar o banco de dados, JWT e Refresh Token, RBAC, Testes unitários e de integração, CI etc.

## Tecnologias utilizadas:
- Node.js
- Fastify
- Prisma ORM
- Typescript
- Zod
- Vitest
- Docker
- Github Actions

## RFs (Requisitos funcionais)

- Deve ser possível se cadastrar;
- Deve ser possível se autenticar;
- Deve ser possível obter o perfil de um usuário logado;
- Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- Deve ser possível o usuário obter seu histórico de check-ins;
- Deve ser possível o usuário buscar academias próximas (até 10km);
- Deve ser possível o usuário buscar academias pelo nome;
- Deve ser possível o usuário realizar check-in em uma academia;
- Deve ser possível validar o check-in de um usuário;
- Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- O usuário não deve poder se cadastrar com um e-mail duplicado;
- O usuário não pode fazer 2 check-ins no mesmo dia;
- O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- O check-in só pode ser validado até 20 minutos após ser criado;
- O check-in só pode ser validado por administradores;
- A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- A senha do usuário precisa estar criptografada;
- Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- O usuário deve ser identificado por um JWT;

## Aplicação com esteira de CI

![nodeci](https://github.com/Luizenys/gympass-backend/assets/49442361/979f1c31-e2f1-45ea-845e-1ee73f25615f)

![e2e ci](https://github.com/Luizenys/gympass-backend/assets/49442361/a3ab9e73-1735-47b3-9dbb-975101c2c42a)


