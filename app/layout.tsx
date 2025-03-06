import type React from "react"
import "@mantine/core/styles.css"
import {
    AppShell,
    AppShellHeader,
    AppShellMain,
    ColorSchemeScript,
    mantineHtmlProps,
    MantineProvider
} from "@mantine/core"
import { theme } from "@/theme"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import { SharedDataProvider } from "@/contexts/shared-data";

export const metadata: Metadata = {
    title: "EssentialsX",
    description: "The essential plugin suite for Minecraft servers",
}

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" {...mantineHtmlProps}>
        <head>
            <ColorSchemeScript/>
            <link rel="icon" href="/logo.svg"/>
        </head>
        <body>
        <SharedDataProvider>
            <MantineProvider theme={theme}>
                <AppShell header={{height: 80}}>
                    <AppShellHeader withBorder={false}>
                        <Header/>
                    </AppShellHeader>
                    <AppShellMain>
                        {children}
                        <Footer/>
                    </AppShellMain>
                </AppShell>
            </MantineProvider>
        </SharedDataProvider>
        </body>
        </html>
    )
}

