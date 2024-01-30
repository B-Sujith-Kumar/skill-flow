import logo from "../assets/images/logo.svg"

const Navbar = () => {
  return (
    <header className="py-3 max-w-full font-rubik">
        <nav className="flex items-center justify-around">
            <img src={logo} alt="Logo" className="-mx-16"/>
            <ul className="flex gap-6 text-lg max-lg:hidden">
                <li>Products</li>
                <li>Solutions</li>
                <li>Resources</li>
                <li>Pricing</li>
            </ul>
            <div className="max-lg:hidden">
                <button className="bg-coral-green text-lg text-white px-4 py-2 font-semibold rounded-sm">Login</button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
