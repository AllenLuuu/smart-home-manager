import { post } from "../request";

export default async function getDeviceList(roomId: string, searchText: string): Promise<Device[]> {
  try {
    const response = await post(
      "/device/list",
      {
        roomId,
        searchText,
      },
      "获取设备列表"
    );
    return response.data;
  } catch (error: any) {
    return [];
  }
}