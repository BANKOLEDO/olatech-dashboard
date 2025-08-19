import { faker } from "@faker-js/faker";

export function makeSeed() {
    const months = Array.from({length: 12}, (_,i) => i);
    const earnings = months.map((m) => ({
        month: m,
        value: faker.number.int({ min:1500, max: 5000 })
    }));
    const spending = [
        { label: 'House Rent', value: 2000},
        { label: 'Foods', value: 1500},
        { label: 'Others', value: 800}
    ];
    const cashflow = months.map((m) => ({
        month: m,
        income: faker.number.int({ min: 8000, max: 15000}),
        expense: faker.number.int({ min: 3000, max: 9000})
    }));
    const bills = Array.from({length: 6}).map(() => ({
        id: faker.string.uuid(),
        vendor: faker.company.name(),
        amount: Number(faker.finance.amount(5,199,2)),
        dueDate: faker.date.soon({ days: 45 }).toISOString(),
        status: 'Scheduled'
    }));
    const transactions = Array.from({ length: 10 }).map(() => ({
        id: faker.string.uuid(),
        activity: faker.commerce.productName(),
        date: faker.date.recent({ days: 15}).toISOString(),
        amount: Number(faker.finance.amount(10, 2500, 2)),
        status: faker.helpers.arrayElement(['Success', 'Failed', 'Pending']),
    }));
    return { earnings, spending, cashflow, bills, transactions, balance: 350000 };
}