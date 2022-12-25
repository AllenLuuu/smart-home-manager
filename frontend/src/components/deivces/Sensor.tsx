import { HStack, Text } from "@chakra-ui/react";

export default function Sensor({target, value, unit}: {target: string, value: number, unit: string}) {
  return (
    <>
      <HStack justify="space-between">
        <Text>{target}</Text>
        <Text>{value}{unit}</Text>
      </HStack>
    </>
  );
}