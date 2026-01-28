console.log("api.mjs loaded");

import express from "express";
import { validateBody } from "./middleware/validateBody.mjs";

export const apiRouter = express.Router();

const userStatus = {
  userId: "usr_1",
  displayName: "Kevin",
  status: "BUSY",
  updatedAt: new Date().toISOString(),
};

const groups = [];

apiRouter.post(
  "/groups",
  validateBody({
    name: {
      required: true,
      type: "string",
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
  }),
  (req, res) => {
    const name = req.body.name.trim();

    const group = {
      groupId: `G${groups.length + 1}`,
      name,
      memberCount: 1,
    };

    groups.push(group);

    res.status(201).json(group);
  }
);

apiRouter.put(
  "/status",
  validateBody({
    status: {
      required: true,
      type: "string",
      trim: true,
    },
  }),
  (req, res) => {
    console.log("STATUS BODY:", req.body);

    const allowedStatuses = ["FREE_NOW", "BUSY"];

    const newStatus = req.body.status.trim().toUpperCase();

    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({
        error: "Invalid status value",
        allowed: allowedStatuses,
      });
    }

    userStatus.status = newStatus;
    userStatus.updatedAt = new Date().toISOString();

    res.json({
      userId: userStatus.userId,
      displayName: userStatus.displayName,
      status: userStatus.status,
      updatedAt: userStatus.updatedAt,
    });
  }
);
