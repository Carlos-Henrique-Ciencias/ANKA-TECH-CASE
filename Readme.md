# ANKA-TECH-CASE

Sistema containerizado para gerenciamento de clientes e ativos financeiros, desenvolvido como desafio técnico para a Anka Tech. 

## 🚀 Tecnologias Utilizadas

- **Backend:** Node.js, Fastify, Prisma ORM, Zod  
- **Frontend:** React, Vite, TypeScript, Axios, React Query  
- **Banco de Dados:** MySQL (Docker)
- **Infraestrutura:** Docker Compose

## 📦 Como rodar o projeto

Clone o repositório:
```sh
git clone https://github.com/Carlos-Henrique-Ciencias/ANKA-TECH-CASE.git
cd ANKA-TECH-CASE 
```
Depois suba a infraestrutura Docker:
```sh
docker compose up -d
```



**Pronto! Agora o projeto está rodando:**
- O backend (API) está em: `http://localhost:3001`
- O frontend em: `http://localhost:5173`
- O banco MySQL está isolado no container `anka-db`

---

## 📋 Exigências Atendidas

- [x] Cadastro, edição e exclusão de clientes (com nome, email e status)
- [x] Cadastro, edição e exclusão de ativos financeiros por cliente
- [x] Visualização de todos os ativos vinculados ao cliente
- [x] Backend, frontend e banco de dados 100% isolados com Docker Compose
- [x] Uso de Prisma, React Query, React Hook Form, Zod e Axios
- [x] 100% TypeScript


## Sobre o ShadCN
Não foi utilizado ShadCN pois a biblioteca encontra-se descontinuada, possui problemas de compatibilidade com versões modernas do Node.js e React, além de gerar vários conflitos durante a instalação em projetos novos.  
Para garantir a entrega, todo o layout foi feito em CSS customizado, leve e responsivo.

---

## 🖼️ Prints das telas

## Print da tela de clientes

![Print da tela de clientes](https://drive.google.com/uc?export=view&id=1-PXDllcDXrRU7N4vEfSpSW5gB6OZftA9)

## Print da tela de ativos

![Print da tela de ativos](https://drive.google.com/uc?export=view&id=1ORXbe-ANtz63nfbvxgCfwu5JgkMPJgJx)


---

## 👨‍💻 Autor

- **Carlos Henrique**
- Ciência da Computação - UFS  
- GitHub: [Carlos-Henrique-Ciencias](https://github.com/Carlos-Henrique-Ciencias)

---

