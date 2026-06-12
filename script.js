const captureBtn = document.getElementById("captureBtn");
const uploadBtn = document.getElementById("uploadBtn");

captureBtn.addEventListener("click", () => {
    window.location.href = "pages/booth.html";
});

uploadBtn.addEventListener("click", () => {
    window.location.href = "pages/upload.html";
});