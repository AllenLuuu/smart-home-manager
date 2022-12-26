import { post } from "../request";

export default async function setDeviceLocation(
  id: string,
  location: {
    x: number;
    y: number;
  }
): Promise<boolean> {
  try {
    await post(
      "/device/set-location",
      {
        id,
        location,
      },
      "更新设备位置"
    );
    return true;
  } catch (error: any) {
    return false;
  }
}
