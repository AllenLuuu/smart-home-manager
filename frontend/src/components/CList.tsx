import { List } from "@chakra-ui/react";
import CListItem from "./CListItem";

export default function CList({
  list,
  keyProp,
  action,
  deleteAction,
}: {
  list: any[];
  keyProp: string;
  action: (item: any) => void;
  deleteAction: (id: string) => void;
}) {
  function renderList() {
    return list.map((item) => (
      <CListItem key={item[keyProp]} action={() => action(item)} deleteAction={() => {deleteAction(item._id)}}>{item[keyProp]}</CListItem>
    ));
  }

  return (
    <>
      <List>{renderList()}</List>
    </>
  );
}
