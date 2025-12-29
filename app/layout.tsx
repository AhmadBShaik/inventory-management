import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App, ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CurrentPageProvider } from "./context/currentPage";
import { ShowModalProvider } from "./context/modal";
import { ProductsProvider } from "./context/products";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Admin Portal for managing inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#7c3aed',
                borderRadius: 12,
              },
              components: {
                Table: {
                  headerBg: '#f9fafb',
                  colorBgContainer: '#ffffff',
                },
              },
            }}
          >
            <App>
              <CurrentPageProvider>

                <ShowModalProvider>
                  <ProductsProvider>{children}</ProductsProvider>
                </ShowModalProvider>
              </CurrentPageProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
