import {
  Button,
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useCurrentRoomStore } from "../store";
import { HamburgerIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import DeviceMenu from "../components/DeviceMenu";
import getDeviceList from "../util/device/getDeviceList";
import setDeviceLocation from "../util/device/setDeviceLocation";
import { Stage, Image as KImage, Layer, Text as KText} from "react-konva";

export default function RoomOverview() {
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom)!;
  const navigate = useNavigate();
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDeviceList(currentRoom._id, "").then((list) => {
      setDeviceList(list);
    });
  }, []);

  let img = new Image();
  img.src = '/' + currentRoom.picture;

  const editMenu = (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        colorScheme="blue"
        fontSize={25}
        variant="ghost"
      />
      <MenuList>
        <MenuItem
          icon={<AddIcon />}
          onClick={() => navigate(`/room/${currentRoom.name}/upload-picture`)}
        >
          上传户型图
        </MenuItem>
        <MenuItem icon={<EditIcon />} onClick={onOpen}>
          摆放设备
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <>
      <NavBar name={currentRoom.name} showAdd rightSlot={editMenu}>
        <Center mb={100} ref={canvasRef}>
          <Stage width={window.innerWidth - 50} height={window.innerWidth - 50}>
            <Layer
              onTouchStart={(e) => {
                console.log(e);
                if (currentDevice) {
                  const x = e.evt.touches[0].clientX - 25;
                  const y = e.evt.touches[0].clientY - canvasRef.current?.offsetTop!;
                  console.log(x, y);
                  if (x < 0 || y < 0) return;
                  if (x > window.innerWidth - 50 || y > window.innerWidth - 50)
                    return;
                  setDeviceLocation(currentDevice._id, { x, y }).then(() => {
                    getDeviceList(currentRoom._id, "").then((list) =>
                      setDeviceList(list)
                    );
                  });
                }
              }}
            >
              <KImage
                image={img}
                x={0}
                y={0}
                width={window.innerWidth - 50}
                height={img.height * ((window.innerWidth - 50) / img.width)}
              />
              {deviceList.map((device) => {
                if (!device.location) return null;
                return (
                  <>
                    <KText
                      key={device._id}
                      fontSize={15}
                      text={device.name}
                      x={device.location.x}
                      y={device.location.y}
                      fill={currentDevice?._id === device._id ? "red" : "black"}
                      align="center"
                      verticalAlign="middle"
                      draggable={currentDevice?._id === device._id}
                      onDragEnd={(e) => {
                        const x = e.target.x();
                        const y = e.target.y();
                        if (x < 0 || y < 0) return;
                        if (
                          x > window.innerWidth - 50 ||
                          y > window.innerWidth - 50
                        )
                          return;
                        setDeviceLocation(device._id, { x, y }).then(() => {
                          getDeviceList(currentRoom._id, "").then((list) =>
                            setDeviceList(list)
                          );
                        });
                      }}
                    />
                  </>
                );
              })}
            </Layer>
          </Stage>
        </Center>

        {currentDevice && (
          <VStack justify="center">
            <Text>正在摆放：{currentDevice.name}</Text>

            <Button colorScheme="blue" onClick={() => setCurrentDevice(null)}>
              确定
            </Button>
          </VStack>
        )}
      </NavBar>

      <DeviceMenu
        list={deviceList}
        isOpen={isOpen}
        onClose={onClose}
        setCurrentDevice={setCurrentDevice}
      />
    </>
  );
}
