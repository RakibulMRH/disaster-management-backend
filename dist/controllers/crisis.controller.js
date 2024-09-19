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
exports.CrisisController = void 0;
const crisis_service_1 = require("../services/crisis.service");
class CrisisController {
    constructor() {
        this.crisisService = new crisis_service_1.CrisisService(); // Instantiate CrisisService
    }
    // Anyone can list all crises
    static listCrises(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                const crises = yield crisisService.getAllCrises();
                return res.status(200).json(crises);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Anonymous users can create a crisis (Admin approval required for it to become visible)
    static createCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisData = req.body;
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                const createdCrisis = yield crisisService.createCrisis(crisisData);
                return res.status(201).json({
                    message: 'Crisis created successfully. Pending approval from admin.',
                    crisis: createdCrisis,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Admin can update a crisis (e.g., approving or changing status)
    static updateCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                const crisisData = req.body;
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                const updatedCrisis = yield crisisService.updateCrisis(crisisId, crisisData);
                return res.status(200).json({
                    message: 'Crisis updated successfully',
                    crisis: updatedCrisis,
                });
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
    // Admin or authorized users can delete a crisis
    static deleteCrisis(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.id, 10);
                const crisisService = new crisis_service_1.CrisisService(); // Instantiate the service
                yield crisisService.deleteCrisis(crisisId);
                return res.status(204).send();
            }
            catch (error) {
                return res.status(404).json({ message: error.message });
            }
        });
    }
}
exports.CrisisController = CrisisController;
