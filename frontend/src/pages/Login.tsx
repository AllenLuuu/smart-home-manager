import {
  Flex,
  Heading,
  Button,
  Center,
  Text,
  VStack,
  HStack,
  Input,
  Link,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { equals, ifElse } from "ramda";
import { useState } from "react";
import login from "../util/login";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);

  const validate = () => {
    let isValid = true;
    ifElse(
      equals(""),
      () => {
        setUsernameEmpty(true);
        isValid = false;
      },
      () => setUsernameEmpty(false)
    )(username);
    ifElse(
      equals(""),
      () => {
        setPasswordEmpty(true);
        isValid = false;
      },
      () => setPasswordEmpty(false)
    )(password);

    return isValid;
  };

  const handleLogin = async () => {
    if (validate()) {
      const canLogin = await login(username, password);
      if (canLogin) {
        console.log("Logged in!");
      }
    }
  };

  return (
    <>
      <Flex direction="column" minHeight="100vh" justify="center" py="50px">
        <Center>
          <Heading as="h1" size="2xl" marginBottom={100}>
            智能家居管理系统
          </Heading>
        </Center>
        <Heading as="h2" size="lg" ml="25px" fontWeight="medium">
          欢迎登录
        </Heading>
        <Text fontSize="lg" ml="25px" color="gray.500">
          请输入账号和密码
        </Text>

        <VStack spacing="10px" p="25px" mt="25px" align="flex-start">
          <Text fontSize="lg"> 用户名 </Text>
          <FormControl isInvalid={isUsernameEmpty}>
            <Input
              placeholder="请输入用户名"
              value={username}
              onChange={handleUsernameChange}
            />
            {isUsernameEmpty && (
              <FormErrorMessage>用户名不能为空</FormErrorMessage>
            )}
          </FormControl>
          {!isUsernameEmpty && <div></div>}

          <Text fontSize="lg"> 密码 </Text>
          <FormControl isInvalid={isPasswordEmpty}>
            <Input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={handlePasswordChange}
            />
            {isPasswordEmpty && (
              <FormErrorMessage>密码不能为空</FormErrorMessage>
            )}
          </FormControl>
        </VStack>

        <HStack p="25px" mt={50} spacing="50px">
          <Button
            colorScheme="blue"
            size="lg"
            flexGrow="1"
            onClick={handleLogin}
          >
            登录
          </Button>
          <Link href="/signup" flexGrow="1">
            <Button colorScheme="blue" variant="outline" size="lg" w="100%">
              注册
            </Button>
          </Link>
        </HStack>
      </Flex>
    </>
  );
}
