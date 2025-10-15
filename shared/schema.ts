import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Treatment categories
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),
});

// Individual treatments
export const treatments = pgTable("treatments", {
  id: varchar("id").primaryKey(),
  categoryId: varchar("category_id").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  benefits: text("benefits").array().notNull(),
  duration: integer("duration").notNull(), // in minutes
  price: integer("price").notNull(), // in cents
  imageUrl: text("image_url"),
});

// Supported cities
export const cities = pgTable("cities", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull().default("USA"),
  region: text("region").notNull(), // e.g., "West Coast", "East Coast"
});

// Appointments
export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey(),
  treatmentId: varchar("treatment_id").notNull(),
  cityId: varchar("city_id").notNull(),
  streetAddress: text("street_address").notNull(),
  aptSuite: text("apt_suite"),
  specialInstructions: text("special_instructions"),
  appointmentDate: text("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertTreatmentSchema = createInsertSchema(treatments).omit({ id: true });
export const insertCitySchema = createInsertSchema(cities).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ 
  id: true, 
  createdAt: true,
  status: true 
}).extend({
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Types
export type Category = typeof categories.$inferSelect;
export type Treatment = typeof treatments.$inferSelect;
export type City = typeof cities.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;
export type InsertCity = z.infer<typeof insertCitySchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
