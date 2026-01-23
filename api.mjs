import express from "express";

export const apiRouter = express.Router();

const groups = [];

apiRouter.post("/groups", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      error: "Group name must be at least 2 characters",
    });
  }

  const group = {
    groupId: `G${groups.length + 1}`,
    name: name.trim(),
    memberCount: 1,
  };

  groups.push(group);

  res.status(201).json(group);
});
