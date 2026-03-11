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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const auth_dto_1 = require("./dto/auth.dto");
const util_service_1 = require("../../common/services/util.service");
let AuthController = class AuthController {
    authSvc;
    utilSvc;
    constructor(authSvc, utilSvc) {
        this.authSvc = authSvc;
        this.utilSvc = utilSvc;
    }
    async login(auth) {
        const { username, password } = auth;
        const user = await this.authSvc.getUserByUsername(username);
        if (!user) {
            throw new Error('El usuario y/o contraseña es incorrecto');
        }
        if (await this.utilSvc.checkPassword(password, user.password)) {
            const { password: _, ...payload } = user;
            const jwt = await this.utilSvc.generarJWT(payload);
            return { access_token: jwt, refresh_token: '' };
        }
        else {
            throw new Error('El usuario y/o contraseña es incorrecto');
        }
    }
    getMe() {
        return this.authSvc.getMe();
    }
    register() {
        return this.authSvc.register();
    }
    refreshToken() {
        return this.authSvc.refreshToken();
    }
    logOut() {
        return this.authSvc.logOut();
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica credenciales de usuario y genera un JWT' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Extraer el ID del usuario desde el token y busca la información' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Registra un nuevo usuario' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Recibe un Refresh Token y entrega un nuevo Access Token' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Invalida los tokens y limpia las cookies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "logOut", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('/api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        util_service_1.UtilService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map