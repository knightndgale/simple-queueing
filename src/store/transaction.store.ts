import { create } from "zustand";
import { ClientSchema, StatusEnum, Transaction, TransactionTypeSchema } from "../zodSchema/transaction.schema";
import PersistorGate from "./persistorGate";

// Initial state of the store
const initialState: Transaction[] = [];
interface ITranscation {
  transactions: Transaction[];
  add: (transactionType: string) => void;
  next: (transactionType: string, number: number) => void;
  addClient: (transactionType: string, clientName: string) => void;
  resetSpecificTransaction: (transactionType: string) => void;
  archive: (transactionType: string) => void;
  getTransactions: () => Transaction[];
}

const useTransactionStore = create<ITranscation>()(
  PersistorGate<ITranscation>(
    (set, get) => ({
      transactions: initialState,
      getTransactions: () => get().transactions,
      add: (transactionType) => {
        const newTransaction: Transaction = TransactionTypeSchema.parse({
          transactionType,
          currentNumber: 0,
          clientList: [],
        });
        set((state) => ({
          transactions: [...state.transactions, { ...newTransaction, id: state.transactions.length + 1 }],
        }));
      },
      addClient: (transactionType, clientName) => {
        set(() => ({
          transactions: get().transactions.map((transaction) => {
            if (transaction.transactionType === transactionType) {
              const newClient = ClientSchema.parse({
                clientName,
                number: transaction.clientList.length + 1,
                status: StatusEnum.enum.waiting,
              });
              return {
                ...transaction,
                clientList: [...transaction.clientList, newClient],
                currentNumber: transaction.clientList.find((client) => client.status === "waiting")?.number || 1,
              };
            }
            return transaction;
          }),
        }));
      },

      next: (transactionType, number) => {
        set((state) => ({
          transactions: state.transactions.map((transaction) => {
            if (transaction.transactionType !== transactionType) {
              return transaction;
            }

            const updatedClientList = transaction.clientList.map((client) => {
              if (client.number === number) {
                return {
                  ...client,
                  status: StatusEnum.enum.done,
                };
              }
              return client;
            });

            return {
              ...transaction,
              currentNumber: transaction.currentNumber + 1,
              clientList: updatedClientList,
            };
          }),
        }));
      },

      resetSpecificTransaction: (transactionType) => {
        set((state) => ({
          transactions: state.transactions.map((transaction) => (transaction.transactionType === transactionType ? { ...transaction, currentNumber: 0, clientList: [] } : transaction)),
        }));
      },

      archive: (transactionType) => {
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.transactionType !== transactionType),
        }));
      },
    }),
    { name: "transaction" },
  ),
);

export default useTransactionStore;
