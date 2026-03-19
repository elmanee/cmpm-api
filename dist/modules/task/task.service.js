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
const prisma_service_1 = require("../../prisma.service");
const pg_1 = require("pg");
let TaskService = class TaskService {
    db;
    prisma;
    constructor(db, prisma) {
        this.db = db;
        this.prisma = prisma;
    }
    async getTasks(userId) {
        return await this.prisma.task.findMany({
            where: { user_id: userId },
        });
    }
    async getTaskById(id, userId) {
        return await this.prisma.task.findFirst({
            where: { id, user_id: userId },
        });
    }
    async insertTask(task) {
        return await this.prisma.task.create({
            data: task,
        });
    }
    async updateTask(id, userId, taskUpdated) {
        const task = await this.prisma.task.findFirst({ where: { id, user_id: userId } });
        if (!task)
            throw new common_1.HttpException('No tienes permiso o la tarea no existe', common_1.HttpStatus.FORBIDDEN);
        return await this.prisma.task.update({
            where: { id },
            data: taskUpdated,
        });
    }
    async deleteTask(id, userId) {
        try {
            const task = await this.getTaskById(id, userId);
            if (!task)
                throw new Error();
            return await this.prisma.task.delete({
                where: { id },
            });
        }
        catch (e) {
            throw new common_1.HttpException('No se pudo eliminar la tarea', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [pg_1.Client,
        prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map