import { AppDataSource } from '../config/database.config';
import { Donation } from '../models/donation.model';
import { Expense } from '../models/expense.model';
import { InventoryTransaction } from '../models/inventoryTransaction.model';
import { Between } from 'typeorm';

export class ReportService {
  private donationRepository = AppDataSource.getRepository(Donation);
  private expenseRepository = AppDataSource.getRepository(Expense);
  private inventoryRepository = AppDataSource.getRepository(InventoryTransaction);

  // Get donations by custom date range, including when startDate = endDate
  async getDonationsByDateRange(startDate: Date, endDate: Date): Promise<Donation[]> {
    if (startDate.toDateString() === endDate.toDateString()) {
      // If startDate and endDate are the same, fetch records for that specific day
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }
    return await this.donationRepository.find({
      where: {
        dateDonated: Between(startDate, endDate),
      },
    });
  }

  // Get expenses by custom date range, including when startDate = endDate
  async getExpensesByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    if (startDate.toDateString() === endDate.toDateString()) {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }
    return await this.expenseRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  // Get inventory by custom date range, including when startDate = endDate
  async getInventoryByDateRange(startDate: Date, endDate: Date): Promise<InventoryTransaction[]> {
    if (startDate.toDateString() === endDate.toDateString()) {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }
    return await this.inventoryRepository.find({
      where: {
        date: Between(startDate, endDate),
      }
    });
  }

  // Get overall daily funds and expenses (no date range, all-time records)
  async getOverallFundsAndExpenses(): Promise<any[]> {
    const donations = await this.donationRepository
      .createQueryBuilder('donation')
      .select('DATE(donation.dateDonated)', 'date')
      .addSelect('SUM(donation.amount)', 'totalFunds')
      .groupBy('DATE(donation.dateDonated)')
      .getRawMany();

    const expenses = await this.expenseRepository
      .createQueryBuilder('expense')
      .select('DATE(expense.date)', 'date')
      .addSelect('SUM(expense.amount)', 'totalExpenses')
      .groupBy('DATE(expense.date)')
      .getRawMany();

    // Combine the data into a single object
    const chartData: any[] = [];

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
      } else {
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
  }
}
