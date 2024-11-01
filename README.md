About Project

LearnEase is the Smart LMS System, which offers Chapter Wise Course playback and AI Quiz Generation and Grading.

### Prerequisites

**Node version 18.x.x**

### Install packages

```shell
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
DATABASE_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TEACHER_ID=
```



### Setup Prisma

Add Postgres Database

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```
