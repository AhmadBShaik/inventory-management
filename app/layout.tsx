import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "./context/products";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App } from "antd";
import { ShowModalContext, ShowModalProvider } from "./context/modal";

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
              <ShowModalProvider>
                <ProductsProvider>{children}</ProductsProvider>
              </ShowModalProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
