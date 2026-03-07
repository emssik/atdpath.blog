---
title: "Top5 — desktopowy menedżer uwagi"
description: "Aplikacja Electron, która wymusza limit aktywnych projektów i pomaga skupić się na tym, co naprawdę ważne. Lokalny storage, synchronizacja przez iCloud, tryb focus z timerem."
pubDatetime: 2026-03-07
repo: "https://github.com/emssik/top5"
tags:
  - electron
  - react
  - typescript
  - tailwindcss
  - zustand
  - fastify
difficulty: advanced
---

## O projekcie

Top5 to desktopowa aplikacja do zarządzania uwagą, nie kolejny menedżer zadań. Główna idea jest prosta — możesz mieć maksymalnie 5 aktywnych projektów (limit konfigurowalny). Reszta czeka w zawieszeniu. To zmusza do podejmowania decyzji, zamiast gromadzenia nieskończonych list.

Aplikacja powstała jako narzędzie codziennej pracy i jest na co dzień używana na macOS. Dane trzymane lokalnie w plikach YAML i JSONL, synchronizowane przez iCloud Drive — zero chmurowych zależności, pełna kontrola nad swoimi danymi.

![Widok dnia — centrum dowodzenia z podziałem na sekcje](/images/piy/top5/today-view.png)

Widok dnia to miejsce, w którym zaczyna się każdy poranek. Zadania ułożone w przejrzyste sekcje — od tego, nad czym pracujesz właśnie teraz, przez zaplanowane na dziś, po te czekające w kolejce. Pasek 30 dni na górze pokazuje serię zwycięstw — zielone kropki to dni, w których udało się domknąć zadania.

## Podstawowa funkcjonalność

- **Limit projektów** — konfigurowalna górna granica aktywnych projektów (1-20), wymusza priorytetyzację
- **Widok dnia** — strona startowa grupująca zadania w sekcje: skupienie, zaplanowane, w trakcie, następne, nadmiarowe, zrobione
- **Tryb focus** — kompaktowy, zawsze-na-wierzchu pasek z timerem sesji i odpytkami co 15 minut, czy dalej pracujesz
- **System 5 zwycięstw** — zablokuj dzisiejsze zadania, rozstrzygnij dzień jako wygrany lub przegrany, śledź serie
- **Widok zeszytowy** — tryb bez rozpraszaczy z odręcznym fontem i kropkowaną siatką
- **Szybkie dodawanie** — globalny skrót `Cmd+Shift+N` otwiera nakładkę do błyskawicznego tworzenia zadań
- **Zadania powtarzalne** — silnik harmonogramów: codziennie, wybrane dni tygodnia, co N dni, dzień miesiąca i więcej
- **Dziennik Obsidian** — automatyczne dzienne, tygodniowe i miesięczne notatki z ukończonymi zadaniami i czasem pracy
- **HTTP API** — lokalny serwer REST (Fastify) do automatyzacji i integracji z agentami AI
- **Linki projektowe** — szybki dostęp do VS Code, iTerm, Obsidian, przeglądarki z poziomu projektu

![Widok zeszytowy — odręczny font na kropkowanej siatce](/images/piy/top5/clean-view.png)

Widok zeszytowy to tryb bez rozpraszaczy. Odręczny font, kropkowana siatka w tle i tylko dzisiejsze zadania — nic więcej. Ukończone zadania przekreślone na dole. Idealny na drugi monitor albo na chwilę, kiedy potrzebujesz spokoju.

![Tryb focus — minimalistyczny pasek z licznikiem czasu](/images/piy/top5/focus-bar.png)

Pasek focus to małe okienko, które siedzi zawsze na wierzchu. Nazwa zadania, czas sesji, i trzy przyciski — nic więcej nie potrzebujesz. Kliknięcie prawym przyciskiem otwiera pełne menu kontekstowe.

![Menu focus — szybkie akcje bez przełączania okien](/images/piy/top5/focus-menu.png)

Z menu focus możesz otworzyć VS Code, notatki w Obsidianie, dodać czas ręcznie, zakończyć zadanie albo wyjść z trybu skupienia. Wszystko bez wracania do głównego okna — żeby nie tracić wątku.

![Menu linków projektowych — prawy klik i jesteś w VS Code](/images/piy/top5/project-links.png)

Prawy klik w widoku dnia otwiera listę wszystkich aktywnych projektów z ich linkami. Jedno kliknięcie i jesteś w VS Code, terminalu albo przeglądarce. Projekty bez linków też są widoczne — kliknięcie kodu otwiera projekt w aplikacji.

## Stos technologiczny

- **Electron 40** + electron-vite 5 — rdzeń aplikacji desktopowej
- **React 18** + TypeScript — interfejs użytkownika
- **Tailwind CSS v4** — stylowanie
- **Zustand v5** — zarządzanie stanem
- **Fastify** — wbudowane HTTP API
- **YAML + JSONL** — lokalne przechowywanie danych (zero bazy danych)

## Uruchomienie i testowanie

