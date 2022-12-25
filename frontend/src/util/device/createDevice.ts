import { post } from "../request";

export default async function createDevice(
    roomId: string,
    name: string,
    type: 'light' | 'switch' | 'sensor' | 'lock',
    sensorPayload?: {
        target: string;
        min: number;
        max: number;
        unit?: string;
    }
): Promise<Boolean> {
    try {
        await post(
            "/device/create",
            {
                roomId,
                name,
                type,
                sensorPayload
            },
            "创建设备"
        );
        return true;
    } catch (error: any) {
        return false;
    }
}