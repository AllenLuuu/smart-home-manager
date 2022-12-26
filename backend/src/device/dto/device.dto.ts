export class DeviceListDto {
  roomId: string;
  searchText: string;
}

export class DeviceCreateDto {
  roomId: string;
  name: string;
  type: 'light' | 'switch' | 'sensor' | 'lock';
  sensorPayload?: {
    target: string;
    min: number;
    max: number;
    unit?: string;
  };
}

export class DeviceUpdateDto {
  id: string;
  states: any;
}

export class DeviceDeleteDto {
  roomId: string;
  deviceId: string;
}

export class DeviceLocationDto {
  id: string;
  location: {
    x: number;
    y: number;
  };
}
