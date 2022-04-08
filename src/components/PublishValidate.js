import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PublishValidate = ({ setPublisValidateModal }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-container">
      <div className="publish-validate-modal">
        <FontAwesomeIcon
          icon="xmark"
          className="close-modal"
          onClick={() => {
            setPublisValidateModal(false);
          }}
        />
        <h1> Félicitation</h1>
        <h2> Annonce publiée avec succés</h2>
        <button
          className="publish-again"
          onClick={() => {
            setPublisValidateModal(false);
            window.location.reload();
          }}
        >
          Publier une autre annonce
        </button>
        <span
          className="bottom-link"
          onClick={() => {
            setPublisValidateModal(false);
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
