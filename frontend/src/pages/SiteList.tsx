import { useEffect, useState } from "react";
import CList from "../components/CList";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import getSiteList from "../util/getSiteList";

export default function SiteList() {
  const [SiteList, setSiteList] = useState([]);

  async function getList(searchText: string) {
    const list = await getSiteList(searchText);
    setSiteList(list);
  }

  useEffect(() => {
    getList("");
  }, []);

  return (
    <>
      <NavBar name="场景列表" addAction={() => {}}>
        <SearchBox placeholder="搜索场景" search={getList}></SearchBox>
        <CList list={SiteList} keyProp={"name"} action={() => {}} />
      </NavBar>
    </>
  );
}
