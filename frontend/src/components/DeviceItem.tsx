import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LightOutlined, LockOutlined, SensorsOutlined } from "@ricons/material";
import { MdSwitch } from "@ricons/ionicons4";
import Sensor from "./deivces/Sensor";
import CSwitch from "./deivces/CSwitch";
import Light from "./deivces/Light";
import Lock from "./deivces/Lock";
import updateDevice from "../util/device/updateDevice";
import { useRef } from "react";

export default function DeviceItem({
  device,
  deleteDevice,
  refreshList,
}: {
  device: Device;
  deleteDevice: (id: string) => void;
  refreshList: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  function renderDevice() {
    switch (device.type) {
      case "sensor":
        return (
          <Sensor
            target={device.states.target}
            value={device.states.value}
            unit={device.states.unit}
          />
        );
      case "switch":
        return (
          <CSwitch
            isOn={device.states.isOn}
            onChange={(e) => {
              updateDevice(device._id, { isOn: e });
              refreshList();
            }}
          />
        );
      case "light":
        return (
          <Light
            isOn={device.states.isOn}
            onStatusChange={(e) => {
              updateDevice(device._id, {
                isOn: e,
                luminance: device.states.luminance,
              });
              refreshList();
            }}
            luminance={device.states.luminance}
            onLuminanceChange={(e) => {
              updateDevice(device._id, {
                isOn: device.states.isOn,
                luminance: e,
              });
              refreshList();
            }}
          />
        );
      case "lock":
        return <Lock isLocked={device.states.isLocked} />;
    }
  }

  function renderDeviceIcon() {
    switch (device.type) {
      case "sensor":
        return SensorsOutlined;
      case "switch":
        return MdSwitch;
      case "light":
        return LightOutlined;
      case "lock":
        return LockOutlined;
    }
  }

  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack flex="1" align="center">
              <Text>{device.name}</Text>
              <Icon as={renderDeviceIcon()} />
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {renderDevice()}
          <Box h={5} />
          <Flex flexDir="row-reverse">
            <Button size="sm" colorScheme="red" onClick={onOpen}>
              删除
            </Button>
          </Flex>
        </AccordionPanel>
      </AccordionItem>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              删除设备
            </AlertDialogHeader>

            <AlertDialogBody>
              确定删除 {device.name} 吗？该操作不可逆。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteDevice(device._id);
                  onClose();
                }}
                ml={3}
              >
                删除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
