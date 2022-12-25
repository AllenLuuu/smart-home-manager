import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LogOutSharp } from "@ricons/material";
import { equals, ifElse } from "ramda";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  name,
  children,
  backAction,
  showAdd,
  addAction,
}: {
  name: string;
  children: React.ReactNode;
  backAction?: () => void;
  showAdd?: boolean;
  addAction?: () => void;
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
              <Text fontSize="2xl">{name}</Text>
            </Center>
          </GridItem>
          {showAdd ? (
            <GridItem colSpan={1}>
              <Flex h="100%" justify={"flex-end"} align="center">
                <IconButton
                  aria-label="create"
                  colorScheme="blue"
                  variant="ghost"
                  fontSize={30}
                  icon={<AddIcon />}
                  onClick={addAction}
                />
              </Flex>
            </GridItem>
          ) : null}
        </Grid>
        <Box flexGrow={1}>{children}</Box>
      </Flex>
    </>
  );
}
