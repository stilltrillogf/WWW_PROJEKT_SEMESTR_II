# WWW_PROJEKT_SEMESTR_II
Projekt zaliczający przedmiot wprowadzenie do aplikacji WWW, Politechnika Białostocka, informatyka II semestr (2026).

##  Instrukcja uruchomienia

Projekt składa się z warstwy frontendowej (HTML, CSS, Vanilla JS) oraz mockowego backendu (API) opartego na narzędziu `json-server`. Aby aplikacja działała poprawnie (w tym wysyłanie formularzy i zapisywanie danych), **konieczne jest uruchomienie obu tych środowisk jednocześnie.**

### Wymagania wstępne
1. Zainstalowane środowisko **Node.js** (do uruchomienia mock API).
2. Edytor **Visual Studio Code** z zainstalowanym rozszerzeniem **Live Server**.

---

### Krok 1: Uruchomienie mockowego API (Backend)
Serwer bazy danych musi zostać uruchomiony w terminalu i nasłuchiwać na porcie `3000`.

1. Otwórz terminal w głównym folderze projektu w VS Code.
2. Wpisz i zatwierdź poniższą komendę:
   ```bash
   npx json-server --watch api/db.json --port 3000
   ```
3. Zostaw okno terminala otwarte. Serwer API jest teraz aktywny i gotowy na przyjmowanie zapytań pod adresem `http://localhost:3000`.

---

### Krok 2: Uruchomienie widoku aplikacji (Frontend)
Aplikacja musi zostać uruchomiona przez lokalny serwer deweloperski, aby móc korzystać z modułów ES (`import/export`).

1. W edytorze VS Code otwórz plik `index.html`.
2. Kliknij przycisk **"Go Live"** 
3. Aplikacja otworzy się w domyślnej przeglądarce, zazwyczaj pod adresem: `http://127.0.0.1:5500`.

---

### ⚠️ Ważne informacje techniczne
* **Zabezpieczenie Live Servera:** W projekcie znajduje się plik konfiguracyjny `.vscode/settings.json`, który wyklucza folder `api/` z nasłuchiwania Live Servera. Dzięki temu po wysłaniu formularza (POST) i aktualizacji pliku `db.json`, Live Server nie odświeża "twardo" strony przeglądarki, co gwarantuje płynne działanie SPA.
* **Modułowość:** Aplikacja wykorzystuje system modułów JavaScript (ES Modules). Uruchomienie pliku `index.html` bezpośrednio z dysku (protokół `file://`) zablokuje działanie skryptów ze względów bezpieczeństwa CORS – zawsze używaj Live Servera.

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
