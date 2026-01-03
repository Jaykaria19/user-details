import { Link } from "react-router-dom"

const TopBar = () => {
    return (
        <>
            <header className="bg-blue-100">
                <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-rowgap-3">
                    <h1 className="text-lg font-semibold text-black">
                        User Details
                    </h1>

                    <div className="flex gap-2 cursor-pointer">
                        <Link className=" border rounded border-black p-2 text-blue-500" to="/">Users</Link>
                        <Link className="border rounded border-black p-2 text-blue-500" to="/favorites">favorites </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default TopBar