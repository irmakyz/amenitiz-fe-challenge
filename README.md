# ♟️ Chess Grandmasters Wiki

A modern web application to explore Chess Grandmasters using the [Chess.com API](https://www.chess.com/news/view/published-data-api). Built with **Next.js 15**, **React 19**, and **Tailwind CSS**. This app is optimized for performance, accessibility, and developer experience.

---

## 🚀 Features

- 🔍 **Browse Chess Grandmasters**  
  Displays a paginated, responsive grid of popular chess players.

- 🧑‍💼 **Profile Pages with Stats**  
  Each player has a detail page including avatar, location, join date, status, and chess ratings (Blitz, Rapid, Bullet, Daily).

- ⚙️ **Server-Side Rendering (SSR)**  
  Profiles and homepage are server-rendered using `getServerSideProps`-like logic and `@tanstack/react-query`.

- 🧼 **Accessibility (a11y)**  
  All interactive elements use appropriate ARIA roles and semantic HTML. Focus outlines, alt texts, and live regions are used where relevant.

- 💤 **Code Splitting + Lazy Loading**  
  Non-critical components like `<GrandmasterItem>`, `<ProfileCard>`, and `<Tabs>` are loaded lazily for better initial load performance. React memoization is used for preventing unnecessary rerendering.

- 💅 **Dark Mode Ready**  
  Styled with Tailwind's `dark:` classes.

- 🧪 **Unit Tests**  
  All key components tested with **Jest** and **React Testing Library**.


## 🧰 Tech Stack

| Tech               | Description                                |
|--------------------|--------------------------------------------|
| **Next.js 15**     | App Router, SSR, Image Optimization         |
| **React 19**       | Concurrent UI, stable suspense              |
| **Tailwind CSS**   | Utility-first styling                       |
| **TanStack Query** | Data fetching, caching, and hydration       |
| **Jest**           | Unit testing                                |
| **Testing Library**| React tests and accessibility assertions    |

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run all tests
npm test

```
## ✅ Accessibility Highlights
- aria-label, role, and semantic tags used for screen reader support.

- aria-live regions for loading states and pagination.

- Keyboard-accessible buttons and links.

- alt text provided for all images (including next/image).

- Focus outlines maintained for keyboard users.

## ⚙️ Testing

Unit testing is done with jest, React Testing Library

