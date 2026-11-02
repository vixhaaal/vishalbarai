const year = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "portfolio-theme";
const kolkataTime = document.querySelector("#kolkata-time");

if (year) year.textContent = String(new Date().getFullYear());

if (themeToggle) {
  const setTheme = (theme, persist = false) => {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
    if (themeColor) themeColor.content = isDark ? "#161617" : "#ffffff";

    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
      } catch (error) {
        console.error("Unable to save the appearance preference.", error);
      }
    }
  };

  setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  themeToggle.addEventListener("click", () => {
    const nextTheme = themeToggle.getAttribute("aria-pressed") === "true" ? "light" : "dark";
    setTheme(nextTheme, true);
  });
}

if (kolkataTime) {
  const clockFormatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
  });

  const updateKolkataTime = () => {
    const now = new Date();
    kolkataTime.dateTime = now.toISOString();
    kolkataTime.textContent = `${clockFormatter.format(now)} in Kolkata, India`;
  };

  updateKolkataTime();
  window.setInterval(updateKolkataTime, 15_000);
}
