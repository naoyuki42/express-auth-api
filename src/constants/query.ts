const Query = {
  User: {
    GetOne: "SELECT id, name FROM users WHERE id = ?",
    Create: "INSERT INTO users (name, password) VALUES (?, ?)",
  },
};

export default Query;
