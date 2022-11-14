import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  IconButton,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { both, compose, equals, flip, gte, ifElse, not, prop } from "ramda";
import signUp from "../util/signUp";

export default function SignUp() {
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const [isUsernameEmpty, setUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPassword2Empty, setPassword2Empty] = useState(false);
  const [isPassword2Same, setPassword2Same] = useState(true);
  const [isPhoneEmpty, setPhoneEmpty] = useState(false);
  const [isPhoneValid, setPhoneValid] = useState(true);

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
    ifElse(
      equals(""),
      () => {
        setPassword2Empty(true);
        isValid = false;
      },
      () => setPassword2Empty(false)
    )(password2);
    ifElse(
      equals(""),
      () => {
        setPhoneEmpty(true);
        isValid = false;
      },
      () => setPhoneEmpty(false)
    )(phone);
    ifElse(
      equals(password),
      () => setPassword2Same(true),
      () => {
        setPassword2Same(false);
        isValid = false;
      }
    )(password2);
    ifElse(
      compose(flip(gte)(6), prop("length")),
      () => setPasswordValid(true),
      () => {
        setPasswordValid(false);
        isValid = false;
      }
    )(password);
    ifElse(
      both(
        compose(equals(11), prop("length")),
        compose(not, isNaN, (x: string) => +x)
      ),
      () => setPhoneValid(true),
      () => {
        setPhoneValid(false);
        isValid = false;
      }
    )(phone);

    return isValid;
  };

  const handleSignUp = async () => {
    const isValid = validate();
    if (isValid) {
      const signedUp = await signUp(username, password, +phone);
      if (signedUp) {
        toast({
          title: "注册成功！",
          description: "您已成功注册，现在可以登录了。",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Box px={25}>
        <Flex direction="column" minHeight="100vh">
          <Grid templateColumns="repeat(5, 1fr)" py="20px">
            <GridItem colSpan={1}>
              <Flex h="100%" justify={"flex-start"} align="center">
                <Link href="/">
                  <IconButton
                    aria-label="back"
                    colorScheme="blue"
                    icon={<ArrowBackIcon />}
                    variant="ghost"
                    fontSize={30}
                  />
                </Link>
              </Flex>
            </GridItem>
            <GridItem colSpan={3}>
              <Center height="100%">
                <Text fontSize="2xl">欢迎注册</Text>
              </Center>
            </GridItem>
          </Grid>

          <VStack flexGrow={1} spacing="10px" my="50px" align="flex-start">
            <Text fontSize="lg"> 用户名 </Text>
            <FormControl isInvalid={isUsernameEmpty}>
              <Input
                placeholder="请输入用户名"
                value={username}
                onChange={handleUsernameChange}
              />
              {isUsernameEmpty ? (
                <FormErrorMessage>用户名不能为空</FormErrorMessage>
              ) : null}
            </FormControl>
            {isUsernameEmpty ? null : <div></div>}

            <Text fontSize="lg"> 密码 </Text>
            <FormControl isInvalid={isPasswordEmpty || !isPasswordValid}>
              <Input
                type="password"
                placeholder="请输入6位以上密码"
                value={password}
                onChange={handlePasswordChange}
              />
              {isPasswordEmpty ? (
                <FormErrorMessage>密码不能为空</FormErrorMessage>
              ) : isPasswordValid ? null : (
                <FormErrorMessage>密码长度不足6位</FormErrorMessage>
              )}
            </FormControl>
            {isPasswordEmpty || !isPasswordValid ? null : <div></div>}

            <Text fontSize="lg"> 重复密码 </Text>
            <FormControl isInvalid={isPassword2Empty || !isPassword2Same}>
              <Input
                type="password"
                placeholder="请再次输入密码"
                value={password2}
                onChange={handlePassword2Change}
              />
              {isPassword2Empty ? (
                <FormErrorMessage>密码不能为空</FormErrorMessage>
              ) : isPassword2Same ? null : (
                <FormErrorMessage>两次密码不一致</FormErrorMessage>
              )}
            </FormControl>
            {isPassword2Empty || !isPassword2Same ? null : <div></div>}

            <Text fontSize="lg"> 手机号 </Text>
            <FormControl isInvalid={isPhoneEmpty || !isPhoneValid}>
              <Input
                placeholder="请输入手机号"
                value={phone}
                onChange={handlePhoneChange}
              />
              {isPhoneEmpty ? (
                <FormErrorMessage>手机号不能为空</FormErrorMessage>
              ) : isPhoneValid ? null : (
                <FormErrorMessage>手机号格式不正确</FormErrorMessage>
              )}
            </FormControl>
          </VStack>

          <Button mb={100} colorScheme="blue" size="lg" onClick={handleSignUp}>
            注册
          </Button>
        </Flex>
      </Box>
    </>
  );
}
