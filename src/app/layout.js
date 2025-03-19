import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css"; // If using Tailwind

export const metadata = {
  title: "Supabase Auth Dashboard",
  description: "User authentication with Next.js and Supabase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
