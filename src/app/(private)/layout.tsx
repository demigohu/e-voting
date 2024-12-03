import Navbar from "./navbar/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen">
      <Navbar />
      {children}
    </main>
  );
}
