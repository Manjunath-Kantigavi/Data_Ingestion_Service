import jwt from 'jsonwebtoken';

// Secret key (should match the one in your .env file)
const JWT_SECRET = 'FfUZmpe0gTrCxo47CkZxSJZ2W7t0MzZ6Khcfj83lvnQ=';  // Replace with your own secret key

// Generate a token with user_id and role
const generateToken = (user_id, role) => {
    const payload = { user_id, role };  // Add role to the payload
    const options = { expiresIn: '1h' }; // Token valid for 1 hour
    return jwt.sign(payload, JWT_SECRET, options);
};

// Test token generation
const testUserId = '7';  // Replace with a test user ID
const testRole = 'user';  // Use 'officer' or 'user' based on the role you want to test
const token = generateToken(testUserId, testRole);

console.log('Generated JWT Token:', token);
