import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../../redux/actions";
import axios from "axios";

//-----------------COSAS NUEVAS PARA EL CARRITO MI RAY
import classnames from "classnames";

//-----------------------------------------------

import Nav from "../../components/nav/nav";

import "./detail.css";
import { useDispatch, useSelector } from "react-redux";
const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});
  const [imagePP, setImagePP] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [colorsAvailable, setColorsAvailable] = useState([]);
  const [size, setSize] = useState("");
  const [stockComb, setStockComb] = useState(0);
  const dispatch = useDispatch();
  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);

  //---------------OJOOO NUEVO PARA EL CARRO--------------------------
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedColorName, setSelectedColorName] = useState(""); // Estado para almacenar el nombre del color seleccionado

  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const selectedSizeClass = (size) =>
    classnames("buttonSize", {
      seleccionado: selectedSize === size,
    });

  const selectedColorClass = (color) =>
    classnames("buttonSize2", {
      seleccionado: selectedColor === color,
    });
  //-----------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/products/${id}`
        );
        const { data } = response;
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    };
    fetchData();
  }, [id]);

  // Cambiar la imagen principal cuando se haga clic en un botón de imagen
  const carousel = (event) => {
    setImagePP(garment.image[event.target.value]);
  };

  useEffect(() => {}, [imagePP]);

  const toogleExpand = () => {
    setExpanded(!expanded);
  };

  // Manejador para agregar la prenda actual al carrito
  const handleAddToCart = () => {
    if (!size || !selectedColorName) {
      alert("Please select color and size");
      return; // Salir de la función si no se seleccionaron tamaño o color
    }

    // Verificar si el producto ya está en el carrito
    console.log(cart);
    const itemAlreadyInCart = cart.find(
      (item) =>
        item.id === garment.id &&
        item.size === size &&
        item.color === selectedColorName
    );

    console.log(itemAlreadyInCart);
    if (itemAlreadyInCart) {
      alert("This product is already in the cart");
      return; // Salir de la función si el producto ya está en el carrito
    }

    // Crear un objeto que representa el elemento en el carrito
    const cartItem = {
      id: garment.id,
      color: selectedColorName,
      size: size,
      name: garment.name,
      price: garment.price,
      description: garment.description,
      stock: garment.stock,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    setShowModal(true);
  };

  // Manejador para cambiar el tamaño seleccionado
  const handleClickStock = (event, stock = garment.stock) => {
    //----------NEUVO CARRITO
    setColorsAvailable([]);
    setSelectedButton(event.target.value);
    //------------

    const newSize = event.target.value;
    setSelectedSize(newSize);
    setColorsAvailable([]);
    setSize(event.target.value);

    for (let index in stock[size]) {
      if (stock[size][index] > 0) {
        setColorsAvailable((colorsAvailable) => [...colorsAvailable, index]);
      }
    }
  };

  // Manejador para cambiar el color seleccionado
  const handleClickColor = (event, stock = garment.stock) => {
    const color = event.target.name;

    if (color) {
      // ----------NUEVO PARA EL CARRITO
      setSelectedColor(color);
      setSelectedButton(color);
      setStockComb(stock[size][color]);
      setSelectedColorName(color);
    }
  };

  return (
    <div className="">
      <Nav />
      <div className="theRealMaxContainer">
        <div className="carousel-inner maxContainer">
          <div className="mediumContainer">
            <div className="imageCont">
              <div className="divBtn">
                {garment.image &&
                  garment.image.map((imag, index) => (
                    <button
                      style={{
                        backgroundImage: `url(${imag})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100px",
                        height: "100px",
                        marginRight: "5px",
                        marginTop: "7px",
                        border: "none",
                      }}
                      key={index}
                      value={index}
                      onClick={carousel}
                    />
                  ))}
              </div>

              <div className="divImage">
                {garment.image && (
                  <img
                    className="productImage"
                    src={imagePP || garment.image[0]}
                    alt={garment.name}
                  />
                )}
                {garment.price && (
                  <div className="priceh4">
                    <hr />
                    <h4 className="therealh4">${garment.price}</h4>
                    <hr />

                    {/* <div>{stockComb}</div> */}
                    <h5>Check our stock!</h5>
                    <div className="divButtons">
                      <button
                        className={
                          selectedSize === "s"
                            ? "buttonSize seleccionado"
                            : "buttonSize"
                        }
                        onClick={handleClickStock}
                        value="s"
                      >
                        S
                      </button>
                      <button
                        className={
                          selectedSize === "m"
                            ? "buttonSize seleccionado"
                            : "buttonSize"
                        }
                        onClick={handleClickStock}
                        value="m"
                      >
                        M
                      </button>
                      <button
                        className={
                          selectedSize === "l"
                            ? "buttonSize seleccionado"
                            : "buttonSize"
                        }
                        onClick={handleClickStock}
                        value="l"
                      >
                        L
                      </button>
                      <button
                        className={
                          selectedSize === "xl"
                            ? "buttonSize seleccionado"
                            : "buttonSize"
                        }
                        onClick={handleClickStock}
                        value="xl"
                      >
                        XL
                      </button>
                    </div>
                    <hr />
                    <div className="divButtons">
                      {colorsAvailable.map((color) => (
                        <button
                          className={selectedColorClass(color)}
                          onClick={handleClickColor}
                          name={color}
                          key={color}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                    <hr />
                    <div className="stock">Stock: {stockComb}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="divMaxDetails">
              <div className="allDetailsDiv">
                <hr />
                {garment.name && <h3>{garment.name}</h3>}
                <hr />
                {garment.productbrand && <h5>{garment.productbrand}</h5>}
                <hr />
                {garment.description && (
                  <h5>
                    {expanded
                      ? garment.description
                      : garment.description.slice(0, 99) + "..."}
                  </h5>
                )}
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                    color: "rgb(47, 203, 255)",
                  }}
                  onClick={toogleExpand}
                >
                  {expanded ? "Ver menos" : "Ver mas"}
                </span>

                {/* Botón para agregar la prenda al carrito */}
                <hr />
                <button onClick={handleAddToCart}>Añadir al carrito</button>

                {/* Modal para mostrar cuando se agrega un producto al carrito */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Producto agregado al carrito</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Mostrar detalles del producto recién añadido en el modal */}
                    <p>NAME: {garment.name}</p>
                    <p>PRICE: ${garment.price}</p>
                    <p>SIZE: {size}</p>
                    <p>COLOR: {selectedColorName}</p>
                    {/* Puedes agregar más detalles aquí si es necesario */}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cerrar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
