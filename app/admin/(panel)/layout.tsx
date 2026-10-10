import { Sidebar } from "../_components/Sidebar"

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="md:pl-60">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 md:py-10">{children}</div>
      </main>
    </>
  )
}
