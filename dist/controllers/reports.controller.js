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
exports.ReportController = void 0;
const reports_service_1 = require("../services/reports.service");
const json2csv_1 = require("json2csv"); // For CSV conversion
class ReportController {
    constructor() {
        this.reportService = new reports_service_1.ReportService();
        this.generateCustomDonationReport = this.generateCustomDonationReport.bind(this);
        this.generateCustomExpenseReport = this.generateCustomExpenseReport.bind(this);
        this.generateCustomInventoryReport = this.generateCustomInventoryReport.bind(this);
        this.getDailyFundsAndExpenses = this.getDailyFundsAndExpenses.bind(this);
    }
    // Generate a chart view showing daily funds (from donations) and expenses for all-time records
    getDailyFundsAndExpenses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all-time data (no date range filtering)
                const chartData = yield this.reportService.getOverallFundsAndExpenses();
                return res.status(200).json(chartData);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Generate and export custom donation report for a given date range, including when startDate = endDate
    generateCustomDonationReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.query;
                const start = new Date(startDate);
                const end = new Date(endDate);
                const donations = yield this.reportService.getDonationsByDateRange(start, end);
                const csv = yield (0, json2csv_1.parseAsync)(donations); // Convert to CSV
                res.header('Content-Type', 'text/csv');
                res.attachment('custom_donation_report.csv');
                return res.send(csv);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    // Generate and export custom expense report for a given date range, including when startDate = endDate
    generateCustomExpenseReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.query;
                const start = new Date(startDate);
                const end = new Date(endDate);
                const expenses = yield this.reportService.getExpensesByDateRange(start, end);
                const csv = yield (0, json2csv_1.parseAsync)(expenses); // Convert to CSV
                res.header('Content-Type', 'text/csv');
                res.attachment('custom_expense_report.csv');
                return res.send(csv);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    generateCustomInventoryReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = req.query;
                // Convert to Date objects
                const start = new Date(startDate);
                const end = new Date(endDate);
                const inventoryItems = yield this.reportService.getInventoryByDateRange(start, end);
                const csv = yield (0, json2csv_1.parseAsync)(inventoryItems); // Convert to CSV
                res.header('Content-Type', 'text/csv');
                res.attachment('custom_inventory_report.csv');
                return res.send(csv);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
}
exports.ReportController = ReportController;
