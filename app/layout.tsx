import 'antd/dist/reset.css';
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body style={{
                margin: 0,
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: "#f5f5f5",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <header style={{
                    width: "100%",
                    padding: "16px 32px",
                    backgroundColor: "#001529", // màu giống Ant Design header
                    color: "white",
                    fontSize: "20px",
                    fontWeight: 600,
                    textAlign: "center"
                }}>
                    Photo Upload App
                </header>

                <main style={{
                    width: "100%",
                    maxWidth: "800px",
                    padding: "32px 16px",
                    flex: 1,
                    boxSizing: "border-box"
                }}>
                    {children}
                </main>

                <footer style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "16px",
                    fontSize: "14px",
                    color: "#888"
                }}>
                    &copy; 2025 Qode
                </footer>
            </body>
        </html>
    );
}
