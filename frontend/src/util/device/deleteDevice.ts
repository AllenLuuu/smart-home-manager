import { post } from "../request";

export default async function deleteDevice(
  roomId: string,
  deviceId: string
): Promise<boolean> {
  try {
    await post(
      "/device/delete",
      {
        roomId,
        deviceId,
      },
      "删除设备"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}
