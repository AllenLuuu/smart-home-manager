import { post } from "../request";

export default async function login(username: string, password: string) {
  try {
    await post(
      "/account/login",
      {
        username,
        password,
      },
      "登录"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}
