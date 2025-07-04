# Debugging Infinite Loading Issue

## Problem
The Companies query on the Portfolio-V2 site is infinitely loading and never completes.

## Root Cause Analysis

The infinite loading is most likely caused by one of these issues:

### 1. **Backend Server Not Running** (Most Likely)
- The GraphQL endpoint is not accessible
- Frontend can't connect to the backend server
- Request times out or fails silently

### 2. **Environment Variables Not Configured**
- Missing or incorrect backend URL in .env file
- Wrong environment variable names
- Development vs production URL mismatch

### 3. **CORS Issues**
- Backend CORS configuration doesn't allow frontend origin
- Browser blocking cross-origin requests

### 4. **Network/Connection Issues**
- Firewall blocking the connection
- Wrong port or URL
- Backend server crashed or not responding

## Debugging Steps

### Step 1: Check Backend Server
1. Navigate to `bangsluke-backend-server` directory
2. Run: `npm run dev`
3. Verify server starts without errors
4. Check if server is accessible at: `http://localhost:5001/graphql`

### Step 2: Test GraphQL Endpoint
1. Open browser and go to: `http://localhost:5001/graphql`
2. You should see the GraphQL Playground
3. Try this test query:
```graphql
query TestQuery {
  companies {
    nodeId
    name
  }
}
```

### Step 3: Check Environment Variables
Ensure your `.env` file in Portfolio-V2 has:
```bash
DEV_NEXT_PUBLIC_APP_BACKEND_URL=http://localhost:5001/graphql
PROD_NEXT_PUBLIC_APP_BACKEND_URL=https://your-backend-url/graphql
```

### Step 4: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for error messages when the page loads
4. Check Network tab for failed requests

### Step 5: Use the BackendTest Component
The updated component now includes a `BackendTest` component that will:
- Show the endpoint being used
- Test the connection
- Display detailed error messages
- Provide troubleshooting steps

## Expected Behavior

### If Backend is Running Correctly:
- BackendTest component shows "✓ Connected"
- Companies load within a few seconds
- No errors in browser console

### If Backend is Not Running:
- BackendTest component shows "✗ Error"
- Error message: "Cannot connect to backend server"
- Companies section shows error with debugging steps

### If Environment Variables are Wrong:
- BackendTest component shows "✗ Error"
- Error message about endpoint not configured
- Check .env file configuration

## Common Solutions

### 1. Start Backend Server
```bash
cd bangsluke-backend-server
npm run dev
```

### 2. Fix Environment Variables
Create/update `.env` file in Portfolio-V2:
```bash
DEV_NEXT_PUBLIC_APP_BACKEND_URL=http://localhost:5001/graphql
PROD_NEXT_PUBLIC_APP_BACKEND_URL=https://your-backend-url/graphql
```

### 3. Check CORS Configuration
Ensure backend `.env` includes frontend URL:
```bash
DEV_CORS_ORIGINS=http://localhost:3000,http://localhost:4321,http://127.0.0.1:3000,http://127.0.0.1:4321
```

### 4. Restart Both Servers
1. Stop both frontend and backend servers
2. Start backend first: `npm run dev` (in bangsluke-backend-server)
3. Start frontend: `npm run dev` (in Portfolio-V2)

## Debugging Tools Added

1. **Timeout Protection**: Requests now timeout after 10 seconds
2. **Better Error Messages**: Specific error types are identified
3. **BackendTest Component**: Visual connection test
4. **Detailed Logging**: Console logs show exactly what's happening
5. **Environment Variable Display**: Shows which endpoint is being used

## Next Steps

1. Start the backend server
2. Check the BackendTest component on the page
3. Look at browser console for detailed logs
4. Follow the error messages and debugging steps
5. If still having issues, check the specific error message for targeted solutions 