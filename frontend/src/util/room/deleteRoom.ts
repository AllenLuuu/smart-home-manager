import { post } from "../request";

export default async function deleteRoom(
  siteId: string,
  roomId: string
): Promise<boolean> {
  try {
    await post("/room/delete", { siteId, roomId }, "删除房间");
    return true;
  } catch (error: any) {
    return false;
  }
}
