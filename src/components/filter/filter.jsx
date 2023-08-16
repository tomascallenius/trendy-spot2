import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";
import { orderByName, filterPrice, filterByBrand } from "../../redux/actions";

const Filter = ({ onPageChange }) => {
  const allClothes2 = useSelector((state) => state.allClothes2);

  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const [selectedBrand, setSelectedBrand] = useState("");
  const [errorPrice, setErrorPrice] = useState("");
  const dispatch = useDispatch();

  const handleFilterPrice = () => {
    if (price.minPrice > price.maxPrice) {
      setErrorPrice("The min is higther than the max");
      return;
    }
    dispatch(filterPrice(price));
    onPageChange(1);
  };

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
    onPageChange(1);
  };

  const handleFilterBrandSelect = (event) => {
    
    dispatch(filterByBrand(event.target.value));
    onPageChange(1);
  };

  const filterBrands = [];

  const brands = allClothes2.filter((product) => {
    if (!filterBrands.includes(product.productbrand)) {
      filterBrands.push(product.productbrand);
    }
  });

  const handleInPutPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
  };

  const handleSelectedBrand = (event) => {
    setSelectedBrand(event.target.value)
  }
  
  return (
    <div className="navbar navbar-expand-lg bg-body-tertiary containerFilter">
      <h4>Order</h4>
      <select className="form-select" name="order" onChange={handleOrderSelect}>
        <option value="" disabled>
          Order by Name
        </option>
        <option value="1">Name A-Z</option>
        <option value="2">Name Z-A</option>
      </select>

      <h4>Brand</h4>
      <select
        className="form-select"
        name="selectedBrand"
       
        onChange={handleFilterBrandSelect}
      >
        <option disabled>
          Select brand
        </option>
        {filterBrands.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <h4>Price</h4>
      <div className="containerPrice">
        <label>
          <input
            className="inputPrice"
            type="number"
            min="0"
            name="minPrice"
            value={price.minPrice}
            onChange={handleInPutPrice}
            placeholder="Price Min"
          />
          <input
            className="inputPrice"
            type="number"
            min="0"
            name="maxPrice"
            value={price.maxPrice}
            onChange={handleInPutPrice}
            placeholder="Price Max"
          />
          {errorPrice ? <p className="errorp">{errorPrice}</p> : <></>}
        </label>
      </div>
      <button className="btnPrice" onClick={handleFilterPrice}>
        Search
      </button>
    </div>
  );
};

export default Filter;
