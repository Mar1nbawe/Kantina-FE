import type { User } from "./User";

export type Reservation = {
    id: number;
    userId: number;
    user?: User;
    tableId: number;
    table?: any;
    startDate: Date;
    endDate: Date;
    status: string;
}