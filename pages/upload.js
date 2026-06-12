const dots = document.querySelectorAll(".dot");

const fileInput = document.getElementById("fileInput");
const continueBtn = document.getElementById("continueBtn");

const slots = [
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3")
];

// Upload photos
fileInput.addEventListener("change", () => {
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
        const emptySlot = slots.find(slot => !slot.querySelector("img"));

        if (!emptySlot) {
            alert("You already have 3 photos!");
            break;
        }

        const imageURL = URL.createObjectURL(files[i]);

        emptySlot.innerHTML = `
            <button class="delete-btn">✕</button>
            <img src="${imageURL}" class="preview-image">
        `;
    }

    addDeleteButtons();
    updateContinueButton();
    updateDots();

    fileInput.value = "";
});

// Delete photo
function addDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {
        button.onclick = () => {
            const slot = button.parentElement;
            slot.innerHTML = "";
            updateContinueButton();
            updateDots();
        };
    });
}

// Continue button logic
function updateContinueButton() {
    const photoCount = slots.filter(slot => slot.querySelector("img")).length;

    if (photoCount === 3) {
        continueBtn.style.opacity = "1";
        continueBtn.style.pointerEvents = "auto";
    } else {
        continueBtn.style.opacity = "0.5";
        continueBtn.style.pointerEvents = "none";
    }
}

// Progress dots logic
function updateDots() {
    const photoCount = slots.filter(slot => slot.querySelector("img")).length;

    dots.forEach(dot => dot.classList.remove("active"));

    for (let i = 0; i < photoCount; i++) {
        if (dots[i]) dots[i].classList.add("active");
    }
}

// Continue button
continueBtn.addEventListener("click", () => {

    const photos = slots.map(slot => {

        const img = slot.querySelector("img");

        return img ? img.src : null;

    });

    sessionStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );

    window.location.href =
        "filter.html";

});

// Initial state
updateContinueButton();
updateDots();
