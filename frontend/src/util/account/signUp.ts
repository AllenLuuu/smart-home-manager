import { post } from "../request";

export default async function signUp(
  username: string,
  password: string,
  phone: number,
) {
  try {
    await post(
      "/account/signUp",
      {
        username,
        password,
        phone,
      },
      "注册"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}