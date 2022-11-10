import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const ping = async () => {
  const response = await request.get("/ping");
  console.log(response.data);
}

const login = (username: string, password: string) => {
  return request.post("/account/login", {
    username,
    password,
  });
};

export default {
  ping,
  login,
};
