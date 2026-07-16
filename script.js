const siteConfig = {
    recipientName: "Fiona",
    ownerName: "Ridwan",
    signalMessage: "THANK YOU FOR THE BATMAN LEGOS"
};

let signalActive = false;
let signalAnimationVersion = 0;

let signalStage;
let signalMessage;
let activateSignalButton;
let dimSignalButton;
let replayMessageButton;

document.addEventListener("DOMContentLoaded", initializeSignal);

function initializeSignal() {
    signalStage = document.getElementById("signalStage");
    signalMessage = document.getElementById("signalMessage");
    activateSignalButton = document.getElementById("activateSignal");
    dimSignalButton = document.getElementById("dimSignal");
    replayMessageButton = document.getElementById("replayMessage");

    const requiredElements = [
        signalStage,
        signalMessage,
        activateSignalButton,
        dimSignalButton,
        replayMessageButton
    ];

    if (requiredElements.some(element => !element)) {
        console.error("Bat logo signal setup failed. Required element missing.");
        return;
    }

    activateSignalButton.addEventListener("click", activateSignal);
    dimSignalButton.addEventListener("click", dimSignal);
    replayMessageButton.addEventListener("click", replaySignalMessage);

    document.addEventListener("keydown", handleSignalKeyboard);

    // Initialise secondary merged gotham systems
    initializeFooterYear();
    initializeNavbarBehavior();
    initializeRevealAnimations();
    initializeFriendNames();
    initializeHeroButton();
    initializeClimaxButton();
    initializeMobileMenu();
    initializeMoonBatEasterEgg();
    initializeSkyscraperFlicker();
    initializeRainSystem();
    initializeSetupGallery();
    initializeThousandThanks();

    console.log("Image-based Bat logo signal initialized.");
}

async function activateSignal() {
    signalAnimationVersion += 1;
    const currentVersion = signalAnimationVersion;

    signalActive = true;

    signalStage.classList.add("is-active");
    signalMessage.classList.remove("is-visible");
    signalMessage.textContent = "";

    activateSignalButton.disabled = true;

    await wait(700);

    activateSignalButton.disabled = false;

    if (!signalActive || currentVersion !== signalAnimationVersion) {
        return;
    }

    showSignalMessage();
}

function dimSignal() {
    signalAnimationVersion += 1;
    signalActive = false;

    signalMessage.classList.remove("is-visible");
    signalStage.classList.remove("is-active");

    window.setTimeout(() => {
        if (!signalActive) {
            signalMessage.textContent = "";
        }
    }, 400);
}

async function replaySignalMessage() {
    signalAnimationVersion += 1;
    const currentVersion = signalAnimationVersion;

    signalMessage.classList.remove("is-visible");

    if (!signalActive) {
        await activateSignal();
        return;
    }

    await wait(250);

    if (!signalActive || currentVersion !== signalAnimationVersion) {
        return;
    }

    showSignalMessage();
}

function showSignalMessage() {
    signalMessage.textContent = siteConfig.signalMessage;

    requestAnimationFrame(() => {
        signalMessage.classList.add("is-visible");
    });

    // Briefly display the thank-you message, then transition to THANK YOU, FIONA
    const currentVersion = signalAnimationVersion;
    window.setTimeout(() => {
        if (signalActive && currentVersion === signalAnimationVersion) {
            signalMessage.classList.remove("is-visible");
            window.setTimeout(() => {
                if (signalActive && currentVersion === signalAnimationVersion) {
                    signalMessage.textContent = "THANK YOU, " + (siteConfig.recipientName || "Fiona").toUpperCase();
                    signalMessage.classList.add("is-visible");
                }
            }, 350);
        }
    }, 3200);
}

function wait(duration) {
    return new Promise(resolve => {
        window.setTimeout(resolve, duration);
    });
}

