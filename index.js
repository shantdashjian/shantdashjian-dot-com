const themeToggle = document.querySelector(".theme-toggle");
const htmlRoot = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  if (theme === "dark") {
    htmlRoot.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
    document
      .getElementById("calendar-img")
      .setAttribute("src", "images/calendar-dark.png");
    document
      .getElementById("github-img")
      .setAttribute("src", "images/github-dark.png");
  } else {
    htmlRoot.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
    document
      .getElementById("calendar-img")
      .setAttribute("src", "images/calendar.png");
    document
      .getElementById("github-img")
      .setAttribute("src", "images/github.png");
  }
}

if (savedTheme) {
  setTheme(savedTheme);
} else if (systemPrefersDark.matches) {
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = htmlRoot.classList.contains("dark-theme")
    ? "dark"
    : "light";
  setTheme(currentTheme === "light" ? "dark" : "light");
});

systemPrefersDark.addListener((e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("youtube-iframe");
  const placeholder = document.getElementById("video-placeholder");

  // More reliable method to check iframe loading
  iframe.onload = () => {
    placeholder.style.display = "none";
    iframe.style.display = "block";
  };

  // Fallback mechanism with longer timeout and additional check
  setTimeout(() => {
    if (placeholder && iframe) {
      // Check if iframe is actually loaded using contentWindow
      try {
        const iframeContent = iframe.contentWindow;
        if (iframeContent) {
          placeholder.style.display = "none";
          iframe.style.display = "block";
        }
      } catch (error) {
        // If cross-origin restrictions prevent checking contentWindow
        placeholder.style.display = "none";
        iframe.style.display = "block";
      }
    }
  }, 1000); // Extended timeout to 1 seconds
});
