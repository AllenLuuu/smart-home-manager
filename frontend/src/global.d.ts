interface Site {
  _id: string;
  host: string;
  name: string;
  rooms: string[];
}

interface Room {
  _id: string;
  host: string;
  name: string;
  devices: string[];
  picture: string;
}