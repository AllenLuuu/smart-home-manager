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

interface Device {
  _id: string;
  host: string;
  name: string;
  type: "light" | "switch" | "sensor" | "lock";
  states: any;
  location: {
    x: number;
    y: number;
  };
}