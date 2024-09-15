import * as SQLite from 'expo-sqlite';
import { ConstantsVars } from '../shared/ConstantVars';

let database;

export async function init() {
    database = await SQLite.openDatabaseAsync(ConstantsVars.DbName);
    
    const promise = new Promise((resolve, reject) => {
      database.withTransactionAsync(async () => {
        try {
          await database.execAsync(
            `CREATE TABLE IF NOT EXISTS expenses (
               id INTEGER PRIMARY KEY NOT NULL,
               description TEXT NOT NULL,
               date TEXT NOT NULL,
               amount REAL NOT NULL
             );` 
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
    
    return promise;
  }
export async function StoreExpense(expenseData){
    database = await SQLite.openDatabaseAsync(ConstantsVars.DbName);
     const promise = new Promise((resolve, reject) => {
        database.withTransactionAsync(async () => {
            try {
                console.log("Storing Expense:", {
                    description: expenseData.description,
                    date: expenseData.date,
                    amount: expenseData.amount,
                });
                await database.execAsync(
                    'INSERT INTO expenses (description, date, amount) VALUES (?, ?, ?)',
                    [expenseData.description, expenseData.date, expenseData.amount]
                );
              resolve();
            } catch (error) {
              reject(error);
            }
          });   
     });
     return promise;
}

export async function fetchExpenses() {
    database = await SQLite.openDatabaseAsync(ConstantsVars.DbName);
  
    const promise = new Promise((resolve, reject) => {
      database.withTransactionAsync(async () => {
        try {
          // Run the query
          const result = await database.execAsync(`SELECT * FROM expenses`, []);
  
          // Check if result exists and if it has rows
          if (result && result.length > 0 && result[0]?.rows) {
            const rows = result[0].rows;
            const expenses = [];
  
            for (let i = 0; i < rows.length; i++) {
              const row = rows[i]; // Get each row
              expenses.push({
                id: row.id,
                description: row.description,
                date: row.date,
                amount: row.amount,
              });
            }
  
            resolve(expenses);
          } else {
            // If no rows exist, return an empty array
            resolve([]);
          }
        } catch (error) {
          console.error("Error during fetchExpenses:", error);
          reject(error);
        }
      });
    });
  
    return promise;
  }
  
  
  

export async function updateExpense(id, expenseData){
    database = await SQLite.openDatabaseAsync(ConstantsVars.DbName);
    const promise = new Promise((resolve, reject) => {
        database.withTransactionAsync(async () => {
            try {
              await database.execAsync(
                `UPDATE expenses SET description = ?, date = ?, amount = ? WHERE id = ?`,
                [expenseData.description, expenseData.date, expenseData.amount, id]
              );
              resolve();
            } catch (error) {
              reject(error);
            }
          });
    });
    return promise;
}

export async function deleteExpense(id){ 
    database = await SQLite.openDatabaseAsync(ConstantsVars.DbName);
    const promise = new Promise((resolve, reject) => {
        database.withTransactionAsync(async () => {
            try {
              await database.execAsync(
                `DELETE FROM expenses WHERE id = ?`,
                [id]
              );
              resolve();
            } catch (error) {
              reject(error);
            }
          });
    });
    return promise;
}