import { post } from "../request";

export default async function createSite(name: string) {
  try {
    await post(
      "/site/create",
      {
        name,
      },
      "创建场景"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}