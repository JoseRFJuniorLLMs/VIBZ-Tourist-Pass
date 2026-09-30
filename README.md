# VIBZ Tourist Pass

Protótipo web responsivo para apresentação do **VIBZ Tourist Pass**, um programa promocional pensado para conectar hotéis, pousadas, hostels, restaurantes, beach clubs e turistas à vida noturna de Búzios.

## Proposta

O turista recebe um cartão/passe com QR Code individual em um parceiro de hospedagem ou turismo. Ao chegar ao VIBZ, o QR é validado, a entrada promocional é registrada e o cliente recebe uma pulseira vinculada para consumo.

O conceito segue o plano de negócio do projeto:

- cartão físico premium com QR individual;
- distribuição por parceiros locais;
- entrada promocional no VIBZ;
- consumo pago normalmente;
- pulseira vinculada ao passe;
- controle de fraude e reutilização;
- dashboard com origem, conversão e ticket médio;
- expansão futura para um passaporte turístico de Búzios.

## Site

O projeto foi construído em HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

### Recursos da demonstração

- layout responsivo inspirado na identidade visual preto + laranja + magenta;
- hero com mockup do cartão, smartphone e pulseira;
- fluxo visual de 4 etapas;
- grade filtrável de parceiros potenciais em Búzios;
- dashboard demonstrativo de cartões, entradas, pulseiras e ticket médio;
- gráfico de entradas por dia e funil de conversão;
- modal de leitura/validação do QR Code;
- modal de cadastro de parceiro;
- animações e contadores;
- navegação mobile.

## Parceiros exibidos

Os nomes de hotéis, restaurantes e beach clubs usados no protótipo foram pesquisados como estabelecimentos reais de Búzios para dar realismo à apresentação. **A presença de qualquer empresa no site não representa parceria comercial confirmada, autorização de marca ou vínculo com o VIBZ Tourist Pass.**

## Executar localmente

Basta abrir `index.html` no navegador. Para servir por HTTP:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Estrutura

```text
VIBZ-Tourist-Pass/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Próximos passos para produção

1. Backend para emissão e validação de QR Codes únicos.
2. Cadastro de parceiros e lotes de cartões por origem.
3. Associação QR → pulseira → consumo.
4. Autenticação do operador da entrada.
5. Banco de dados e trilha de auditoria.
6. Dashboard real por parceiro, horário, conversão e receita.
7. Consentimento separado para qualquer dado pessoal ou comunicação de marketing.
8. Domínio, hospedagem, analytics e política de privacidade.

---

**Status:** protótipo comercial / demonstração.
