import {
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import { useCurrentRoomStore } from "../store";
import { HamburgerIcon, AddIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function RoomOverview() {
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom)!;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  let ctx: CanvasRenderingContext2D | null = null;
  useEffect(() => {
    ctx = canvasRef.current?.getContext("2d")!;
  }, []);

  let img = new Image();
  img.src = "http://localhost:3001/" + currentRoom.picture;
  img.onload = () => {
    ctx?.drawImage(
      img,
      0,
      0,
      canvasRef.current?.width!,
      img.height * (canvasRef.current?.width! / img.width)
    );
  };

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
        <MenuItem icon={<EditIcon />}>摆放设备</MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <>
      <NavBar name={currentRoom.name} showAdd rightSlot={editMenu}>
        <Center h="100%">
          <canvas ref={canvasRef} width="300" height="200" />
        </Center>
      </NavBar>
    </>
  );
}
