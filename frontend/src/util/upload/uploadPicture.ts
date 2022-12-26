import { post } from "../request";

export default async function uploadPicture(file: any) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await post("/upload/picture", formData, "上传图片");
    return response.data;
  } catch (error: any) {
    return "error";
  }
}