function handleSignalKeyboard(event) {
    const target = event.target;

    const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable;

    if (isTyping) {
        return;
    }

    const key = event.key.toLowerCase();

    if (key === "b") {
        activateSignal();
        showNotification("The red signal has been activated.");
    } else if (key === "t") {
        replaySignalMessage();
        showNotification("The thank-you message is replaying.");
    } else if (key === "escape") {
        dimSignal();
        showNotification("The signal has been dimmed.");
    }
}

function showNotification(message) {
    let notification = document.querySelector(".site-notification");

    if (!notification) {
        notification = document.createElement("div");
        notification.className = "site-notification";
        notification.setAttribute("role", "status");
        notification.setAttribute("aria-live", "polite");
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add("is-visible");

    window.clearTimeout(notification.hideTimer);

    notification.hideTimer = window.setTimeout(() => {
        notification.classList.remove("is-visible");
    }, 2200);
}

function initializeFooterYear() {
    const yearElement = document.querySelector("[data-current-year]");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initializeNavbarBehavior() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) {
        return;
    }

    const updateNavbar = () => {
        if (window.scrollY > 20) {
            navbar.classList.add("is-scrolled");
        } else {
            navbar.classList.remove("is-scrolled");
        }
    };

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });
}

function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    if (!revealElements.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

function initializeFriendNames() {
    const recipientName = siteConfig.recipientName || "Fiona";
    document.querySelectorAll(".friend-name-placeholder").forEach(el => {
        el.textContent = recipientName;
    });

    const ownerName = siteConfig.ownerName.trim();
    document.querySelectorAll(".owner-name-placeholder").forEach(el => {
        el.textContent = ownerName;
    });
}

function initializeHeroButton() {
    const heroActivateBtn = document.getElementById("hero-activate");
    if (heroActivateBtn) {
        heroActivateBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const signalSection = document.getElementById("signal");
            if (signalSection) {
                signalSection.scrollIntoView({ behavior: "smooth" });
            }
            setTimeout(() => activateSignal(), 600);
        });
    }
}

function initializeClimaxButton() {
    const climaxLightUpBtn = document.getElementById("btn-climax-light-up");
    if (climaxLightUpBtn) {
        climaxLightUpBtn.addEventListener("click", () => {
            activateSignal();
            triggerLightningStrike();
            setTimeout(triggerLightningStrike, 300);
            showNotification("Gotham skyline fully illuminated.");
        });
    }
}

function initializeMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        mobileToggle.classList.toggle("active", isOpen);
        mobileToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            mobileToggle.classList.remove("active");
            mobileToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function initializeMoonBatEasterEgg() {
    const moonContainer = document.querySelector(".moon-container");
    const moonBat = document.querySelector(".moon-bat");

    if (moonContainer && moonBat) {
        moonContainer.addEventListener("click", () => {
            if (moonBat.classList.contains("fly")) return;
            
            moonBat.classList.add("fly");
            showNotification("A shadow crosses the moon...");
            
            setTimeout(() => {
                moonBat.classList.remove("fly");
            }, 3000);
        });
    }

    const brandLogo = document.querySelector(".nav-brand");
    if (brandLogo) {
        brandLogo.addEventListener("dblclick", (e) => {
            e.preventDefault();
            const svgLogo = brandLogo.querySelector(".nav-logo-svg");
            if (svgLogo) {
                svgLogo.classList.remove("lightning-flash");
                void svgLogo.offsetWidth;
                svgLogo.classList.add("lightning-flash");
            }
            triggerLightningStrike();
        });
    }
}

function triggerLightningStrike() {
    const overlay = document.getElementById("lightning-overlay");
    if (!overlay) return;
    
    overlay.classList.remove("flash-active");
    void overlay.offsetWidth;
    overlay.classList.add("flash-active");
}

