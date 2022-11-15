import { Box, Divider } from "@chakra-ui/react";

export default function CListItem({
  children,
  action,
}: {
  children: React.ReactNode;
  action: () => void;
}) {
  return (
    <>
      <Box mb="-1px">
        <Divider />
        <Box px={5} py={5} onClick={action}>
          {children}
        </Box>
        <Divider />
      </Box>
    </>
  );
}
