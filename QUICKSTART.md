# Quick Start Guide

This guide will help you get up and running in under 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Your favorite code editor

## Setup (2 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/Restaunax/restaunax-technical-assessment.git
cd restaunax-technical-assessment

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

## Run the Application (1 minute)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
You should see: `🚀 Server is running on http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
You should see: Frontend running on `http://localhost:5173`

## Test the Setup

1. Open your browser to `http://localhost:5173`
2. You should see the starter template with TODO instructions
3. Test the backend health check: `http://localhost:3000/health`

## What to Build

Your main tasks are:

### Backend (`backend/src/routes/orders.ts`)
- Implement 4 API endpoints (GET, POST, PATCH)
- Use the provided mock data or implement your own storage
- Ensure proper TypeScript typing

### Frontend (`frontend/src/App.tsx`)
- Build an order management dashboard
- Display orders with Material-UI components
- Add status filtering and updating functionality
- Implement API calls in `frontend/src/services/api.ts`

## Tips

- **Types are your friend**: Check `shared/types.ts` for all type definitions
- **Mock data is ready**: See `backend/src/data/mockOrders.ts` for 15 sample orders
- **Start simple**: Get basic CRUD working before adding extras
- **Material-UI docs**: https://mui.com/material-ui/getting-started/

## File Structure

```
.
├── backend/
│   ├── src/
│   │   ├── index.ts              ✅ Server configured
│   │   ├── routes/orders.ts      🔨 IMPLEMENT THIS
│   │   └── data/mockOrders.ts    ✅ 15 sample orders ready
│   └── package.json              ✅ Dependencies configured
├── frontend/
│   ├── src/
│   │   ├── App.tsx               🔨 BUILD YOUR UI HERE
│   │   ├── main.tsx              ✅ React + MUI configured
│   │   └── services/api.ts       🔨 ADD API CALLS HERE
│   └── package.json              ✅ Dependencies configured
└── shared/
    └── types.ts                  ✅ Shared types for both ends
```

## Common Issues

**Port already in use?**
- Backend: Change port in `backend/src/index.ts`
- Frontend: Change port in `frontend/vite.config.ts`

**TypeScript errors?**
- Make sure you're importing types from `../../shared/types`
- Run `npm install` in both directories

**Can't connect to API?**
- Check backend is running on port 3000
- Verify CORS is enabled (already configured)
- Check browser console for errors

## Need Help?

- Check the main [README.md](README.md) for detailed requirements
- Review the TypeScript types in `shared/types.ts`
- Look at the mock data structure in `backend/src/data/mockOrders.ts`

---

**Ready? Start coding!** ⏱️ Remember: 3-5 hours total.
