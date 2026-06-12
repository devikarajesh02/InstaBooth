
console.log("Editor loaded");

// ====================
// Load Photos
// ====================

const photos =
    JSON.parse(
        sessionStorage.getItem(
            "photos"
        )
    ) || [];

const photoFilters =
    JSON.parse(
        sessionStorage.getItem(
            "photoFilters"
        )
    ) || [];

const slots =
    document.querySelectorAll(
        ".strip-slot"
    );

console.log(
    "Photos:",
    photos
);

console.log(
    "Filters:",
    photoFilters
);

photos.forEach(
    (photo, index) => {

        if (
            photo &&
            slots[index]
        ) {

            slots[index].innerHTML = `
                <img
                    src="${photo}"
                    class="strip-photo"
                    style="
                        filter:
                        ${photoFilters[index] || "none"};
                    ">
            `;

        }

    }
);

// ====================
// Color Picker
// ====================

const stripPreview =
    document.getElementById(
        "stripPreview"
    );

const colorButtons =
    document.querySelectorAll(
        ".color-swatch"
    );

colorButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                colorButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                stripPreview.style.background =
                    button.dataset.color;

            }
        );

    }
);

const backgroundButtons =
    document.querySelectorAll(
        ".background-thumb"
    );

backgroundButtons.forEach(
    image => {

        image.addEventListener(
            "click",
            () => {

                backgroundButtons.forEach(
                    img => {

                        img.classList.remove(
                            "active"
                        );

                    }
                );

                image.classList.add(
                    "active"
                );

                stripPreview.style.backgroundImage =
                    `url(${image.dataset.bg})`;

                stripPreview.style.backgroundSize =
                    "cover";

                stripPreview.style.backgroundPosition =
                    "center";

            }
        );

    }
);
const accordions = [

    {
        button:
            document.getElementById(
                "colorsBtn"
            ),

        content:
            document.getElementById(
                "colorsContent"
            ),

        title:
            "Colors"
    },

    {
        button:
            document.getElementById(
                "patternsBtn"
            ),

        content:
            document.getElementById(
                "patternsContent"
            ),

        title:
            "Backgrounds"
    },

    {
        button:
            document.getElementById(
                "stickersBtn"
            ),

        content:
            document.getElementById(
                "stickersContent"
            ),

        title:
            "Stickers"
    }

];

accordions.forEach(
    current => {

        current.button.addEventListener(
            "click",
            () => {

                accordions.forEach(
                    item => {

                        item.content.style.display =
                            "none";

                        item.button.textContent =
                            "▶ " +
                            item.title;

                    }
                );

                current.content.style.display =
                    "block";

                current.button.textContent =
                    "▼ " +
                    current.title;

            }
        );

    }
);

const stickerData = {

    pink: [
        "../assets/decorations/pink/pink1.png",
        "../assets/decorations/pink/pink2.png",
        "../assets/decorations/pink/pink3.png",
        "../assets/decorations/pink/pink4.png",
        "../assets/decorations/pink/pink5.png",
        "../assets/decorations/pink/pink6.png"
    ],

    black: [
        "../assets/decorations/black/black1.png",
        "../assets/decorations/black/black2.png",
        "../assets/decorations/black/black3.png",
        "../assets/decorations/black/black4.png",
        "../assets/decorations/black/black5.png"
    ],

    blue: [
        "../assets/decorations/blue/blue1.png",
        "../assets/decorations/blue/blue2.png",
        "../assets/decorations/blue/blue3.png",
        "../assets/decorations/blue/blue4.png"
    ]

};

const stickerGallery =
    document.getElementById(
        "stickerGallery"
    );

const categoryButtons =
    document.querySelectorAll(
        ".sticker-category"
    );

function loadStickers(
    category
){

    stickerGallery.innerHTML =
        "";

    stickerData[
        category
    ].forEach(
        sticker => {

            stickerGallery.innerHTML += `
                <img
                    src="${sticker}"
                    class="sticker-thumb">
            `;

        }
    );

}

loadStickers("pink");

categoryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );

                button.classList.add(
                    "active"
                );

                loadStickers(
                    button.dataset.category
                );

            }
        );

    }
);

document.addEventListener(
    "click",
    (event) => {

        if(
            event.target.classList.contains(
                "sticker-thumb"
            )
        ){

            const stickerWrapper =
                document.createElement(
                    "div"
                );

            stickerWrapper.classList.add(
                "sticker-wrapper"
            );

            stickerWrapper.style.left =
                "120px";

            stickerWrapper.style.top =
                "120px";

            const sticker =
                document.createElement(
                    "img"
                );

            sticker.src =
                event.target.src;

            sticker.classList.add(
                "added-sticker"
            );

            stickerWrapper.appendChild(
                sticker
            );
           
const deleteBtn =
    document.createElement(
        "button"
    );

deleteBtn.innerHTML =
    "✕";

deleteBtn.classList.add(
    "delete-handle"
);

deleteBtn.addEventListener(
    "click",
    (e) => {

        e.stopPropagation();

        stickerWrapper.remove();

    }
);

stickerWrapper.appendChild(
    deleteBtn
);

const resizeHandle =
    document.createElement(
        "div"
    );

resizeHandle.classList.add(
    "resize-handle"
);

stickerWrapper.appendChild(
    resizeHandle
);

makeResizable(
    stickerWrapper,
    resizeHandle
);

const rotateHandle =
    document.createElement(
        "div"
    );

rotateHandle.classList.add(
    "rotate-handle"
);

stickerWrapper.appendChild(
    rotateHandle
);

makeRotatable(
    stickerWrapper,
    rotateHandle
);







            stripPreview.appendChild(
                stickerWrapper
            );

            makeDraggable(
                stickerWrapper
            );

        }

    }
);



