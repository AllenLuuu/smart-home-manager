import { List } from "@chakra-ui/react";
import CListItem from "./CListItem";

export default function CList({
  list,
  keyProp,
  action,
}: {
  list: any[];
  keyProp: string;
  action: (item: any) => void;
}) {
  function renderList() {
    return list.map((item) => (
      <CListItem key={item[keyProp]} action={() => action(item)}>{item[keyProp]}</CListItem>
    ));
  }

  return (
    <>
      <List>{renderList()}</List>
    </>
  );
}
