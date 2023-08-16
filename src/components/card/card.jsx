import { NavLink } from "react-router-dom";
import './card.css'

const Card = ({ image, id, name, price, productbrand }) => {

  return (
    <div className="card">
      <NavLink to={`/detail/${id}`}>
        <hr />
        <img className="imgProduct" src={image[0]} alt={name} width={"300px"} />
        <hr/>
        <h4 className="h5">{name}</h4>
        <h3 className="h5">{productbrand}</h3>
        <hr />
        <h2 className="price">$ {price}</h2>
        <hr />
      </NavLink>
    </div>
  );
};

export default Card;
