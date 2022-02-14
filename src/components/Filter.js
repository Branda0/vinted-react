import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PriceRange from "./PriceRange";

const Filter = ({ count, page, setPage, sort, setSort, limit, setLimit, prices, setPrices }) => {
  const pages = [];
  for (let index = 1; index <= Math.ceil(count / limit); index++) {
    pages.push(
      <span className={index === page ? "current-page" : ""} onClick={() => setPage(index)} key={index}>
        {index}
      </span>
    );
  }

  return (
    <div className="filter-bar">
      <div className="container">
        <div className="left">
          <div className="articles-total">
            <span className="count">{count}</span>
            <span className="text">Articles</span>
          </div>
          <div className="results-per-page">
            <span className="text">Résultas par page</span>
            <div className="limit-selector">
              <span
                className={limit === 8 ? "current-limit" : ""}
                onClick={() => {
                  setLimit(8);
                  setPage(1);
                }}
              >
                8
              </span>
              <span
                className={limit === 16 ? "current-limit" : ""}
                onClick={() => {
                  setLimit(16);
                  setPage(1);
                }}
              >
                16
              </span>
              <span
                className={limit === 32 ? "current-limit" : ""}
                onClick={() => {
                  setLimit(32);
                  setPage(1);
                }}
              >
                32
              </span>
            </div>
          </div>
          <div className="price-asc-desc">
            <span className="text">Trier par prix</span>
            <div className="icons-container">
              <FontAwesomeIcon
                icon="caret-up"
                className={`asc-icon ${sort === "price-asc" && "selected"}`}
                onClick={() => (sort === "price-asc" ? setSort("") : setSort("price-asc"))}
              />

              <FontAwesomeIcon
                icon="caret-down"
                className={`desc-icon ${sort === "price-desc" && "selected"}`}
                onClick={() => (sort === "price-desc" ? setSort("") : setSort("price-desc"))}
              />
            </div>
          </div>
          <div className="price-range-selector">
            <span className="text">Prix entre </span>
            <PriceRange values={prices} setPrices={setPrices} />
          </div>
        </div>
        <div className="page-selector">
          <div className="pages">{pages}</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
