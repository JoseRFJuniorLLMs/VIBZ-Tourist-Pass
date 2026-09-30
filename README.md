# VIBZ Tourist Pass

Protótipo web responsivo para apresentação do **VIBZ Tourist Pass**, programa promocional pensado para conectar hotéis, pousadas, restaurantes, beach clubs e turistas à vida noturna de Búzios.

## Conceito

O turista recebe um passe com QR Code individual em um parceiro. Ao chegar ao VIBZ, o QR é validado, a entrada promocional é registrada e o cliente recebe uma pulseira vinculada ao atendimento. O consumo é pago normalmente.

O site traduz o fluxo comercial definido no plano:

**cartão físico premium → QR individual → entrada promocional → pulseira vinculada → consumo pago → dashboard por origem**

## O que está implementado

- Landing page responsiva em HTML, CSS e JavaScript puros.
- Identidade visual preto, laranja e magenta inspirada no conceito aprovado.
- Mockups do cartão, smartphone, QR e pulseira.
- Fluxo visual de 4 etapas.
- Lista filtrável de estabelecimentos reais pesquisados em Búzios para simulação comercial.
- Aviso explícito de que a listagem não representa parceria confirmada.
- Dashboard demonstrativo com distribuição, entradas, pulseiras, ticket médio, conversão e ranking.
- Simulação de leitura do QR Code, validação, liberação de entrada e associação de pulseira.
- Formulário demonstrativo de interesse de parceiros.
- Firebase Analytics configurado no projeto `vibz-tourist`.
- Firebase Hosting configurado por `firebase.json` e `.firebaserc`.

## Pesquisa local

A demonstração utiliza exemplos reais de hospedagem, gastronomia e beach clubs de Armação dos Búzios, incluindo opções de João Fernandes, Orla Bardot, Ferradura e Tucuns.

> **Importante:** a presença de qualquer estabelecimento no protótipo não significa parceria, autorização de marca ou vínculo comercial. Os nomes são usados somente para demonstrar a proposta de prospecção.

## Firebase

A configuração Web do Firebase está integrada em `script.js` para Analytics.

Nesta versão, o formulário não grava dados pessoais no Firestore. O lead fica apenas no `localStorage` do navegador e o Analytics registra o evento de conversão. Isso evita publicar um formulário com regras de banco improvisadas, tradição humana que raramente termina de forma elegante.

Para produção, conecte o formulário a uma API/CRM ou a uma coleção Firestore protegida por regras de segurança e validação server-side.

## Executar localmente

Como `script.js` usa ES Modules:

```bash
python -m http.server 8080
```

Abra:

```text
http://localhost:8080
```

## Deploy no Firebase Hosting

Com o Firebase CLI autenticado:

```bash
firebase use vibz-tourist
firebase deploy --only hosting
```

## Estrutura

```text
VIBZ-Tourist-Pass/
├── assets/
│   ├── qr-demo.svg
│   └── vibz-logo.svg
├── .firebaserc
├── firebase.json
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Próximos passos de produção

1. Backend para emissão e validação de QR Codes únicos.
2. Cadastro de parceiros e lotes de cartões por origem.
3. Associação real QR → pulseira → consumo.
4. Autenticação do operador da entrada.
5. Persistência segura, regras de acesso e trilha de auditoria.
6. Dashboard real por parceiro, horário, conversão e receita.
7. Consentimento separado para qualquer dado pessoal ou marketing.
8. Domínio oficial, política de privacidade e regulamento da promoção.

---

**Status:** protótipo comercial funcional, pronto para deploy no Firebase Hosting.
