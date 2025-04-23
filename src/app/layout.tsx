import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'A collection of tools and apps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'Arial, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* Header Section */}
        <header
          style={{
            padding: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Link href={'/'}>
            <h1 style={{ margin: 0, fontSize: '1.8rem' }}>My Projects</h1>
          </Link>
        </header>

        {/* Main Content Section */}
        <main
          style={{
            flex: 1,
            padding: '2rem',
            maxWidth: '700px',
            margin: '0 auto',
            marginTop: '2rem',
            marginBottom: '2rem',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          {children}
        </main>

        {/* Footer Section */}
        <footer
          style={{
            padding: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} My Projects</p>
        </footer>
      </body>
    </html>
  );
}