function initializeSkyscraperFlicker() {
    const dynamicWindows = document.querySelectorAll(".window-glow");
    if (!dynamicWindows.length) return;

    setInterval(() => {
        const toggleCount = Math.floor(Math.random() * 4) + 1;
        for (let i = 0; i < toggleCount; i++) {
            const randomIndex = Math.floor(Math.random() * dynamicWindows.length);
            const windowEl = dynamicWindows[randomIndex];
            
            if (windowEl && !windowEl.classList.contains("dynamic-yellow")) {
                const currentFill = windowEl.getAttribute("fill");
                if (currentFill === "none" || !currentFill) {
                    const colors = ["#176b93", "#b51f2e", "#f6c445"];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    windowEl.setAttribute("fill", randomColor);
                } else {
                    windowEl.setAttribute("fill", "none");
                }
            }
        }
    }, 2500);
}

function initializeRainSystem() {
    const canvas = document.getElementById("rainCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId = null;
    let drops = [];
    let splashes = [];
    let maxDrops = 100;
    let isMobile = window.innerWidth < 768;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        isMobile = window.innerWidth < 768;
        maxDrops = isMobile ? 35 : 120;
        
        if (motionQuery.matches) {
            drops = [];
            splashes = [];
        }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class RainDrop {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }

        reset() {
            this.x = Math.random() * (canvas.width + 100) - 50;
            this.y = -20;
            this.length = Math.random() * 15 + 10;
            this.speed = Math.random() * 12 + 18;
            this.opacity = Math.random() * 0.2 + 0.15;
            this.wind = -1.5;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind;

            const splashLevel = canvas.height - 80 - Math.sin(this.x * 0.005) * 40;

            if (this.y >= splashLevel) {
                createSplash(this.x, splashLevel);
                this.reset();
            }

            if (this.x < -50 || this.x > canvas.width + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 173, 184, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.wind, this.y + this.length);
            ctx.stroke();
        }
    }

    class SplashParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * -3 - 1;
            this.radius = Math.random() * 1.5 + 0.5;
            this.alpha = 0.6;
            this.gravity = 0.15;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.alpha -= 0.04;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 173, 184, ${this.alpha})`;
            ctx.fill();
        }
    }

    function createSplash(x, y) {
        if (splashes.length > 50) return;
        const pCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < pCount; i++) {
            splashes.push(new SplashParticle(x, y));
        }
    }

    function initDrops() {
        drops = [];
        if (motionQuery.matches) return;
        for (let i = 0; i < maxDrops; i++) {
            drops.push(new RainDrop());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!motionQuery.matches) {
            drops.forEach(drop => {
                drop.update();
                drop.draw();
            });

            splashes = splashes.filter(p => p.alpha > 0);
            splashes.forEach(p => {
                p.update();
                p.draw();
            });
        }

        animationId = requestAnimationFrame(animate);
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    motionQuery.addEventListener("change", () => {
        initDrops();
    });

    initDrops();
    animate();
}

function initializeSetupGallery() {
    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const lightbox = document.getElementById("galleryLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrevious");
    const nextButton = document.getElementById("lightboxNext");

    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage ||
        !lightboxCaption ||
        !closeButton ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }

    const photographs = galleryItems.map(item => {
        const image = item.querySelector("img");
        const caption = item.querySelector(".gallery-caption");

        return {
            src: image.src,
            alt: image.alt,
            caption: caption ? caption.textContent.trim() : ""
        };
    });

    let activeIndex = 0;
    let previousFocus = null;

    function renderPhotograph() {
        const photograph = photographs[activeIndex];

        lightboxImage.src = photograph.src;
        lightboxImage.alt = photograph.alt;
        lightboxCaption.textContent = photograph.caption;
    }

    function openLightbox(index) {
        activeIndex = index;
        previousFocus = document.activeElement;

        renderPhotograph();

        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    function showPrevious() {
        activeIndex =
            (activeIndex - 1 + photographs.length) %
            photographs.length;

        renderPhotograph();
    }

    function showNext() {
        activeIndex =
            (activeIndex + 1) %
            photographs.length;

        renderPhotograph();
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", showPrevious);
    nextButton.addEventListener("click", showNext);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            showPrevious();
        } else if (event.key === "ArrowRight") {
            showNext();
        }
    });
}

function initializeThousandThanks() {
    const openButton =
        document.getElementById("thousandThanksButton");

    const overlay =
        document.getElementById("thousandThanksOverlay");

    const closeButton =
        document.getElementById("thousandThanksClose");

    const secondaryCloseButton =
        document.getElementById("closeThousandThanks");

    const replayButton =
        document.getElementById("replayThousandThanks");

    const counter =
        document.getElementById("thanksCounter");

    const wall =
        document.getElementById("thankYouWall");

    const finalMessage =
        document.getElementById("thousandThanksFinal");

    const floatingLayer =
        document.getElementById("floatingThanksLayer");

    const requiredElements = [
        openButton,
        overlay,
        closeButton,
        secondaryCloseButton,
        replayButton,
        counter,
        wall,
        finalMessage,
        floatingLayer
    ];

    if (requiredElements.some(element => !element)) {
        return;
    }

    const totalThanks = 1000;
    let animationVersion = 0;
    let previousFocus = null;

    function openOverlay() {
        previousFocus = document.activeElement;

        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("thousand-thanks-open");

        closeButton.focus();
        startThousandThanks();
    }

    function closeOverlay() {
        animationVersion += 1;

        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("thousand-thanks-open");

        floatingLayer.replaceChildren();

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    function createFloatingThankYou() {
        const particle = document.createElement("span");

        particle.className = "floating-thank-you";
        particle.textContent = "THANK YOU";

        particle.style.left =
            `${Math.random() * 92 + 4}%`;

        particle.style.fontSize =
            `${Math.random() * 1.2 + 0.7}rem`;

        particle.style.setProperty(
            "--float-duration",
            `${Math.random() * 3 + 4}s`
        );

        particle.style.setProperty(
            "--float-rotation",
            `${Math.random() * 30 - 15}deg`
        );

        floatingLayer.appendChild(particle);

        window.setTimeout(() => {
            particle.remove();
        }, 7500);
    }

    async function startThousandThanks() {
        animationVersion += 1;
        const currentVersion = animationVersion;

        counter.textContent = "0";
        wall.replaceChildren();
        floatingLayer.replaceChildren();

        finalMessage.classList.remove("is-visible");

        const batchSize = 25;
        let created = 0;

        while (
            created < totalThanks &&
            currentVersion === animationVersion
        ) {
            const fragment =
                document.createDocumentFragment();

            const remaining =
                totalThanks - created;

            const amount =
                Math.min(batchSize, remaining);

            for (let index = 0; index < amount; index += 1) {
                created += 1;

                const item =
                    document.createElement("span");

                item.className = "thank-you-item";
                item.textContent =
                    `${created}. THANK YOU`;

                fragment.appendChild(item);
            }

            wall.appendChild(fragment);
            counter.textContent =
                created.toLocaleString();

            if (created % 50 === 0) {
                createFloatingThankYou();
                createFloatingThankYou();
            }

            await nextAnimationFrame();
        }

        if (currentVersion !== animationVersion) {
            return;
        }

        counter.textContent = "1,000";

        finalMessage.classList.add("is-visible");

        for (let index = 0; index < 24; index += 1) {
            window.setTimeout(() => {
                if (currentVersion === animationVersion) {
                    createFloatingThankYou();
                }
            }, index * 90);
        }

        console.log(
            "Exactly 1,000 thank-you messages delivered."
        );
    }

    function nextAnimationFrame() {
        return new Promise(resolve => {
            window.requestAnimationFrame(resolve);
        });
    }

    openButton.addEventListener("click", openOverlay);
    closeButton.addEventListener("click", closeOverlay);
    secondaryCloseButton.addEventListener(
        "click",
        closeOverlay
    );

    replayButton.addEventListener(
        "click",
        startThousandThanks
    );

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener("keydown", event => {
        if (!overlay.classList.contains("is-open")) {
            return;
        }

        if (event.key === "Escape") {
            closeOverlay();
        }
    });
}
