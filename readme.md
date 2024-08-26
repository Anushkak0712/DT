
# Nudge Management API Documentation



## API Endpoints Overview
Below are the available API endpoints for handling nudges:

### Retrieve All Nudges
- **Request Type:** `GET`
- **Endpoint:** `/api/v1/nudges`
- **Description:** Fetches a list of all nudges created by the user.

### Fetch Nudge by ID
- **Request Type:** `GET`
- **Endpoint:** `/api/v1/nudges/:id`
- **Description:** Retrieves a specific nudge using its unique identifier.

### Create a New Nudge
- **Request Type:** `POST`
- **Endpoint:** `/api/v1/nudges`
- **Payload:**
  - `title` (string, required) - The title assigned to the nudge.
  - `image` (file, required) - The image file representing the nudge cover.
  - `sendTime` (string, required) - The scheduled time for the nudge to be sent.
  - `description` (string, required) - A detailed description of the nudge.
  - `icon` (string, optional) - An icon to visually represent the nudge.
  - `invitation` (string, optional) - A brief invitation message for the nudge.
- **Description:** Creates a new nudge with the specified details.

### Update Existing Nudge
- **Request Type:** `PUT`
- **Endpoint:** `/api/v1/nudges/:id`
- **Payload:**
  - `title` (string, optional) - The new title for the nudge.
  - `image` (file, optional) - The updated image file for the nudge cover.
  - `sendTime` (string, optional) - The updated time for sending the nudge.
  - `description` (string, optional) - The updated description of the nudge.
  - `icon` (string, optional) - The updated icon for the nudge.
  - `invitation` (string, optional) - The updated invitation message for the nudge.
- **Description:** Updates the specified nudge with the new information.

### Remove a Nudge
- **Request Type:** `DELETE`
- **Endpoint:** `/api/v1/nudges/:id`
- **Description:** Deletes the nudge identified by its unique ID.

## Nudge Object Data Model
The data structure for a nudge includes the following fields:
- `_id` (ObjectId) - A unique identifier for the nudge.
- `title` (string) - The title of the nudge.
- `image` (string) - The URL or file path for the nudge's cover image.
- `sendTime` (string) - The scheduled time for sending the nudge.
- `description` (string) - A detailed description of the nudge.
- `icon` (string) - The icon representing the nudge.
- `invitation` (string) - A brief invitation message for the nudge.

## API Usage Examples

### 1. Fetch All Nudges
- **Request:** `GET /api/v1/nudges`
- **Response:**
  - **Status:** `200 OK`
  - **Content-Type:** `application/json`
  ```json
  [
    {
      "_id": "609a1378a2b12c00153a79ae",
      "title": "Event Nudge 1",
      "image": "/uploads/nudge1.jpg",
      "sendTime": "2023-06-16T09:00:00Z",
      "description": "This is a nudge for Event 1",
      "icon": "event_icon",
      "invitation": "Join us for an exciting event!"
    },
    {
      "_id": "609a139fa2b12c00153a79af",
      "title": "Event Nudge 2",
      "image": "/uploads/nudge2.jpg",
      "sendTime": "2023-06-17T14:30:00Z",
      "description": "This is a nudge for Event 2",
      "icon": "event_icon",
      "invitation": "Don't miss out on the fun!"
    }
  ]```
### 2. Create a New Nudge
- **Request:** `POST /api/v1/nudges`
- **Payload:**
  ```json
  {
    "title": "Event Nudge 3",
    "image": "file_path_or_url",
    "sendTime": "2023-06-18T18:00:00Z",
    "description": "This is a nudge for Event 3",
    "icon": "event_icon",
    "invitation": "Join us for a memorable evening!"
  }
  ```
- **Response:**
    - **Status:** `200 OK`
    - **Content-Type:** `application/json`
    ```json
    {
        "_id": "609a13eca2b12c00153a79b0"
    }
    ```

### 3. Update Nudge by id
- **Request:** `PUT /api/v1/nudges/609a13eca2b12c00153a79b0`
- **Payload:**
  ```json
  {
    "title": "Updated Event Nudge 3",
    "sendTime": "2023-06-18T20:00:00Z"
  }

  ```
- **Response:**
    - **Status:** `200 OK`
    - **Content-Type:** `application/json`
    ```json
    {
        "modifiedCount": 1
    }

    ```

### 4. Delete Nudge by id
- **Request:** `DELETE /api/v1/nudges/609a13eca2b12c00153a79b0`

- **Response:**
    - **Status:** `200 OK`
    - **Content-Type:** `application/json`
    ```json
    {
        "deletedCount": 1
    }

    ```
    
