The API receives data from users (ex: group name). If invalid input is accepted, it can create broken groups, crash endpoints, or force repeated validation logic across many routes. As the API grows, repeating validation in every route increases bugs and inconsistent error responses.

Solution:
A reusable Express middleware that validates request bodies based on a simple schema. If the request is invalid, it stops the request early and returns a consistent error response.

Example:
For POST /api/v1/groups, it ensures name exists, is a string, and is 2–30 characters.

Purpose

Validates incoming JSON request bodies so routes do not need repeated validation logic.

### Usage

import { validateBody } from "./middleware/validateBody.mjs";

apiRouter.post(
"/groups",
validateBody({
name: { required: true, type: "string", trim: true, minLength: 2, maxLength: 30 },
}),
(req, res) => {
res.json({ ok: true });
}
);

### Example error response

{
"error": "Validation failed",
"details": [
{ "field": "name", "error": "Must be at least 2 characters" }
]
}
