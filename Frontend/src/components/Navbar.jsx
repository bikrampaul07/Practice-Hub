
import { NavLink, Link } from "react-router-dom"
import { SquareTerminal,BookText,LayoutDashboard } from "lucide-react"
import { UserButton } from "@clerk/clerk-react"
function Navbar() {
    return (
        <div>
            <nav className='base-100/80 backdrop-blur-md border-b-primary/20 sticky top-0 z-50 shadow-lg'>
                <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
                    <Link to={"/"} className='flex items-center gap-3 hover:scale-105 transition-transform duration-200'>
                        <div className='size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center'>
                            <SquareTerminal className='size-6 text-white' />
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-mono font-black text-xl bg-linear-to-br from-primary via-secondary to-accent bg-clip-text text-transparent tracking-widest'>
                                Practice Hub
                            </span>
                            <span className='text-xs text-base-content/60 font-medium -mt-1'>Code & Grow</span>
                        </div>
                    </Link>
                    <div className="flex gap-2">
                        <NavLink
                        to="/problems"
                        className={({ isActive }) =>
                            `px-4 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 ${isActive
                                ? "bg-primary text-primary-content"
                                : "hover:bg-base-200 text-base-content/70 hover:text-base-content outline-1"
                            }`
                        }
                    >
                        <BookText className="size-5"/>
                        <p className="hidden font-medium sm:block">Problems</p>
                    </NavLink>
                         <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `px-4 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 ${isActive
                                ? "bg-primary text-primary-content"
                                : "hover:bg-base-200 text-base-content/70 hover:text-base-content outline-1"
                            }`
                        }
                    >
                        <LayoutDashboard className="size-5"/>
                        <p className="hidden font-medium sm:block">Dashboard</p>
                    </NavLink>
                    <div className="mt-2 ml-4 ">
                    <UserButton />
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
