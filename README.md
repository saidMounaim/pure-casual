# Pure Casual

**Pure Casual** is an e-commerce project for casual clothing, built with **Next.js 15**, **Tailwind CSS**, **shadcn/ui**, and **Strapi** (Headless CMS). The project uses modern technologies to provide a clean and performant shopping experience.

Features include:

- Product listing
- Product details
- Shopping cart
- Checkout
- User authentication
- Responsive design
- Admin content management via Strapi

Open to contributions during development.

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/saidMounaim/pure-casual.git
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file in frontend folder

```bash
STRAPI_URL=
STRAPI_API_TOKEN=
NEXT_PUBLIC_STRAPI_MEDIA_URL=

```

### Backend Setup (Strapi)

1. Clone your Strapi project (if not created, create one via `npx create-strapi-app@latest`).
2. Run the Strapi backend:

```bash
npm run develop
```

3. Configure your content types:
   - Product
   - Category
   - Size
   - Order

---

## Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Strapi](https://strapi.io/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## Contribution

All kinds of contributions are welcome — please feel free to submit pull requests or open issues!
