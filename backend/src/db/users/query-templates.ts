export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectSingleUserTemplate = `
SELECT *
FROM users
WHERE id = ?
ORDER BY id
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

export const selectAddressTemplate = `
SELECT *
FROM addresses
WHERE userId = ? OR user_id = ?
LIMIT 1
`;