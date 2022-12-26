import { post } from "../request";

export default async function updatePicture(
  roomId: string,
  picture: string
): Promise<boolean> {
  try {
    await post(
      "/room/update-picture",
      {
        roomId,
        picture,
      },
      "上传图片"
    );
    return true;
  } catch (e) {
    return false;
  }
}
