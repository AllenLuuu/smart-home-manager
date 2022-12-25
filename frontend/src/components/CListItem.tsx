import { DeleteOutlineFilled } from "@ricons/material";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export default function CListItem({
  children,
  action,
  deleteAction,
}: {
  children: React.ReactNode;
  action: () => void;
  deleteAction?: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box mb="-1px">
        <Divider />
        <Flex justify="space-between">
          <Box flexGrow={1} px={5} py={5} onClick={action}>
            {children}
          </Box>
          <Center px={5} py={5} onClick={onOpen}>
            <Icon as={DeleteOutlineFilled} />
          </Center>
        </Flex>
        <Divider />
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              删除
            </AlertDialogHeader>

            <AlertDialogBody>
              确定删除 {children} 吗？该操作不可逆。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={()=> {
                deleteAction && deleteAction();
                onClose();
              }} ml={3}>
                删除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
