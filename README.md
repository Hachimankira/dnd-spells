# D&D 5e Spells App

A React + TypeScript application that lets users browse, search, and view details about Dungeons & Dragons 5th edition spells. Users can also save their favorite spells locally.

---

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone git@github.com:Hachimankira/dnd-spells.git
   cd dnd-spells
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173
   ```

---

## 📖 Features

* View a list of all available spells.
* Search and filter spells by name.
* View detailed spell information (casting time, range, components, duration, description, higher-level effects, and classes).
* Save and view favorite spells (persisted locally in `localStorage`).

---

## 📸 Screenshots

### Main Spell List
![Main Spell List](./screenshots/spell-list.png)
*Browse all available D&D 5e spells with search functionality*

### Spell Details
![Spell Detail Page](./screenshots/spell-detail.png)
*Detailed view showing all spell information and casting requirements*

### Favorites
![Favorites View](./screenshots/favorites.png)
*Save and manage your favorite spells*
---

## 📚 References

* **API Documentation:** [5e Spells API Docs](https://5e-bits.github.io/docs/tutorials)
* **Design Inspiration:** [Official D&D Spellbook Cards](https://dnd.gf9games.com/gameAcc/tabid/87/entryid/126/spellbook-cards-druid-73917.aspx)

---

## ⚠️ Known Limitations / Assumptions

* Favorites are stored in `localStorage` and are not synced across devices.
* Basic search is limited to spell names only (no advanced filtering).

---

## 🛠️ Tech Stack

* **Frontend:** React 18+ with TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **API:** D&D 5e API (dnd5eapi.co)
* **Build Tool:** Vite
* **Storage:** Browser local storage for favorites

---

## 📂 Project Structure

```
src/
├── components/          # React components
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── pages/               # Pages rendered from app.tsx
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```