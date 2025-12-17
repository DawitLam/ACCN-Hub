# Security Documentation

## Overview
This document outlines the security measures implemented in ACCN Hub to protect user data and ensure system integrity.

## Authentication & Authorization

### Password Security
- **Hashing Algorithm**: bcrypt with salt rounds of 12
- **Minimum Password Requirements**:
  - At least 8 characters
  - One uppercase letter
  - One lowercase letter
  - One number
  - Special characters recommended but not required

### JWT Tokens
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Expiration**: 7 days (configurable via JWT_EXPIRE environment variable)
- **Token Claims**: Includes user ID, role, issuer, and audience
- **Storage**: Client-side in localStorage (consider httpOnly cookies for production)

### Role-Based Access Control (RBAC)
- **Roles**: student, instructor, admin
- **Middleware**: `protect` (authentication) and `authorize` (role checking)
- **Protected Routes**: All API endpoints except login/register

## Security Headers

The following security headers are set on all responses:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Rate Limiting

### Authentication Endpoints
- **Limit**: 5 requests per 15 minutes per IP
- **Applies to**: /api/auth/login, /api/auth/register
- **Purpose**: Prevent brute force attacks

### API Endpoints
- **Limit**: 100 requests per 15 minutes per IP
- **Applies to**: All /api/* routes
- **Purpose**: Prevent abuse and DoS attacks

**Note**: For production, implement Redis-based rate limiting for better scalability.

## Input Validation

### Server-Side Validation
All user inputs are validated using express-validator:
- Email format validation and normalization
- String length restrictions
- Character whitelist for names
- Enum validation for predefined fields
- MongoDB ObjectId format validation

### Sanitization
- Trim whitespace from inputs
- Normalize email addresses
- Escape HTML in user-generated content (to be implemented)

## Database Security

### MongoDB Best Practices
- Connection pooling (max 10 connections)
- Proper indexing for performance
- No raw queries - using Mongoose ORM
- Parameterized queries to prevent NoSQL injection

### Sensitive Data
- Passwords: Never stored in plain text, always hashed with bcrypt
- JWT Secret: Stored in environment variables only
- API Keys: Stored in environment variables, never committed to repository

## CORS Configuration

### Current Settings
- **Origin**: Configurable via FRONTEND_URL environment variable
- **Credentials**: Enabled for cookie-based authentication
- **Methods**: GET, POST, PUT, PATCH, DELETE
- **Production**: Restrict to specific domain only

## File Upload Security (Future Implementation)

### Recommended Measures
- File type validation (whitelist allowed types)
- File size limits (10MB default)
- Virus scanning for uploaded files
- Store files outside web root
- Generate random filenames to prevent overwriting
- Validate file content, not just extension

## Error Handling

### Production Mode
- Generic error messages to users
- Detailed logs stored securely
- Stack traces hidden from API responses

### Development Mode
- Detailed error messages for debugging
- Stack traces included in responses
- Console logging for immediate feedback

## Logging

### What Gets Logged
- Authentication attempts (success and failure)
- API errors with request context
- Database connection issues
- Unhandled exceptions

### Log Storage
- Development: Console output
- Production: Daily log files in `/logs` directory
- Log Rotation: Manual (implement automated rotation for production)

### Log Contents
- Timestamp
- Log level (ERROR, WARN, INFO, DEBUG)
- Message
- Metadata (user ID, IP, URL, method)
- Stack trace for errors

## Environment Variables

### Required
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Secret key for signing JWTs (min 32 characters)
- `NODE_ENV`: development or production

### Security Notes
- Never commit `.env` file to repository
- Use strong, random values for secrets
- Rotate secrets periodically
- Use different values for development and production

## Recommendations for Production Deployment

### Immediate Actions
1. **HTTPS Only**: Deploy behind reverse proxy (nginx) with SSL/TLS
2. **Environment**: Set NODE_ENV=production
3. **Secrets**: Generate strong, unique JWT_SECRET (64+ characters)
4. **Database**: Use MongoDB Atlas with IP whitelisting
5. **CORS**: Restrict to production domain only

### Additional Security Measures
1. **Helmet.js**: Add comprehensive security headers
2. **Redis**: Implement Redis-based rate limiting
3. **Session Management**: Consider httpOnly, secure cookies for tokens
4. **CSP**: Implement Content Security Policy headers
5. **Dependency Scanning**: Regular npm audit and updates
6. **Monitoring**: Set up application monitoring (e.g., PM2, New Relic)
7. **Backup**: Automated database backups
8. **Firewall**: Configure server firewall rules
9. **DDoS Protection**: Use services like Cloudflare
10. **Security Audits**: Regular penetration testing

### MongoDB Security Checklist
- [ ] Enable authentication
- [ ] Use network encryption
- [ ] Restrict IP addresses
- [ ] Enable audit logging
- [ ] Regular backups
- [ ] Use role-based access control
- [ ] Keep MongoDB updated

### Code Security Best Practices
- [ ] No hardcoded secrets
- [ ] Input validation on all endpoints
- [ ] Parameterized database queries
- [ ] Rate limiting on all endpoints
- [ ] Error handling middleware
- [ ] Secure password reset flow (to be implemented)
- [ ] Two-factor authentication (future feature)

## Incident Response

### In Case of Security Breach
1. Immediately rotate all secrets (JWT_SECRET, database credentials)
2. Review logs for unauthorized access
3. Force logout all users by changing JWT_SECRET
4. Notify affected users
5. Patch the vulnerability
6. Update dependencies
7. Conduct security audit

## Contact

For security concerns or to report vulnerabilities, contact the development team immediately.

## Last Updated
December 1, 2025
