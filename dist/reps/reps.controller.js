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
const common_1 = require("@nestjs/common");
const reps_service_1 = require("./reps.service");
let RepsController = class RepsController {
    constructor(appService) {
        this.appService = appService;
    }
    fetchAllReps() {
        return this.appService.getAllReps();
    }
    fetchRepsFromOneRegion(params) {
        return this.appService.getRepsFromOneRegion(params.region);
    }
    fetchOneRep(params) {
        const { region, id } = params;
        return this.appService.getOneRep(id, region);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], RepsController.prototype, "fetchAllReps", null);
__decorate([
    common_1.Get(':region'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], RepsController.prototype, "fetchRepsFromOneRegion", null);
__decorate([
    common_1.Get(':region/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], RepsController.prototype, "fetchOneRep", null);
RepsController = __decorate([
    common_1.Controller('reps'),
    __metadata("design:paramtypes", [reps_service_1.RepsService])
], RepsController);
exports.RepsController = RepsController;
//# sourceMappingURL=reps.controller.js.map