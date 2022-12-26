import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CList from "../components/CList";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import getRoomList from "../util/room/getRoomList";
import { useCurrentRoomStore, useCurrentSiteStore } from "../store/index";
import deleteRoom from "../util/room/deleteRoom";

export default function RoomList() {
  const navigate = useNavigate();
  const [RoomList, setRoomList] = useState<Room[]>([]);

  const currentSite = useCurrentSiteStore((state) => state.currentSite)!;
  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);
  const deleteCurrentSite = useCurrentSiteStore((state) => state.deleteCurrentSite);

  async function getList(searchText: string) {
    const list = await getRoomList(currentSite._id, searchText);
    setRoomList(list);
  }

  useEffect(() => {
    getList("");
  }, []);

  const toRoom = (room: Room) => {
    setCurrentRoom(room);
    navigate(`/room/${room.name}`);
  };

  return (
    <>
      <NavBar
        name="房间列表"
        backAction={() => {
          deleteCurrentSite();
          navigate("/site/list");
        }}
        showAdd
        addAction={() => navigate("/room/add")}
      >
        <SearchBox placeholder="搜索场景" search={getList}></SearchBox>
        <CList
          list={RoomList}
          keyProp={"name"}
          action={toRoom}
          deleteAction={async (id: string) => {
            await deleteRoom(currentSite._id, id);
            getList("");
          }}
        />
      </NavBar>
    </>
  );
}
