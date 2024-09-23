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
exports.DonationController = void 0;
const donations_service_1 = require("../services/donations.service");
class DonationController {
    constructor() {
        this.donationService = new donations_service_1.DonationService(); // Instantiate DonationService
    }
    // Create a donation
    createDonation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donationData = req.body;
                const newDonation = yield this.donationService.createDonation(donationData);
                return res.status(201).json({
                    message: 'Donation successful',
                    donation: newDonation,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Get the total fund amount for a specific crisis
    getTotalFund(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.crisisId, 10);
                const { totalFund, goal } = yield this.donationService.getTotalFund(crisisId);
                res.status(200).json({ totalFund, goal });
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    // Get all donations for a specific crisis
    getAllDonations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const crisisId = parseInt(req.params.crisisId, 10);
                const donations = yield this.donationService.getAllDonations(crisisId);
                return res.status(200).json(donations);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get all donations funds for all crises
    getAllDonationsFunds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donationsFunds = yield this.donationService.getAllDonationsFunds();
                return res.status(200).json(donationsFunds);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get all donations list for all crises
    getAllDonationsList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const donationsList = yield this.donationService.getAllDonationsList();
                return res.status(200).json(donationsList);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.DonationController = DonationController;
