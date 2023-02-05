const Query = {
  User: {
    Create: "INSERT INTO users (name, password) VALUES (?, ?)",
  },
};

export default Query;
