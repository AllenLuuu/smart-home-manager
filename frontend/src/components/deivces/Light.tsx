import {
  HStack,
  VStack,
  Text,
  Switch,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Box,
} from "@chakra-ui/react";

export default function Light({
  isOn,
  onStatusChange,
  luminance,
  onLuminanceChange,
}: {
  isOn: boolean;
  onStatusChange: (e: Boolean) => void;
  luminance: number;
  onLuminanceChange: (e: number) => void;
}) {
  return (
    <>
      <HStack justify="space-between">
        <Text>开关</Text>
        <Switch
          isChecked={isOn}
          onChange={(e) => {
            onStatusChange(e.target.checked);
          }}
        />
      </HStack>
      <Box h={2} />
      <HStack justify="space-between">
        <Text overflow="hidden" whiteSpace="nowrap">
          亮度
        </Text>
        <Slider
          defaultValue={luminance}
          onChangeEnd={(e) => {
            onLuminanceChange(e);
          }}
          width="70%"
          isDisabled={!isOn}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>{luminance}%</Text>
      </HStack>
    </>
  );
}
