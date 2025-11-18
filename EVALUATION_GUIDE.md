# Evaluation Guide for Restaunax Technical Assessment

This guide helps you evaluate candidate submissions consistently and fairly.

## Overview

This assessment tests candidates on:
- TypeScript proficiency (both frontend and backend)
- RESTful API development with Express
- React UI development with Material-UI
- Code organization and architecture
- Problem-solving and decision-making

**Expected Time**: 3-5 hours
**Minimum Passing**: Core requirements completed with clean, working code

---

## Evaluation Rubric

### 1. Core Functionality (40 points)

**Backend API (20 points)**
- [ ] GET /api/orders endpoint works (5 pts)
- [ ] GET /api/orders/:id endpoint works (4 pts)
- [ ] PATCH /api/orders/:id endpoint works (6 pts)
- [ ] POST /api/orders endpoint works (5 pts)

**Frontend UI (20 points)**
- [ ] Orders are displayed in a clear layout (5 pts)
- [ ] Order status can be updated via UI (8 pts)
- [ ] Filtering by status works (4 pts)
- [ ] UI is responsive and usable (3 pts)

### 2. TypeScript Usage (20 points)

- [ ] Strict typing throughout (no `any` types) (8 pts)
- [ ] Proper use of shared types (5 pts)
- [ ] Type-safe API calls (4 pts)
- [ ] Good use of TypeScript features (interfaces, types, etc.) (3 pts)

**Red flags:**
- Excessive use of `any` or `@ts-ignore`
- Type definitions missing or incorrect
- Not using the shared types

### 3. Code Quality (20 points)

- [ ] Clean, readable code with consistent style (6 pts)
- [ ] Good separation of concerns (5 pts)
- [ ] Error handling implemented (5 pts)
- [ ] Code is maintainable and well-organized (4 pts)

**Look for:**
- Meaningful variable/function names
- Appropriate file organization
- Error boundaries and validation
- Loading states handled

**Red flags:**
- Messy, inconsistent code
- No error handling
- Everything in one file
- Copy-pasted code without understanding

### 4. User Experience (10 points)

- [ ] Intuitive UI design (3 pts)
- [ ] Loading states shown (2 pts)
- [ ] Error messages displayed (2 pts)
- [ ] Smooth interactions (3 pts)

### 5. Documentation (10 points)

- [ ] README updated with setup instructions (3 pts)
- [ ] Implementation approach explained (3 pts)
- [ ] Time spent and challenges documented (2 pts)
- [ ] Code comments where needed (2 pts)

---

## Bonus Features (Extra Credit)

These are not required but show initiative and skill:

- **Docker containerization** (+5 pts)
- **Real-time updates with WebSockets** (+8 pts)
- **Order statistics dashboard** (+5 pts)
- **Exceptional UI/UX polish** (+5 pts)
- **Testing (unit/integration tests)** (+10 pts)
- **Database integration (Prisma/PostgreSQL)** (+5 pts)

---

## Scoring Guide

**90-100 points**: Exceptional candidate - Strong hire
- All core features work perfectly
- Clean, professional TypeScript code
- Great UX with proper error handling
- Clear documentation
- May include impressive bonus features

**75-89 points**: Strong candidate - Hire
- Core features fully functional
- Good TypeScript usage with minor issues
- Decent UX and error handling
- Documentation complete

**60-74 points**: Adequate candidate - Consider
- Most core features work
- TypeScript used but with some issues
- Basic UX, some error handling
- May need more experience but shows potential

**Below 60 points**: Not recommended
- Core features incomplete or broken
- Poor TypeScript usage or understanding
- Significant code quality issues
- Incomplete submission

---

## Red Flags (Automatic Rejection Considerations)

- ❌ **Plagiarism**: Code obviously copied without understanding
- ❌ **No TypeScript**: Submitted JavaScript instead
- ❌ **Doesn't run**: Application crashes or won't start
- ❌ **No attempt**: Empty or minimal effort
- ❌ **Wrong tech stack**: Didn't use required technologies

---

## Interview Questions Based on Submission

Use their submission to guide technical interview questions:

### Architecture Questions
- "Walk me through your project structure and why you organized it this way"
- "How did you handle state management in your React app?"
- "What data storage approach did you choose and why?"

### TypeScript Questions
- "Why did you choose these specific types for your Order interface?"
- "How did you ensure type safety between frontend and backend?"
- "What challenges did you face with TypeScript during this assessment?"

### Problem-Solving Questions
- "What was the most challenging part of this assessment?"
- "If you had more time, what would you improve?"
- "How would you add authentication to this system?"
- "How would you scale this for production with thousands of orders?"

### Code-Specific Questions
- Point to a specific function: "Can you explain what this code does?"
- "I see you implemented X feature - why did you choose that approach?"
- "What edge cases did you consider when building the status update feature?"

---

## Quick Evaluation Checklist

Use this for rapid first-pass review:

**Does it run?**
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can see orders in the UI

**Does it work?**
- [ ] Can view all orders
- [ ] Can update order status
- [ ] Changes persist (in session)
- [ ] No console errors

**Is it TypeScript?**
- [ ] .ts/.tsx files used
- [ ] Types imported from shared/types.ts
- [ ] No obvious `any` types

**Is it clean?**
- [ ] Code is readable
- [ ] UI looks presentable
- [ ] README is updated

If all boxes checked → Proceed with full evaluation
If missing critical items → Consider rejection or request fixes

---

## Time Investment Analysis

Pay attention to how candidates spent their time:

**Good time management:**
- 3-5 hours total, core features complete
- Extra time on polish and bonus features
- Under 5 hours with excellent quality = Strong candidate

**Concerning patterns:**
- >8 hours with minimal functionality = May struggle with deadlines
- <2 hours with incomplete features = Didn't take it seriously
- Spent all time on bonus, core incomplete = Poor prioritization

---

## Sample Feedback Templates

### Strong Candidate
```
Thank you for your submission! Your implementation demonstrates strong
TypeScript skills and clean architecture. We were particularly impressed
by [specific feature]. We'd like to schedule a technical interview to
discuss your approach further.
```

### Good Candidate (Minor Issues)
```
Thank you for your submission. Your core implementation is solid, though
we noticed [specific issue]. We'd like to discuss your approach in a
technical interview and explore how you would address [specific scenario].
```

### Not Moving Forward
```
Thank you for taking the time to complete our assessment. While we
appreciate your effort, we're looking for candidates with stronger
[specific area] skills at this time. We encourage you to apply again
as you gain more experience with [technology].
```

---

## Notes

- Be consistent: Evaluate all candidates with the same rubric
- Consider context: First-time Material-UI users may have rougher UI
- Focus on fundamentals: Clean code > fancy features
- Look for growth: Good candidates learn from challenges

**Remember**: This assessment tests real-world skills they'll use daily at Restaunax. Prioritize candidates who show clean TypeScript code, good architecture, and ability to complete requirements over those who add flashy features but miss the basics.
