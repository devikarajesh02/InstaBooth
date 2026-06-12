downloadBtn.addEventListener("click", () => {
    // Hide interactive handles
    document.querySelectorAll(".delete-handle, .resize-handle, .rotate-handle").forEach(el => {
        el.style.display = "none";
    });

    // Deselect all stickers
    document.querySelectorAll(".sticker-wrapper").forEach(sticker => {
        sticker.classList.remove("selected");
    });

    // Create clone FIRST with all filters preserved
    const stripClone = stripPreview.cloneNode(true);
    
    // Remove sticker controls from clone
    stripClone.querySelectorAll(".delete-handle, .resize-handle, .rotate-handle").forEach(el => {
        el.remove();
    });

    // Append clone to DOM (CORRECT ORDER)
    stripClone.style.position = "absolute";
    stripClone.style.left = "-9999px";
    stripClone.style.visibility = "hidden";
    document.body.appendChild(stripClone);  // ← Append clone TO body

    // Capture the clone with all options
    html2canvas(stripClone, { 
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true
    }).then(canvas => {
        // Create download link
        const link = document.createElement("a");
        link.download = "instabooth-strip.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        // Clean up clone from DOM
        document.body.removeChild(stripClone);

        // Show interactive handles again
        document.querySelectorAll(".delete-handle, .resize-handle, .rotate-handle").forEach(el => {
            el.style.display = "";
        });
    }).catch(err => {
        console.error("Download failed:", err);
        
        // Clean up on error
        if (document.body.contains(stripClone)) {
            document.body.removeChild(stripClone);
        }
        
        // Show handles again
        document.querySelectorAll(".delete-handle, .resize-handle, .rotate-handle").forEach(el => {
            el.style.display = "";
        });
    });
});