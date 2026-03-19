#1. 회원가입

app.use(express.json());

app.post("/signup", async (req, res) => {

  const { id, pw, name } = req.body;

  try {

    await sql`
      INSERT INTO account (id, pw, name)
      VALUES (${id}, ${pw}, ${name})
    `;

    res.send("회원가입이 완료되었습니다");

  } catch (e) {
    console.error(e);
    res.status(500).send("에러");
  }

});

#2. 로그인

app.post("/login", async (req, res) => {

  const { id, pw } = req.body;

  const result = await sql`
    SELECT * FROM account
    WHERE id = ${id}
  `;

  // 유저 없음
  if (result.length === 0) {
    return res.status(400).send("아이디 없음");
  }

  // 비밀번호 틀림
  if (result[0].pw !== pw) {
    return res.status(400).send("비밀번호 틀림");
  }

  // 성공
  res.send("로그인 성공");

});

