import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { LogOutOutline } from "@ricons/ionicons5";
import { equals, ifElse } from "ramda";
import { useNavigate } from "react-router-dom";

export default function NavBar({
  name,
  children,
  addAction,
  backAction,
}: {
  name: string;
  children: React.ReactNode;
  addAction: () => void;
  backAction?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <Flex minHeight="100vh" direction="column" px={25}>
        <Flex justify="space-between" py="20px">
          <IconButton
            aria-label="log out"
            colorScheme="blue"
            variant="ghost"
            fontSize={30}
            icon={ifElse(
              equals("场景列表"),
              () => <LogOutOutline />,
              () => <ArrowBackIcon />
            )(name)}
            onClick={backAction ?? (() => navigate(-1))}
          />
          <Text fontSize="2xl">{name}</Text>
          <IconButton
            aria-label="create"
            colorScheme="blue"
            variant="ghost"
            fontSize={30}
            icon={<AddIcon />}
            onClick={addAction}
          />
        </Flex>
        <Box flexGrow={1}>{children}</Box>
      </Flex>
    </>
  );
}
