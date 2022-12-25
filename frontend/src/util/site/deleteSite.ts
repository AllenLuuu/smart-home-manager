import { post } from "../request";

export default async function deleteSite(siteId: string): Promise<boolean> {
  try {
    await post("/site/delete", { id: siteId }, "删除场景");
    return true;
  } catch (error: any) {
    return false;
  }
}
