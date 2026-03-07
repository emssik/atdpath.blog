---
name: piy
description: "Generowanie strony opisu projektu PIY (Prompt It Yourself) dla bloga atdpath. Uruchamiany z dowolnego repozytorium - analizuje projekt i tworzy plik markdown z opisem w sekcji PIY bloga. Używaj gdy: użytkownik chce dodać projekt do PIY, wygenerować opis projektu na stronę PIY, stworzyć wpis PIY, lub mówi 'dodaj do piy', 'piy', 'stwórz stronę piy'. Triggery: 'piy', 'dodaj do piy', 'nowy projekt piy', 'wygeneruj piy'."
---

# PIY - Prompt It Yourself

Skill generuje plik markdown z opisem projektu do sekcji PIY bloga atdpath.

## Ścieżka docelowa

Blog znajduje się w: `/Users/daniel/00_work/projects/active/page.blog.atdpath`
Pliki PIY: `src/content/piy/<slug>.md`

## Przepływ pracy

1. **Rozpoznać projekt** - przeczytać README.md, package.json (lub analogiczny plik manifestu), przejrzeć strukturę katalogów i kod źródłowy bieżącego repozytorium
2. **Ustalić slug** - krótka, unikalna nazwa projektu (kebab-case, po polsku lub angielsku zależnie od nazwy projektu)
3. **Wygenerować plik markdown** w `src/content/piy/<slug>.md` w projekcie bloga
4. **Potwierdzić** - wyświetlić ścieżkę pliku i krótkie podsumowanie

## Format pliku markdown

```markdown
---
title: "Nazwa projektu"
description: "Zwięzły opis w 1-2 zdaniach po polsku"
pubDatetime: YYYY-MM-DD
repo: "https://github.com/user/repo"
tags:
  - tag1
  - tag2
difficulty: beginner|intermediate|advanced
---

## O projekcie

Ogólny opis projektu - czym jest, do czego służy, jak powstał.
Napisany piękną polszczyzną, bez zbędnych anglicyzmów.
Zastąpić angielskie terminy polskimi odpowiednikami gdzie to naturalne
(np. "tablica rozdzielcza" zamiast "dashboard", "repozytorium" jest OK).

Wersja jest dostosowana i na co dzień używana na macOS.

## Podstawowa funkcjonalność

- Punkt 1
- Punkt 2
- ...

## Uruchomienie i testowanie

Krok po kroku jak uruchomić projekt lokalnie.
Jakie zależności zainstalować, jakie polecenia wykonać.

## Rozbudowa na własną rękę

Potencjalne kierunki rozwoju projektu - pomysły co można dodać,
zmienić, ulepszyć. Zachęta do samodzielnych eksperymentów.
```

## Zasady treści

- Pisać piękną polszczyzną, unikać zbędnych anglicyzmów
- Terminy techniczne (nazwy narzędzi, poleceń, języków) pozostawiać w oryginale
- Zawsze wspomnieć, że wersja jest dostosowana i na co dzień używana na macOS
- Difficulty oceniać na podstawie złożoności projektu:
  - `beginner` - prosty projekt, kilka plików, podstawowe technologie
  - `intermediate` - więcej zależności, API, bardziej złożona logika
  - `advanced` - złożona architektura, wiele integracji, zaawansowane wzorce
- Tagi dobierać z nazw technologii/języków użytych w projekcie (małe litery)
- `pubDatetime` ustawiać na dzisiejszą datę
- `repo` pobrać z konfiguracji git (`git remote get-url origin`) i zamienić na URL HTTPS
- Sekcja "Rozbudowa na własną rękę" powinna zawierać konkretne, realistyczne pomysły na rozbudowę dopasowane do specyfiki projektu
- Ton: przyjazny, zachęcający, rzeczowy - bez przesadnego entuzjazmu
