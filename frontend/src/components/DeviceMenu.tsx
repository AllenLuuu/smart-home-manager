import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Box,
  Divider,
} from "@chakra-ui/react";

export default function DeviceMenu({
  list,
  isOpen,
  onClose,
  setCurrentDevice,
}: {
  list: Device[];
  isOpen: boolean;
  onClose: () => void;
  setCurrentDevice: (device: Device) => void;
}) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>设备列表</DrawerHeader>
        <DrawerBody>
          {list.map((device) => (
            <Box mb="-1px" key={device._id}>
              <Divider />
              <Box
                flexGrow={1}
                px={5}
                py={5}
                onClick={() => {
                  setCurrentDevice(device);
                  onClose();
                }}
                overflow="hidden"
              >
                {device.name}
              </Box>
              <Divider />
            </Box>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
