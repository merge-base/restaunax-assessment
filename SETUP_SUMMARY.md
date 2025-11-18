# Setup Summary - Restaunax Technical Assessment

This document summarizes the starter repository setup for the hiring manager.

## What's Been Created

This repository is now a **complete starter template** that candidates can clone and immediately start coding. No database setup, no complex configuration - just `npm install` and start building.

### Project Structure

```
restaunax-technical-assessment/
├── README.md                      # Main instructions (updated)
├── QUICKSTART.md                  # Fast setup guide for candidates
├── EVALUATION_GUIDE.md            # Your evaluation rubric (private)
├── .gitignore                     # Configured for Node.js projects
│
├── backend/                       # Express + TypeScript backend
│   ├── package.json              # Dependencies configured
│   ├── tsconfig.json             # TypeScript strict mode
│   └── src/
│       ├── index.ts              # ✅ Express server ready to run
│       ├── routes/
│       │   └── orders.ts         # 🔨 Candidates implement endpoints here
│       └── data/
│           └── mockOrders.ts     # ✅ 15 sample orders ready
│
├── frontend/                      # React + TypeScript + Vite
│   ├── package.json              # Dependencies configured
│   ├── tsconfig.json             # TypeScript strict mode
│   ├── vite.config.ts            # Vite configured
│   ├── index.html                # Entry point
│   └── src/
│       ├── main.tsx              # ✅ React + Material-UI setup
│       ├── App.tsx               # 🔨 Candidates build UI here
│       └── services/
│           └── api.ts            # 🔨 Candidates add API calls here
│
└── shared/
    └── types.ts                  # ✅ TypeScript types for both sides
```

**Legend:**
- ✅ Ready to use (no changes needed)
- 🔨 Candidates implement these

---

## What Candidates Need to Do

### 1. Backend (1-1.5 hours)
Implement in `backend/src/routes/orders.ts`:
- `GET /api/orders` - List orders with optional status filter
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id` - Update order status

**Provided:**
- Express server configured and ready
- 15 mock orders with diverse data
- TypeScript types defined
- CORS enabled

**They choose:**
- Use mock data (fastest - 3-4 hours total)
- Implement JSON file storage
- Use SQLite or PostgreSQL (5-6 hours total)

### 2. Frontend (1.5-2 hours)
Build in `frontend/src/App.tsx`:
- Display orders in a dashboard
- Filter orders by status
- Update order status
- Responsive design with Material-UI

**Provided:**
- React + Vite configured
- Material-UI installed and themed
- API service skeleton
- TypeScript strict mode

### 3. Integration (30-45 minutes)
- Connect frontend to backend
- Implement API calls in `api.ts`
- Test end-to-end functionality
- Update README with their notes

---

## Key Features of This Setup

### ✅ Time-Saving Elements

1. **No Database Required**: Mock data provided, database optional
2. **TypeScript Configured**: Strict mode, tsconfig ready
3. **Clear TODO Comments**: Candidates know exactly what to implement
4. **Type Definitions**: Shared types eliminate guesswork
5. **Dependencies Listed**: All packages specified, just `npm install`

### ✅ Tests Real Skills

Even with shortcuts, this still evaluates:
- TypeScript proficiency (strict mode enforced)
- Express API development
- React + Material-UI
- State management
- Error handling
- Code organization
- Problem-solving

### ✅ Flexible Difficulty

Candidates can choose their level:
- **Fast track (3-4 hrs)**: Use mock data, basic UI
- **Standard (4-5 hrs)**: Add file storage, better UX
- **Advanced (5-6 hrs)**: Database, real-time, testing

---

## Before Sending to Candidates

### 1. Remove Private Files

Before pushing to GitHub, delete or gitignore:
- `EVALUATION_GUIDE.md` (your evaluation rubric)
- `SETUP_SUMMARY.md` (this file)
- `.claude/` folder (Claude AI settings)

```bash
# Add to .gitignore
echo "EVALUATION_GUIDE.md" >> .gitignore
echo "SETUP_SUMMARY.md" >> .gitignore
echo ".claude/" >> .gitignore
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Initial starter template for technical assessment"
git push origin main
```

### 3. Make Repository Public

In GitHub settings, make the repository public so candidates can clone it.

### 4. Update README Clone URL

If needed, update the clone URL in README.md to match your GitHub repository URL.

---

## Sending to Candidates

### Email Template

```
Subject: Restaunax Technical Assessment

Hi [Candidate Name],

Thank you for your interest in the Full-Stack Developer position at Restaunax!

We'd like to invite you to complete our technical assessment. This is designed
to take 3-5 hours and tests the core technologies you'll work with daily.

Repository: https://github.com/Restaunax/restaunax-technical-assessment

Instructions:
1. Clone the repository and follow the setup in README.md
2. Complete the core requirements (backend API + frontend dashboard)
3. Push your solution to your own GitHub repository
4. Send us the link within 7 days

The repository includes:
- Pre-configured TypeScript setup for both frontend and backend
- 15 sample orders for testing
- Clear TODO comments showing what to implement
- All dependencies listed

We value clean, working code over fancy features. Focus on:
- TypeScript best practices
- RESTful API design
- Material-UI components
- Code organization

Questions? Feel free to make reasonable assumptions and document them in
your README.

Looking forward to seeing your solution!

Best regards,
[Your Name]
Restaunax Team
```

---

## Candidate Evaluation

Use `EVALUATION_GUIDE.md` for consistent evaluation. Key areas:

1. **Core Functionality (40 pts)**: Do the features work?
2. **TypeScript Usage (20 pts)**: Proper typing, no `any` abuse
3. **Code Quality (20 pts)**: Clean, organized, maintainable
4. **User Experience (10 pts)**: Loading states, errors, polish
5. **Documentation (10 pts)**: Updated README, clear notes

**Passing Score**: 75+ points
**Strong Hire**: 90+ points

---

## What's Different from Original Assessment

### Before (Your Original):
❌ Candidates set up database from scratch
❌ Configure TypeScript themselves
❌ No starter code
❌ Could take 8-12 hours

### After (This Version):
✅ Database optional, mock data provided
✅ TypeScript configured (strict mode)
✅ Starter code with TODOs
✅ Takes 3-5 hours

### Still Tests:
✅ TypeScript skills
✅ Express/React knowledge
✅ API design
✅ UI development
✅ Problem-solving
✅ Code quality

---

## Next Steps

1. **Review**: Check all files match your requirements
2. **Test**: Run `npm install` and `npm run dev` in both folders to verify
3. **Clean**: Remove EVALUATION_GUIDE.md and SETUP_SUMMARY.md
4. **Push**: Commit and push to GitHub
5. **Share**: Send repository link to candidates

---

## Questions or Modifications?

Common modifications you might want:

**Make it easier:**
- Provide more example code
- Include sample API implementations
- Add more hints in comments

**Make it harder:**
- Require database implementation
- Add authentication requirement
- Require testing

**Adjust scope:**
- Add/remove features
- Change time expectation
- Modify tech stack

---

**Repository is ready to use!** Candidates can clone and start coding in under 5 minutes.
