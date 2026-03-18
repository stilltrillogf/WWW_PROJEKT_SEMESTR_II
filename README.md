# WWW_PROJEKT_SEMESTR_II
Projekt zaliczający przedmiot wprowadzenie do aplikacji WWW, Politechnika Białostocka, informatyka II semestr (2026).

## Skład zespołu :

- **Łukasz Kowalewicz**
- **Jakub Potapowicz**

### Wybrany obszar tematyczny to oferty pracy.

Aplikacja będzie wykorzystywać dane z mockowego API.

#### Planowane widoki to : 

- Główna strona wyświetlające wszystkie oferty
    - Zapytanie GET do API o pobranie wszystkich ofert
    - Paginacja oraz filtrowanie i sortowanie ofert
    - Ulubione oferty pracy zapisywane w localstorage
- Widok pojedynczej oferty pracy wraz z jej szczegółami 
    - Zapytanie GET do API o szczegóły oferty
    - Formularz umożliwiający aplikację na daną ofertę pracy
        - Zapytanie POST do API
        - Walidacja danych w formularzu (email, nr telefonu etc.)
        - Autosave wypełnianego formularza w localstorage 
        - Zapisanie w localstorage informacji o aplikowaniu na daną ofertę
- Widok wszystkich ulubionych ofert pracy

#### Dodatkowa funkcjonalność :

- Obsługa błędów
- Zarządzanie stanem aplikacji
- Obsługa edge-case'ów

## Przykładowy model danych :

### Oferta pracy
- id
- tytuł
- nazwa firmy
- lokalizacja
- płaca
- szczegółowy opis
- wymagania
- czy jest ulubiona
- czy było aplikowane
- numer telefonu kontaktowy
- tagi 
- typ (pełny etat, pół etatu etc.)
