import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home_controller">
            <p>This is a Home page</p>
            <Link to="/product" >
                product
            </Link>
        </div>
    )
}
export default Home;