import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CList from "../components/CList";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import getSiteList from "../util/getSiteList";

export default function SiteList() {
  const navigate = useNavigate();
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
      <NavBar name="场景列表" showAdd addAction={() => navigate("/site/add")}>
        <SearchBox placeholder="搜索场景" search={getList}></SearchBox>
        <CList list={SiteList} keyProp={"name"} action={() => {}} />
      </NavBar>
    </>
  );
}
