import {fetchJobDetails, fetchJobs, submitApplication} from './api.js';
import {showError, showLoader, showToast} from './ui.js';

const appContainer = document.getElementById('app');

let state = {
  jobs: [],
  filteredJobs: [],
  favorites: JSON.parse(localStorage.getItem('favs')) || [],
  currentPage: 1,
  itemsPerPage: 10,
  filters: {
    search: '',
    location: '',
    category: '',
    type: '',
    salary: 0,
    experience: ''
  }
};

state.favorites = state.favorites.map(String);

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

function handleRoute() {
  const hash = window.location.hash || '#home';
  showLoader(appContainer);

  if (hash === '#home') {
    renderHome();
  } else if (hash.startsWith('#job/')) {
    const id = hash.split('/')[1];
    renderJobDetailsView(id);
  } else if (hash === '#favorites') {
    renderFavorites();
  } else {
    renderHome();
  }
}

async function renderHome() {
  try {
    state.jobs = await fetchJobs();
    applyFiltersLogic();

    appContainer.innerHTML = `
            <aside class="filters">
                <h2>Filtry</h2>
                <input type="text" id="search-input" placeholder="Szukaj stanowiska/firmy..." value="${
        state.filters.search}">
                <input type="text" id="location-input" placeholder="Lokalizacja..." value="${
        state.filters.location}">
                <select id="category-select">
                    <option value="">Wszystkie branże</option>
                    <option value="it">IT</option>
                    <option value="marketing">Marketing</option>
                    <option value="obsluga-klienta">Obsługa Klienta</option>
                </select>
                <select id="type-select">
                    <option value="">Każdy etat</option>
                    <option value="Pełny etat">Pełny etat</option>
                    <option value="Zdalna">Zdalna</option>
                    <option value="Pół etatu">Pół etatu</option>
                </select>
                <div class="filter-group">
                    <label>Minimalne wynagrodzenie: <span id="salary-val">${
        state.filters.salary}</span> zł</label>
                    <input type="range" id="salary-input" min="0" max="20000" step="1000" value="${
        state.filters.salary}">
                </div>
            </aside>
            <div class="main-content">
                <div class="list-controls">
                    <span id="results-count">Znaleziono: ${
        state.filteredJobs.length}</span>
                    <div class="per-page-selector">
                        <label for="items-per-page">Pokaż po:</label>
                        <select id="items-per-page">
                            <option value="10" ${
        state.itemsPerPage == 10 ? 'selected' : ''}>10</option>
                            <option value="50" ${
        state.itemsPerPage == 50 ? 'selected' : ''}>50</option>
                            <option value="100" ${
        state.itemsPerPage == 100 ? 'selected' : ''}>100</option>
                        </select>
                    </div>
                </div>
                <div id="job-list" class="job-list"></div>
                <div id="pagination" class="pagination"></div>
            </div>
        `;
    setupFilterListeners();
    setupPaginationListeners();
    renderJobList();
  } catch (error) {
    showToast('Nie udało się pobrać ofert.', 'error');
    showError(appContainer, 'Błąd ładowania danych z API.');
  }
}

async function renderJobDetailsView(id) {
  try {
    const job = await fetchJobDetails(id);


    const jobIdStr = String(job.id);
    const isFav = state.favorites.includes(jobIdStr);
    const savedForm = JSON.parse(localStorage.getItem(`draft_${job.id}`)) ||
        {name: '', email: '', phone: ''};

    appContainer.innerHTML = `
            <div class="job-details">
                <button class="back-btn" onclick="window.history.back()">⬅ Powrót</button>
                <h2>${job.title} w ${job.company}</h2>
                <div class="tags">
                    <span>📍 ${job.location}</span>
                    <span>💰 ${job.salary} zł</span>
                    <span>🕒 ${job.type}</span>
                </div>
                <p><strong>Opis:</strong> ${job.description}</p>
                <p><strong>Wymagania:</strong></p>
                <ul>${
        job.requirements.map(req => `<li>${req}</li>`).join('')}</ul>
                
                <button id="fav-btn" class="btn ${
        isFav ? 'btn-fav' : ''}" onclick="toggleFavorite('${jobIdStr}')">
                    ${isFav ? '💔 Usuń z ulubionych' : '❤️ Dodaj do ulubionych'}
                </button>

                <div class="application-form">
                    <h3>Aplikuj na to stanowisko</h3>
                    <form id="apply-form">
                        <input type="text" id="form-name" placeholder="Imię i nazwisko" value="${
        savedForm.name}" required>
                        <input type="email" id="form-email" placeholder="Adres E-mail" value="${
        savedForm.email}" required>
                        <input type="tel" id="form-phone" placeholder="Telefon (9 cyfr)" value="${
        savedForm
            .phone}" required pattern="^[0-9]{9}$" title="Podaj dokładnie 9 cyfr">
                        <button type="submit" class="btn">Wyślij aplikację</button>
                    </form>
                </div>
            </div>
        `;
    setupFormHandling(job.id);
  } catch (error) {
    showToast('Błąd ładowania szczegółów.', 'error');
    window.location.hash = '#home';
  }
}

