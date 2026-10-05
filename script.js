const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const themeButton = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

// Menu mobile
menuButton?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
});

// Fecha o menu ao clicar em um link
mainNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mainNav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

// Alternância de tema
themeButton?.addEventListener("click", () => {
  const root = document.documentElement;
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

  root.dataset.theme = nextTheme;

  try {
    localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // O localStorage pode não estar disponível em alguns navegadores.
  }
});

// Filtro dos projetos
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const shouldShow =
        filter === "todos" || card.dataset.category === filter;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});