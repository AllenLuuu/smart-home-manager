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
import signUp from "../util/account/signUp";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
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
          title: "???????????????",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/site/list");
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
                <Text fontSize="2xl">????????????</Text>
              </Center>
            </GridItem>
          </Grid>

          <VStack flexGrow={1} spacing="10px" my="50px" align="flex-start">
            <Text fontSize="lg"> ????????? </Text>
            <FormControl isInvalid={isUsernameEmpty}>
              <Input
                placeholder="??????????????????"
                value={username}
                onChange={handleUsernameChange}
              />
              {isUsernameEmpty ? (
                <FormErrorMessage>?????????????????????</FormErrorMessage>
              ) : null}
            </FormControl>
            {isUsernameEmpty ? null : <div></div>}

            <Text fontSize="lg"> ?????? </Text>
            <FormControl isInvalid={isPasswordEmpty || !isPasswordValid}>
              <Input
                type="password"
                placeholder="?????????6???????????????"
                value={password}
                onChange={handlePasswordChange}
              />
              {isPasswordEmpty ? (
                <FormErrorMessage>??????????????????</FormErrorMessage>
              ) : isPasswordValid ? null : (
                <FormErrorMessage>??????????????????6???</FormErrorMessage>
              )}
            </FormControl>
            {isPasswordEmpty || !isPasswordValid ? null : <div></div>}

            <Text fontSize="lg"> ???????????? </Text>
            <FormControl isInvalid={isPassword2Empty || !isPassword2Same}>
              <Input
                type="password"
                placeholder="?????????????????????"
                value={password2}
                onChange={handlePassword2Change}
              />
              {isPassword2Empty ? (
                <FormErrorMessage>??????????????????</FormErrorMessage>
              ) : isPassword2Same ? null : (
                <FormErrorMessage>?????????????????????</FormErrorMessage>
              )}
            </FormControl>
            {isPassword2Empty || !isPassword2Same ? null : <div></div>}

            <Text fontSize="lg"> ????????? </Text>
            <FormControl isInvalid={isPhoneEmpty || !isPhoneValid}>
              <Input
                placeholder="??????????????????"
                value={phone}
                onChange={handlePhoneChange}
              />
              {isPhoneEmpty ? (
                <FormErrorMessage>?????????????????????</FormErrorMessage>
              ) : isPhoneValid ? null : (
                <FormErrorMessage>????????????????????????</FormErrorMessage>
              )}
            </FormControl>
          </VStack>

          <Button mb={100} colorScheme="blue" size="lg" onClick={handleSignUp}>
            ??????
          </Button>
        </Flex>
      </Box>
    </>
  );
}
