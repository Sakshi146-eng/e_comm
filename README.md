# E-commerce Product Catalog

This project is a small, full-stack e-commerce catalog built using **Next.js 14 App Router** and **TypeScript**. Its primary purpose is to demonstrate proficiency in various data fetching and rendering strategies: **SSG, ISR, SSR, and CSR**.

### Submission Details

*Created by: Sakshi Shetty on October 31, 2025*

-----

## 🚀 Setup and Running the Project

### Prerequisites

  * Node.js (v18+)

### Installation Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Sakshi146-eng/e_comm
    cd e_comm
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named **`.env.local`** in the root directory and add your secret keys and MongoDB connection string:

    ```bash
    # .env.local

    # Secret key used for authenticating API POST/PUT requests (must be entered on /admin page)
    ADMIN_API_KEY=your-secret-key-here

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open your browser to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to view the application.

-----

## 📄 Rendering Strategy Overview

The project leverages four different rendering methods to optimize performance and data freshness for specific routes.

| Route | Strategy | Rationale | Data Source |
| :--- | :--- | :--- | :--- |
| **`/` (Home Page)** | **Static Site Generation (SSG)** | Pages are rendered once at **build time**. This provides instant load times (fastest performance) for the main product list, which is viewed by all users. | MongoDB (Server Fetched) |
| **`/products/[slug]`** | **Incremental Static Regeneration (ISR)** | The page is pre-rendered statically, but includes `export const revalidate = 60;`. This means the page updates automatically in the background (after 60 seconds) to show recent changes in price or inventory, balancing speed with freshness. | MongoDB (Server Fetched) |
| **`/dashboard`** | **Server-Side Rendering (SSR)** | Uses `export const dynamic = 'force-dynamic'` to ensure the page is rendered **on every request**. This is essential for the Inventory Dashboard, which must show guaranteed real-time statistics like low stock alerts. | MongoDB (Server Fetched) |
| **`/admin`** | **Client-Side Rendering (CSR)** | The page skeleton is sent first, and data is fetched and rendered via browser JavaScript (`useEffect` and `fetch`) **after the page loads**. This is ideal for highly interactive, authenticated pages with forms and CUD (Create, Update, Delete) functionality. | Next.js API Routes (`/api/products`) |
| **`/recommendations` (Bonus)** | **Hybrid (Server/Client)** | Demonstrates the modern architecture: the data is fetched securely on the **Server**, and the interactive `AddToWishlist` button is a **Client Component** managing persistence via `localStorage`. | MongoDB (Server Fetched) |

-----

## 🔐 Backend API Routes

The API routes are built using Next.js Route Handlers and enforce security for administrative actions:

| Method | Endpoint | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieves all products. | None |
| `GET` | `/api/products/[slug]` | Retrieves a single product by its slug. | None |
| `POST` | `/api/products` | Adds a new product to the database. | Required (`x-api-key` header) |
| `PUT` | `/api/products/[slug]` | Updates an existing product (e.g., inventory or price). | Required (`x-api-key` header) |
