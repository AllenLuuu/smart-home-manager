import { post } from "./request";

export default async function getSiteList(searchText: string) {
  try {
    const response = await post(
      "/site/list",
      {
        searchText,
      },
      "获取站点列表"
    );
    return response.data;
  } catch (error: any) {
    return [];
  }
}