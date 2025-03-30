import { Link } from "react-router-dom";
import Header from "../components/Header";

function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div>
          <h1>404 - Page Not Found</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Link to="/">Go back to Home</Link>
        </div>
      </main>
    </>
  );
}

export default NotFound;
