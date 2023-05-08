import "./globals.scss";
import Navbar from "@/components/Navbar";
import Provider from "./Provider";

export const metadata = {
  title: "Movie Match",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>
      <body>
        <Provider>
          <Navbar></Navbar>
          <div className="px-4 mt-2">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
