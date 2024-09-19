"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrisisService = void 0;
const database_config_1 = require("../config/database.config");
const crisis_model_1 = require("../models/crisis.model");
const user_model_1 = require("../models/user.model");
class CrisisService {
    constructor() {
        this.crisisRepository = database_config_1.AppDataSource.getRepository(crisis_model_1.Crisis);
        this.userRepository = database_config_1.AppDataSource.getRepository(user_model_1.User);
    }
    // Get all approved crises (Anonymous users can view them)
    getAllCrises() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crisisRepository.find({
                where: { status: 'approved' }, // Show only approved crises
            });
        });
    }
    // Create a new crisis (Anonymous users can add crises)
    createCrisis(createCrisisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const crisis = this.crisisRepository.create(Object.assign(Object.assign({}, createCrisisDto), { status: 'pending', dateReported: new Date() }));
            return yield this.crisisRepository.save(crisis);
        });
    }
    // Admin can approve or update a crisis
    approveCrisis(id, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            const crisis = yield this.crisisRepository.findOne({ where: { id } });
            if (!crisis)
                throw new Error('Crisis not found');
            const admin = yield this.userRepository.findOne({ where: { id: adminId } });
            if (!admin)
                throw new Error('Admin not found');
            crisis.status = 'approved';
            crisis.dateApproved = new Date();
            crisis.approvedByAdmin = admin;
            return yield this.crisisRepository.save(crisis);
        });
    }
    // Update other details of a crisis
    updateCrisis(id, updateCrisisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const crisis = yield this.crisisRepository.findOne({ where: { id } });
            if (!crisis)
                throw new Error('Crisis not found');
            Object.assign(crisis, updateCrisisDto);
            return yield this.crisisRepository.save(crisis);
        });
    }
    // Delete a crisis (Admin only)
    deleteCrisis(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const crisis = yield this.crisisRepository.findOne({ where: { id } });
            if (!crisis)
                throw new Error('Crisis not found');
            yield this.crisisRepository.remove(crisis);
        });
    }
}
exports.CrisisService = CrisisService;
