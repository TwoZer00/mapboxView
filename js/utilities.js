function setLightMode() {
  let elementsBG = document.querySelectorAll(".bg-dark");
  let elementsText = document.querySelectorAll(".text-white, .link-light");
  let elementSelect = document.querySelector(".border-select-dark");
  let elementSelectA = document.querySelector(".dark");
  elementSelectA.classList.toggle("dark", false);
  elementSelectA.classList.toggle("light", true);
  if (elementSelect) {
    elementSelect.classList.toggle("border-select-dark", false);
    elementSelect.classList.toggle("border-select-light", true);
  }
  elementsBG.forEach((element) => {
    element.classList.toggle("bg-dark", false);
    element.classList.toggle("bg-light", true);
  });
  elementsText.forEach((element) => {
    element.classList.toggle("link-light", false);
    element.classList.toggle("text-white", false);
    element.classList.toggle("text-dark", true);
    element.classList.toggle("link-dark", true);
  });
  document.documentElement.style.cssText = "--marquee-bg: var(--bs-light)";
}
function setDarkMode() {
  let elementsBG = document.querySelectorAll(".bg-light");
  let elementsText = document.querySelectorAll(".text-dark, .link-dark");
  let elementSelect = document.querySelector(".border-select-light");
  let elementSelectA = document.querySelector(".light");
  if (elementSelectA) {
    elementSelectA.classList.toggle("light", false);
    elementSelectA.classList.toggle("dark", true);
  }
  if (elementSelect) {
    elementSelect.classList.toggle("border-select-light", false);
    elementSelect.classList.toggle("border-select-dark", true);
  }
  elementsBG.forEach((element) => {
    element.classList.toggle("bg-light", false);
    element.classList.toggle("bg-dark", true);
  });
  elementsText.forEach((element) => {
    element.classList.toggle("text-dark", false);
    element.classList.toggle("link-dark", false);
    element.classList.toggle("link-light", true);
    element.classList.toggle("text-white", true);
  });
  document.documentElement.style.cssText = "--marquee-bg: var(--bs-dark)";
}
function toast(message) {
  let toastHTML = `<div class="d-flex">
    <div class="toast-body">
      ${message}. Please try again.
    </div>
    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>`;
  let toast = document.createElement("div");
  toast.innerHTML = toastHTML;
  toast.classList.add(
    "toast",
    "align-items-center",
    "text-dark",
    "bg-warning",
    "border-0"
  );
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  let toastContainer = document.getElementById("toastPlacement");
  toastContainer.appendChild(toast);
  let toasTBS = new bootstrap.Toast(toast);
  toasTBS.show();
}
