import { post } from "./request";

export default async function logout() {
  try {
    await post("/account/logout", {}, "登出");
    return true;
  } catch (error: any) {
    return false;
  }
}