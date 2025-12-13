import { Prisma } from "../../../../generated/prisma/client.ts";
// Defino el mock de las sessiones de usuarios
export const sessionsMock: Prisma.sessionCreateManyInput[] = [
	{
		user_id: 1,
		is_active: true,
		looged_in_at: new Date("2025-12-12T08:00:00.000Z"),
		looged_out_at: null
	},
	{
		user_id: 2,
		is_active: false,
		looged_in_at: new Date("2025-11-30T09:15:00.000Z"),
		looged_out_at: new Date("2025-11-30T10:00:00.000Z")
	},
	{
		user_id: 3,
		is_active: false,
		looged_in_at: new Date("2025-10-05T14:00:00.000Z"),
		looged_out_at: new Date("2025-10-05T15:30:00.000Z")
	},
	{
		user_id: 4,
		is_active: true,
		looged_in_at: new Date("2025-12-01T07:45:00.000Z"),
		looged_out_at: null
	},
	{
		user_id: 5,
		is_active: false,
		looged_in_at: new Date("2025-09-10T20:10:00.000Z"),
		looged_out_at: new Date("2025-09-10T21:00:00.000Z")
	},
	{
		user_id: 6,
		is_active: true,
		looged_in_at: new Date("2025-12-10T12:30:00.000Z"),
		looged_out_at: null
	},
	{
		user_id: 7,
		is_active: false,
		looged_in_at: new Date("2025-08-02T05:00:00.000Z"),
		looged_out_at: new Date("2025-08-02T06:15:00.000Z")
	},
	{
		user_id: 8,
		is_active: false,
		looged_in_at: new Date("2025-11-20T11:20:00.000Z"),
		looged_out_at: new Date("2025-11-20T11:45:00.000Z")
	},
	{
		user_id: 9,
		is_active: true,
		looged_in_at: new Date("2025-12-11T22:10:00.000Z"),
		looged_out_at: null
	},
	{
		user_id: 10,
		is_active: false,
		looged_in_at: new Date("2024-12-01T09:00:00.000Z"),
		looged_out_at: new Date("2024-12-01T09:30:00.000Z")
	}
]