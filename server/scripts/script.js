// Enhanced features for the resume page
document.addEventListener("DOMContentLoaded", function () {
  initializeDarkReader();
  addFavicon();
  handlePrintParameter();
  setupSmoothScroll();
  setupEmailCopy();
  setupPrintButton();
  setupDarkModeButton();
  setupGoogleTranslate();
  setupScrollProgress();
});

function initializeDarkReader() {
  const darkReaderScript = document.createElement("script");
  darkReaderScript.src =
    "https://cdn.jsdelivr.net/npm/darkreader@4.9.105/darkreader.min.js";
  document.head.appendChild(darkReaderScript);
}

function addFavicon() {
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.href =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👨🏻‍💻</text></svg>';
  document.head.appendChild(favicon);
}

function handlePrintParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("print") === "true") {
    window.print();
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function setupEmailCopy() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const email = link.href.replace("mailto:", "");
      navigator.clipboard.writeText(email).then(() => {
        const originalText = link.textContent;
        link.textContent = "Email copied!";
        setTimeout(() => {
          link.textContent = originalText;
        }, 2000);
      });
    });
  });
}

function setupPrintButton() {
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  document.body.appendChild(buttonContainer);

  const printButton = document.createElement("button");
  printButton.innerHTML = 'print';
  printButton.className = "print-button";
  printButton.title = "Print Resume";
  buttonContainer.appendChild(printButton);

  printButton.addEventListener("click", () => {
    window.print();
  });
}

function setupDarkModeButton() {}

function setupGoogleTranslate() {}

function setupScrollProgress() {}

// Add print button styles
const printStyle = document.createElement("style");
printStyle.textContent = `
    .button-container {
        position: fixed;
        top: 20px;
        right: 30px;
        z-index: 1000;
        display: flex;
        gap: 10px;
    }
    .print-button {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        color:black
    }
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background-color: #FF6B00;
        z-index: 1001;
        transition: width 0.1s ease;
    }
    @media print {
        .button-container {
            display: none;
        }
        .scroll-progress {
            display: none;
        }
        #google_translate_element {
            display: none;
        }
    }
    @media screen and (max-width: 768px) {
        .print-button[title="Print Resume"] {
            display: none;
        }
    }
`;
document.head.appendChild(printStyle);
