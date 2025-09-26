import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from './providers/ThemeProvider';
import { CommandPaletteProvider } from './providers/CommandPaletteProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'AEGIS — Open Health OS | AE Apps',
  description: 'AEGIS unifies Finance, People, Supply, Web, Outreach and Clinical operations in one audited, AI-native platform.',
  keywords: ['Healthcare', 'Management', 'AEGIS', 'Social Care', 'AI'],
  authors: [{ name: 'AE Apps' }],
  openGraph: {
    title: 'AEGIS — Open Health OS | AE Apps',
    description: 'From AE Finance to AE People and AE Supply — one platform, compliant and AI-ready.',
    siteName: 'AEGIS',
    type: 'website',
  },
  twitter: {
    title: 'AEGIS — Open Health OS | AE Apps',
    description: 'All your operations in one AEGIS.',
    card: 'summary_large_image',
  },
  robots: {
    index: false, // Production: set to true
    follow: false, // Production: set to true
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-inter antialiased`}>
        <ThemeProvider>
          <CommandPaletteProvider>
            {children}
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}