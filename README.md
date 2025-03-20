# Next.js + Supabase Authentication Dashboard

## 📌 Overview

This project is a User Authentication Dashboard built using Next.js (App Router) and Supabase for authentication. Users can:

- Sign up with Email & Password (with email confirmation).
- Log in with Email & Password.
- Log in with Google OAuth.
- Reset their password if they forget it.
- View a protected dashboard after logging in.
- Log out securely.

🔗 **Try the Live Demo**: [Supabase Auth Dashboard](https://supabase-auth-dashboard-iota.vercel.app)


## 🚀 Features

### ✅ Authentication

- Email & Password Signup/Login (with error handling for existing accounts).
- Google OAuth Login (sign in with a Google account).
- Forgot Password Functionality (sends a reset link via email).
- Session Persistence (users stay logged in after refresh).

### ✅ Protected Routes

- Users cannot access the dashboard unless logged in.
- Redirects to `/login` if an unauthenticated user tries to access `/dashboard`.

### ✅ UI Enhancements

- Styled using `shadcn/ui` + Tailwind CSS.
- Responsive authentication forms.
- Dashboard UI with mock analytics cards & sidebar navigation.

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/nextjs-supabase-auth.git
cd nextjs-supabase-auth
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key  # (Used only in server-side API routes)
NEXT_PUBLIC_SUPABASE_REDIRECT_URL=https://your-vercel-deployment.vercel.app/dashboard
```

> **Note:** The `SUPABASE_SERVICE_ROLE_KEY` should never be exposed in the frontend.

### 4️⃣ Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Supabase Configuration

### Enable Authentication Providers

1. Go to **Supabase Dashboard → Authentication**.
2. Enable **Email/Password Authentication**.
3. Enable **Google OAuth**:
    - Create credentials in **Google Cloud Console**.
    - Set the redirect URI to:

      ```
      https://your-supabase-project.supabase.co/auth/v1/callback
      ```

    - Paste the Client ID & Secret into Supabase Google Provider Settings.

### Database Setup

#### Profiles Table (Automatically Created on Signup)

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT
);
```

#### Auto-Create Profile on Signup

```sql
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

## 🚀 Deployment to Vercel

1. Push code to GitHub:

    ```bash
    git add .
    git commit -m "Initial commit"
    git push origin main
    ```

2. Go to **Vercel → New Project → Import your GitHub repo**.
3. Set Environment Variables in **Vercel → Settings**.
4. Deploy! 🚀

## 🎯 Next Steps

- 🎨 Improve dashboard UI with user profile updates.
- 🔄 Add real-time database updates with Supabase subscriptions.
- 📊 Fetch real analytics data instead of mock cards.

## 📄 License

This project is licensed under the MIT License.
