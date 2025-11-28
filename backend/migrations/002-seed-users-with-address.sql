-- seed a sample user and address if username not exists
INSERT INTO users (name, username, email, phone)
SELECT 'Jane Doe', 'jane', 'jane@example.com', '555-0101'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'jane');

-- now insert address for that user if not exists
INSERT INTO addresses (userId, street, suite, city, zipcode)
SELECT u.id, '123 Example St', 'Apt 4B', 'Sampletown', '12345'
FROM users u
WHERE u.username = 'jane'
  AND NOT EXISTS (SELECT 1 FROM addresses a WHERE a.userId = u.id);
