import { post } from "../request";

export default async function deletePicture(path: string): Promise<boolean> {
  try {
    await post("/upload/picture/delete", { path }, "删除图片");
    return true;
  } catch (e) {
    return false;
  }
}
