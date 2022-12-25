import {
  Flex,
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
  HStack,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { equals, ifElse, or } from "ramda";
import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useCurrentRoomStore } from "../store";
import createDevice from "../util/device/createDevice";

export default function DeviceAdd() {
  const navigate = useNavigate();
  const toast = useToast();
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom)!;

  const [name, setName] = useState("");
  const [isNameEmpty, setNameEmpty] = useState(false);

  const [type, setType] = useState("");
  const [isTypeEmpty, setTypeEmpty] = useState(false);

  const [target, setTarget] = useState("");
  const [isTargetEmpty, setTargetEmpty] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [isValueValid, setValueValid] = useState(true);
  const [unit, setUnit] = useState("");

  const validate = () => {
    let isValid = true;
    ifElse(
      equals(""),
      () => {
        setNameEmpty(true);
        isValid = false;
      },
      () => setNameEmpty(false)
    )(name);
    ifElse(
      or(equals(""), equals("请选择设备类型")),
      () => {
        setTypeEmpty(true);
        isValid = false;
      },
      () => setTypeEmpty(false)
    )(type);

    if (type === "sensor") {
      ifElse(
        equals(""),
        () => {
          setTargetEmpty(true);
          isValid = false;
        },
        () => setTargetEmpty(false)
      )(target);
      ifElse(
        equals(true),
        () => {
          setValueValid(false);
          isValid = false;
        },
        () => setValueValid(true)
      )(minValue >= maxValue);
    }
    return isValid;
  };

  const create = async () => {
    if (validate()) {
      const created = await createDevice(
        currentRoom._id,
        name,
        type as "light" | "switch" | "sensor" | "lock",
        {
          target,
          min: minValue,
          max: maxValue,
          unit,
        }
      );
      if (created) {
        toast({
          title: "创建成功！",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate(`/room/${currentRoom.name}`);
      }
    }
  };

  return (
    <>
      <NavBar name="添加设备">
        <Flex
          h="100%"
          w="100%"
          flexDirection="column"
          justify="center"
          align="center"
          mt={50}
        >
          <VStack
            spacing="10px"
            justify="center"
            align="flex-start"
            flexGrow={1}
            w="100%"
          >
            <Text fontSize="lg"> 设备名 </Text>
            <FormControl isInvalid={isNameEmpty}>
              <Input
                placeholder="请输入设备名"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameEmpty(false);
                }}
              />
              {isNameEmpty ? (
                <FormErrorMessage>设备名不能为空</FormErrorMessage>
              ) : null}
            </FormControl>

            <Text fontSize="lg"> 设备类型 </Text>
            <FormControl isInvalid={isTypeEmpty}>
              <Select
                placeholder="请选择设备类型"
                onChange={(e) => {
                  setType(e.target.value);
                  setTypeEmpty(false);
                }}
              >
                <option value="light">灯</option>
                <option value="switch">开关</option>
                <option value="sensor">传感器</option>
                <option value="lock">锁</option>
              </Select>
              {isTypeEmpty ? (
                <FormErrorMessage>设备类型不能为空</FormErrorMessage>
              ) : null}
            </FormControl>

            {type === "sensor" ? (
              <>
                <Text fontSize="lg"> 检测目标 </Text>
                <FormControl isInvalid={isTargetEmpty}>
                  <Input
                    placeholder="请输入检测目标"
                    value={target}
                    onChange={(e) => {
                      setTarget(e.target.value);
                      setTargetEmpty(false);
                    }}
                  />
                  {isTargetEmpty ? (
                    <FormErrorMessage>检测目标不能为空</FormErrorMessage>
                  ) : null}
                </FormControl>

                <Text fontSize="lg"> 数值范围 </Text>
                <FormControl isInvalid={!isValueValid}>
                  <HStack>
                    <NumberInput
                      value={minValue}
                      onChange={(e) => {
                        setMinValue(parseInt(e));
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Text>~</Text>
                    <NumberInput
                      value={maxValue}
                      onChange={(e) => {
                        setMaxValue(parseInt(e));
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                  {isValueValid ? null : (
                    <FormErrorMessage>最大值需要大于最小值</FormErrorMessage>
                  )}
                </FormControl>

                <Text fontSize="lg"> 单位 </Text>
                <FormControl isInvalid={isTargetEmpty}>
                  <Input
                    placeholder="请输入单位(可为空)"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                    }}
                  />
                </FormControl>
              </>
            ) : null}
          </VStack>

          <Button w="100%" colorScheme="blue" onClick={create} mt={50}>
            创建
          </Button>
        </Flex>
      </NavBar>
    </>
  );
}
