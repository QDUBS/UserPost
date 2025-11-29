export const createPostTemplate = `
INSERT
INTO posts(
    title,
    body,
    user_id,
    created_at
)
VALUES (?, ?, ?, datetime('now'))
`;

export const deletePostTemplate = `
DELETE
FROM posts
WHERE id = ?
`;