function makeDraggable(element){

    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener(
        "mousedown",
        (e) => {

            e.preventDefault();

            const rect =
                element.getBoundingClientRect();

            offsetX =
                e.clientX - rect.left;

            offsetY =
                e.clientY - rect.top;

            isDragging = true;
            
document
    .querySelectorAll(
        ".sticker-wrapper"
    )
    .forEach(
        sticker => {

            sticker.classList.remove(
                "selected"
            );

        }
    );

element.classList.add(
    "selected"
);



        }
    );

    document.addEventListener(
        "mousemove",
        (e) => {

            if(!isDragging) return;

            const stripRect =
                stripPreview.getBoundingClientRect();

            let newLeft =
                e.clientX -
                stripRect.left -
                offsetX;

            let newTop =
                e.clientY -
                stripRect.top -
                offsetY;

            newLeft = Math.max(
                0,
                Math.min(
                    newLeft,
                    stripPreview.clientWidth -
                    element.offsetWidth
                )
            );

            newTop = Math.max(
                0,
                Math.min(
                    newTop,
                    stripPreview.clientHeight -
                    element.offsetHeight
                )
            );

            element.style.left =
                newLeft + "px";

            element.style.top =
                newTop + "px";

        }
    );

    document.addEventListener(
        "mouseup",
        () => {

            isDragging = false;

        }
    );

}
document.addEventListener(
    "click",
    (e) => {

        if(
            !e.target.closest(
                ".sticker-wrapper"
            )
        ){

            document
                .querySelectorAll(
                    ".sticker-wrapper"
                )
                .forEach(
                    sticker => {

                        sticker.classList.remove(
                            "selected"
                        );

                    }
                );

        }

    }
);

function makeResizable(
    element,
    handle
){

    let resizing = false;

    let startWidth = 0;

    let startX = 0;

    handle.addEventListener(
        "mousedown",
        (e) => {
            e.preventDefault();

            e.stopPropagation();

            resizing = true;

            startWidth =
                element.offsetWidth;

            startX =
                e.clientX;

        }
    );

    document.addEventListener(
        "mousemove",
        (e) => {

            if(!resizing)
                return;

            let newWidth =
                startWidth +
                (
                    e.clientX -
                    startX
                );

            newWidth =
                Math.max(
                    40,
                    Math.min(
                        newWidth,
                        250
                    )
                );

            element.style.width =
                newWidth + "px";

        }
    );

    document.addEventListener(
        "mouseup",
        () => {

            resizing = false;

        }
    );

}

function makeRotatable(
    element,
    handle
){

    let rotating =
        false;

    handle.addEventListener(
        "mousedown",
        (e) => {

            e.preventDefault();
            e.stopPropagation();

            rotating =
                true;

        }
    );

    document.addEventListener(
        "mousemove",
        (e) => {

            if(!rotating)
                return;

            const rect =
                element.getBoundingClientRect();

            const centerX =
                rect.left +
                rect.width / 2;

            const centerY =
                rect.top +
                rect.height / 2;

            const angle =
                Math.atan2(
                    e.clientY -
                    centerY,

                    e.clientX -
                    centerX
                ) *
                180 /
                Math.PI;

            element.style.transform =
                `rotate(${angle}deg)`;

        }
    );

    document.addEventListener(
        "mouseup",
        () => {

            rotating =
                false;

        }
    );

}
const downloadBtn =
    document.getElementById(
        "downloadBtn"
    );

downloadBtn.addEventListener(
    "click",
    () => {
        document
    .querySelectorAll(
        ".delete-handle, .resize-handle, .rotate-handle"
    )
    .forEach(
        element => {

            element.style.display =
                "none";

        }
    );

document
    .querySelectorAll(
        ".sticker-wrapper"
    )
    .forEach(
        sticker => {

            sticker.classList.remove(
                "selected"
            );

        }
    );

        html2canvas(
            stripPreview,
            {
                backgroundColor: null
            }
        ).then(
            canvas => {

                const link =
                    document.createElement(
                        "a"
                    );

                link.download =
                    "instabooth-strip.png";

                link.href =
                    canvas.toDataURL(
                        "image/png"
                    );

                link.click();
                document
    .querySelectorAll(
        ".delete-handle"
    )
    .forEach(
        element => {

            element.style.display =
                "";

        }
    );

document
    .querySelectorAll(
        ".resize-handle"
    )
    .forEach(
        element => {

            element.style.display =
                "";

        }
    );

document
    .querySelectorAll(
        ".rotate-handle"
    )
    .forEach(
        element => {

            element.style.display =
                "";

        }
    );

            }
        );

    }
);







