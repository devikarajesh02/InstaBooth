
console.log("Booth loaded");

const video =
    document.getElementById("camera");

const canvas =
    document.getElementById("canvas");

const countdown =
    document.getElementById("countdown");

const startBtn =
    document.getElementById("startSession");

const retakeBtn =
    document.getElementById("retakeBtn");

const continueBtn =
    document.getElementById("continueBtn");

const slots = [
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3")
];

let capturedPhotos = [];

// Webcam
navigator.mediaDevices
    .getUserMedia({
        video: true
    })
    .then(stream => {

        video.srcObject = stream;

    })
    .catch(error => {

        console.error(
            "Camera error:",
            error
        );

    });

// Countdown
async function startCountdown() {

    countdown.style.opacity = "1";

    for(let i = 3; i >= 1; i--) {

        countdown.textContent = i;

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );

    }

    countdown.textContent = "Smile!";

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    countdown.style.opacity = "0";

}

// Capture
function capturePhoto(slotIndex) {

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;

    const ctx =
        canvas.getContext("2d");

    ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const imageURL =
        canvas.toDataURL("image/png");

    capturedPhotos[slotIndex] =
        imageURL;

    slots[slotIndex].innerHTML = `

        <img
            src="${imageURL}"
            class="preview-image">

    `;

}

// Session
async function startSession() {

    startBtn.disabled = true;

    capturedPhotos = [];

    slots.forEach(slot => {

        slot.innerHTML = "";

    });

    for(let i = 0; i < 3; i++) {

        await startCountdown();

        capturePhoto(i);

        await new Promise(resolve =>
            setTimeout(resolve, 500)
        );

    }

    continueBtn.style.opacity = "1";
    continueBtn.style.pointerEvents = "auto";

}

// Start
startBtn.addEventListener(
    "click",
    startSession
);

// Retake
retakeBtn.addEventListener(
    "click",
    () => {

        capturedPhotos = [];

        slots.forEach(slot => {

            slot.innerHTML = "";

        });

        continueBtn.style.opacity = "0.5";
        continueBtn.style.pointerEvents =
            "none";

        startBtn.disabled = false;

    }
);

// Continue
continueBtn.addEventListener(
    "click",
    () => {

        sessionStorage.setItem(
            "photos",
            JSON.stringify(
                capturedPhotos
            )
        );

        window.location.href =
            "filter.html";

    }
);
const stream = video.srcObject;

stream.getTracks().forEach(track => {
    track.stop();
});

// Initial state
continueBtn.style.opacity = "0.5";
continueBtn.style.pointerEvents =
    "none";

