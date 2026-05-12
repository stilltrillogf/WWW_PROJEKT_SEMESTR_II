export function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function showLoader(container) {
  container.innerHTML =
      '<div class="loader" aria-label="Ładowanie danych..."></div>';
}

export function showError(container, message) {
  container.innerHTML = `<p class="error-msg">${message}</p>`;
}