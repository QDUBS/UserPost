import swaggerJSDoc from "swagger-jsdoc";
import { OpenAPIV3 } from "openapi-types";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Users & Posts API",
      version: "1.0.0",
      description:
        "API for users and posts featuring pagination, create, and delete operations.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3001",
      },
    ],
  },
  apis: [],
};

const spec = swaggerJSDoc(options) as OpenAPIV3.Document;

spec.paths = {
  "/users": {
    get: {
      summary: "Get paginated users",
      parameters: [
        {
          name: "pageNumber",
          in: "query",
          schema: { type: "integer", default: 0, minimum: 0 },
          description: "Zero-based page number",
        },
        {
          name: "pageSize",
          in: "query",
          schema: { type: "integer", default: 4, minimum: 1 },
          description: "Page size",
        },
      ],
      responses: {
        "200": {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
        "400": { description: "Invalid page params" },
      },
    },
  },
  "/users/count": {
    get: {
      summary: "Get total users count",
      responses: {
        "200": {
          description: "Count object",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { count: { type: "integer" } },
              },
            },
          },
        },
      },
    },
  },
  "/users/{id}": {
    get: {
      summary: "Get single user",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "User ID to filter user's posts",
        },
      ],
      responses: {
        "200": {
          description: "Single user object",
          content: {
            "application/json": {
              schema: {
                type: "object",
              },
            },
          },
        },
        "400": { description: "userId is required" },
      },
    },
  },
  "/posts/user/{userId}": {
    get: {
      summary: "Get posts for a user",
      parameters: [
        {
          name: "userId",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "User ID to filter user's posts",
        },
      ],
      responses: {
        "200": {
          description: "Array of posts",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Post" },
              },
            },
          },
        },
        "400": { description: "userId is required" },
      },
    },
  },
  "/posts": {
    post: {
      summary: "Create a post for a user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                body: { type: "string" },
                userId: { type: "integer" },
              },
              required: ["title", "body", "userId"],
            },
            example: { title: "My title", body: "Post body", userId: 2 },
          },
        },
      },
      responses: {
        "201": {
          description: "Created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  id: { type: "integer" },
                },
              },
            },
          },
        },
        "400": { description: "Validation error" },
      },
    },
  },
  "/posts/{id}": {
    delete: {
      summary: "Delete a post by id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        "200": { description: "Deleted" },
        "400": { description: "Invalid post id" },
        "404": { description: "Post not found" },
      },
    },
  },
};

// Components
spec.components = {
  schemas: {
    User: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        phone: { type: "string" },
        address: {
          type: "object",
          nullable: true,
          properties: {
            id: { type: "integer" },
            street: { type: "string" },
            suite: { type: "string" },
            city: { type: "string" },
            zipcode: { type: "string" },
          },
          required: [],
        },
        formattedAddress: { type: "string", nullable: true },
      },
      required: ["id", "name", "username", "email", "phone"],
    } as OpenAPIV3.SchemaObject,

    Post: {
      type: "object",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        body: { type: "string" },
        userId: { type: "integer" },
        createdAt: { type: "string", format: "date-time", nullable: true },
      },
      required: ["id", "title", "body", "userId"],
    } as OpenAPIV3.SchemaObject,
  },
};

export default spec;
