import type { User } from "./User";

export type Reservation = {
    id: number;
    userId: number;
    user?: User;
    tableId: number;
    table?: any;
    startAt: Date;
    endAt: Date;
    status: string;
}