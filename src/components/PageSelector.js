const PageSelector = ({ count, page, limit, setPage }) => {
  const pages = [];
  for (let index = 1; index <= Math.ceil(count / limit); index++) {
    pages.push(
      <span className={index === page ? "current-page" : ""} onClick={() => setPage(index)} key={index}>
        {index}
      </span>
    );
  }

  return (
    <div className="page-selector">
      <div className="pages">{pages}</div>
    </div>
  );
};

export default PageSelector;
