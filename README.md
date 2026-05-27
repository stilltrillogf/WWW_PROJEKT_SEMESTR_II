# WWW_PROJEKT_SEMESTR_II
Projekt zaliczający przedmiot wprowadzenie do aplikacji WWW, Politechnika Białostocka, informatyka II semestr (2026).

## Skład zespołu :

- **Łukasz Kowalewicz**
- **Jakub Potapowicz**

### Wybrany obszar tematyczny to oferty pracy

## 📖 Opis Projektu
Aplikacja to w pełni responsywny portal z ofertami pracy zrealizowany w architekturze **Single Page Application (SPA)** przy użyciu czystego języka JavaScript (Vanilla JS, ES Modules), HTML5 oraz CSS3. Dane pobierane są asynchronicznie z symulowanego serwera REST API (`json-server`).

---

## 🚀 Zrealizowane Wymagania i Funkcjonalności

### 1. Wymagania Minimalne (MVP) - 50%
* **Architektura SPA (Minimum 3 widoki):** Zaimplementowano autorski, oparty na zmianach adresu URL za pomocą hashu (`window.location.hash`) system routingu obsługujący widoki:
  * Strona główna z listą ofert,
  * Szczegóły pojedynczej oferty wraz z formularzem aplikacyjnym,
  * Widok wszystkich ulubionych ofert pracy użytkownika.
* **Komunikacja z API:** Wykorzystano natywny interfejs `Fetch API` do asynchronicznego pobierania danych (metody GET) oraz wysyłania zgłoszeń aplikacyjnych (metoda POST).
* **Dynamiczne renderowanie danych:** Widoki, sekcje i kafelki ofert pracy budowane są dynamicznie w locie z wykorzystaniem szablonów Template Literals w JavaScript na podstawie aktualnego stanu aplikacji.
* **Walidacja i obsługa błędów:** Zaawansowana walidacja formularzy (atrybuty HTML5 `required` oraz `pattern` powiązany z wyrażeniem regularnym, a także dodatkowe sprawdzanie warunków logicznych po stronie JavaScript przed wysyłką żądania). System powiadomień wizualnych (Toast Notifications) dla błędów i sukcesów. Defensywna obsługa wyjątków sieciowych przy użyciu bloków `try...catch`.
* **Responsywny layout (Mobile-First):** Zastosowano podejście zorientowane na urządzenia mobilne, korzystając z elastycznych i nowoczesnych makiet CSS Flexbox oraz CSS Grid.

### 2. Rozszerzenia Funkcjonalności - 30%
W ramach podnoszenia złożoności algorytmicznej i jakości funkcjonalnej projektu zaimplementowano następujące rozszerzenia:
1. **Złożone filtrowanie danych:** Mechanizm potokowy (Data Pipeline) aplikujący jednocześnie do 5 niezależnych parametrów wyszukiwania (wyszukiwanie tekstowe po nazwie stanowiska lub firmie, lokalizacja, selecty kategorii branżowej i typu zatrudnienia oraz suwak wynagrodzenia minimalnego).
2. **Paginacja Client-Side:** Zaimplementowano stronicowanie wyników z możliwością dynamicznej zmiany liczby wyświetlanych elementów na jednej stronie (10, 50, 100) wraz z automatycznym, płynnym przewijaniem widoku na górę ekranu po zmianie strony.
3. **Pamięć przeglądarki (LocalStorage) - Ulubione:** Zapisywanie unikalnych indeksów (ID) polubionych ofert pracy w pamięci trwałej przeglądarki w celu zachowania ich między sesjami użytkownika.
4. **Pamięć przeglądarki (LocalStorage) - Autosave Formularza:** Tworzenie kopii roboczej (draftu) aktualnie wypełnianego formularza aplikacyjnego powiązanego z konkretnym ID oferty, co skutecznie zapobiega utracie danych w przypadku przypadkowego odświeżenia strony lub zmiany widoku.

### 3. Jakość Projektu i Architektura - 10%
* **Modułowość kodu (ES Modules):** Kod źródłowy został podzielony według ścisłych zasad separacji odpowiedzialności (Separation of Concerns):
  * `api.js` – izolowana warstwa komunikacji sieciowej (odpowiada za zapytania fetch do backendu).
  * `ui.js` – warstwa prezentacji powiadomień i stanów przejściowych (obsługa toastów, loaderów i błędów).
  * `app.js` – główny kontroler sterujący cyklem życia aplikacji, filtrowaniem, stanem i routingiem.
* **Zarządzanie Stanem (Single Source of Truth):** Wszystkie komponenty i widoki renderują się reaktywnie w oparciu o jeden centralny obiekt struktury `state`, co ułatwia zarządzanie danymi i eliminuje konieczność bezpośredniego czytania parametrów z drzewa DOM.
* **Zaawansowana Delegacja Zdarzeń (Event Delegation Pattern):** Zastosowano scentralizowany nasłuchiwacz zdarzeń na głównym kontenerze montowania `#app`. Rozwiązanie to drastycznie redukuje zużycie pamięci operacyjnej oraz zapewnia pełne bezpieczeństwo przed atakami typu XSS zgodnie z rygorystyczną polityką **CSP (Content Security Policy)**.

### 4. Jakość UX i Dopracowanie - 10%
* **Animacje i efekty wizualne:** Zastosowano płynne animacje pojawiania się i znikania powiadomień typu Toast (`slideIn`, `fade-out`), efekt transformacji kart pracy przy najechaniu kursem myszy (`hover` podnoszący optycznie element) oraz dedykowany, asynchroniczny spinner (Loader) sygnalizujący pobieranie danych z API.
* **Dostępność (A11y):** Aplikacja została w pełni zoptymalizowana pod kątem czytników ekranowych (screen-readers) dzięki poprawnemu semantycznie kodowi HTML oraz atrybutom dostępności `aria-label` i `aria-live` (`polite` dla zmian zawartości listy oraz `assertive` dla krytycznych komunikatów systemowych).

---

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