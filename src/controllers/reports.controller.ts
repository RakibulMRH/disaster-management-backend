import { Request, Response } from 'express';
import { ReportService } from '../services/reports.service';
import { parseAsync } from 'json2csv'; // For CSV conversion

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
    this.generateCustomDonationReport = this.generateCustomDonationReport.bind(this);   
    this.generateCustomExpenseReport = this.generateCustomExpenseReport.bind(this);
    this.generateCustomInventoryReport = this.generateCustomInventoryReport.bind(this);
    this.getDailyFundsAndExpenses = this.getDailyFundsAndExpenses.bind(this);
  }

  // Generate a chart view showing daily funds (from donations) and expenses for all-time records
  async getDailyFundsAndExpenses(req: Request, res: Response): Promise<Response> {
    try {
      // Fetch all-time data (no date range filtering)
      const chartData = await this.reportService.getOverallFundsAndExpenses();
      return res.status(200).json(chartData);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Generate and export custom donation report for a given date range, including when startDate = endDate
  async generateCustomDonationReport(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate } = req.query;
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const donations = await this.reportService.getDonationsByDateRange(start, end);
      const csv = await parseAsync(donations); // Convert to CSV
      
      res.header('Content-Type', 'text/csv');
      res.attachment('custom_donation_report.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // Generate and export custom expense report for a given date range, including when startDate = endDate
  async generateCustomExpenseReport(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate } = req.query;
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const expenses = await this.reportService.getExpensesByDateRange(start, end);
      const csv = await parseAsync(expenses); // Convert to CSV

      res.header('Content-Type', 'text/csv');
      res.attachment('custom_expense_report.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  async generateCustomInventoryReport(req: Request, res: Response): Promise<Response> {
    try {
      const { startDate, endDate } = req.query;
      
      // Convert to Date objects
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const inventoryItems = await this.reportService.getInventoryByDateRange(start, end);
      const csv = await parseAsync(inventoryItems); // Convert to CSV

      res.header('Content-Type', 'text/csv');
      res.attachment('custom_inventory_report.csv');
      return res.send(csv);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
