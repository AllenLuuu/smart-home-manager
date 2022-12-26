import {
  Flex,
  FormControl,
  FormErrorMessage,
  VStack,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ifElse, equals } from "ramda";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import create from "zustand";
import NavBar from "../components/NavBar";
import Upload from "../components/Upload";
import { useCurrentRoomStore, useCurrentSiteStore } from "../store";
import createRoom from "../util/room/createRoom";
import updatePicture from "../util/room/updatePicture";

export default function RoomAdd() {
  const toast = useToast();
  const navigate = useNavigate();

  const currentRoom = useCurrentRoomStore((state) => state.currentRoom)!;
  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);

  const [picture, setPicture] = useState("");

  const validate = () => {
    let isValid = true;
    ifElse(
      equals(""),
      () => {
        isValid = false;
      },
      () => null
    )(picture);

    return isValid;
  };

  const upload = async () => {
    if (validate()) {
      const updated = await updatePicture(currentRoom._id, picture);
      if (updated) {
        toast({
          title: "创建成功！",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setCurrentRoom({
          ...currentRoom,
          picture: picture,
        });

        navigate(-1);
      }
    } else {
      toast({
        title: "请上传图片！",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NavBar name="上传户型图">
        <Flex
          h="100%"
          w="100%"
          flexDirection="column"
          justify="center"
          align="center"
          mt={50}
        >
          <Upload setPicture={setPicture}></Upload>

          <Button w="100%" colorScheme="blue" onClick={upload} mt={50}>
            上传
          </Button>
        </Flex>
      </NavBar>
    </>
  );
}
