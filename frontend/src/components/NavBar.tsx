import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LogOutSharp, RemoveRedEyeOutlined } from "@ricons/material";
import { equals, ifElse } from "ramda";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  name,
  children,
  backAction,
  showAdd,
  rightSlot,
  addAction,
  showEye,
  eyeAction,
}: {
  name: string;
  children: React.ReactNode;
  backAction?: () => void;
  showAdd?: boolean;
  rightSlot?: React.ReactNode;
  addAction?: () => void;
  showEye?: boolean;
  eyeAction?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <Flex minHeight="100vh" direction="column" px={25}>
        <Grid templateColumns="repeat(5, 1fr)" py="20px" mb="20px">
          <GridItem colSpan={1}>
            <Flex h="100%" justify={"flex-start"} align="center">
              <IconButton
                aria-label="log out"
                colorScheme="blue"
                variant="ghost"
                fontSize={30}
                icon={ifElse(
                  equals("场景列表"),
                  () => <LogOutSharp />,
                  () => <ArrowBackIcon />
                )(name)}
                onClick={backAction ?? (() => navigate(-1))}
              />
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <Center height="100%">
              <Text
                fontSize="2xl"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                {name}
              </Text>
              {showEye ? (
                <IconButton
                  aria-label="eye"
                  variant="ghost"
                  fontSize={25}
                  colorScheme="blue"
                  onClick={eyeAction}
                >
                  <Icon as={RemoveRedEyeOutlined} />
                </IconButton>
              ) : null}
            </Center>
          </GridItem>
          {showAdd ? (
            <GridItem colSpan={1}>
              <Flex h="100%" justify={"flex-end"} align="center">
                {rightSlot ?? (
                  <IconButton
                    aria-label="create"
                    colorScheme="blue"
                    variant="ghost"
                    fontSize={25}
                    icon={<AddIcon />}
                    onClick={addAction}
                  />
                )}
              </Flex>
            </GridItem>
          ) : null}
        </Grid>
        <Box flexGrow={1}>{children}</Box>
      </Flex>
    </>
  );
}
