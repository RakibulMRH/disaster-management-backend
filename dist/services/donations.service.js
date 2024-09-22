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
exports.DonationService = void 0;
const database_config_1 = require("../config/database.config");
const donation_model_1 = require("../models/donation.model");
const crisis_model_1 = require("../models/crisis.model"); // Import Crisis model
class DonationService {
    constructor() {
        this.donationRepository = database_config_1.AppDataSource.getRepository(donation_model_1.Donation);
        this.crisisRepository = database_config_1.AppDataSource.getRepository(crisis_model_1.Crisis);
    }
    // Create a donation linked to a crisis
    createDonation(createDonationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const crisis = yield this.crisisRepository.findOne({ where: { id: createDonationDto.crisisId, status: 'approved' } });
            if (!crisis) {
                throw new Error('Crisis not found or not approved');
            }
            const donation = this.donationRepository.create(Object.assign(Object.assign({}, createDonationDto), { crisis: crisis }));
            return yield this.donationRepository.save(donation);
        });
    }
    // Get the total fund for a specific crisis
    getTotalFund(crisisId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.donationRepository
                .createQueryBuilder('donation')
                .select('SUM(donation.amount)', 'total')
                .where('donation.crisisId = :crisisId', { crisisId })
                .getRawOne();
            return parseFloat(result.total);
        });
    }
    // Get all donations for a specific crisis
    getAllDonations(crisisId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.donationRepository.find({
                where: { crisis: { id: crisisId } },
                relations: ['crisis'],
            });
        });
    }
    // Get the total sum of all donations
    getAllDonationsFunds() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.donationRepository
                .createQueryBuilder('donation')
                .select('SUM(donation.amount)', 'totalFund')
                .getRawOne();
            return parseFloat(result.totalFund);
        });
    }
}
exports.DonationService = DonationService;