function renderFavorites() {
  state.filteredJobs =
      state.jobs.filter(job => state.favorites.includes(String(job.id)));
  appContainer.innerHTML = `
        <div class="main-content" style="width: 100%;">
            <h2>Twoje Ulubione Oferty</h2>
            ${
      state.filteredJobs.length === 0 ?
          '<p>Brak ulubionych ofert.</p>' :
          '<div id="job-list" class="job-list"></div>'}
        </div>
    `;

  if (state.filteredJobs.length > 0) {
    const oldItemsPerPage = state.itemsPerPage;
    state.itemsPerPage = 100;
    state.currentPage = 1;
    renderJobList(false);
    state.itemsPerPage = oldItemsPerPage;
  }
}

function applyFiltersLogic() {
  state.filteredJobs = state.jobs.filter(job => {
    const matchSearch =
        job.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(state.filters.search.toLowerCase());
    const matchLocation = job.location.toLowerCase().includes(
        state.filters.location.toLowerCase());
    const matchCat = state.filters.category === '' ||
        job.category === state.filters.category;
    const matchType =
        state.filters.type === '' || job.type === state.filters.type;
    const matchSalary = job.salary >= state.filters.salary;

    return matchSearch && matchLocation && matchCat && matchType && matchSalary;
  });
  state.currentPage = 1;
}

function updateResultsCount() {
  const countEl = document.getElementById('results-count');
  if (countEl) countEl.innerText = `Znaleziono: ${state.filteredJobs.length}`;
}

function renderJobList(showPagination = true) {
  const listEl = document.getElementById('job-list');
  if (!listEl) return;

  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const itemsToShow =
      state.filteredJobs.slice(startIndex, startIndex + state.itemsPerPage);

  listEl.innerHTML = itemsToShow
                         .map(
                             job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <div class="company">${job.company}</div>
            <div class="tags">
                <span class="location">📍 ${job.location}</span>
                <span class="salary">💰 ${job.salary} zł</span>
            </div>
            <button class="btn" onclick="window.location.hash='#job/${
                                 job.id}'">Zobacz ofertę</button>
        </div>
    `).join('');

  if (showPagination) renderPagination();
}

function renderPagination() {
  const pagContainer = document.getElementById('pagination');
  if (!pagContainer) return;

  const totalPages = Math.ceil(state.filteredJobs.length / state.itemsPerPage);
  if (totalPages <= 1) {
    pagContainer.innerHTML = '';
    return;
  }

  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${
        i === state.currentPage ? 'active' :
                                  ''}" data-page="${i}">${i}</button>`;
  }
  pagContainer.innerHTML = html;

  pagContainer.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.currentPage = Number(e.target.dataset.page);
      renderJobList();
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
  });
}

function setupFilterListeners() {
  const bindFilter = (id, key, isValue = true) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', (e) => {
      state.filters[key] = isValue ? e.target.value : e.target.checked;
      if (id === 'salary-input')
        document.getElementById('salary-val').innerText = e.target.value;
      applyFiltersLogic();
      updateResultsCount();
      renderJobList();
    });
  };
  bindFilter('search-input', 'search');
  bindFilter('location-input', 'location');
  bindFilter('category-select', 'category');
  bindFilter('type-select', 'type');
  bindFilter('salary-input', 'salary');
}

function setupPaginationListeners() {
  const perPageSelect = document.getElementById('items-per-page');
  if (perPageSelect) {
    perPageSelect.addEventListener('change', (e) => {
      state.itemsPerPage = Number(e.target.value);
      state.currentPage = 1;
      renderJobList();
    });
  }
}


window.toggleFavorite = function(jobId) {
  const idStr = String(jobId);
  const favBtn = document.getElementById('fav-btn');

  if (state.favorites.includes(idStr)) {
    state.favorites = state.favorites.filter(id => id !== idStr);
    showToast('Usunięto z ulubionych', 'info');
    if (favBtn) {
      favBtn.classList.remove('btn-fav');
      favBtn.innerHTML = '❤️ Dodaj do ulubionych';
    }
  } else {
    state.favorites.push(idStr);
    showToast('Dodano do ulubionych!', 'success');
    if (favBtn) {
      favBtn.classList.add('btn-fav');
      favBtn.innerHTML = '💔 Usuń z ulubionych';
    }
  }

  localStorage.setItem('favs', JSON.stringify(state.favorites));
};

function setupFormHandling(jobId) {
  const form = document.getElementById('apply-form');
  const inputs = form.querySelectorAll('input');

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const draft = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
      };
      localStorage.setItem(`draft_${jobId}`, JSON.stringify(draft));
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = document.getElementById('form-phone').value;
    if (phone.length !== 9 || isNaN(phone)) {
      showToast('Numer telefonu musi mieć dokładnie 9 cyfr!', 'error');
      return;
    }

    const appData = {
      jobId: String(jobId),
      name: document.getElementById('form-name').value,
      email: document.getElementById('form-email').value,
      phone: phone,
      date: new Date().toISOString()
    };

    try {
      await submitApplication(appData);
      showToast('Aplikacja wysłana pomyślnie!', 'success');
      localStorage.removeItem(`draft_${jobId}`);
      form.reset();
    } catch (error) {
      showToast(
          'Nie udało się wysłać aplikacji. Brak połączenia z API.', 'error');
      console.error(error);
    }
  });
}