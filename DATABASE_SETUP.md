# Database Setup

The contact form and chatbot send user enquiries to `/api/inquiries`.

## Production Storage

Use MongoDB Atlas for production. Set these variables on the Render backend service:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=portfolio
MONGODB_COLLECTION=inquiries
```

The backend stores each enquiry as one document in:

```text
portfolio.inquiries
```

## Vercel Frontend + Render Backend

On Render, create a Node Web Service with:

```bash
Build Command: npm install
Start Command: npm run api
```

After Render deploys, copy the service URL, for example:

```bash
https://your-service-name.onrender.com
```

On Vercel, set this frontend environment variable:

```bash
VITE_INQUIRY_API_BASE_URL=https://your-service-name.onrender.com
```

Redeploy Vercel after adding or changing this variable.

## Local Fallback

If `MONGODB_URI` is not set, enquiries are saved locally in:

```text
data/inquiries.jsonl
```
