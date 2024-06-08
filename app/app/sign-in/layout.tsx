export const metadata = {
  title: 'DoctorMe',
  description: 'Gerenciador pessoal de consultas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
