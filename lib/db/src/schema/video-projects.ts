import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const VIDEO_STATUSES = [
  "content",
  "scripted",
  "building",
  "ready",
  "scheduled",
  "published",
  "failed",
] as const;

export type VideoStatus = (typeof VIDEO_STATUSES)[number];

export const videoProjectsTable = pgTable("video_projects", {
  id: serial("id").primaryKey(),

  // Core metadata
  title: text("title").notNull(),
  topic: text("topic").notNull().default(""),

  // Scene 1 — Hook
  hookDate: text("hook_date").notNull().default(""),
  hookYear: text("hook_year").notNull().default(""),

  // Scene 2 — Image + headline
  scene2Headline: text("scene2_headline").notNull().default(""),
  scene2Subline: text("scene2_subline").notNull().default(""),

  // Scene 3
  scene3Headline: text("scene3_headline").notNull().default(""),
  scene3Body: text("scene3_body").notNull().default(""),

  // Scene 4
  scene4Headline: text("scene4_headline").notNull().default(""),
  scene4Body: text("scene4_body").notNull().default(""),

  // Scene 5
  scene5Headline: text("scene5_headline").notNull().default(""),
  scene5Body: text("scene5_body").notNull().default(""),

  // Scene 6 — CTA
  scene6Cta: text("scene6_cta").notNull().default(""),

  // Pipeline
  status: text("status").notNull().default("content"),
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),

  // Versioning
  version: integer("version").notNull().default(1),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertVideoProjectSchema = createInsertSchema(videoProjectsTable).omit({
  id: true,
  version: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVideoProject = z.infer<typeof insertVideoProjectSchema>;
export type VideoProject = typeof videoProjectsTable.$inferSelect;
