import { Accordion } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceItem from "../components/DeviceItem";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import { useCurrentRoomStore } from "../store";
import deleteDevice from "../util/device/deleteDevice";
import getDeviceList from "../util/device/getDeviceList";

export default function Room() {
  const navigate = useNavigate();
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom)!;

  const [deviceList, setDeviceList] = useState<Device[]>([]);

  async function getList(searchText: string) {
    const list = await getDeviceList(currentRoom._id, searchText);
    setDeviceList(list);
  }

  useEffect(() => {
    getList("");
  }, []);

  return (
    <>
      <NavBar
        name={currentRoom.name}
        backAction={() => navigate("/room/list")}
        showAdd
        addAction={() => navigate("/device/add")}
      >
        <SearchBox placeholder="搜索设备" search={getList}></SearchBox>
        <Accordion allowMultiple>
          {deviceList.map((device) => (
            <DeviceItem
              device={device}
              key={device._id}
              deleteDevice={async (id) => {
                await deleteDevice(currentRoom._id, id);
                getList("");
              }}
              refreshList={() => getList("")}
            />
          ))}
        </Accordion>
      </NavBar>
    </>
  );
}