```bash
# Sklonuj repozytorium
git clone https://github.com/emssik/top5.git
cd top5

# Zainstaluj zależności
npm install

# Uruchom w trybie deweloperskim (osobny katalog danych)
npm run dev

# Zbuduj wersję produkcyjną
npm run build

# Testy
npm test          # testy jednostkowe
npm run test:api  # testy HTTP API (vitest)
```

Tryb deweloperski automatycznie izoluje dane w `~/.config/top5-dev`, więc nie nadpiszesz swoich produkcyjnych projektów.

## Architektura w skrócie

Projekt dzieli się na cztery warstwy:

- `src/main/` — proces główny Electrona: okna, IPC, storage, API, focus, skróty
- `src/shared/` — współdzielone typy, silnik harmonogramów, obliczenia serii
- `src/preload/` — most IPC między procesami (contextBridge)
- `src/renderer/` — interfejs React z Zustand store jako jedynym źródłem prawdy

Dane to zwykłe pliki: `data.yaml` (projekty, konfiguracja), `checkins.jsonl` (logi focus), `wins.jsonl` (historia wygranych), `operations.jsonl` (dziennik aktywności). Codzienne kopie zapasowe tworzą się automatycznie.

![Widok projektu — zadania, linki i pełna historia w jednym miejscu](/images/piy/top5/project-detail.png)

Każdy projekt ma własny widok ze wszystkimi zadaniami, linkami do narzędzi i podsumowaniem spędzonego czasu. Zadania do zrobienia kiedyś trafiają do schowanej sekcji Someday, a 38 ukończonych czeka zwinięte w Done — żeby nie przeszkadzały, ale dało się do nich wrócić.

![Statystyki — twarde liczby zamiast przeczuć](/images/piy/top5/statistics.png)

110 ukończonych zadań, prawie 116 godzin skupienia, seria 26 dni bez przerwy. Kalendarz 5 Wins pokazuje, które dni były wygrane, a karty na dole rozbijają czas na poszczególne projekty. Widać od razu, gdzie idzie energia.

![Dziennik aktywności — co się działo i kiedy](/images/piy/top5/activity-log.png)

Dziennik aktywności zapisuje wszystko: rozpoczęcie focus, utworzenie zadania, ukończenie, zmianę projektu. Kolorowe kropki rozróżniają typy zdarzeń, a filtry pozwalają wyciągnąć tylko to, co akurat potrzebne.

## CLI i integracja z Claude Code

W pakiecie jest też aplikacja konsolowa `top5` — pełnoprawne narzędzie do zarządzania projektami i zadaniami prosto z terminala. Komunikuje się z działającą aplikacją Electron przez lokalne HTTP API, więc wystarczy wpisać `top5 projects` żeby zobaczyć listę projektów, `top5 add PRJ "Nowe zadanie"` żeby dodać zadanie, albo `top5 focus PRJ-3` żeby włączyć tryb skupienia — bez dotykania myszki.

```bash
top5 projects              # lista aktywnych projektów
top5 tasks PRJ             # zadania w projekcie PRJ
top5 add PRJ "Nowe zadanie"  # dodaj zadanie
top5 done PRJ-3            # oznacz jako zrobione
top5 focus PRJ-3           # włącz focus na zadaniu
top5 note PRJ-3            # otwórz notatkę w Obsidianie
```

Do tego dochodzi skill do Claude Code — po zainstalowaniu Claude zna strukturę Top5 i potrafi sam sprawdzać projekty, dodawać zadania, włączać focus czy zamykać zrobione rzeczy. Wystarczy powiedzieć „pokaż moje projekty" albo „dodaj zadanie do Top5" i Claude obsłuży resztę przez CLI. Skill jest częścią repozytorium, gotowy do skopiowania do `~/.claude/skills/`.

## Licencja

Projekt udostępniony na licencji MIT z klauzulą [Commons Clause](https://commonsclause.com/). Możesz swobodnie czytać kod, uczyć się z niego, forkować i modyfikować na własne potrzeby — także w firmie. Jedyne ograniczenie: nie możesz sprzedawać tej aplikacji jako własnego produktu ani oferować jej jako płatnej usługi.

## Rozbudowa na własną rękę

- **Widżet systemowy** — miniaturowy wskaźnik na pasku menu pokazujący aktualny focus i czas sesji
- **Raporty tygodniowe** — podsumowanie z wykresami: ile czasu na który projekt, trendy w seriach
- **Integracja z kalendarzem** — importowanie wydarzeń jako zadań zaplanowanych
- **Synchronizacja wielourządzeniowa** — zastąpienie iCloud własnym mechanizmem sync (np. CRDTs)
- **Powiadomienia push** — przypomnienia o zaplanowanych zadaniach lub zbliżających się terminach
- **Eksport danych** — generowanie raportów CSV/PDF z podsumowaniem projektów i czasu pracy
- **Wtyczki** — system rozszerzeń pozwalający dodawać własne widoki lub integracje
