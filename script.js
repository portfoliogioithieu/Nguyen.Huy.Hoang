const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('#lightbox .close');
const prevBtn = document.querySelector('#lightbox .prev');
const nextBtn = document.querySelector('#lightbox .next');

let currentIndex = 0;

// mở lightbox khi click vào ảnh
galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        currentIndex = index;
    });
});

// đóng lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// next
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
});

// prev
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
});

// đóng khi click ra ngoài ảnh
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});
let scale = 1;

function resetZoom() {
    scale = 1;
    lightboxImg.style.transform = `scale(${scale})`;
    lightboxImg.style.cursor = 'zoom-in';
}

// reset zoom khi mở ảnh mới
galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        scale = 1;
        resetZoom();
    });
});

// zoom bằng bánh xe chuột
lightboxImg.addEventListener('wheel', function (e) {
    e.preventDefault();

    if (e.deltaY < 0) {
        // zoom in
        scale += 0.1;
    } else {
        // zoom out
        scale -= 0.1;
    }

    // giới hạn zoom
    scale = Math.min(Math.max(1, scale), 4);

    lightboxImg.style.transform = `scale(${scale})`;
    lightboxImg.style.cursor = scale > 1 ? 'zoom-out' : 'zoom-in';
});

// reset zoom khi chuyển ảnh
nextBtn.addEventListener('click', resetZoom);
prevBtn.addEventListener('click', resetZoom);
closeBtn.addEventListener('click', resetZoom);

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const toggleBtn = document.getElementById("langToggle");
let currentLang = "vi";

toggleBtn.addEventListener("click", () => {
    const viElements = document.querySelectorAll(".lang-vi");
    const enElements = document.querySelectorAll(".lang-en");

    if (currentLang === "vi") {
        viElements.forEach(el => el.style.display = "none");
        enElements.forEach(el => el.style.display = "block");
        toggleBtn.innerHTML = "🇻🇳 Vietnam";
        currentLang = "en";
    } else {
        enElements.forEach(el => el.style.display = "none");
        viElements.forEach(el => el.style.display = "block");
        toggleBtn.innerHTML = "🇺🇸 English";
        currentLang = "vi";
    }
});

function toggleJob(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === "block") ? "none" : "block";
}
function toggleJob(id) {
    const el = document.getElementById(id);
    const title = event.target;

    el.style.display = (el.style.display === "block") ? "none" : "block";
    title.classList.toggle("active");
}

// ===============================
// TOC – Highlight when scrolling
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".sidebar a");

    function activateTOC() {
        let scrollPos = window.scrollY + 150;

        sections.forEach(section => {

            // ❌ bỏ qua section đang bị ẩn (khác ngôn ngữ)
            if (section.offsetParent === null) return;

            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < top + height) {

                navLinks.forEach(link => {

                    // ❌ bỏ qua link sidebar đang bị ẩn
                    if (link.offsetParent === null) {
                        link.classList.remove("active");
                        return;
                    }

                    const href = link.getAttribute("href").substring(1);

                    if (href === id) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", activateTOC);
});


