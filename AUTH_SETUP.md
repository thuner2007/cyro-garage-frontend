# Authentication Setup Guide

This document explains the authentication system implemented in the CyroGarage frontend.

## Overview

The application uses JWT-based authentication with a dedicated admin panel. The auth system integrates with the backend API at the configured `NEXT_PUBLIC_BACKEND_URL`.

## Components

### 1. Axios Instance (`src/lib/axios.ts`)

A centralized axios instance configured to:

- Use the backend URL from environment variables
- Automatically attach JWT tokens to requests via interceptors
- Handle 401 responses by clearing auth state and redirecting to login
- Support both localStorage and cookies for token storage

**Usage:**

```typescript
import axiosInstance from "@/lib/axios";

// Make authenticated requests
const response = await axiosInstance.get("/some-endpoint");
```

### 2. Auth Context (`src/contexts/AuthContext.tsx`)

Provides authentication state and methods throughout the app:

- `user` - Current user object (id, username, role)
- `isAuthenticated` - Boolean auth status
- `isLoading` - Loading state during initialization
- `login(username, password)` - Authenticate user
- `logout()` - Clear auth state and redirect

**Usage:**

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Use auth state...
}
```

### 3. Login Page (`src/app/login/page.tsx`)

User-friendly login form with:

- Username and password inputs
- Form validation
- Error handling
- Loading states
- Auto-redirect if already authenticated

**Access:** Navigate to `/login`

### 4. Admin Panel (`src/app/admin/page.tsx`)

Protected dashboard showing:

- User information
- Quick access cards for different admin sections
- Session details
- Logout functionality

**Access:** Navigate to `/admin` (requires authentication)

### 5. Middleware (`src/middleware.ts`)

Server-side route protection:

- Redirects unauthenticated users from `/admin/*` to `/login`
- Redirects authenticated users from `/login` to `/admin`
- Uses HTTP-only cookies for enhanced security

## Environment Setup

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:7777
```

> **Note:** The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js.

## Authentication Flow

1. **Login:**
   - User submits credentials at `/login`
   - Frontend sends POST to `/auth/login`
   - Backend returns JWT token and user data
   - Token stored in both localStorage and cookies
   - User redirected to `/admin`

2. **Authenticated Requests:**
   - Axios interceptor adds `Authorization: Bearer <token>` header
   - Backend validates token on protected endpoints

3. **Token Expiration:**
   - JWT tokens expire after 7 days
   - 401 responses trigger automatic logout
   - User redirected to `/login`

4. **Logout:**
   - Token removed from localStorage and cookies
   - User redirected to home page

## Backend API Endpoints

### Login

**Endpoint:** `POST /auth/login`

**Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (201):**

```json
{
  "access_token": "eyJhbGci...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN"
  }
}
```

**Error (401):**

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

## Security Features

1. **JWT Tokens:** Secure, stateless authentication
2. **HTTP-Only Cookies:** Protection against XSS attacks
3. **Automatic Token Refresh:** Tokens included in every request
4. **Route Protection:** Server-side middleware guards admin routes
5. **Client-Side Guards:** React hooks prevent UI access
6. **Automatic Logout:** On token expiration or unauthorized access

## Testing

Default credentials (if using standard backend):

- **Username:** `admin`
- **Password:** `admin123`

## Extending the Admin Panel

To add new admin sections:

1. Create new page in `src/app/admin/[section]/page.tsx`
2. Add card in main admin panel linking to new section
3. Use `useAuth()` hook to check authentication
4. Use `axiosInstance` for API calls

Example:

```typescript
"use client";

import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";

export default function ProductsPage() {
  const { user } = useAuth();

  const fetchProducts = async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
  };

  // Component implementation...
}
```

## Troubleshooting

### "Invalid credentials" error

- Verify backend is running at configured URL
- Check username/password are correct
- Confirm `/auth/login` endpoint is accessible

### Token not persisting

- Check browser localStorage (DevTools > Application > Storage)
- Verify cookies are being set (DevTools > Application > Cookies)
- Ensure `NEXT_PUBLIC_BACKEND_URL` is set correctly

### Infinite redirect loop

- Clear localStorage and cookies
- Check middleware configuration
- Verify token format matches backend expectations

### CORS errors

- Backend must allow requests from frontend origin
- Check CORS configuration on backend server

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── login/
│   │   └── page.tsx          # Login form
│   └── layout.tsx            # Root layout (wraps with AuthProvider)
├── contexts/
│   └── AuthContext.tsx       # Auth state management
├── lib/
│   └── axios.ts              # Configured axios instance
└── middleware.ts             # Route protection
```

## Next Steps

- Implement password reset functionality
- Add remember me option
- Integrate refresh token rotation
- Add role-based access control (RBAC)
- Implement session timeout warnings
