import { Outlet } from "react-router-dom"
import TopBar from "../components/TopBar"

const MainLayout = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <TopBar />

                <main className="max-w-7xl mx-auto p-4">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default MainLayout