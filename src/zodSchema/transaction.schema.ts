import * as z from "zod";

export const StatusEnum = z.enum(["done", "waiting"]);

export type Status = z.infer<typeof StatusEnum>;

export const ClientSchema = z.object({
  id: z.string().optional(),
  clientName: z.string({ required_error: "Name is required!" }),
  number: z.number({ required_error: "Number is required" }),
  status: StatusEnum,
});

export type Client = z.infer<typeof ClientSchema>;
export const TransactionTypeSchema = z.object({
  id: z.number().optional(),
  transactionType: z.string({ required_error: "Transaction Type is Required" }),
  currentNumber: z.number(),
  clientList: z.array(ClientSchema),
});

export type Transaction = z.infer<typeof TransactionTypeSchema>;
