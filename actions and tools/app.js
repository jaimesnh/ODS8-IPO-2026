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
        "rights.imageAlt": "Imagen simbólica sobre empoderamiento laboral para representar el acceso a derechos y recursos de protección.",
        "rights.description": "Conoce tu valor. Accede a guías sobre salario mínimo, periodos de descanso y contratos básicos.",
        "rights.cta": "Explorar Guías",
        "alert.title": "Guía Anti-Explotación",
        "alert.description": "Detecta las señales. Aprende a identificar y denunciar de forma segura abusos laborales o violaciones de seguridad.",
        "alert.cta": "Obtener Ayuda",
        "alert.easyRead": "Leer versión en texto fácil",
        "jobs.title": "Bolsa de Trabajo Segura",
        "jobs.viewAll": "Ver todo",
        "jobs.job1.title": "Barista",
        "jobs.job1.details": "Café del Centro · Tiempo completo",
        "jobs.job2.title": "Repartidor",
        "jobs.job2.details": "Local Express · Flexible",
        "jobs.verified": "VERIFICADO",
        "jobs.new": "NUEVO",
        "tip.text": 'Consejo: Siempre guarda una copia de tu contrato firmado en un lugar seguro. Usa nuestra herramienta "Bóveda" para guardar fotos del mismo.',
        "nav.home": "Inicio",
        "nav.action": "Acción",
        "nav.challenges": "Retos",
        "nav.profile": "Perfil",
        "toast.help": "Redirigiendo a recursos de ayuda...",
        "toast.guides": "Abriendo guías de derechos...",
        "toast.easyRead": "Abriendo guía en lectura fácil y formato compatible con lector de pantalla...",
    },
    en: {
        "header.title": "Knowledge is Power",
        "header.subtitle": "Empowering your work life",
        "search.placeholder": "Search rights, guides, or jobs...",
        "actionCenter.title": "Action Center",
        "actionCenter.tools": "3 TOOLS AVAILABLE",
        "rights.title": "Your Rights",
        "rights.badge": "ESSENTIAL",
        "rights.imageAlt": "Symbolic image about labor empowerment representing access to rights and worker protection resources.",
        "rights.description": "Know your worth. Access guides on minimum wage, rest periods, and contract basics.",
        "rights.cta": "Explore Guides",
        "alert.title": "Anti-Exploitation Guide",
        "alert.description": "Spot the signs. Learn how to identify and safely report workplace abuse or safety violations.",
        "alert.cta": "Get Help Now",
        "alert.easyRead": "Read easy-text version",
        "jobs.title": "Safe Job Board",
        "jobs.viewAll": "View All",
        "jobs.job1.title": "Barista",
        "jobs.job1.details": "Downtown Cafe · Full-time",
        "jobs.job2.title": "Delivery Partner",
        "jobs.job2.details": "Local Express · Flexible",
        "jobs.verified": "VERIFIED",
        "jobs.new": "NEW",
        "tip.text": 'Tip: Always keep a copy of your signed contract in a safe place. Use our "Vault" tool to store photos of it.',
        "nav.home": "Home",
        "nav.action": "Action",
        "nav.challenges": "Challenges",
        "nav.profile": "Profile",
        "toast.help": "Redirecting to help resources...",
        "toast.guides": "Opening rights guides...",
        "toast.easyRead": "Opening easy-read guide and screen-reader friendly format...",
    },
};

/* ── DOM refs ── */
const toast = document.getElementById("toast");
const exploreBtn = document.getElementById("explore-guides");
const helpBtn = document.getElementById("get-help");
const searchInput = document.querySelector(".search-input");
const bellButton = document.querySelector('.icon-button[aria-label="Notificaciones"]');
const notifPanel = document.getElementById("notif-panel");
const notifClose = document.getElementById("notif-close");
const notifBackdrop = document.getElementById("notif-backdrop");
const jobsViewAllBtn = document.querySelector('.link[data-i18n="jobs.viewAll"]');
const easyReadBtn = document.getElementById("open-easy-read");

// Modals
const guidesModal = document.getElementById("guides-modal");
const helpModal = document.getElementById("help-modal");
const easyReadModal = document.getElementById("easy-read-modal");
const jobsModal = document.getElementById("jobs-modal");
const jobDetailModal = document.getElementById("job-detail-modal");
const jobsList = document.getElementById("jobs-list");
const jobDetailContent = document.getElementById("job-detail-content");
const jobDetailTitle = document.getElementById("job-detail-title");
const applyJobBtn = document.getElementById("apply-job-btn");
const modalCloseButtons = document.querySelectorAll("[data-close]");

