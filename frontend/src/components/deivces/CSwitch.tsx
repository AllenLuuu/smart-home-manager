import { HStack, Switch, Text } from "@chakra-ui/react";

export default function CSwitch({ isOn, onChange }: { isOn: boolean, onChange: (e: Boolean) => void }) {
  return (
    <>
      <HStack justify="space-between">
        <Text>开关</Text>
        <Switch isChecked={isOn} onChange={
          (e) => {
            onChange(e.target.checked);
          }
        } />
      </HStack>
    </>
  );
}
