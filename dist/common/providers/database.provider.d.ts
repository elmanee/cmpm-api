import { Client } from "pg";
export declare const databaseProvider: {
    provide: string;
    useFactory: () => Promise<Client>;
}[];
