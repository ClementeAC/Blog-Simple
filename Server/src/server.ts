import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

//Crear user
app.post("/signup", (req, res) => {
  const postObject = [req.body.name, req.body.email, req.body.password];

  if (!postObject[0] || !postObject[1] || !postObject[2]) {
    return res
      .status(404)
      .json({ error: { hasError: true, message: "Invalid request params" } });
  }

  connection.query(
    "INSERT INTO `users` (`id`, `userName`, `email`, `userPassword`) VALUES (NULL, ?, ?, ?)",
    postObject,
    (errorQuery, rows) => {
      if (errorQuery) {
        res
          .status(402)
          .json({ error: { hasErrors: true, message: errorQuery.message } });
      }

      return res.status(201).json({
        error: { hasErrors: false, message: null },
        message: "sucessfully created",
      });
    }
  );
});

//Buscar user
app.post("/login", (req, res) => {
  const postObject = [req.body.email, req.body.password];
  const email = req.body.email;
  const password = req.body.password;

  if (!postObject[0] || !postObject[1]) {
    return res
      .status(404)
      .json({ error: { hasError: true, message: "Invalid request params" } });
  }

  connection.query(
    "SELECT * FROM users WHERE email = ? AND userPassword = ?",
    [email, password],
    (err, result) => {
      if (err) {
      } else {
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination" });
        }
      }
    }
  );
});

//Cambiar nombre de usuario
app.post("/updatename", (req, res) => {
  const postObject = [req.body.email, req.body.userName];
  const email = req.body.email;
  const userName = req.body.userName;
  if (!postObject[0] || !postObject[1]) {
    return res
      .status(404)
      .json({ error: { hasError: true, message: "Invalid request params" } });
  }

  connection.query(
    "UPDATE users SET userName = ? WHERE email = ? ",
    [userName, email],
    (err, result) => {
      if (err) {
      } else {
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Error" });
        }
      }
    }
  );
});

//Cambiar Contrasena
app.post("/updatepassword", (req, res) => {
  const postObject = [
    req.body.email,
    req.body.oldPassword,
    req.body.updatedPassword,
  ];
  const email = req.body.email;
  const oldPassword = req.body.oldPassword;
  const updatedPassword = req.body.updatedPassword;
  if (!postObject[0] || !postObject[1]) {
    return res
      .status(404)
      .json({ error: { hasError: true, message: "Invalid request params" } });
  }

  connection.query(
    "UPDATE users SET userPassword = ? WHERE email = ? AND userPassword = ?",
    [updatedPassword, email, oldPassword],
    (err, result) => {
      if (err) {
      } else {
        if (result) {
          res.send(result);
        } else {
          res.send({ message: "Error" });
        }
      }
    }
  );
});

//Crear Post
app.post("/", (req, res) => {
  const postObject = [req.body.title, req.body.content, req.body.authorName];

  if (!postObject[0] || !postObject[1] || !postObject[2]) {
    return res
      .status(404)
      .json({ error: { hasError: true, message: "Invalid request params" } });
  }

  connection.query(
    "INSERT INTO `posts` (`id`, `title`, `content`, `likes`, `authorName`) VALUES (NULL, ?, ?, 0 , ?)",
    postObject,
    (errorQuery, rows) => {
      if (errorQuery) {
        res
          .status(402)
          .json({ error: { hasErrors: true, message: errorQuery.message } });
      }

      return res.status(201).json({
        error: { hasErrors: false, message: null },
        message: "sucessfully created",
      });
    }
  );
});

//Ver Post
app.get("/:id", (req, res) => {
  const postId = req.params.id;

  connection.query(
    "SELECT * FROM posts WHERE id = ?",
    postId,
    (errorQuery, rows) => {
      if (errorQuery) {
        res
          .status(402)
          .json({ error: { hasErrors: true, message: errorQuery.message } });
      }

      return res
        .status(201)
        .json({ error: { hasErrors: false, message: null }, data: rows[0] });
    }
  );
});

//Home todos los posts
app.get("/", (req, res) => {
  connection.query("SELECT * FROM posts", (errorQuery, rows) => {
    if (errorQuery) {
      res
        .status(402)
        .json({ error: { hasErrors: true, message: errorQuery.message } });
    }

    return res
      .status(201)
      .json({ error: { hasErrors: false, message: null }, data: rows });
  });
});

const PORT = 3333;
app.listen(process.env.PORT || PORT, () =>
  console.log(`server running at http://localhost:${PORT}`)
);
