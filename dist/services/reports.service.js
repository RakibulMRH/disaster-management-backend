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
exports.ReportService = void 0;
const database_config_1 = require("../config/database.config");
const donation_model_1 = require("../models/donation.model");
const expense_model_1 = require("../models/expense.model");
const inventoryTransaction_model_1 = require("../models/inventoryTransaction.model");
const typeorm_1 = require("typeorm");
class ReportService {
    constructor() {
        this.donationRepository = database_config_1.AppDataSource.getRepository(donation_model_1.Donation);
        this.expenseRepository = database_config_1.AppDataSource.getRepository(expense_model_1.Expense);
        this.inventoryRepository = database_config_1.AppDataSource.getRepository(inventoryTransaction_model_1.InventoryTransaction);
    }
    // Get donations by custom date range, including when startDate = endDate
    getDonationsByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (startDate.toDateString() === endDate.toDateString()) {
                // If startDate and endDate are the same, fetch records for that specific day
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
            }
            return yield this.donationRepository.find({
                where: {
                    dateDonated: (0, typeorm_1.Between)(startDate, endDate),
                },
            });
        });
    }
    // Get expenses by custom date range, including when startDate = endDate
    getExpensesByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (startDate.toDateString() === endDate.toDateString()) {
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
            }
            return yield this.expenseRepository.find({
                where: {
                    date: (0, typeorm_1.Between)(startDate, endDate),
                },
            });
        });
    }
    // Get inventory by custom date range, including when startDate = endDate
    getInventoryByDateRange(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (startDate.toDateString() === endDate.toDateString()) {
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(23, 59, 59, 999);
            }
            return yield this.inventoryRepository.find({
                where: {
                    date: (0, typeorm_1.Between)(startDate, endDate),
                }
            });
        });
    }
    // Get overall daily funds and expenses (no date range, all-time records)
    getOverallFundsAndExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            const donations = yield this.donationRepository
                .createQueryBuilder('donation')
                .select('DATE(donation.dateDonated)', 'date')
                .addSelect('SUM(donation.amount)', 'totalFunds')
                .groupBy('DATE(donation.dateDonated)')
                .getRawMany();
            const expenses = yield this.expenseRepository
                .createQueryBuilder('expense')
                .select('DATE(expense.date)', 'date')
                .addSelect('SUM(expense.amount)', 'totalExpenses')
                .groupBy('DATE(expense.date)')
                .getRawMany();
            // Combine the data into a single object
            const chartData = [];
            // Create a mapping for donations by date
            const donationMap = donations.reduce((acc, donation) => {
                acc[donation.date] = {
                    date: donation.date,
                    totalFunds: parseFloat(donation.totalFunds),
                    totalExpenses: 0, // Default value for expenses
                };
                return acc;
            }, {});
            // Populate the expense data
            expenses.forEach(expense => {
                if (donationMap[expense.date]) {
                    donationMap[expense.date].totalExpenses = parseFloat(expense.totalExpenses);
                }
                else {
                    donationMap[expense.date] = {
                        date: expense.date,
                        totalFunds: 0, // Default value for funds
                        totalExpenses: parseFloat(expense.totalExpenses),
                    };
                }
            });
            // Convert the donationMap to an array for chart data
            for (const key in donationMap) {
                chartData.push(donationMap[key]);
            }
            return chartData;
        });
    }
}
exports.ReportService = ReportService;
