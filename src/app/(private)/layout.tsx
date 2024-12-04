import Navbar from "./navbar/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
    </main>
  );
}
