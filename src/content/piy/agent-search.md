---
title: "Agent Search — bezwektorowy silnik wyszukiwania dla agentów AI"
description: "Narzędzie CLI w Rust, które indeksuje korpus plików tekstowych i zwraca najistotniejsze fragmenty w formacie JSON — gotowe do wstrzyknięcia w kontekst LLM. Architektura GrepRAG z rankingiem BM25, polskim stemmerem i budżetem tokenów."
pubDatetime: 2026-03-12
repo: "https://github.com/emssik/agent-search"
tags:
  - rust
  - tantivy
  - bm25
  - nlp
  - cli
difficulty: intermediate
---

## Historia

RAG to bardzo popularne określenie. Wszyscy teraz budują RAGi z danymi firmowymi, żeby móc w nich łatwo wyszukiwać :)

Problem polega na tym, że nie ma w tym nic łatwego. Zbudowanie dobrego RAGa wymaga naprawdę sporo wiedzy i... danych wysokiej jakości.

Jednak zupełnie niedawno uznano, że wyszukiwanie plików przy pomocy tradycyjnych narzędzi, jak np. rgrep, daje wcale nie gorsze wyniki, a często nawet lepsze, szybsze, no i poziom skomplikowania jest nieporównywalnie niższy.

- [Are Search Engines Still Needed? LLMs as Retrieval Systems](https://arxiv.org/abs/2601.23254)
- [Code Search Is All You Need](https://www.morphllm.com/blog/code-search-bottleneck)

Narzędzia jak Claude Code do wyszukiwania używają teraz właśnie głównie finda / grepa / rgrepa itp.

A w zasadzie dlaczego nie pójść dalej? Przecież błyskawicznie można dzisiaj zbudować narzędzie, które połączy ze sobą szybkie wyszukiwanie, full text search z rankingiem, deduplikację, ograniczenie odpowiedzi budżetem tokenów...

Tak oto powstał agent-search.

Indeksowanie 1400 plików Markdown (jeden z moich Vaultów obsidianowych) zajmuje mu 0,5 s, potem indeksuje już tylko nowe / zmienione pliki, a samo wyszukiwanie... około 50 ms ;)

To dopiero początek mojej zabawy z tym toolem, raptem 1 godzina, ale już... Czuję jego siłę :)

## O projekcie

Agent Search to narzędzie, które rozwiązuje konkretny problem: jak dostarczyć modelowi językowemu precyzyjny kontekst z dużego zbioru plików, nie wysyłając mu całego repozytorium?

Zamiast baz wektorowych i embeddingów, projekt opiera się na architekturze **GrepRAG** — podejściu czysto leksykalnym, które łączy indeksowanie pełnotekstowe (Tantivy) z algorytmem rankingowym BM25. Wynik to posortowane fragmenty kodu lub tekstu, przycięte do zadanego budżetu tokenów i zwrócone jako JSON z referencjami do źródeł.

Cały pipeline wygląda tak:

```
Korpus → Indeks Tantivy → Wyszukiwanie BM25 → Ekstrakcja fragmentów → Deduplikacja → Truncation → JSON
```

Narzędzie jest używane na co dzień na macOS jako backend wyszukiwania dla agentów AI pracujących na lokalnych bazach wiedzy (notatki Obsidian, dokumentacja projektowa, bazy lekcji).

## Podstawowa funkcjonalność

- Indeksowanie pełnotekstowe z polskim stemmerem Snowball — prawidłowa odmiana wyrazów w wyszukiwaniu
- Ranking BM25 z boostowaniem ścieżek plików (×3) — trafienie w nazwę pliku waży więcej niż trafienie w treść
- Ekstrakcja fragmentów z kontekstem i density-based scoring — im więcej trafień w okolicach, tym wyższy wynik
- Deduplikacja strukturalna — nakładające się fragmenty z tego samego pliku są sklejane w jedną całość
- Inteligentne przycinanie do budżetu tokenów z referencjami źródłowymi `[1]`, `[2]`...
- Indeksowanie inkrementalne — po pierwszym przebiegu aktualizowane są tylko nowe i zmienione pliki
- Respektowanie `.gitignore` i automatyczne pomijanie plików binarnych
- Wyjście JSON gotowe do bezpośredniego użycia jako kontekst LLM

## Uruchomienie i testowanie

Wymagany jest kompilator Rust (rustup.rs). Następnie:

```bash
git clone https://github.com/emssik/agent-search.git
cd agent-search
cargo build --release
```

Indeksowanie katalogu z notatkami:

```bash
./target/release/agent-search index -c ~/obsidian-vault
```

Wyszukiwanie:

```bash
./target/release/agent-search search -c ~/obsidian-vault -q "jak skonfigurować serwer"
```

Parametry do dostrojenia:

```bash
# Więcej kontekstu wokół trafień, większy budżet tokenów
./target/release/agent-search search -c ~/obsidian-vault \
  -q "autentykacja użytkowników" \
  --context-lines 15 \
  --token-budget 8192
```

Wydajność na Mac Studio M2: indeksowanie 1400 plików Markdown zajmuje ~0,5 s, wyszukiwanie ~50 ms.

## Rozbudowa na własną rękę

- **Obsługa wielu języków** — stemmer jest modularny, wystarczy dodać kolejny algorytm Snowball (angielski, niemiecki, czeski...) i przełącznik w CLI
- **Serwer HTTP** — opakowanie w prosty serwer (np. axum) pozwoli podpiąć wyszukiwanie jako MCP tool lub endpoint REST dla agentów
- **Wagi per katalog** — możliwość nadawania wyższej wagi plikom z określonych katalogów (np. dokumentacja ważniejsza niż logi)
- **Filtrowanie po rozszerzeniach** — flaga `--include "*.md,*.rs"` do zawężenia wyszukiwania
- **Integracja z Obsidian** — plugin, który wywołuje agent-search i wyświetla wyniki w panelu bocznym
- **Fuzzy matching** — dodanie trigramów lub odległości Levenshteina jako dodatkowej warstwy elastyczności

## Licencja

Projekt udostępniony na licencji MIT z klauzulą [Commons Clause](https://commonsclause.com/). Możesz swobodnie czytać kod, uczyć się z niego, forkować i modyfikować na własne potrzeby — także w firmie. Jedyne ograniczenie: nie możesz sprzedawać tej aplikacji jako własnego produktu ani oferować jej jako płatnej usługi.
