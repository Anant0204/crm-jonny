-- Insert default companies
INSERT INTO companies (id, name, currency, timezone, created_at, updated_at, is_deleted) 
VALUES 
(1, 'Demo Company', 'USD', 'UTC', NOW(), NOW(), 0),
(2, 'Acme Corporation', 'USD', 'America/New_York', NOW(), NOW(), 0)
ON DUPLICATE KEY UPDATE name=VALUES(name);
