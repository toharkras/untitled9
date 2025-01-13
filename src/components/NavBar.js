
import { useNavigate } from "react-router-dom";
import './NavBar.css'

export default function Navbar() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    return (
        <div className="navbar">
            <h1 className={"page-header"} style={{ color: '#bb4ecc' }}>TOHAR & GAL SERIOUS SHOP</h1> {}
            <button className={"home-btn"} onClick={goToCart}>Go to Cart</button>
            <button className={"cart-btn"} onClick={goToHome}>Go to Home</button>
        </div>
    );
}