# 🏗️ Fyndwork

> **Experience. Exposure. Execution.**  
> Fyndwork is a platform connecting students to companies through real-world micro-tasks, freelance gigs, and internships.

---

## 📌 MVP Summary

**Fyndwork** breaks the “no experience = no job” cycle by:

- Allowing **companies to post real-world tasks**
- Letting **students gain experience + feedback**
- Rewarding **certificates & stipends** on task approval

---

## 🚀 Tech Stack

| Layer        | Technology                      |
|-------------|----------------------------------|
| Language     | TypeScript                      |
| Backend      | Node.js, Express.js             |
| Database     | MongoDB Atlas (Mongoose)        |
| Auth         | JWT (access + refresh tokens)   |
| Validation   | Zod                             |
| Logging      | Winston (console + MongoDB)     |
| Dev Tools    | Nodemon, ts-node-dev            |

---

## 📁 Folder Structure

```bash
fyndwork/
├── client/ # (Will hold frontend - React app)
└── server/
├── src/
│ ├── config/ # DB, constants
│ ├── controllers/ # Route handlers
│ ├── middlewares/ # Error handling, auth, rate limiting
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── schemas/ # Zod validation schemas
│ ├── services/ # Business logic
│ ├── utils/ # Logger, constants
│ ├── seeders/ # Dev seed data
│ ├── app.ts # Express setup
│ └── index.ts # Entry point
├── .env.example
├── tsconfig.json
└── package.json
```


---

## ⚙️ Getting Started

### 1️⃣ Clone and Install
```bash
git clone https://github.com/your-org/fyndwork.git
cd fyndwork/server
npm install
cp .env.example .env
```

## 🤝 Contributing
### Workflow
- Create an issue (feature, bug, enhancement)
- Branch off: git checkout -b feature/<name>
- Follow Conventional Commits
- Create a pull request referencing the issue
- Review & merge!
