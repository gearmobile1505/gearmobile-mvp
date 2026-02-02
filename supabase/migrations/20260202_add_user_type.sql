-- Add user_type column to users table
ALTER TABLE users 
ADD COLUMN user_type TEXT DEFAULT 'customer' 
CHECK (user_type IN ('customer', 'renter', 'both'));

-- Add comment for documentation
COMMENT ON COLUMN users.user_type IS 'User type: customer (rent only), renter (list tools), or both';

-- Update existing users to default customer type if NULL
UPDATE users SET user_type = 'customer' WHERE user_type IS NULL;
