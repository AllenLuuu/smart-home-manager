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
import NavBar from "../components/NavBar";
import createSite from "../util/createSite";

export default function SiteAdd() {
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isNameEmpty, setNameEmpty] = useState(false);

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

    return isValid;
  };

  const create = async () => {
    if (validate()) {
      const created = await createSite(name);
      if (created) {
        toast({
          title: "创建成功！",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        navigate("/site/list");
      }
    }
  };

  return (
    <>
      <NavBar name="创建场景">
        <Flex
          h="100%"
          w="100%"
          flexDirection="column"
          justify="center"
          align="center"
        >
          <VStack
            spacing="10px"
            my="50px"
            justify="center"
            align="flex-start"
            flexGrow={1}
            w="100%"
          >
            <Text fontSize="lg"> 场景名 </Text>
            <FormControl isInvalid={isNameEmpty}>
              <Input
                placeholder="请输入场景名"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameEmpty(false);
                }}
              />
              {isNameEmpty ? (
                <FormErrorMessage>场景名不能为空</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>
          <Button w="100%" colorScheme="blue" onClick={create}>
            创建
          </Button>
        </Flex>
      </NavBar>
    </>
  );
}
