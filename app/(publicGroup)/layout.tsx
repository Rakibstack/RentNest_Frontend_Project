
export default function publicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
        
      {children}
    </div>  
  )
}

