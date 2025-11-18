# Restaunax Full-Stack Developer Technical Assessment

Welcome to the Restaunax Technical Assessment! 🍕🚀

Thank you for your interest in joining our team at Restaunax. This assessment is designed to evaluate your essential full-stack development skills within the context of our restaurant management platform.

## ⏱️ Time Expectation: 3-5 Hours

This assessment is designed to be completed in **3-5 hours**. We respect your time and have provided starter code to help you focus on implementing functionality rather than configuration.

### Recommended Time Allocation:
- **1-1.5 hours**: Backend API implementation with TypeScript
- **1.5-2 hours**: Frontend UI with Material-UI
- **30-45 minutes**: Testing, polish, and documentation
- **15-30 minutes**: Optional bonus features (if time permits)

## 🚀 Getting Started

> **⚡ Quick Start**: See [QUICKSTART.md](QUICKSTART.md) for a condensed setup guide.

### 1. Clone and Setup

```bash
# Clone this repository
git clone https://github.com/Restaunax/restaunax-technical-assessment.git
cd restaunax-technical-assessment

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Run the Application

```bash
# Terminal 1 - Run backend (from /backend directory)
npm run dev

# Terminal 2 - Run frontend (from /frontend directory)
npm run dev
```

The backend will run on `http://localhost:3000` and frontend on `http://localhost:5173`.

## 📋 The Scenario

As a developer at Restaunax, you'll be working on our restaurant management system. Your task is to implement a **Real-time Order Management Dashboard** that allows restaurant owners to view and update orders.

## ✅ Technical Requirements

**Required:**
- ✅ **TypeScript** (strict mode) for both frontend and backend
- ✅ **React** with **Material-UI** components
- ✅ **Node.js/Express** backend
- ✅ Type-safe API contracts between frontend and backend

**Data Storage (Choose One):**
- **Recommended**: Use the provided `mockOrders.ts` file (fastest setup)
- In-memory data structure
- JSON file storage
- SQLite (if you want to showcase database skills)
- PostgreSQL with Prisma (advanced, will take longer)

**Note:** We've provided starter code with mock data. You can use this for a quick implementation (3-4 hours) or replace it with a real database if you want to showcase those skills (5-6 hours).

## 🎯 Your Task

### 1. Backend API

Implement the following endpoints in `backend/src/routes/orders.ts`:

- `GET /api/orders` — List all orders (with optional status filtering)
- `GET /api/orders/:id` — Retrieve a specific order
- `PATCH /api/orders/:id` — Update order status
- `POST /api/orders` — Create a new order (for testing)

**Order Schema** (already defined in `shared/types.ts`):

| Field                 | Type                                               |
| --------------------- | -------------------------------------------------- |
| id                    | string                                             |
| customerName          | string                                             |
| customerEmail         | string                                             |
| customerPhone         | string                                             |
| customerRewardPoints  | number                                             |
| orderType             | "delivery" \| "pickup"                             |
| items                 | OrderItem[]                                        |
| status                | "pending" \| "preparing" \| "ready" \| "delivered" |
| total                 | number                                             |
| createdAt             | string (ISO format)                                |

> **💡 Data Modeling Challenge**: Notice how customer information is embedded in each order? Consider whether this is the best approach for a real-world application. How might you improve this data structure?

**Order Item Schema:**

| Field    | Type   |
| -------- | ------ |
| id       | string |
| name     | string |
| quantity | number |
| price    | number |

### 2. Frontend UI

Build a dashboard in `frontend/src/` using **React and Material-UI** that includes:

- **Orders Dashboard**: Display orders grouped or filtered by status
- **Order Details**: Show individual order information
- **Status Updates**: Allow changing order status with a dropdown or buttons
- **Responsive Design**: Works well on mobile and desktop
- **Loading States**: Handle loading and error states gracefully

### 3. Integration

- Connect your frontend to the backend API
- Ensure type safety between frontend and backend using shared types
- Handle errors appropriately (network failures, invalid data, etc.)

