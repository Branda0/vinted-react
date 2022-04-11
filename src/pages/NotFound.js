import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="parallelogram-background">
        <p className="message">Cette page n'existe pas</p>
      </div>
      <Link to="/" className="link-home">
        Retour en lieu sûr
      </Link>
    </div>
  );
};

export default NotFound;
