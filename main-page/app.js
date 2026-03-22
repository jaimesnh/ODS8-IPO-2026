const bellButton = document.querySelector('.icon-button[aria-label="Notificaciones"]');
const notifPanel = document.getElementById("notif-panel");
const notifClose = document.getElementById("notif-close");
const notifBackdrop = document.getElementById("notif-backdrop");
const toast = document.getElementById("toast");
const factsMoreButton = document.querySelector(".facts .link");
const factsRow = document.querySelector(".facts-row");
const shareButton = document.querySelector(".share-btn");
const playButton = document.querySelector(".play-button");
const sideActions = document.querySelectorAll(".side-action");
const quizButton = document.querySelector(".quiz-btn");
const mediaAltButton = document.getElementById("open-media-alt");
const mediaAltPanel = document.getElementById("media-alt-panel");
const mediaAltClose = document.getElementById("media-alt-close");
const mediaAltBackdrop = document.getElementById("media-alt-backdrop");

function showToast(message, duration = 2200) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, duration);
}

function openNotifPanel() {
    notifPanel.hidden = false;
    notifClose.focus();
}

function closeNotifPanel() {
    notifPanel.hidden = true;
    bellButton.focus();
}

function openMediaAltPanel() {
    if (!mediaAltPanel || !mediaAltClose) return;
    mediaAltPanel.hidden = false;
    mediaAltClose.focus();
}

function closeMediaAltPanel() {
    if (!mediaAltPanel) return;
    mediaAltPanel.hidden = true;
    if (mediaAltButton) mediaAltButton.focus();
}

bellButton.addEventListener("click", () => {
    if (notifPanel.hidden) {
        openNotifPanel();
    } else {
        closeNotifPanel();
    }
});

notifClose.addEventListener("click", closeNotifPanel);
notifBackdrop.addEventListener("click", closeNotifPanel);

notifPanel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNotifPanel();
});

if (factsMoreButton && factsRow) {
    factsMoreButton.addEventListener("click", () => {
        factsRow.scrollBy({ left: 180, behavior: "smooth" });
        showToast("Mostrando más datos rápidos");
    });
}

if (shareButton) {
    shareButton.addEventListener("click", () => {
        showToast("Historia compartida");
    });
}

if (playButton) {
    playButton.addEventListener("click", () => {
        showToast("Reproduciendo historia. Tienes transcripción disponible.");
    });
}

if (mediaAltButton && mediaAltPanel && mediaAltClose && mediaAltBackdrop) {
    mediaAltButton.addEventListener("click", openMediaAltPanel);
    mediaAltClose.addEventListener("click", closeMediaAltPanel);
    mediaAltBackdrop.addEventListener("click", closeMediaAltPanel);

    mediaAltPanel.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMediaAltPanel();
    });
}

sideActions.forEach((button) => {
    button.addEventListener("click", () => {
        const label = button.getAttribute("aria-label") || "Acción";
        showToast(`${label} registrado`);
    });
});

if (quizButton) {
    quizButton.addEventListener("click", () => {
        window.location.href = "../challenges/index.html";
    });
}
