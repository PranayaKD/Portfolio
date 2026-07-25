# Pranaya Kumar Dash — Python & Django Backend Developer Portfolio

> Production-grade portfolio for **Pranaya Kumar Dash** (pranayakd) — a Python & Django Backend Engineer specializing in scalable REST APIs, database concurrency control, Redis/Celery async pipelines, and RAG-based AI systems.

🔗 **Live Portfolio:** [https://www.pranayakd.in](https://www.pranayakd.in)

---

## 💎 Architecture & Design (2026 Edition)

This portfolio is engineered with premium-tier frontend and full SEO compliance:

- **3D WebGL Hero**: Three.js-powered animated icosahedron with mouse-reactive parallax
- **Smooth Scroll Engine**: Lenis smooth scroll + GSAP entrance animations
- **Modern Design System**: Sapphire accent palette, glassmorphism cards, responsive typography
- **Boneyard Skeleton Loader**: Custom image-only shimmer loading system
- **SEO Mastery**: JSON-LD Schema (`Person`, `SoftwareSourceCode`, `FAQPage`, `BreadcrumbList`), Open Graph, Twitter Cards, canonical tags, WebP images
- **Case Study Architecture**: Dedicated project pages with Mermaid.js system architecture diagrams

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python 3.12, Django, Django REST Framework, FastAPI |
| **Databases** | PostgreSQL (B-Tree Indexing, PGVector), MySQL |
| **Async & Cache** | Redis (Cache-Aside), Celery Task Workers |
| **AI / LLM** | RAG Pipelines, PGVector Embeddings, OpenAI Function Calling, Pydantic, LangChain |
| **Auth & Security** | JWT, OAuth2, Token Bucket Rate Limiting |
| **Cloud & DevOps** | AWS (EC2, S3, RDS), Docker, GitHub Actions |
| **Frontend** | HTML5, CSS3, JavaScript ES6+, HTMX, Three.js, GSAP, Lenis |

---

## 📦 Featured Projects

### 1. Cliniq.ai — AI Healthcare Management SaaS
RAG-powered medical management platform using PGVector embeddings for semantic patient record retrieval, Pydantic schema validation for zero-hallucination triaging, and Celery async pipelines.
- **Stack:** Python, Django, PGVector, RAG Architecture, Celery
- **Case Study:** [cliniq-ai.html](projects/cliniq-ai.html)

### 2. Trimrr — URL Shortener SaaS
High-throughput URL shortener with Redis Cache-Aside for sub-10ms redirects, Token Bucket rate limiting, Razorpay webhook subscription sync, and async malware scanning via Celery.
- **Stack:** Django, Redis, Celery, Razorpay, HTMX
- **Case Study:** [trimrr.html](projects/trimrr.html)

### 3. Drive In Style — Luxury Car Booking Platform
Concurrency-safe booking system using PostgreSQL `select_for_update()` pessimistic row locking combined with Redis distributed locks across a 15-minute checkout window.
- **Stack:** Django, PostgreSQL, Redis, Stripe
- **Case Study:** [drive-in-style.html](projects/drive-in-style.html)

### 4. Rentora — Peer-to-Peer Car Rental Marketplace
Trust-based asset rental marketplace with automated KYC verification, atomic state transitions via `transaction.atomic()`, and multi-column B-Tree index optimization.
- **Stack:** Django, PostgreSQL, KYC Auth
- **Case Study:** [rentora.html](projects/rentora.html)

### 5. ShopperMart — E-Commerce Platform
Full-stack e-commerce with ORM query evaluation tuning (`select_related` / `prefetch_related`), composite database indexing, reducing SQL query count by 50%.
- **Stack:** Django, MySQL, ORM Optimization
- **Case Study:** [shoppermart.html](projects/shoppermart.html)

### 6. AI Assistant — Voice-Enabled Task Orchestration
Python task orchestration engine using OpenAI Function Calling with strict JSON Schema validation and Pydantic model enforcement for deterministic tool execution.
- **Stack:** Python, OpenAI Function Calling, Speech API
- **Case Study:** [ai-assistant.html](projects/ai-assistant.html)

### 7. Smart Bookmarker — Browser Productivity Tool
Zero-dependency, event-driven JavaScript bookmarking tool using LocalStorage for sub-50ms instant search and categorization.
- **Stack:** JavaScript ES6+, DOM API, LocalStorage
- **Case Study:** [smart-bookmarker.html](projects/smart-bookmarker.html)

### 8. Jyotiksha Security — Commercial Lead Portal
Modular Django backend for a private security agency featuring custom inquiry routing, anti-spam rate limiting, and an optimized mobile responsive interface.
- **Stack:** Django, Commercial Architecture
- **Case Study:** [jyotiksha-security.html](projects/jyotiksha-security.html)

---

## 📊 Key Engineering Metrics

| Metric | Result |
| :--- | :--- |
| DB query reduction (ShopperMart) | **50% fewer SQL calls** |
| URL redirect latency (Trimrr) | **Sub-10ms via Redis Cache-Aside** |
| Double-booking defects (Drive In Style) | **0% — Pessimistic row locking** |
| AI triage latency (Cliniq.ai) | **<300ms record extraction** |
| Intent recognition (AI Assistant) | **95% accuracy** |

---

## 📬 Contact

📧 Email: dashpranaya28@gmail.com
🔗 LinkedIn: [linkedin.com/in/pranayakd28](https://www.linkedin.com/in/pranayakd28)
🐙 GitHub: [github.com/PranayaKD](https://github.com/PranayaKD)
🌐 Portfolio: [pranayakd.in](https://www.pranayakd.in)
