import { Router, type IRouter } from "express";
import { db, videoProjectsTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import {
  ListProjectsQueryParams,
  CreateProjectBody,
  GetProjectParams,
  UpdateProjectParams,
  UpdateProjectBody,
  DeleteProjectParams,
  UpdateProjectStatusParams,
  UpdateProjectStatusBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

// ── GET /projects ────────────────────────────────────────────────────
router.get("/projects", async (req, res) => {
  try {
    const parsed = ListProjectsQueryParams.safeParse(req.query);
    const status =
      parsed.success && parsed.data.status ? parsed.data.status : undefined;

    const projects = await db
      .select()
      .from(videoProjectsTable)
      .where(status ? eq(videoProjectsTable.status, status) : undefined)
      .orderBy(desc(videoProjectsTable.updatedAt));

    res.json(projects);
  } catch {
    res.status(500).json({ error: "Failed to list projects" });
  }
});

// ── GET /projects/stats ──────────────────────────────────────────────
// NOTE: must be defined BEFORE /projects/:id to avoid Express route conflict
router.get("/projects/stats", async (_req, res) => {
  try {
    const all = await db.select().from(videoProjectsTable);

    const byStatus = {
      draft: 0,
      review: 0,
      approved: 0,
      scheduled: 0,
      published: 0,
    };
    for (const p of all) {
      const s = p.status as keyof typeof byStatus;
      if (s in byStatus) byStatus[s]++;
    }

    const recentlyUpdated = await db
      .select()
      .from(videoProjectsTable)
      .orderBy(desc(videoProjectsTable.updatedAt))
      .limit(5);

    res.json({ total: all.length, byStatus, recentlyUpdated });
  } catch {
    res.status(500).json({ error: "Failed to get stats" });
  }
});

// ── POST /projects ───────────────────────────────────────────────────
router.post("/projects", async (req, res) => {
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [project] = await db
      .insert(videoProjectsTable)
      .values({
        title: parsed.data.title,
        topic: parsed.data.topic ?? "",
        hookDate: parsed.data.hookDate ?? "",
        hookYear: parsed.data.hookYear ?? "",
        scene2Headline: parsed.data.scene2Headline ?? "",
        scene2Subline: parsed.data.scene2Subline ?? "",
        scene3Headline: parsed.data.scene3Headline ?? "",
        scene3Body: parsed.data.scene3Body ?? "",
        scene4Headline: parsed.data.scene4Headline ?? "",
        scene4Body: parsed.data.scene4Body ?? "",
        scene5Headline: parsed.data.scene5Headline ?? "",
        scene5Body: parsed.data.scene5Body ?? "",
        scene6Cta: parsed.data.scene6Cta ?? "",
        status: parsed.data.status ?? "draft",
        scheduledAt: parsed.data.scheduledAt
          ? new Date(parsed.data.scheduledAt)
          : null,
      })
      .returning();

    res.status(201).json(project);
  } catch {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ── GET /projects/:id ────────────────────────────────────────────────
router.get("/projects/:id", async (req, res) => {
  const params = GetProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const [project] = await db
      .select()
      .from(videoProjectsTable)
      .where(eq(videoProjectsTable.id, params.data.id));

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch {
    res.status(500).json({ error: "Failed to get project" });
  }
});

// ── PUT /projects/:id ────────────────────────────────────────────────
router.put("/projects/:id", async (req, res) => {
  const params = UpdateProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const body = UpdateProjectBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  try {
    const [project] = await db
      .update(videoProjectsTable)
      .set({
        ...(body.data.title !== undefined && { title: body.data.title }),
        ...(body.data.topic !== undefined && { topic: body.data.topic }),
        ...(body.data.hookDate !== undefined && { hookDate: body.data.hookDate }),
        ...(body.data.hookYear !== undefined && { hookYear: body.data.hookYear }),
        ...(body.data.scene2Headline !== undefined && { scene2Headline: body.data.scene2Headline }),
        ...(body.data.scene2Subline !== undefined && { scene2Subline: body.data.scene2Subline }),
        ...(body.data.scene3Headline !== undefined && { scene3Headline: body.data.scene3Headline }),
        ...(body.data.scene3Body !== undefined && { scene3Body: body.data.scene3Body }),
        ...(body.data.scene4Headline !== undefined && { scene4Headline: body.data.scene4Headline }),
        ...(body.data.scene4Body !== undefined && { scene4Body: body.data.scene4Body }),
        ...(body.data.scene5Headline !== undefined && { scene5Headline: body.data.scene5Headline }),
        ...(body.data.scene5Body !== undefined && { scene5Body: body.data.scene5Body }),
        ...(body.data.scene6Cta !== undefined && { scene6Cta: body.data.scene6Cta }),
        ...(body.data.status !== undefined && { status: body.data.status }),
        ...(body.data.scheduledAt !== undefined && {
          scheduledAt: body.data.scheduledAt ? new Date(body.data.scheduledAt) : null,
        }),
        version: sql`${videoProjectsTable.version} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(videoProjectsTable.id, params.data.id))
      .returning();

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// ── DELETE /projects/:id ─────────────────────────────────────────────
router.delete("/projects/:id", async (req, res) => {
  const params = DeleteProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const [deleted] = await db
      .delete(videoProjectsTable)
      .where(eq(videoProjectsTable.id, params.data.id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// ── PATCH /projects/:id/status ───────────────────────────────────────
router.patch("/projects/:id/status", async (req, res) => {
  const params = UpdateProjectStatusParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const body = UpdateProjectStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  try {
    const [project] = await db
      .update(videoProjectsTable)
      .set({
        status: body.data.status,
        version: sql`${videoProjectsTable.version} + 1`,
        updatedAt: new Date(),
        ...(body.data.status === "published" && { publishedAt: new Date() }),
        ...(body.data.scheduledAt !== undefined && {
          scheduledAt: body.data.scheduledAt
            ? new Date(body.data.scheduledAt)
            : null,
        }),
      })
      .where(eq(videoProjectsTable.id, params.data.id))
      .returning();

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch {
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
