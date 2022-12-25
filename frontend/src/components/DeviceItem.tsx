import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { LightOutlined, LockOutlined, SensorsOutlined } from "@ricons/material";
import { MdSwitch } from "@ricons/ionicons4";
import Sensor from "./deivces/Sensor";
import CSwitch from "./deivces/CSwitch";
import Light from "./deivces/Light";
import Lock from "./deivces/Lock";
import updateDevice from "../util/device/updateDevice";

export default function DeviceItem({
  device,
  refreshList,
}: {
  device: Device;
  refreshList: () => void;
}) {
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
              updateDevice(device._id, { isOn: e })
              refreshList();
            }}
          />
        );
      case "light":
        return (
          <Light
            isOn={device.states.isOn}
            onStatusChange={(e) => {
              updateDevice(device._id, { isOn: e, luminance: device.states.luminance })
              refreshList();
            }}
            luminance={device.states.luminance}
            onLuminanceChange={(e) => {
              updateDevice(device._id, { isOn: device.states.isOn, luminance: e })
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
        <AccordionPanel pb={4}>{renderDevice()}</AccordionPanel>
      </AccordionItem>
    </>
  );
}
