import type { Metadata } from 'next';
import Link from 'next/link'; // <-- This is the key import
import './globals.css';

// ... other code ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex gap-6">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
            <Link href="/recommendations" className="hover:underline">Recommendations</Link>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
