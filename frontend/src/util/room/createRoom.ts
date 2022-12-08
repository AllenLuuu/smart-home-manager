import { post } from "../request";

export default async function createRoom(siteId: string, name: string, picture?: string) {
  try {
    await post(
      "/room/create",
      {
        siteId,
        name,
        picture,
      },
      "创建房间"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}