export const createPostTemplate = `
INSERT
INTO posts(
    title,
    body,
    userId,
    createdAt
)
VALUES (?, ?, ?, datetime('now'))
`;

export const deletePostTemplate = `
DELETE
FROM posts
WHERE id = ?
`;