/* ── Jobs Data ── */
const jobsData = [
    {
        id: 1,
        title: "Barista",
        company: "Café Centro",
        type: "Jornada completa",
        salary: "$18/hr",
        verified: true,
        description: "Buscamos baristas con experiencia en café especial. Ambiente joven y dinámico. Contrato indefinido, beneficios de comida incluida.",
        benefits: ["Contrato indefinido", "Comidas gratis", "Horario flexible", "Formación en café"],
        location: "Madrid Centro",
        requirements: ["Experiencia 1+ año", "Pasión por el café", "Disponibilidad inmediata"],
    },
    {
        id: 2,
        title: "Repartidor",
        company: "Local Express",
        type: "Flexible",
        salary: "$22/hr",
        new: true,
        description: "Se busca personal para reparto en zona metropolitana. Trabajo flexible con posibilidad de elegir horarios. Vehículo proporcionado.",
        benefits: ["Horario flexible", "Seguro de vehículo", "Bonos por desempeño", "Gastos de transporte"],
        location: "Área Metropolitana",
        requirements: ["Carnet de conducir", "Responsabilidad", "Buena actitud"],
    },
    {
        id: 3,
        title: "Asistente Administrativo",
        company: "Consultora Tech",
        type: "Jornada completa",
        salary: "$1,800-2,000",
        verified: true,
        description: "Apoya el equipo administrativo de una consultora tecnológica en crecimiento. Tarea variadas, ambiente colaborativo.",
        benefits: ["Contrato indefinido", "Tarjeta transporte", "Seguros médicos", "Plan de carrera"],
        location: "Barcelona",
        requirements: ["Ofimática avanzada", "Organización", "Nivel B1 inglés"],
    },
    {
        id: 4,
        title: "Limpiador Comercial",
        company: "CleanPro Services",
        type: "Parcial",
        salary: "$850/mes",
        new: true,
        description: "Limpieza de oficinas y espacios comerciales. Turnos de tarde/noche. Contrato con validación de derechos laborales.",
        benefits: ["Contrato validado", "Seguridad Social", "Uniformes", "Horario predecible"],
        location: "Valencia",
        requirements: ["Experiencia en limpieza", "Responsabilidad", "Disponibilidad tarde-noche"],
    },
    {
        id: 5,
        title: "Vendedor Retail",
        company: "Urban Fashion",
        type: "Jornada completa",
        salary: "$16/hr + comisión",
        verified: true,
        description: "Venta en tienda física de moda urbana. Equipo dinámico, descuentos en productos. Posibilidad de ascenso.",
        benefits: ["Descuentos 30%", "Comisión competitiva", "Formación", "Ambiente joven"],
        location: "Bilbao Centro",
        requirements: ["Habilidades de venta", "Idiomas (EN/ES)", "Disponibilidad fines de semana"],
    },
    {
        id: 6,
        title: "Técnico de Soporte",
        company: "DataFlow Solutions",
        type: "Jornada completa",
        salary: "$2,200-2,500",
        new: true,
        description: "Soporte técnico a clientes empresariales. Equipo remoto, flexible. Empresa certificada en derechos laborales.",
        benefits: ["100% remoto", "Flexible", "Formación continua", "Seguro médico"],
        location: "Teletrabajo",
        requirements: ["Técnico en IT", "Soporte a usuarios", "Inglés fluido"],
    },
];

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

/* ── Modal functions ── */
function openModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    const closeBtn = modal.querySelector("[data-close]");
    if (closeBtn) closeBtn.focus();
}

function closeModal(modal, returnFocus = null) {
    if (!modal) return;
    modal.hidden = true;
    if (returnFocus) returnFocus.focus();
}

/* ── Button handlers ── */
if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
        openModal(guidesModal);
    });
}

if (helpBtn) {
    helpBtn.addEventListener("click", () => {
        openModal(helpModal);
    });
}

if (easyReadBtn) {
    easyReadBtn.addEventListener("click", () => {
        openModal(easyReadModal);
    });
}

/* ── Modal close handlers ── */
modalCloseButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const closeType = btn.getAttribute("data-close");
        let modal = null;
        if (closeType === "guides") modal = guidesModal;
        else if (closeType === "help") modal = helpModal;
        else if (closeType === "easy-read") modal = easyReadModal;
        else if (closeType === "jobs") modal = jobsModal;
        else if (closeType === "job-detail") modal = jobDetailModal;
        if (modal) closeModal(modal, btn.closest(".modal") ? btn : e.target);
    });
});

// Close modal on backdrop click
document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
    backdrop.addEventListener("click", () => {
        const modal = backdrop.closest(".modal");
        closeModal(modal);
    });
});

