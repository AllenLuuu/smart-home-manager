import { post } from "../request";

export default async function getRoomList(siteId: string, searchText: string): Promise<Room[]> {
  try {
    const response = await post(
      "/room/list",
      {
        siteId,
        searchText,
      },
      "获取场景列表"
    );
    return response.data;
  } catch (error: any) {
    return [];
  }
}