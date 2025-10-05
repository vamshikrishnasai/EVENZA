import NavBar from "./navBar";
import { AppSidebar } from "./app-sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="flex pt-16">
        <AppSidebar />
        <div className="flex-1 pl-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
