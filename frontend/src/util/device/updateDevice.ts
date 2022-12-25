import { post } from "../request";

export default async function updateDevice(
  id: string,
  states: { [key: string]: any }
): Promise<boolean> {
  try {
    await post(
      "/device/update",
      {
        id,
        states,
      },
      "更新设备状态"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}