/* ── Jobs Functions ── */
function renderJobsList() {
    jobsList.innerHTML = jobsData
        .map(
            (job, idx) => `
        <div class="job-list-item" role="listitem" ${idx === 0 ? "data-apply-focus" : ""}>
            <button class="job-button" type="button" onclick="showJobDetail(${job.id})" style="width: 100%; text-align: left; padding: 16px; background: transparent; border: none; cursor: pointer;">
                <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <div class="job-avatar" style="background: ${["#fce4ec", "#fff3e0", "#e8f5e9", "#f1f8e9", "#fce4ec", "#e1f5fe"][idx % 6]}; flex-shrink: 0;">
                        <span style="color: ${["#e91e63", "#e65100", "#2e7d32", "#558b2f", "#c2185b", "#0277bd"][idx % 6]}; font-weight: 700;">${job.title.charAt(0)}</span>
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <h4 style="margin: 0 0 4px 0; font-size: 16px; color: var(--ink);">${job.title}</h4>
                        <p style="margin: 0 0 8px 0; font-size: 14px; color: var(--muted);">${job.company} · ${job.type}</p>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            <span style="font-weight: 600; color: var(--accent);">${job.salary}</span>
                            ${job.verified ? '<span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600;">VERIFICADO</span>' : ""}
                            ${job.new ? '<span style="background: #fff3e0; color: #e65100; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600;">NUEVO</span>' : ""}
                        </div>
                    </div>
                    <span style="color: var(--muted);" aria-hidden="true">→</span>
                </div>
            </button>
        </div>
    `,
        )
        .join("");
}

function showJobDetail(jobId) {
    const job = jobsData.find((j) => j.id === jobId);
    if (!job) return;

    jobDetailTitle.textContent = job.title;
    jobDetailContent.innerHTML = `
        <div style="display: grid; gap: 16px;">
            <div style="display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0;">
                <div class="job-avatar" style="background: #fce4ec; width: 48px; height: 48px;">
                    <span style="color: #e91e63; font-weight: 700; font-size: 20px;">${job.title.charAt(0)}</span>
                </div>
                <div>
                    <p style="margin: 0; font-size: 14px; color: var(--muted);">${job.company}</p>
                    <p style="margin: 0; font-weight: 600; color: var(--ink);">${job.salary}</p>
                </div>
            </div>
            
            <div>
                <h3 style="margin: 0 0 8px 0; font-size: 14px; color: var(--muted); text-transform: uppercase;">📍 Ubicación</h3>
                <p style="margin: 0; color: var(--ink);">${job.location}</p>
            </div>
            
            <div>
                <h3 style="margin: 0 0 8px 0; font-size: 14px; color: var(--muted); text-transform: uppercase;">📝 Descripción</h3>
                <p style="margin: 0; color: var(--ink); line-height: 1.5;">${job.description}</p>
            </div>
            
            <div>
                <h3 style="margin: 0 0 8px 0; font-size: 14px; color: var(--muted); text-transform: uppercase;">✓ Beneficios</h3>
                <ul style="margin: 0; padding-left: 20px; color: var(--ink);">
                    ${job.benefits.map((b) => `<li style="margin: 4px 0;">${b}</li>`).join("")}
                </ul>
            </div>
            
            <div>
                <h3 style="margin: 0 0 8px 0; font-size: 14px; color: var(--muted); text-transform: uppercase;">⚡ Requisitos</h3>
                <ul style="margin: 0; padding-left: 20px; color: var(--ink);">
                    ${job.requirements.map((r) => `<li style="margin: 4px 0;">${r}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

    jobsModal.hidden = true;
    jobDetailModal.hidden = false;
    applyJobBtn.focus();
}

// Close modal on Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (!guidesModal.hidden) closeModal(guidesModal, exploreBtn);
        if (!helpModal.hidden) closeModal(helpModal, helpBtn);
        if (!easyReadModal.hidden) closeModal(easyReadModal, easyReadBtn);
        if (!jobsModal.hidden) closeModal(jobsModal, jobsViewAllBtn);
        if (!jobDetailModal.hidden) {
            jobDetailModal.hidden = true;
            jobsModal.hidden = false;
            jobsList.querySelector("[data-apply-focus]")?.focus();
        }
    }
});

/* ── Apply Job Button ── */
if (applyJobBtn) {
    applyJobBtn.addEventListener("click", () => {
        const jobTitle = jobDetailTitle.textContent;
        showToast(`Solicitud enviada para: ${jobTitle}`);
        setTimeout(() => {
            closeModal(jobDetailModal);
            closeModal(jobsModal);
        }, 1500);
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

if (jobsViewAllBtn) {
    jobsViewAllBtn.addEventListener("click", () => {
        renderJobsList();
        openModal(jobsModal);
    });
}

function openNotifPanel() {
    notifPanel.hidden = false;
    notifClose.focus();
}

function closeNotifPanel() {
    notifPanel.hidden = true;
    bellButton.focus();
}

if (bellButton && notifPanel && notifClose && notifBackdrop) {
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
}

/* ── Locale from browser ── */
const browserLocale = navigator.language?.startsWith("es") ? "es" : "en";
setLocale(browserLocale);
