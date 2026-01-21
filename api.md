## Friend Availability API

Base URL: /api/v1

## What this API is for

This API is for a friend-group app where someone can press “I’m free” inside a group.
Other people in the group can respond with quick options like:

- Free in 15 minutes
- Free in 30 minutes
- Free tonight

## The API stores groups, members and status

---

## GET /groups

Returns groups the current user is a member of.

Response

```json
{ "id": "G1", "name": "Game session?", "memberCount": 4 }
```

---

### POST /groups

Creates a new group

Request

```json
{ "name": "Going out?" }


Response

{ "id": "G2", "name": "Going out?", "memberCount": 1 }
```

---

### Post /groups/:groudid/members

Adds a user to a group

Request

```json
{ "userId": "FM"}

Response

{ "groupId": "G2", "userId": "FM"}


```

---

### PUT /status

Updates the current user´s availability status
