/* ═══════════════════════════════════════
   ANIMATIONS.JS — Portfolio Animation Effects
   Ported from shan-portfolio-main reference template
   Reuses existing GSAP 3.12 + ScrollTrigger stack.
   Zero extra dependencies.
   ═══════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") return;

  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ───────────────────────────────────────
     1. PRELOADER SVG CURVE-WIPE EFFECT
     (Adapted from main.js section 01)
     ─────────────────────────────────────── */
  const preloader = document.getElementById("preloader");
  const svg = document.getElementById("preloaderSvg");
  const svgPath = svg ? svg.querySelector("path") : null;

  if (preloader && svgPath) {
    // Disable scrolling during preloader
    document.body.style.overflow = "hidden";

    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        // Trigger initial hero character animation if needed
        initHeroCharReveal();
      }
    });

    // Sub-1s snappy performance sequence
    tl.to(".preloader-heading", {
      delay: 0.25,
      y: -40,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
      .to(svgPath, {
        duration: 0.3,
        attr: { d: curve },
        ease: "power2.inOut"
      })
      .to(svgPath, {
        duration: 0.3,
        attr: { d: flat },
        ease: "power2.inOut"
      })
      .to(preloader, {
        y: "-100%",
        duration: 0.35,
        ease: "power3.inOut"
      })
      .set(preloader, {
        display: "none",
        zIndex: -1
      });
  } else {
    // Fallback if preloader isn't present
    initHeroCharReveal();
  }

  /* ───────────────────────────────────────
     2. HERO & SECTION HEADINGS CHAR REVEAL
     (No SplitText dependency — Vanilla JS char wrapping)
     ─────────────────────────────────────── */
  function splitTextIntoSpans(element) {
    if (!element || element.dataset.splitDone) return;
    element.dataset.splitDone = "true";

    function processText(text) {
      const fragment = document.createDocumentFragment();
      const tokens = text.split(/(\s+)/);

      tokens.forEach((token) => {
        if (!token) return;
        if (/^\s+$/.test(token)) {
          const spaceSpan = document.createElement("span");
          spaceSpan.className = "char-span-space";
          spaceSpan.innerHTML = "&nbsp;";
          fragment.appendChild(spaceSpan);
        } else {
          const wordSpan = document.createElement("span");
          wordSpan.className = "word-span";

          for (let char of token) {
            const charSpan = document.createElement("span");
            charSpan.className = "char-span";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          }
          fragment.appendChild(wordSpan);
        }
      });
      return fragment;
    }

    const childNodes = Array.from(element.childNodes);
    element.innerHTML = "";

    childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        element.appendChild(processText(child.textContent));
      } else if (child.nodeName === "BR") {
        element.appendChild(document.createElement("br"));
      } else {
        const clone = child.cloneNode(true);
        // If child node has text content, split its internal text
        if (clone.textContent && clone.children.length === 0) {
          const innerFrag = processText(clone.textContent);
          clone.innerHTML = "";
          clone.appendChild(innerFrag);
        }
        element.appendChild(clone);
      }
    });
  }

  function initHeroCharReveal() {
    // Hero main word character reveal
    const heroWords = document.querySelectorAll(".hero-word");
    heroWords.forEach((word) => {
      splitTextIntoSpans(word);
      const chars = word.querySelectorAll(".char-span");
      if (chars.length) {
        gsap.fromTo(
          chars,
          { opacity: 0, x: 20, y: 10 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            stagger: 0.025,
            ease: "power3.out"
          }
        );
      }
    });
  }

  // Section headings character reveal on scroll
  const sectionHeadings = document.querySelectorAll(".section-header-refined");
  sectionHeadings.forEach((heading) => {
    // Split heading characters
    splitTextIntoSpans(heading);
    const chars = heading.querySelectorAll(".char-span");

    if (chars.length && typeof ScrollTrigger !== "undefined") {
      gsap.fromTo(
        chars,
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  });

  /* ───────────────────────────────────────
     3. MOSAIC 3x3 IMAGE REVEAL EFFECT
     (Adapted from custom-gsap.js section 08)
     ─────────────────────────────────────── */
  const mosaicWrappers = document.querySelectorAll("[data-mosaic]");

  const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
    "polygon(66.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
    "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
    "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
    "polygon(66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
    "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
    "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
    "polygon(66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)"
  ];

  const finalClipPaths = [
    "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
    "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
    "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
    "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
    "polygon(32.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
    "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
    "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
    "polygon(32.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
    "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)"
  ];

  mosaicWrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (!img) return;

    // Convert wrapper to mosaic container
    wrapper.classList.add("mosaic-wrapper");
    img.classList.add("mosaic-original");
    img.style.opacity = "0";

    const imgSrc = img.getAttribute("src");

    // Remove existing mask elements if re-initialized
    wrapper.querySelectorAll(".mosaic-mask").forEach((m) => m.remove());

    const masks = [];
    for (let i = 0; i < 9; i++) {
      const mask = document.createElement("div");
      mask.className = `mosaic-mask mask-${i + 1}`;
      mask.style.backgroundImage = `url('${imgSrc}')`;
      wrapper.appendChild(mask);
      masks.push(mask);
    }

    gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });

    const diagonalOrder = [
      [".mask-1"],
      [".mask-2", ".mask-4"],
      [".mask-3", ".mask-5", ".mask-7"],
      [".mask-6", ".mask-8"],
      [".mask-9"]
    ];

    if (typeof ScrollTrigger !== "undefined") {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      diagonalOrder.forEach((group, stepIdx) => {
        const targetElements = group
          .map((cls) => wrapper.querySelector(cls))
          .filter(Boolean);

        if (targetElements.length) {
          tl.to(
            targetElements,
            {
              clipPath: (j, el) => finalClipPaths[masks.indexOf(el)],
              duration: 0.7,
              ease: "power3.out"
            },
            stepIdx * 0.1
          );
        }
      });
    }
  });

  /* ───────────────────────────────────────
     4. PINNED STACKING PROJECT CARDS
     (Adapted from custom-gsap.js section 07)
     ─────────────────────────────────────── */
  if (typeof ScrollTrigger !== "undefined") {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = document.querySelector("#repositories");
      const stackedGrid = document.querySelector(".repo-grid[data-stacked]");
      if (!stackedGrid || !container) return;

      const cards = gsap.utils.toArray("#repositories .repo-card");
      if (!cards.length) return;

      cards.forEach((card, index) => {
        // Skip last card scaling
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 120px",
            endTrigger: cards[index + 1] || container,
            end: "top 120px",
            scrub: true,
            pin: true,
            pinSpacing: false
          }
        });
      });
    });
  }

  /* ───────────────────────────────────────
     5. ANIMATED STAT COUNTERS
     (GSAP gsap.to with onUpdate)
     ─────────────────────────────────────── */
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  if (statNumbers.length && typeof ScrollTrigger !== "undefined") {
    statNumbers.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute("data-target")) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { count: 0 };

      gsap.to(obj, {
        count: targetVal,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.count) + suffix;
        }
      });
    });
  }

  /* ───────────────────────────────────────
     6. SERVICES HOVER MICRO-ANIMATION
     (Enhanced hover reveal & icon scaling)
     ─────────────────────────────────────── */
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    const icon = card.querySelector(".material-symbols-outlined");

    card.addEventListener("mouseenter", () => {
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotate: 8,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });

  /* ───────────────────────────────────────
     7. FLOATING CAPSULE IMAGE CURSOR FOLLOW
     (Services list cursor follow thumbnail)
     ─────────────────────────────────────── */
  const floatImg = document.getElementById("serviceFloatImg");
  const floatImgEl = floatImg ? floatImg.querySelector("img") : null;
  if (floatImg && floatImgEl) {
    document.querySelectorAll(".service-row-capsule").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        if (row.dataset.img) floatImgEl.src = row.dataset.img;
        floatImg.style.opacity = "1";
      });
      row.addEventListener("mouseleave", () => {
        floatImg.style.opacity = "0";
      });
      row.addEventListener("mousemove", (e) => {
        floatImg.style.left = e.clientX + "px";
        floatImg.style.top = e.clientY + "px";
      });
    });
  }
});

