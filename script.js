// Pobranie elementów
const searchInput = document.querySelector('.search-bar input');
const locationInput = document.querySelectorAll('.search-bar input')[1];
const categorySelect = document.querySelector('.search-bar select');
const jobCards = document.querySelectorAll('.job-card');

const jobTypeFilter = document.getElementById('job-type');
const salaryFilter = document.getElementById('salary');
const experienceFilter = document.getElementById('experience');

// Funkcja filtrowania
function filterJobs() {
    const searchText = searchInput.value.toLowerCase();
    const locationText = locationInput.value.toLowerCase();
    const category = categorySelect.value.toLowerCase();
    const jobType = jobTypeFilter.value.toLowerCase();
    const salary = salaryFilter.value;
    const experience = experienceFilter.value.toLowerCase();

    jobCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const location = card.querySelector('.location').textContent.toLowerCase();
        const type = card.querySelector('.type').textContent.toLowerCase();
        const salaryText = card.querySelector('.salary').textContent;

        // Wyciągnięcie liczby z wynagrodzenia
        const salaryNumbers = salaryText.match(/\d+/g);
        const minSalary = salaryNumbers ? parseInt(salaryNumbers[0]) : 0;

        let show = true;

        // Szukana fraza
        if (!title.includes(searchText)) show = false;

        // Lokalizacja
        if (!location.includes(locationText)) show = false;

        // Kategoria (prosty przykład)
        if (category !== "wszystkie kategorie" && !title.includes(category)) {
            show = false;
        }

        // Typ pracy
        if (jobType !== "dowolny" && !type.includes(jobType)) {
            show = false;
        }

        // Wynagrodzenie
        if (salary && minSalary < salary) {
            show = false;
        }

        // (symulacja doświadczenia – po nazwie)
        if (experience !== "dowolne" && !title.includes(experience)) {
            show = false;
        }

        // Pokaz / ukryj
        card.style.display = show ? "block" : "none";
    });
}

// Eventy (reakcja na zmiany)
searchInput.addEventListener('input', filterJobs);
locationInput.addEventListener('input', filterJobs);
categorySelect.addEventListener('change', filterJobs);
jobTypeFilter.addEventListener('change', filterJobs);
salaryFilter.addEventListener('input', filterJobs);
experienceFilter.addEventListener('change', filterJobs);
