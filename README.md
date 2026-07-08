# Borgonha & Champagne 🍷🥂

App de viagem (página única) para o roteiro pela **Borgonha** e **Champagne**, na França —
**5 a 11 de outubro de 2026**. Feito para rodar no GitHub Pages, mobile-first e em português.

## O que tem

- **Roteiro dia a dia** — 7 dias, com Borgonha primeiro (Dijon, Côte de Nuits, Beaune)
  e depois Champagne (Reims, Épernay). Cada dia abre/fecha com sugestões de vinícolas,
  cidades e restaurantes. Inclui link do hotel da Borgonha no mapa.
- **Diário de vinhos** — registre cada degustação (vinho, produtor, safra, região, nota
  de 1 a 5 estrelas e notas). Fica salvo **no próprio navegador** (localStorage) — nada
  é enviado para a internet.
- **Frases em francês** — o essencial para restaurantes e vinícolas, com pronúncia
  aproximada. Toque numa frase para ouvir a pronúncia (síntese de voz do navegador).
- **Contagem regressiva** para o início da viagem.

## Como usar

Abra o `index.html` no navegador, ou publique via **GitHub Pages**
(Settings → Pages → branch) e acesse pelo celular durante a viagem.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Estrutura da página e das três abas |
| `styles.css` | Estilo (tema borgonha/champanhe, claro e escuro) |
| `app.js` | Roteiro, diário de vinhos, frases e contagem regressiva |

## Ajustar datas / mês

No topo de `app.js` há uma seção **Config da viagem** com `TRIP_MONTH`, `TRIP_START_DAY`
e o link do hotel — basta editar ali. O roteiro fica no array `ITINERARY`.