## 🎨 What We're Looking For

| Area                  | What We Value                                       |
| --------------------- | --------------------------------------------------- |
| **TypeScript Usage**  | Proper typing, no `any`, leveraging type inference  |
| **Code Organization** | Clean folder structure, separation of concerns      |
| **UI Implementation** | Proper use of Material-UI components                |
| **User Experience**   | Intuitive, functional, responsive interface         |
| **API Design**        | RESTful patterns, proper HTTP methods and responses |
| **Error Handling**    | Graceful handling of common errors                  |
| **Code Quality**      | Readable, maintainable code with consistent style   |

## 🌟 Bonus Points (Optional - Pick ONE if time permits)

**Only attempt these if you've completed the core requirements:**

- 🐳 **Docker**: Containerize the application with docker-compose
- 📊 **Analytics**: Add a simple dashboard with order statistics
- 🔄 **Real-time**: Implement WebSocket updates with Socket.IO
- 🎨 **UX Polish**: Exceptional UI/UX with animations and polish
- 🧪 **Testing**: Add unit/integration tests

**Note:** We value a solid implementation of core features over incomplete bonus features.

## 📦 What's Included

This starter repository includes:

```
restaunax-technical-assessment/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express server setup
│   │   ├── routes/
│   │   │   └── orders.ts         # TODO: Implement your endpoints here
│   │   └── data/
│   │       └── mockOrders.ts     # Sample data (15 orders)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # TODO: Build your UI here
│   │   ├── main.tsx
│   │   └── services/
│   │       └── api.ts            # TODO: Add API calls here
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── shared/
    └── types.ts                  # Shared TypeScript types
```

## 📤 Submission Instructions

### 1. Push to Your Own Repository

```bash
# Remove the original remote
git remote remove origin

# Create a new repository on your GitHub account
# Then add it as your remote
git remote add origin https://github.com/YOUR_USERNAME/restaunax-assessment.git

# Commit your changes
git add .
git commit -m "Complete Restaunax technical assessment"

# Push to your repository
git push -u origin main
```

### 2. Update the README

Add a section to this README with:

1. **Setup Instructions**: Clear steps to run your application
2. **Implementation Notes**: Brief overview of your approach and architecture decisions
3. **Time Spent**: Approximate hours spent on the assessment
4. **Challenges**: Any interesting problems you solved or obstacles you encountered
5. **Bonus Features**: If you implemented any, explain what and why

### 3. Share Your Repository

- Make sure your repository is **public** or invite `@Restaunax` as a collaborator
- Send us the link to your repository
- Ensure all your code is committed and pushed

### 4. What NOT to Include

- ❌ `node_modules/` folders (should be in .gitignore)
- ❌ Environment files with secrets
- ❌ Build artifacts (`dist/`, `build/`)
- ❌ IDE-specific files (`.vscode/`, `.idea/`)

## ⏰ Timeline

You have **7 days** from receiving this assessment to submit your solution. Focus on:
- ✅ Core functionality working end-to-end
- ✅ Clean, typed TypeScript code
- ✅ Functional UI with Material-UI
- ❌ Don't over-engineer or perfect every detail

## 💡 Tips for Success

1. **Start Simple**: Get the basic CRUD operations working first
2. **Use the Mock Data**: Don't spend time on database setup unless you want to showcase that skill
3. **Type Safety**: Leverage the shared types between frontend and backend
4. **Material-UI**: Use their components - don't reinvent the wheel
5. **Test Your Work**: Make sure all API endpoints work and the UI is functional
6. **Document As You Go**: Update the README while building, not at the end

## ❓ Questions?

If you have questions about the requirements, feel free to:
- Make reasonable assumptions and document them in your README
- Implement what makes sense based on your interpretation
- Explain your decision-making process in your submission

---

Good luck! We're excited to see what you build. 🚀

**Remember**: We value clean, working code over fancy features. Focus on the fundamentals, and show us how you think and code.
