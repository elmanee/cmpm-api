"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let TaskService = class TaskService {
    db;
    constructor(db) {
        this.db = db;
    }
    tasks = [];
    async getTasks() {
        const query = 'SELECT * FROM tasks';
        const result = await this.db.query(query);
        return result.rows;
    }
    async getTaskById(id) {
        const query = `SELECT * FROM tasks WHERE id = $1`;
        const result = await this.db.query(query, [id]);
        console.log("Resultado de la DB:", result.rows);
        if (result.rows.length === 0) {
            return { statusCode: 404, message: "Task no found" };
        }
        return result.rows[0];
    }
    async insertTask(task) {
        const query = 'INSERT INTO tasks (name, description, priority, user_id) VALUES ($1, $2, $3, $4) RETURNING id';
        const result = await this.db.query(query, [
            task.name,
            task.description,
            task.priority,
            task.user_id,
        ]);
        return result.oid;
    }
    async updateTask(id, task) {
        const query = `UPDATE tasks SET name = COALESCE($1, name), description = COALESCE($2, description), priority = COALESCE($3, priority) WHERE id = $4 RETURNING *`;
        const result = await this.db.query(query, [
            task.name,
            task.description,
            task.priority,
            id,
        ]);
        return result.rows[0];
    }
    deleteTask(id) {
        const array = this.tasks.filter((data) => data.id != id);
        this.tasks = array;
        return `Tarea con id ${id} eliminada`;
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [pg_1.Client])
], TaskService);
//# sourceMappingURL=task.service.js.map