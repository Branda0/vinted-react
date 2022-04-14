import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Dropzone from "react-dropzone";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import axios from "axios";

const Publish = ({ setPublishValidateModal, isLogged }) => {
  const [picture, setPicture] = useState();
  const [picturePreview, setPicturePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();

  const [isUploading, setIsUploading] = useState(false);

  const handlePublish = async (event) => {
    try {
      event.preventDefault();
      setIsUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      // const response = await axios.post(
      //   "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
      //   formData,
      //   {
      //     headers: {
      //       authorization: `Bearer ${Cookies.get("userToken")}`,
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      // const response = await axios.post("https://brandao-vinted.herokuapp.com/offer/publish", formData, {
      //   headers: {
      //     authorization: `Bearer ${Cookies.get("userToken")}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      //LOCAL SERVER -> need to run vinted express on local
      const response = await axios.post("http://localhost:4000/offer/publish", formData, {
        headers: {
          authorization: `Bearer ${Cookies.get("userToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsUploading(false);
      setPublishValidateModal(true);
    } catch (error) {
      console.log(error.message);
      setIsUploading(false);
      alert("erreur, veuillez réessayer");
    }
  };

  return isLogged ? (
    <div className="publish-container">
      <div className="container">
        <h1>Vends ton article</h1>
        <form onSubmit={handlePublish}>
          <div className="photo-upload">
            <div className="drop-zone">
              {picturePreview ? (
                <img className="preview" src={picturePreview} alt="picture preview" />
              ) : (
                <div className="add-photo-input">
                  <label htmlFor="file" className="input-label">
                    <FontAwesomeIcon icon="plus" className="plus-icon" />
                    <span>Ajoute une photo</span>
                  </label>
                  <input
                    className="input"
                    type="file"
                    id="file"
                    onChange={(event) => {
                      setPicture(event.target.files[0]);
                      setPicturePreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="input-category-container">
            <div className="input-container">
              <span>Titre</span>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="input-container description">
              <span>Décris ton article</span>
              <textarea
                type="text"
                rows="5"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="ex: Chemise en coton, taille correctement"
              ></textarea>
            </div>
          </div>
          <div className="input-category-container">
            <div className="input-container">
              <span>Marque</span>
              <input type="text" placeholder="ex: Zara" onChange={(event) => setBrand(event.target.value)} />
            </div>
            <div className="input-container">
              <span>Taille</span>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div className="input-container">
              <span>Couleur</span>
              <input
                type="text"
                placeholder="ex: Fushia"
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
            <div className="input-container">
              <span>Etat</span>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>
            <div className="input-container">
              <span>Lieu</span>
              <input type="text" placeholder="ex: Paris" onChange={(event) => setCity(event.target.value)} />
            </div>
          </div>
          <div className="input-category-container">
            <div className="input-container">
              <span>Prix</span>
              <input type="number" placeholder="0.00 €" onChange={(event) => setPrice(event.target.value)} />
            </div>
          </div>
          <div className="publish-btn">
            <button type="submit">
              {isUploading ? (
                <FontAwesomeIcon icon="spinner" className="spinner-icon" />
              ) : (
                "Publier ton annonce"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/" state={{ toLogin: true }} />
  );
};

export default Publish;
