# ACCN Hub - Production Deployment Checklist

## Pre-Deployment

### Security
- [ ] Change all default passwords and secrets
- [ ] Generate strong JWT_SECRET (64+ characters)
- [ ] Set NODE_ENV=production in environment
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure CORS for production domain only
- [ ] Review and restrict MongoDB access (IP whitelist)
- [ ] Enable MongoDB authentication
- [ ] Rotate all API keys
- [ ] Remove or secure development endpoints
- [ ] Review error messages (no sensitive data exposure)

### Code Quality
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Update all dependencies to latest stable versions
- [ ] Remove console.log statements (use logger instead)
- [ ] Remove debug code and comments
- [ ] Run tests (once implemented)
- [ ] Check for hardcoded credentials

### Configuration
- [ ] Set up production `.env` file
- [ ] Configure email service (SMTP)
- [ ] Set up file storage (local or cloud)
- [ ] Configure proper backup strategy
- [ ] Set up monitoring and alerting
- [ ] Configure log rotation
- [ ] Set resource limits (memory, CPU)

### Database
- [ ] Create production database backup
- [ ] Set up automated backups
- [ ] Create database indexes for performance
- [ ] Review and optimize queries
- [ ] Set up database monitoring
- [ ] Configure connection pooling
- [ ] Plan for database migrations

## Deployment Steps

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (v16+)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install nginx for reverse proxy
sudo apt install -y nginx

# Install certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Application Setup
```bash
# Clone repository
git clone git@github.com:DawitLam/ACCN-Hub.git
cd ACCN-Hub

# Install dependencies
npm install --production

# Create production .env file
nano .env
# Add all production environment variables

# Test application
npm start
```

### 3. PM2 Configuration
```bash
# Create PM2 ecosystem file
pm2 ecosystem

# Start application with PM2
pm2 start backend/server.js --name accn-hub

# Configure PM2 to restart on system boot
pm2 startup
pm2 save

# View logs
pm2 logs accn-hub
```

### 4. Nginx Configuration
```nginx
# /etc/nginx/sites-available/accn-hub
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/accn-hub /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 5. SSL Certificate
```bash
# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 6. Firewall Configuration
```bash
# Enable firewall
sudo ufw enable

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny direct access to Node.js port
sudo ufw deny 3000/tcp

# Check status
sudo ufw status
```

## Post-Deployment

### Verification
- [ ] Test all authentication flows
- [ ] Verify course enrollment works
- [ ] Test lesson viewing and completion
- [ ] Check progress tracking
- [ ] Verify email notifications work
- [ ] Test on multiple devices/browsers
- [ ] Verify SSL certificate is valid
- [ ] Check security headers
- [ ] Test rate limiting
- [ ] Verify database connections

### Monitoring
- [ ] Set up server monitoring (CPU, memory, disk)
- [ ] Configure application logging
- [ ] Set up error alerting
- [ ] Monitor database performance
- [ ] Set up uptime monitoring
- [ ] Configure backup verification

### Documentation
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document backup/restore procedures
- [ ] Create incident response plan
- [ ] Document rollback procedures

## Maintenance

### Daily
- Check error logs
- Monitor server resources
- Review security alerts

### Weekly
- Review application logs
- Check backup integrity
- Monitor user activity

### Monthly
- Update dependencies (`npm audit`, `npm update`)
- Review security patches
- Test backup restoration
- Review and rotate logs
- Update SSL certificates (if needed)

### Quarterly
- Security audit
- Performance review
- Database optimization
- Review and update documentation

## Rollback Procedure

If issues occur after deployment:

```bash
# Stop current application
pm2 stop accn-hub

# Switch to previous version
git checkout <previous-commit-hash>

# Install dependencies
npm install

# Restart application
pm2 restart accn-hub

# Restore database if needed
mongorestore --uri="mongodb://..." /path/to/backup
```

## Performance Optimization

### Application
- Enable gzip compression in nginx
- Implement caching strategy
- Optimize database queries
- Use CDN for static assets
- Implement lazy loading

### Database
- Create indexes on frequently queried fields
- Implement connection pooling
- Use projection to limit returned fields
- Implement pagination for large datasets

### Server
- Configure proper swap space
- Optimize nginx worker processes
- Implement reverse proxy caching
- Use PM2 cluster mode for multi-core utilization

## Support Contacts

- **Technical Lead**: [Contact Info]
- **Database Admin**: [Contact Info]
- **Security Team**: [Contact Info]
- **Hosting Provider**: [Provider Info]

## Emergency Contacts

In case of critical issues:
1. Contact technical lead immediately
2. If unavailable, contact [Backup Contact]
3. Check incident response documentation
4. Access emergency runbook at: [Location]

---

Last Updated: December 1, 2025
