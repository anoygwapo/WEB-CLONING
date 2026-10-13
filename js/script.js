/* ---------- YOUR IMAGES: edit these lists ---------- */
const trending = [
    { title: "", img: "images/trending1.jpg" },
    { title: "",  img: "images/trending2.jpg" },
    { title: "",    img: "images/trending3.jpg" },
    { title: "",    img: "images/trending4.jpg" },
    { title: "",  img: "images/trending5.jpg" },
    { title: "",          img: "images/trending6.jpg" },
    { title: "",   img: "images/trending7.jpg" },
    { title: "",     img: "images/trending8.jpg" },
    { title: "",          img: "images/trending9.jpg" },
    { title: "",   img: "images/trending710.jpg" },
];

const heroPosters = Array.from({ length: 20 }, (_, i) => `images/hero/poster-${i + 1}.jpg`);

/* ---------- Hero poster wall ---------- */
(function buildHeroGrid() {
    const grid = document.getElementById("heroGrid");
    if (!grid) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 90; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        const img = document.createElement("img");
        img.src = heroPosters[(i * 7) % heroPosters.length];
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        tile.appendChild(img);
        frag.appendChild(tile);
    }
    grid.appendChild(frag);
})();

(function buildTrending() {
    const track = document.getElementById("trendTrack");
    const next = document.getElementById("trendNext");
    const prev = document.getElementById("trendPrev");
    if (!track) return;

    trending.forEach((item, i) => {
        const li = document.createElement("li");
        li.className = "rank";
        li.setAttribute("aria-label", `Number ${i + 1}: ${item.title}`);
        li.innerHTML = `
      <div class="rank__poster">
        <img src="${item.img}" alt="${item.title}" loading="lazy" />
      </div>
      <span class="rank__num" aria-hidden="true">${i + 1}</span>`;
        track.appendChild(li);
    });

    const step = () => track.clientWidth * 0.85;
    const update = () => {
        const max = track.scrollWidth - track.clientWidth - 4;
        prev.hidden = track.scrollLeft <= 4;
        next.hidden = track.scrollLeft >= max;
    };
    next.addEventListener("click", () => track.scrollBy({ left: step() }));
    prev.addEventListener("click", () => track.scrollBy({ left: -step() }));
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
})();

/* ---------- FAQ accordion ---------- */
document.querySelectorAll(".faq__q").forEach((btn) => {
    btn.addEventListener("click", () => {
        const panel = document.getElementById(btn.getAttribute("aria-controls"));
        const open = btn.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".faq__q[aria-expanded='true']").forEach((other) => {
            if (other !== btn) {
                other.setAttribute("aria-expanded", "false");
                document.getElementById(other.getAttribute("aria-controls")).classList.remove("open");
            }
        });

        btn.setAttribute("aria-expanded", String(!open));
        panel.classList.toggle("open", !open);
    });
});

/* ---------- Email form validation ---------- */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
document.querySelectorAll("form.signup").forEach((form) => {
    const field = form.querySelector(".field");
    const input = form.querySelector("input");
    const error = form.querySelector(".field__error");

    const validate = () => {
        const v = input.value.trim();
        let msg = "";
        if (!v) msg = "Email is required.";
        else if (!emailRe.test(v)) msg = "Please enter a valid email address.";
        field.classList.toggle("has-error", !!msg);
        error.textContent = msg;
        return !msg;
    };

    input.addEventListener("blur", () => input.value && validate());
    input.addEventListener("input", () => field.classList.contains("has-error") && validate());
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validate()) {
            error.style.color = "#46d369";
            error.textContent = "Great! (Demo only — no account is created.)";
        }
    });
});