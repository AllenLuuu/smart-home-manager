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
  Box,
} from "@chakra-ui/react";
import { equals, ifElse } from "ramda";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../util/account/login";

export default function Login() {
  const navigate = useNavigate();

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
        navigate("/site/list");
      }
    }
  };

  return (
    <>
      <Box px={25}>
        <Flex direction="column" minHeight="100vh" pb="12vh">
          <Center>
            <Heading as="h1" size="2xl" mt="12vh" marginBottom={100} textAlign="center">
              智能家居管理系统
            </Heading>
          </Center>
          <Heading as="h2" size="lg" fontWeight="medium">
            欢迎登录
          </Heading>
          <Text fontSize="lg" color="gray.500">
            请输入账号和密码
          </Text>

          <VStack spacing="10px" my="50px" align="flex-start" flexGrow={1}>
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

          <HStack spacing="50px">
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
      </Box>
    </>
  );
}
