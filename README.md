# Gastrô Frontend

Bem-vindo ao **Gastrô Frontend**! Este projeto é um Frontend desenvolvido com **Node.js, React-Native, Tailwind, TypeScript, Expo, Material UI**.

## 📌 **Pré-requisitos**
Antes de rodar o projeto, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/dist/v20.19.0/node-v20.19.0-x64.msi) (versão 20.19 LTS)
- [Git](https://git-scm.com/)
- Expo - App mobile


## 🚀 **Rodando o Projeto**
### **1️⃣ Clonar o repositório**
```sh
  git clone https://tools.ages.pucrs.br/gastro/gastro-frontend.git
  cd gastro-frontend
  cd gastro
```
## **Criando Branch**
```sh
  git checkout development
  git pull
  git checkout -b feature/US-NUMERO-nome-feat (exemplo: feature/US-03-tela-login) (exemplo com fix: fix/US-03-tela-login)
```
## **Fazendo commit**
```sh
  git status
  git add .
  git commit -m 'feat:o que eu fiz' (exemplo: 'feat: adiciona componente input') (exemplo com fix: 'fix: ajusta componente input')
  git push
```

## **Merge Request**

- Acessar o [site do tools](https://tools.ages.pucrs.br/gastro/gastro-frontend/-/branches);
- Selecionar a sua branch;
- Solicitar o merge request;
    
Obs: lembre-se de adicionar capturas de tela e explicações do que foi feito.

---

### 🏗️ Construção e execução

Caso queira rodar pelo computador:

```sh
npm install --force         # Instala dependências
npx expo start              # Inicia o expo
```


---

## 📄 **Estrutura do Projeto**
```
📦 gastro-frontend
├── 📂 .expo # Arquivos de configuração do Expo
├── 📂 app # Arquivos principais de layout e navegação
│ ├── 📄 _layout.tsx # Layout principal do app
│ └── 📄 index.tsx # Tela inicial do app
├── 📂 assets # Imagens, fontes e recursos estáticos
├── 📂 components # Componentes reutilizáveis da aplicação
├── 📂 constants # Constantes usadas no projeto
├── 📂 hooks # Hooks personalizados React
├── 📂 node_modules # Dependências instaladas (gerado automaticamente)
├── 📂 screens # Telas e páginas do app
├── 📂 utils # Funções utilitárias
├── 📄 .gitignore # Arquivos ignorados pelo Git
├── 📄 app.json # Configuração do Expo/App
├── 📄 expo-env.d.ts # Tipagens adicionais do Expo
├── 📄 package-lock.json # Versões exatas das dependências instaladas
├── 📄 package.json # Dependências e scripts npm
├── 📄 README.md # Documentação principal
└── 📄 tsconfig.json # Configuração do TypeScript
```

---


## 🛠 Tecnologias Utilizadas

- **Node.js**: [Documentação](https://nodejs.org/)
- **TypeScript**: [Documentação](https://www.typescriptlang.org/)
- **Expo**: [Documentação](https://expo.dev/)
- **Tailwind**: [Documentação](https://tailwindcss.com/)
- **React-Native**: [Documentação](https://reactnative.dev/)
- **Material UI**: [Documentação](https://mui.com/material-ui/?srsltid=AfmBOoqZlbpch5ix4GRFQgbEHYn2iyE6ir3-5An62BooFfeSSg7S7bGh)
