# Simple Queuing

A lightweight queue management app for multiple transaction types. Staff can create queues, view current numbers, and advance the line; clients can get a queue number for their chosen transaction type. Built with React, TypeScript, Vite, and Ant Design.

## How to run

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Install and start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start development server       |
| `npm run build`| Type-check and production build|
| `npm run preview` | Preview production build    |
| `npm run lint` | Run ESLint                     |

## How it works

### Routes

| Path                         | Purpose                                      |
|-----------------------------|----------------------------------------------|
| `/`                         | Queue dashboard – view and manage all types  |
| `/client`                   | Client form – get a queue number             |
| `/transaction-type-management` | Add and manage transaction types        |
| `/transaction/:type`        | Full-screen view for one transaction type   |

### User flow

1. **Staff – set up queues**  
   Go to **Transaction Type Management** (`/transaction-type-management`), add transaction types (e.g. “Withdrawal”, “Deposit”). Each type has its own queue.

2. **Clients – get a number**  
   Go to **Client** (`/client`), choose a transaction type and enter their name. They receive a queue number and see it in a modal.

3. **Staff – run the queue**  
   On the **dashboard** (`/`), staff see one card per transaction type with the current number and next client. They can:
   - Click **Next** to call the next person.
   - Click **Reset** to clear that queue.
   - Click the transaction type to open the **full-screen view** (`/transaction/:type`) for a larger display.

### Data

Queue state (transaction types, client lists, current numbers) is stored in the **browser** via Zustand with persistence (e.g. localStorage). No backend or database is required.

### Tech stack

- **React 18** + **TypeScript**
- **Vite** – dev server and build
- **Ant Design** – UI components and theming
- **Zustand** – state and persistence
- **React Router** – routing
- **Zod** – schema and validation
