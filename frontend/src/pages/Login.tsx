import {
  Flex,
  Heading,
  Button,
  Center,
  Text,
  VStack,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import request from "../util/request";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toast = useToast();
  const login = async () => {
    try {
      const loggedIn = await request.login(username, password);
      if (loggedIn.data === true) {
        toast({
          title: "Logged in successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "登录失败：用户名或密码错误",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "登陆失败：网络连接出错",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      console.error(error);
    }
  };

  return (
    <>
      <Flex direction="column" height="100vh" justify="center">
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
          <Input
            placeholder="请输入用户名"
            value={username}
            onChange={handleUsernameChange}
          />
          <div></div>
          <Text fontSize="lg"> 密码 </Text>
          <Input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={handlePasswordChange}
          />
        </VStack>

        <HStack p="25px" spacing="50px">
          <Button colorScheme="blue" size="lg" flexGrow="1" onClick={login}>
            登录
          </Button>
          <Button colorScheme="blue" variant="outline" size="lg" flexGrow="1">
            注册
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
