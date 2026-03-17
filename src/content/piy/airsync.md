---
title: "Airsync — automatyczna synchronizacja Airtable do PostgreSQL"
description: "Narzędzie w Pythonie, które pobiera schematy i dane z baz Airtable, tworzy odpowiadające im tabele w PostgreSQL i utrzymuje je w synchronizacji. Z trybem dry-run, wykluczeniami i deployem przez Docker."
pubDatetime: 2026-03-17
repo: "https://github.com/emssik/airsync"
tags:
  - python
  - postgresql
  - airtable
  - docker
  - poetry
difficulty: intermediate
---

## Historia

Od dawna używam Airtable (taka baza danych no-code). Bardzo wygodne rozwiązanie, jednak w standardzie nie daje żadnej sensownej opcji backupu.

Krótko mówiąc — płacisz, ale jak chcesz pobrać dane to... klikaj osobno w każdą bazę i ręcznie zapisuj pliki CSV.

Powstało kilka komercyjnych rozwiązań, które pozwalają na kopiowanie baz, ale są absurdalnie drogie.

Stąd Airsync — synchronizacja baz z Airtable do PostgreSQL. Skrypt sam rozpoznaje bazy i dodaje nowe, jeśli się pojawią.

Dwie ważne sprawy:

1. Skrypt obecnie **nie dodaje dynamicznie nowych pól** — jak dodasz kolumnę w Airtable, trzeba wykasować kopię tabeli i puścić synchronizację od nowa. To jest proste do implementacji, po prostu tego nie potrzebowałem, bo nie planuję używać Airtable w przyszłości.
2. Skrypt **nie pobiera multimediów**.

Jeśli coś z tego jest Ci potrzebne, cóż... PIY :)

## O projekcie

Airsync powstał z prostej potrzeby — mieć dane z Airtable dostępne w PostgreSQL, bez ręcznego kopiowania i bez płatnych integracji. Narzędzie łączy się z API Airtable, pobiera schemat każdej bazy, tworzy odpowiadające tabele w PostgreSQL i synchronizuje rekordy przez mechanizm UPSERT. Całość działa automatycznie w harmonogramie cron lub na żądanie z linii poleceń.

Wersja jest dopasowana do codziennego użytkowania na macOS, ale dzięki Dockerowi równie dobrze działa na serwerze produkcyjnym.

## Podstawowa funkcjonalność

- Synchronizacja wielu baz Airtable jednocześnie — jedno uruchomienie ogarnia wszystko
- Automatyczne tworzenie tabel PostgreSQL na podstawie schematów Airtable z mapowaniem typów
- UPSERT — nowe rekordy wstawiane, istniejące aktualizowane, bez duplikatów
- Kolumny `created_at` i `updated_at` z automatycznym triggerem aktualizacji
- Tryb dry-run — podgląd zmian bez zapisu do bazy, przydatny do debugowania
- Synchronizacja wybranej bazy po ID (`--base-id`)
- Lista wykluczeń w pliku konfiguracyjnym — pomijanie baz, które nie powinny trafiać do PostgreSQL
- Ochrona przed SQL injection — nazwy tabel i kolumn budowane przez `psycopg2.sql`
- Deduplikacja kolumn i sanityzacja nazw (słowa zastrzeżone PostgreSQL, znaki specjalne)
- Deploy produkcyjny przez Docker Compose z zaszyfrowanymi sekretami (SOPS/age)

## Uruchomienie i testowanie

```bash
# Sklonuj repozytorium
git clone https://github.com/emssik/airsync.git
cd airsync

# Zainstaluj zależności
poetry install

# Skonfiguruj zmienne środowiskowe
cp .env.example .env
# Uzupełnij AIRTABLE_API_KEY i POSTGRESQL_PASSWORD

# Dostosuj config.yaml — adres bazy, lista wykluczeń

# Synchronizacja wszystkich baz
poetry run python src/main.py

# Synchronizacja konkretnej bazy
poetry run python src/main.py --base-id APP123

# Podgląd bez zapisu (dry-run)
poetry run python src/main.py --dry-run

# Testy
poetry run pytest
```

Do pracy z Dockerem:

```bash
# Budowanie obrazów
./docker/build.sh

# Deploy produkcyjny
docker compose -f compose.prod.yaml up -d
```

## Rozbudowa na własną rękę

- **Synchronizacja przyrostowa** — zamiast pobierać wszystkie rekordy, śledzić tylko zmiany od ostatniej synchronizacji (Airtable udostępnia pole `lastModifiedTime`)
- **Usuwanie rekordów** — wykrywanie rekordów usuniętych w Airtable i kaskadowe usuwanie ich z PostgreSQL
- **Powiadomienia** — wysyłanie alertu (Slack, e-mail) po zakończeniu synchronizacji lub w razie błędu
- **Obsługa załączników** — pobieranie plików z pól `multipleAttachments` i zapisywanie ich na dysku lub w S3
- **Panel statusu** — prosty interfejs webowy z historią uruchomień, czasem trwania i liczbą zsynchronizowanych rekordów
- **Mapowanie relacji** — zamiana pól `multipleRecordLinks` na prawdziwe klucze obce między tabelami w PostgreSQL
- **Wielowątkowe pobieranie** — równoległe odpytywanie API Airtable dla wielu baz jednocześnie

## Licencja

Projekt udostępniony na licencji MIT z klauzulą [Commons Clause](https://commonsclause.com/). Możesz swobodnie czytać kod, uczyć się z niego, forkować i modyfikować na własne potrzeby — także w firmie. Jedyne ograniczenie: nie możesz sprzedawać tej aplikacji jako własnego produktu ani oferować jej jako płatnej usługi.
