import logo from "../../imgs//icon.png"

function Navbar() {
    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center">
                <div className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" width="125" className="d-inline-block align-text-top" />
                </div>
            </div>
        </div>
    </nav>
        ;
}

export default Navbar;