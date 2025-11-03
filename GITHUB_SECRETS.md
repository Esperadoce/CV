# 🔐 GitHub Secrets Configuration

Add these secrets to enable automatic deployment: `https://github.com/Esperadoce/CV/settings/secrets/actions`

## Required Secrets

### 1. DOCKERHUB_USERNAME
```
Value: esperadoce
```
Your Docker Hub username

---

### 2. DOCKERHUB_TOKEN
Create a token at: https://hub.docker.com/settings/security

Steps:
1. Login to Docker Hub
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Name: `GitHub Actions CV`
5. Permissions: Read, Write, Delete
6. Generate and copy the token
7. Add as GitHub secret

---

### 3. SSH_HOST
```
Value: your-server-ip-or-domain
Example: 123.45.67.89
Example: server.yourdomain.com
```

---

### 4. SSH_USER
```
Value: your-ssh-username
Example: ubuntu
Example: root
```

---

### 5. SSH_KEY
Your private SSH key (entire content)

**Generate new SSH key pair:**
```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions-cv" -f ~/.ssh/github_actions_cv

# Copy public key to server
ssh-copy-id -i ~/.ssh/github_actions_cv.pub user@your-server

# Display private key (copy everything including BEGIN/END lines)
cat ~/.ssh/github_actions_cv
```

Copy the output and add as GitHub secret. Should look like:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
...
-----END OPENSSH PRIVATE KEY-----
```

---

### 6. SSH_PORT
```
Value: 22
```
Default SSH port (omit if using 22)

---

### 7. SSH_KNOWN_HOSTS
Get your server's SSH fingerprint:

```bash
ssh-keyscan -H your-server-ip-or-domain
```

Copy the output. Should look like:
```
|1|abc123...= ssh-ed25519 AAAAC3Nza...
```

---

## 🔍 How to Add Secrets

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter **Name** and **Secret value**
6. Click **Add secret**
7. Repeat for all secrets above

---

## ✅ Verify Secrets

After adding all secrets, you should see:
- ✅ DOCKERHUB_USERNAME
- ✅ DOCKERHUB_TOKEN
- ✅ SSH_HOST
- ✅ SSH_USER
- ✅ SSH_KEY
- ✅ SSH_PORT
- ✅ SSH_KNOWN_HOSTS

---

## 🧪 Test Deployment

1. Go to **Actions** tab
2. Click **CI/CD** workflow
3. Click **Run workflow** → **Run workflow**
4. Watch the deployment process

If successful:
- ✅ Build and push step completes
- ✅ Deploy step connects via SSH
- ✅ New image is pulled and container restarts
- ✅ Your CV is live on your server!

---

## 🐛 Troubleshooting

### DOCKERHUB_TOKEN invalid
- Create a new token at Docker Hub
- Update the secret in GitHub

### SSH connection failed
- Verify SSH_HOST is correct
- Verify SSH_USER is correct
- Test manual connection: `ssh user@your-server`

### SSH_KEY permission denied
- Ensure you copied the **private** key
- Ensure public key is on the server in `~/.ssh/authorized_keys`
- Test: `ssh -i ~/.ssh/github_actions_cv user@your-server`

### SSH_KNOWN_HOSTS error
- Run `ssh-keyscan -H your-server-ip` again
- Copy the output to SSH_KNOWN_HOSTS secret

### Deploy step fails
- SSH to your server
- Verify `/opt/cv` directory exists
- Verify `docker-compose.yml` is present
- Check logs: `docker logs cv-website`

---

## 📝 Quick Copy-Paste Commands

### Generate SSH key
```bash
ssh-keygen -t ed25519 -C "github-actions-cv" -f ~/.ssh/github_actions_cv
ssh-copy-id -i ~/.ssh/github_actions_cv.pub user@your-server
cat ~/.ssh/github_actions_cv
```

### Get SSH known hosts
```bash
ssh-keyscan -H your-server-ip-or-domain
```

### Test SSH connection
```bash
ssh -i ~/.ssh/github_actions_cv user@your-server
```

---

**Ready?** Add all secrets and push to master to trigger automatic deployment! 🚀
