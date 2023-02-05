const URI = {
  PREFIX: {
    API: "/api",
    AUTH: "/auth",
    USER: "/user",
    HEALTH_CHECK: "/health",
  },
  AUTH: {
    LOGIN: "/login",
    HELLO: "/hello",
    LOGOUT: "/logout",
  },
  USER: {
    GET_ONE: "/:userId",
    CREATE: "",
  },
  HEALTH_CHECK: {
    OK: "",
  },
};

export default URI;
