import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CList from "../components/CList";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import { removeCookie } from "../util/cookie";
import getSiteList from "../util/getSiteList";

export default function SiteList() {
  const navigate = useNavigate();
  const [SiteList, setSiteList] = useState([]);

  async function getList(searchText: string) {
    const list = await getSiteList(searchText);
    setSiteList(list);
  }

  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();
  function logout() {
    removeCookie("id");
    navigate("/");
  }

  useEffect(() => {
    getList("");
  }, []);

  return (
    <>
      <NavBar name="场景列表" backAction={onOpen} showAdd addAction={() => navigate("/site/add")}>
        <SearchBox placeholder="搜索场景" search={getList}></SearchBox>
        <CList list={SiteList} keyProp={"name"} action={() => {}} />
      </NavBar>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef as React.MutableRefObject<HTMLButtonElement>} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent mx={25} mt="10vh">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              登出
            </AlertDialogHeader>

            <AlertDialogBody>
              确定要登出吗？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef as React.MutableRefObject<HTMLButtonElement>} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={logout} ml={3}>
                登出
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
