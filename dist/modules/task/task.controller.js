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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const common_5 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const swagger_1 = require("@nestjs/swagger");
let TaskController = class TaskController {
    taskSvc;
    constructor(taskSvc) {
        this.taskSvc = taskSvc;
    }
    async getTask() {
        return await this.taskSvc.getTasks();
    }
    async getTaskById(id) {
        const task = await this.taskSvc.getTaskById(id);
        if (task)
            return task;
        throw new common_3.HttpException('Tarea no encontrada', common_3.HttpStatus.NOT_FOUND);
    }
    async insertTask(task) {
        return await this.taskSvc.insertTask(task);
    }
    async updateTask(id, task) {
        return this.taskSvc.updateTask(id, task);
    }
    async deleteTask(id) {
        try {
            await this.taskSvc.deleteTask(id);
        }
        catch (error) {
            console.log(error);
            throw new common_3.HttpException('Tarea no encontrada', common_3.HttpStatus.NOT_FOUND);
        }
        return true;
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_2.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene todas las tareas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTask", null);
__decorate([
    (0, common_2.Get)(':id'),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTaskById", null);
__decorate([
    (0, common_2.Post)(),
    __param(0, (0, common_4.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "insertTask", null);
__decorate([
    (0, common_2.Put)(':id'),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_4.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_2.HttpCode)(common_3.HttpStatus.OK),
    __param(0, (0, common_2.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('tasks'),
    (0, common_5.Controller)('/api/task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map