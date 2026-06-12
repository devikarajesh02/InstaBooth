
console.log("Filter page loaded");

// Elements

const thumbnails =
    document.querySelectorAll(
        ".thumbnail"
    );

const thumb1 =
    document.getElementById(
        "thumb1"
    );

const thumb2 =
    document.getElementById(
        "thumb2"
    );

const thumb3 =
    document.getElementById(
        "thumb3"
    );

const originalBtn =
    document.getElementById(
        "originalBtn"
    );

const grayBtn =
    document.getElementById(
        "grayBtn"
    );

const sepiaBtn =
    document.getElementById(
        "sepiaBtn"
    );

const brightBtn =
    document.getElementById(
        "brightBtn"
    );

const previewImage =
    document.getElementById(
        "previewImage"
    );

const nextBtn =
    document.getElementById(
        "chooseThemeBtn"
    );

// Photos

const photos =
    JSON.parse(
        sessionStorage.getItem(
            "photos"
        )
    ) || [];

console.log(
    "Photos:",
    photos
);

// Load thumbnails

if(photos[0]){

    thumb1.src =
        photos[0];

}

if(photos[1]){

    thumb2.src =
        photos[1];

}

if(photos[2]){

    thumb3.src =
        photos[2];

}

// Current selected photo

let currentPhoto = 0;

// Filters for each photo

const photoFilters = [

    "none",

    "none",

    "none"

];

// Show selected photo

function showPhoto(index){

    currentPhoto =
        index;

    previewImage.src =
        photos[index];

    previewImage.style.filter =
        photoFilters[index];

    thumbnails.forEach(
        thumb => {

            thumb.classList.remove(
                "active"
            );

        }
    );

    thumbnails[index]
        .classList.add(
            "active"
        );

}

// Load first photo

if(
    photos.length > 0 &&
    previewImage
){

    showPhoto(0);

}

// Thumbnail click

thumbnails.forEach(
    thumb => {

        thumb.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        thumb.dataset.index
                    );

                showPhoto(
                    index
                );

            }
        );

    }
);

// Original

originalBtn?.addEventListener(
    "click",
    () => {

        previewImage.style.filter =
            "none";

        photoFilters[
            currentPhoto
        ] =
            "none";

    }
);

// Gray

grayBtn?.addEventListener(
    "click",
    () => {

        previewImage.style.filter =
            "grayscale(100%)";

        photoFilters[
            currentPhoto
        ] =
            "grayscale(100%)";

    }
);

// Sepia

sepiaBtn?.addEventListener(
    "click",
    () => {

        previewImage.style.filter =
            "sepia(100%)";

        photoFilters[
            currentPhoto
        ] =
            "sepia(100%)";

    }
);

// Bright

brightBtn?.addEventListener(
    "click",
    () => {

        previewImage.style.filter =
            "brightness(130%)";

        photoFilters[
            currentPhoto
        ] =
            "brightness(130%)";

    }
);

// Continue

nextBtn?.addEventListener(
    "click",
    () => {

        sessionStorage.setItem(
            "photoFilters",
            JSON.stringify(
                photoFilters
            )
        );

        window.location.href =
            "editor.html";

    }
);

