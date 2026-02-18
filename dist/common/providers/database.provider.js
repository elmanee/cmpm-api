"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const pg_1 = require("pg");
exports.databaseProvider = [{
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            const client = new pg_1.Client({
                host: 'localhost',
                port: 5432,
                user: 'postgres',
                password: 'linux',
                database: 'cmpm_bd'
            });
            await client.connect();
            return client;
        }
    }];
//# sourceMappingURL=database.provider.js.map