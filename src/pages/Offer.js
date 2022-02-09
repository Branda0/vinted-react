import { useParams } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();
  return (
    <div>
      <span>The id is : {id}</span>
    </div>
  );
};

export default Offer;
