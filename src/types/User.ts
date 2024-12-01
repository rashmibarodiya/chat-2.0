import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string().nullable().optional(), 
  name: z.string().nullable().optional(), 
  profilePic: z.string().nullable().optional(),
//   createdAt: z.date().or(z.string()).transform((date) => new Date(date)), // Handle Date or string
//   updatedAt: z.date().nullable().or(z.string().nullable()).transform((date) => (date ? new Date(date) : null)), // Handle null or Date
  connectionStatus: z.string(),
});

export const UsersSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;
