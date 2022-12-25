export class RoomListDto {
  siteId: string;
  searchText: string;
}

export class RoomCreateDto {
  siteId: string;
  name: string;
  picture: string;
}

export class RoomDeleteDto {
  siteId: string;
  roomId: string;
}
