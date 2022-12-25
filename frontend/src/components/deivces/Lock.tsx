import { HStack, Switch, Text } from "@chakra-ui/react";

export default function Lock({ isLocked }: { isLocked: boolean }) {
  return (
    <>
      <HStack justify="space-between">
        <Text>状态</Text>
        <Switch isChecked={!isLocked} disabled />
      </HStack>
    </>
  );
}
