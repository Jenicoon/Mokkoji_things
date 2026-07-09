(function () {
  const supported = ["ko", "en"];
  const saved = localStorage.getItem("mokkoji-lang");
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  const initial = supported.includes(requested) ? requested : supported.includes(saved) ? saved : "ko";

  function setLanguage(lang) {
    const next = supported.includes(lang) ? lang : "ko";
    document.documentElement.lang = next;
    document.documentElement.dataset.lang = next;
    localStorage.setItem("mokkoji-lang", next);

    document.querySelectorAll("[data-lang-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.langPanel !== next;
    });

    document.querySelectorAll("[data-i18n-ko]").forEach((node) => {
      const value = node.dataset[next === "ko" ? "i18nKo" : "i18nEn"];
      if (value) node.textContent = value;
    });

    document.querySelectorAll(".lang-button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lang === next));
    });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang]");
    if (!button) return;
    setLanguage(button.dataset.lang);
  });

  setLanguage(initial);
})();
