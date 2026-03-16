import express from "express";
import { neon } from "@neondatabase/serverless";

const app = express();
const port = process.env.PORT || 3000;

// Neon DB 연결
const sql = neon(process.env.DATABASE_URL);

app.get("/", async (req, res) => {
  try {

    // test 테이블 첫 행 가져오기
    const result = await sql`
      SELECT name FROM test
      ORDER BY id
      LIMIT 1
    `;

    const name = result[0].name;

    res.send(`HELLO ${name}`);

  } catch (error) {
    console.error(error);
    res.status(500).send("DB error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
