import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Treatments
  app.get("/api/treatments", async (_req, res) => {
    try {
      const treatments = await storage.getAllTreatments();
      res.json(treatments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatments" });
    }
  });

  app.get("/api/treatments/:id", async (req, res) => {
    try {
      const treatment = await storage.getTreatmentById(req.params.id);
      if (!treatment) {
        return res.status(404).json({ error: "Treatment not found" });
      }
      res.json(treatment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treatment" });
    }
  });

  // Cities
  app.get("/api/cities", async (_req, res) => {
    try {
      const cities = await storage.getAllCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cities" });
    }
  });

  app.get("/api/cities/:id", async (req, res) => {
    try {
      const city = await storage.getCityById(req.params.id);
      if (!city) {
        return res.status(404).json({ error: "City not found" });
      }
      res.json(city);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch city" });
    }
  });

  // Appointments
  app.get("/api/appointments", async (_req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.getAppointmentById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointment" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid appointment data", details: error });
      }
      res.status(500).json({ error: "Failed to create appointment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
