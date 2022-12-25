import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CList from "../components/CList";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import logout from "../util/account/logout";
import getSiteList from "../util/site/getSiteList";
import { useCurrentSiteStore } from "../store";
import deleteSite from "../util/site/deleteSite";

export default function SiteList() {
  const navigate = useNavigate();
  const [SiteList, setSiteList] = useState<Site[]>([]);

  const setCurrentSite = useCurrentSiteStore((state) => state.setCurrentSite);

  async function getList(searchText: string) {
    const list = await getSiteList(searchText);
    setSiteList(list);
  }

  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>();
  async function exit() {
    const loggedOut = await logout();
    if(loggedOut) {
      navigate("/");
    }
  }

  useEffect(() => {
    getList("");
  }, []);

  const toRoomList = (site: Site) => {
    setCurrentSite(site);
    navigate("/room/list");
  }

  return (
    <>
      <NavBar name="场景列表" backAction={onOpen} showAdd addAction={() => navigate("/site/add")}>
        <SearchBox placeholder="搜索场景" search={getList}></SearchBox>
        <CList list={SiteList} keyProp={"name"} action={toRoomList} deleteAction={async (id: string) => {
          await deleteSite(id);
          getList("");
        }} />
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
              <Button colorScheme="red" onClick={exit} ml={3}>
                登出
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
