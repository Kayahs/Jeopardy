exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "jeopardy"."users" (
      "id" SERIAL PRIMARY KEY,
      "fullname" TEXT,
      "email" TEXT UNIQUE NOT NULL,
      "password" TEXT NOT NULL
    );
  `),
    //2. Quizzes Table
    pgm.sql(`
    CREATE TABLE "jeopardy"."quizzes" (
      "id" SERIAL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "owner_id" INTEGER REFERENCES users(id)
    );
  `),
    //3. Categories Table
    pgm.sql(`
    CREATE TABLE "jeopardy"."categories" (
      "id" SERIAL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "quiz_id" INTEGER REFERENCES quizzes(id) NOT NULL
    );
  `),
    //4. Questions Table
    pgm.sql(`
      CREATE TABLE "jeopardy"."questions" (
        "id" SERIAL PRIMARY KEY,
        "category_id" INTEGER REFERENCES categories(id) NOT NULL,
        "quiz_id" INTEGER REFERENCES quizzes(id) NOT NULL,
        "question" TEXT NOT NULL,
        "answer" TEXT NOT NULL,
        "points" INTEGER NOT NULL
      );
  `)
}
