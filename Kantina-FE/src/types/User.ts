import type { Reservation } from "./Reservation";

export type User = {
    id: number;
    name: string;
    points?: number;
    type?: 'admin' | 'user';
    reservations?: Reservation[];
}