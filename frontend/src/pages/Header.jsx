import { Link } from "react-router-dom"
import logo from "../assets/react.svg"


function Header() {

	return (
		<>
			<header className="p-4 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
				<Link to={"/"} className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
					<img src={logo} alt="logo" />
				</Link>

				<div className="col-md-3 text-end">
					<Link to={"/"}>
						<div className="btn btn-outline-primary me-2">Login</div>
					</Link>
				</div>
			</header>
		</>
	)
}

export default Header
