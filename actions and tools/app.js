const state = {
    locale: "en",
};

const i18n = {
    es: {
        "header.title": "Knowledge is Power",
        "header.subtitle": "Potenciando tu vida laboral",
        "search.placeholder": "Buscar derechos, guías o empleos...",
        "actionCenter.title": "Centro de Acción",
        "actionCenter.tools": "3 HERRAMIENTAS DISPONIBLES",
        "rights.title": "Tus Derechos",
        "rights.badge": "ESENCIAL",
        "rights.description": "Conoce tu valor. Accede a guías sobre salario mínimo, periodos de descanso y contratos básicos.",
        "rights.cta": "Explorar Guías",
        "alert.title": "Guía Anti-Explotación",
        "alert.description": "Detecta las señales. Aprende a identificar y denunciar de forma segura abusos laborales o violaciones de seguridad.",
        "alert.cta": "Obtener Ayuda",
        "jobs.title": "Bolsa de Trabajo Segura",
        "jobs.viewAll": "Ver todo",
        "jobs.job1.title": "Barista",
        "jobs.job1.details": "Café del Centro · Tiempo completo",
        "jobs.job2.title": "Repartidor",
        "jobs.job2.details": "Local Express · Flexible",
        "jobs.verified": "VERIFICADO",
        "jobs.new": "NUEVO",
        "tip.text": "Consejo: Siempre guarda una copia de tu contrato firmado en un lugar seguro. Usa nuestra herramienta \"Bóveda\" para guardar fotos del mismo.",
        "nav.home": "Inicio",
        "nav.action": "Acción",
        "nav.challenges": "Retos",
        "nav.profile": "Perfil",
        "toast.help": "Redirigiendo a recursos de ayuda...",
        "toast.guides": "Abriendo guías de derechos...",
    },
    en: {
        "header.title": "Knowledge is Power",
        "header.subtitle": "Empowering your work life",
        "search.placeholder": "Search rights, guides, or jobs...",
        "actionCenter.title": "Action Center",
        "actionCenter.tools": "3 TOOLS AVAILABLE",
        "rights.title": "Your Rights",
        "rights.badge": "ESSENTIAL",
        "rights.description": "Know your worth. Access guides on minimum wage, rest periods, and contract basics.",
        "rights.cta": "Explore Guides",
        "alert.title": "Anti-Exploitation Guide",
        "alert.description": "Spot the signs. Learn how to identify and safely report workplace abuse or safety violations.",
        "alert.cta": "Get Help Now",
        "jobs.title": "Safe Job Board",
        "jobs.viewAll": "View All",
        "jobs.job1.title": "Barista",
        "jobs.job1.details": "Downtown Cafe · Full-time",
        "jobs.job2.title": "Delivery Partner",
        "jobs.job2.details": "Local Express · Flexible",
        "jobs.verified": "VERIFIED",
        "jobs.new": "NEW",
        "tip.text": "Tip: Always keep a copy of your signed contract in a safe place. Use our \"Vault\" tool to store photos of it.",
        "nav.home": "Home",
        "nav.action": "Action",
        "nav.challenges": "Challenges",
        "nav.profile": "Profile",
        "toast.help": "Redirecting to help resources...",
        "toast.guides": "Opening rights guides...",
    },
};

/* ── DOM refs ── */
const toast = document.getElementById("toast");
const exploreBtn = document.getElementById("explore-guides");
const helpBtn = document.getElementById("get-help");
const searchInput = document.querySelector(".search-input");

/* ── i18n ── */
function setLocale(locale) {
    state.locale = i18n[locale] ? locale : "en";
    document.documentElement.lang = state.locale;
    const dict = i18n[state.locale];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) el.placeholder = dict[key];
    });
}

/* ── Toast ── */
function showToast(message, duration = 2200) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
}

/* ── Button handlers ── */
if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
        const dict = i18n[state.locale];
        showToast(dict["toast.guides"]);
    });
}

if (helpBtn) {
    helpBtn.addEventListener("click", () => {
        const dict = i18n[state.locale];
        showToast(dict["toast.help"]);
    });
}

/* ── Search interaction ── */
if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                showToast(`Searching: "${query}"`);
            }
        }
    });
}

/* ── Locale from browser ── */
const browserLocale = navigator.language?.startsWith("es") ? "es" : "en";
setLocale(browserLocale);
