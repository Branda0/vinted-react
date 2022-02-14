import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PublishValidate = ({ setPublisValidatehModal }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-container">
      <div className="publish-validate-modal">
        <FontAwesomeIcon
          icon="xmark"
          className="close-modal"
          onClick={() => {
            setPublisValidatehModal(false);
          }}
        />
        <h1> Félicitation</h1>
        <h2> Annonce publiée avec succés</h2>
        <button
          className="publish-again"
          onClick={() => {
            setPublisValidatehModal(false);
            window.location.reload();
          }}
        >
          Publier une autre annonce
        </button>
        <span
          className="bottom-link"
          onClick={() => {
            setPublisValidatehModal(false);
            navigate("/");
          }}
        >
          Retour à l'acceuil
        </span>
      </div>
    </div>
  );
};

export default PublishValidate;
