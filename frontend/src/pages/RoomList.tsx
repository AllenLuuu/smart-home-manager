import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CList from "../components/CList";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import getRoomList from "../util/room/getRoomList";
import { useCurrentSiteStore } from "../store/index";

export default function RoomList() {
  const navigate = useNavigate();
  const [RoomList, setRoomList] = useState<Room[]>([]);

  const currentSite = useCurrentSiteStore((state) => state.currentSite)!;

  async function getList(searchText:string) {
    const list = await getRoomList(currentSite._id, searchText);
    setRoomList(list);
  }

  useEffect(() => {
    getList("");
  }, []);

  const toRoom = (room: Room) => {
    navigate(`/room/${room.name}`);
  }

  return (
    <>
      <NavBar
        name="房间列表"
        backAction={() => navigate("/site/list")}
        showAdd
        addAction={() => navigate("/room/add")}
      >
        <SearchBox placeholder="搜索场景" search={getList}></SearchBox>
        <CList list={RoomList} keyProp={"name"} action={toRoom} />
      </NavBar>
    </>
  );
}
