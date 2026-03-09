---
title: "atdpath: blog — osobisty blog o wchodzeniu w świat z AI"
description: "Strona blogowa zbudowana w Astro z Tailwind CSS, z sekcjami postów, projektów PIY, kanałem RSS, lightboxem i dynamicznym generowaniem obrazów Open Graph."
pubDatetime: 2026-03-08
repo: "https://github.com/emssik/atdpath.blog"
tags:
  - astro
  - tailwindcss
  - typescript
  - mdx
  - satori
  - sharp
difficulty: intermediate
---

## Historia

Moje konto na GitHubie było przeważnie martwe. Co to ze mnie za programista, który nie ma nic na GitHubie? Ktoś mógłby zapytać. Co Ci mam powiedzieć 🤷‍♂️

Jak tworzyłem pierwsze projekty, to nie było jeszcze nawet internetu.

Później koncentrowałem się na kodowaniu dla klientów i nie w głowie były mi własne projekty.

Jednak wszystko się zmieniło, wraz z pojawieniem mocnych LLMów, i drastycznie przyspieszyło przez ostatnich kilkanaście miesięcy.

Modele kodują za mnie. Tak po prostu. Dzięki temu mogę się skoncentrować, na tym, co w tym wszystkim jest najważniejsze, czyli na rozwiązywaniu problemów biznesowych, zamiast technicznych.

Oczywiście, nie zawsze jest różowo, jednak myślę, że wiesz o czym piszę.

Widziałem, też dookoła, że mnóstwo osób chce zacząć swoją przygodę z modelami i własnymi aplikacjami, ale kompletnie nie mają pomysłu od czego zacząć.

Stąd blog. I stąd inicjatywa PIY -> Prompt It Yourself.

Twórz dla siebie. Rozwiązuj własne problemy. Szybko, skutecznie. Ucz się przy okazji pracy z modelami. Kto wie, gdzie Cię to w pewnym momencie doprowadzi.

Mam nadzieję, że będziesz się bawić przynajmniej tak dobrze jak ja :)

![Strona PIY — sekcja Prompt It Yourself na blogu atdpath](/images/piy/atdpath-blog/piy-hero.png)

## Opis techniczny

### O projekcie

atdpath: blog to osobista strona blogowa poświęcona wchodzeniu w świat technologii z pomocą sztucznej inteligencji. Nie jest to kolejny szablon — blog powstał z konkretnej potrzeby dzielenia się doświadczeniami z budowania aplikacji przy pomocy modeli językowych.

Strona składa się z kilku sekcji: wpisów blogowych, katalogu projektów PIY (Prompt It Yourself), strony ATD i informacji o autorze. Każda sekcja ma przemyślany układ i spójny, elegancki styl wizualny oparty na Tailwind CSS v4 z dwoma motywami — jasnym i ciemnym.

Wersja jest dostosowana i na co dzień używana na macOS.

### Podstawowa funkcjonalność

- **Wpisy blogowe** — treści w Markdown i MDX z automatycznym szacowaniem czasu czytania
- **PIY (Prompt It Yourself)** — katalog projektów zbudowanych z pomocą AI, z oznaczeniem poziomu trudności i tagami technologii
- **Ciemny i jasny motyw** — przełączanie motywu z zachowaniem wyboru między sesjami
- **Kanał RSS** — automatycznie generowany feed z wpisami
- **Mapa strony** — plik sitemap tworzony przez integrację Astro
- **Lightbox** — powiększanie obrazków w treściach jednym kliknięciem, zamykanie klawiszem Escape
- **Obrazy Open Graph** — dynamiczne generowanie grafik OG przy użyciu Satori i Sharp
- **llms.txt** — specjalny endpoint z treścią strony w formacie czytelnym dla modeli językowych
- **Optymalizacja SEO** — metadane Open Graph, Twitter Cards, kanoniczne adresy URL
- **View Transitions** — płynne przejścia między podstronami dzięki Astro View Transitions

### Uruchomienie i testowanie

```bash
# Sklonuj repozytorium
git clone https://github.com/emssik/atdpath.blog.git
cd atdpath.blog

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Strona będzie dostępna pod `http://localhost:4321`.

Aby zbudować wersję produkcyjną:

```bash
npm run build
npm run preview
```

### Stos technologiczny

- **Astro 5** — framework do budowania stron statycznych z obsługą kolekcji treści
- **Tailwind CSS v4** — stylowanie z pluginem Vite
- **TypeScript** — typy w konfiguracji, narzędziach i stronach
- **MDX** — rozszerzony Markdown z obsługą komponentów
- **Satori + Sharp** — generowanie obrazów OG po stronie serwera
- **Shiki** — podświetlanie składni z motywami Vitesse

### Rozbudowa na własną rękę

- **Wyszukiwarka** — strona `/search` już istnieje w projekcie, można ją rozbudować o pełnotekstowe przeszukiwanie wpisów
- **System komentarzy** — integracja z Giscus lub innym rozwiązaniem opartym na GitHub Discussions
- **Strona tagów** — widok grupujący wpisy i projekty PIY po tagach
- **Newsletter** — formularz subskrypcji z integracją z wybraną platformą mailingową
- **Wielojęzyczność** — dodanie angielskiej wersji treści z przełączaniem języka
- **Analityka** — integracja z Plausible lub Umami do śledzenia odwiedzin bez naruszania prywatności
