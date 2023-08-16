import React, { useState } from "react";
import axios from "axios";
import validation from "./validations";
import "./createProduct.css";
import Nav from "../../components/nav/nav";

const CreateProduct = () => {
  const [imagePP, setImagePP] = useState("");
  const [image, setImage] = useState({
    principal: "",
    secundaria: "",
    extra:""
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: {
    principal: "",
    secundaria: "",
    extra:""
  },
    description: "",
    stock: {
      s: {
        blanco: '',
        negro: '',
        gris: ''
      },
      m: {
        blanco: '',
        negro: '',
        gris: ''
      },
      l: {
        blanco: '',
        negro: '',
        gris: ''
      },
      xl: {
        blanco: '',
        negro: '',
        gris: ''
      }
    },
    brand: "",
  });
  const [stock, setStock] = useState({
    s: {
      blanco: '',
      negro: '',
      gris: ''
    },
    m: {
      blanco: '',
      negro: '',
      gris: ''
    },
    l: {
      blanco: '',
      negro: '',
      gris: ''
    },
    xl: {
      blanco: '',
      negro: '',
      gris: ''
    }
  });
  const [errors, setErrors] = useState({
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm({ ...form, [name]: value });
    setErrors(validation({ ...form, [name]: value }));
  };
  
  const handleInputStock = (event) => {
    const {value, name, id} = event.target;
    
    setStock((prevStock) => ({
      ...prevStock,
      [name]: {
        ...prevStock[name],
        [id]: value
      }
    }))

    setErrors(validation({
      ...form,
      [form.stock]: {
        ...form.stock,
        [name]: {
          [id]: value
        }
      }
    }));
};
  const uploadImage = async (event) => {
    const name = event.target.name;
    const files = event.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Trendy");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpqsnv9bu/image/upload",
      { method: "POST", body: data }
    );

    const file = await res.json();
    setImage({ ...image, [name]: file.secure_url });
    setImagePP(file.secure_url);
    // console.log(name);
    setErrors(validation({ ...form, [form.image]: {[name]: file.secure_url}}))
    setLoading(false);
  };


  const handleDeleteImg = (event) => {
    const name = event.target.name;
    setImage({ ...image, [name]: "" });
    setImagePP({ });
  };


  const carousel = (event) => {
    if(!form.image[event.target.value]) return alert("Please insert a new image")
    setImagePP(form.image[event.target.value]);
  }


  form.image = image;
  form.stock = stock;
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);
    //----------------------------toLowerCase a los string y toUpperCase a la primera letra de cada palabra------------------
    const postForm = form;
    const lower = postForm.brand.toLocaleLowerCase();
    let array = lower.split(" ");
    let losArrays = array.map((palabra) => {
      return palabra[0].toUpperCase() + palabra.slice(1);
    });
    
    const resultado = losArrays.join(" ");
    postForm.brand = resultado;
    //------------------------------------------------------------------------------------------------------------------------
    await axios.post("http://localhost:3004/products/create", postForm);
    setForm({
      name: "",
      price: "",
      image: {},
      description: "",
      stock: {
        s: {
          blanco: '',
          negro: '',
          gris: ''
        },
        m: {
          blanco: '',
          negro: '',
          gris: ''
        },
        l: {
          blanco: '',
          negro: '',
          gris: ''
        },
        xl: {
          blanco: '',
          negro: '',
          gris: ''
        }
      },
      brand: ""
    });
    setStock({
      s: {
        blanco: '',
        negro: '',
        gris: ''
      },
      m: {
        blanco: '',
        negro: '',
        gris: ''
      },
      l: {
        blanco: '',
        negro: '',
        gris: ''
      },
      xl: {
        blanco: '',
        negro: '',
        gris: ''
      }
    });
    setImage({
      principal: "",
      secundaria: "",
      extra:""
    });

    setImagePP('')
    alert("The MAGIC BEST PRODUCT TRENDY-SPOT has been created");
  };
  
  return (
    <div>
      <Nav/>
      <div className="allDiv">
      <div className="tomasSeco">
      <div className="divForm">
      <form className="form">


      <h3 className="mb-4 h3">Create Product</h3>
        <div>
        <div className="inputsProduct">
          <input
            type="text"
            className={`form-control ${!errors.name && form.name !== "" ? "is-valid" : "is-invalid"}`}
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            autocomplete="off"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
              )}
        </div>
        <div className="inputsProduct">
          <input
            type="number"
            className={`form-control ${!errors.price && form.price !== "" ? "is-valid" : "is-invalid"}`}
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Insert Price"
            autocomplete="off"
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
            )}
        </div>

        <div className="inputsProduct">
          <input
            type="text"
            className={`form-control ${!errors.brand && form.brand !== "" ? "is-valid" : "is-invalid"}`}
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            autocomplete="off"
          />
          {errors.brand && (
            <div className="invalid-feedback">{errors.brand}</div>
            )}
        </div>

        <div className="inputsProduct">
          <textarea
            type="text"
            className={`form-control ${form.description.length > 10 ? "is-valid" : "is-invalid"}`}
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a description"
            autocomplete="off"
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        </div>

        <div className="divStockColors">
        <div className="divStock">
        <h5 style={{color: "white", fontWeight: "bold"}}>Insert stock by color and size</h5>
            <div className="theRealLabelDiv">
            <h6>S</h6>
        <label className="stockWhite">
          <input 
          style={{color: "black"}}
          className="input-goup"
          id='blanco'
          value={stock.s.white}
          name='s'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockBlack">
          <input 
          className="input-goup"
          id='negro'
          value={stock.s.black}
          name='s'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockGrey">
          <input 
          className="input-goup"
          id='gris'
          value={stock.s.grey}
          name='s'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>
        </div>

            <div className="theRealLabelDiv">
            <h6>M</h6>
        <label className="stockWhite">
          <input 
           style={{color: "black"}}
          className="input-goup"
          id='blanco'
          value={stock.m.white}
          name='m'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockBlack">
          <input 
          className="input-goup"
          id='negro'
          value={stock.m.black}
          name='m'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockGrey">
          <input 
          className="input-goup"
          id='gris'
          value={stock.m.grey}
          name='m'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>
        </div>

        <div className="theRealLabelDiv">
            <h6>L</h6>
        <label className="stockWhite">
          <input 
           style={{color: "black"}}
          className="input-goup"
          id='blanco'
          value={stock.l.white}
          name='l'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockBlack">
          <input 
          className="input-goup"
          id='negro'
          value={stock.l.black}
          name='l'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockGrey">
          <input 
          className="input-goup"
          id='gris'
          value={stock.l.grey}
          name='l'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>


        </div>

        <div className="theRealLabelDiv">
            <h6>XL</h6>
        <label className="stockWhite">
          <input 
           style={{color: "black"}}
          className="input-goup"
          id='blanco'
          value={stock.xl.white}
          name='xl'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockBlack">
          <input 
          className="input-goup"
          id='negro'
          value={stock.xl.black}
          name='xl'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>

        <label className="stockGrey">
          <input 
          className="input-goup"
          id='gris'
          value={stock.xl.grey}
          name='xl'
          type="number"
          min="0" 
          max="999"
          onChange={handleInputStock}
          />
        </label>
        </div>
        {errors.stock && (
          <div style={{color: "red", padding: "2px" }}>{errors.stock}</div>
          )}
        </div>
        </div>

        <div className="d-grid gap-2 col-6 mx-auto">
          <button 
            type="submit"
            className="btnForm"
            disabled={Object.keys(errors).length > 0 || form.name.length < 1}
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
      </div>
            {/* ***** */}
            <div className="divImagenes">
            <h4 style={{color: "white"}}>Product Image</h4>
            <div className="divInputs">

              <div className="input1">
              <input
                  placeholder="Imagen 1"
                  type="file"
                  name="principal"
                  onChange={uploadImage}
                  className="inputgrupo"
                  />
             
              <input
                type="file"
                name="secundaria"
                onChange={uploadImage}
                className="inputgrupo"
              />

              <input
                type="file"
                name="extra"
                onChange={uploadImage}
                className="inputgrupo"
              />

              {errors.image && (
              <div style={{color: "red", padding: "4px"}}>{errors.image}</div>
              )}
              </div>

            </div>
            <div className="theRealDiv">

                <div className="buttonStyles">
                 {loading ? (
                   <h5>Cargando Imagenes...</h5>
                   ) : (
                     <div className="imageButtonContainer">
                       <hr />
                  {image.principal ? (
                    <button className="btn-close" aria-label="Close" name="principal" onClick={handleDeleteImg}/>
                  ) : null}
                  <button style={{backgroundImage: `url(${image.principal})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: "none"}} value='principal' onClick={carousel} className="imageUploaded">Front</button>
                    <hr />
                </div>
              )}

              {loading ? (
                <h5>Cargando Imagenes...</h5>
              ) : (
                <div className="imageButtonContainer">
                
                  {image.secundaria ? (
                    <button className="btn-close" aria-label="Close" name="secundaria" onClick={handleDeleteImg}/>
                    ) : null}
                    <button style={{backgroundImage: `url(${image.secundaria})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='secundaria' onClick={carousel} className="imageUploaded">Back</button>   
                  </div>             
              )}
              
              {loading ? (
                <h5>Cargando Imagenes...</h5>
              ) : (
                <div className="imageButtonContainer">
                  <hr />
                  {image.extra ? (
                    <button className="btn-close" aria-label="Close" name="extra" onClick={handleDeleteImg}/>
                  ) : null}       
                  <button style={{backgroundImage: `url(${image.extra})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='extra' onClick={carousel} className="imageUploaded">Extra</button>
                  <hr />
                </div>
              )}
              </div>
              <div className="containerImage">
              {imagePP && <img className="productImage" src={imagePP}/>}
              </div>
              </div>
        
            </div>
    
            {/* *** */}

      </div>
      </div>
    </div>
  );
};

export default CreateProduct;

// import React, { useState } from "react";
// import axios from "axios";
// import validation from "./validations";
// import "./createProduct.css";
// import Nav from "../../components/nav/nav";
// import Alerta from "../../components/Alerta/Alerta";
// import axiosClient from "../../config/axiosClient";

// const CreateProduct = () => {

//   const [ alerta, setAlerta ] = useState({})

//   const [imagePP, setImagePP] = useState("");
//   const [image, setImage] = useState({
//     principal: "",
//     secundaria: "",
//     extra:""
//   });
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     image: {
//     principal: "",
//     secundaria: "",
//     extra:""
//   },
//     description: "",
//     stock: {
//       s: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       },
//       m: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       },
//       l: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       },
//       xl: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       }
//     },
//     brand: "",
//   });
//   const [stock, setStock] = useState({
//     s: {
//       blanco: '',
//       negro: '',
//       gris: ''
//     },
//     m: {
//       blanco: '',
//       negro: '',
//       gris: ''
//     },
//     l: {
//       blanco: '',
//       negro: '',
//       gris: ''
//     },
//     xl: {
//       blanco: '',
//       negro: '',
//       gris: ''
//     }
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (event) => {
//     const {name, value} = event.target;
//     setForm({ ...form, [name]: value });
//     setErrors(validation({ ...form, [name]: value }));
//   };

//   alert
  
//   const handleInputStock = (event) => {
//     const {value, name, id} = event.target;

//     setStock((prevStock) => ({
//       ...prevStock,
//       [name]: {
//         ...prevStock[name],
//         [id]: value
//       }
//     }))

//     setErrors(validation({
//       ...form,
//       [form.stock]: {
//         ...form.stock,
//         [name]: {
//           [id]: value
//         }
//       }
//     }));
// };
//   const uploadImage = async (event) => {
//     const name = event.target.name;
//     const files = event.target.files;

//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", "Trendy");
//     setLoading(true);

//     // const [ alerta, setAlerta ] = useState({})

//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/dpqsnv9bu/image/upload",
//       { method: "POST", body: data }
//     );

//     const file = await res.json();
//     setImage({ ...image, [name]: file.secure_url });
//     // console.log(name);
//     setErrors(validation({ ...form, [form.image]: {[name]: file.secure_url}}))
//     setLoading(false);
//   };


//   const handleDeleteImg = (event) => {
//     const name = event.target.name;
//     setImage({ ...image, [name]: "" });
//   };


//   const carousel = (event) => {
//     setImagePP(form.image[event.target.value]);
//   }


//   form.image = image;
//   form.stock = stock;
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(form);
//     //----------------------------toLowerCase a los string y toUpperCase a la primera letra de cada palabra------------------
//     const postForm = form;
//     const lower = postForm.brand.toLocaleLowerCase();
//     let array = lower.split(" ");
//     let losArrays = array.map((palabra) => {
//       return palabra[0].toUpperCase() + palabra.slice(1);
//     });
    
//     const resultado = losArrays.join(" ");
//     postForm.brand = resultado;
//     //------------------------------------------------------------------------------------------------------------------------
//     await axios.post("http://localhost:3004/products/create", postForm);
//     setForm({
//       name: "",
//       price: "",
//       image: {},
//       description: "",
//       stock: {
//         s: {
//           blanco: '',
//           negro: '',
//           gris: ''
//         },
//         m: {
//           blanco: '',
//           negro: '',
//           gris: ''
//         },
//         l: {
//           blanco: '',
//           negro: '',
//           gris: ''
//         },
//         xl: {
//           blanco: '',
//           negro: '',
//           gris: ''
//         }
//       },
//       brand: ""
//     });
//     setStock({
//       s: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       },
//       m: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       },
//       l: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       },
//       xl: {
//         blanco: '',
//         negro: '',
//         gris: ''
//       }
//     });
//     setImage({
//       principal: "",
//       secundaria: "",
//       extra:""
//     });

//     setAlerta({
//       msg: 'Producto creado con éxito',
//       error: false
//     })


//     // setAlerta({})

//     // alert("The MAGIC BEST PRODUCT TRENDY-SPOT has been created");
//   };

//   const {msg} = alerta
  
//   return (
//     <div>
//       <Nav/>
//       <div className="allDiv">
//       <div className="tomasSeco">
//       <div className="divForm">
//       <form className="form">


//       {msg && <Alerta alerta={alerta} />}

//       <h3 className="mb-4 h3">Ingresar Prenda</h3>
//         <div className="maxContainerStock">
//         <div className="inputsProduct">
//           <input
//             type="text"
//             className={`form-control ${!errors.name && form.name !== "" ? "is-valid" : "is-invalid"}`}
//             id="name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Name"
//             autocomplete="off"
//             />
//             {errors.name && (
//               <div className="invalid-feedback">{errors.name}</div>
//               )}
//         </div>
//         <div className="inputsProduct">
//           <input
//             type="number"
//             className={`form-control ${!errors.price && form.price !== "" ? "is-valid" : "is-invalid"}`}
//             id="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Insert Price"
//             autocomplete="off"
//           />
//           {errors.price && (
//             <div className="invalid-feedback">{errors.price}</div>
//             )}
//         </div>

//         <div className="inputsProduct">
//           <input
//             type="text"
//             className={`form-control ${!errors.brand && form.brand !== "" ? "is-valid" : "is-invalid"}`}
//             id="brand"
//             name="brand"
//             value={form.brand}
//             onChange={handleChange}
//             placeholder="Brand"
//             autocomplete="off"
//           />
//           {errors.brand && (
//             <div className="invalid-feedback">{errors.brand}</div>
//             )}
//         </div>

//         <div className="inputsProduct">
//           <textarea
//             type="text"
//             className={`form-control ${form.description !== "" ? "is-valid" : "is-invalid"}`}
//             id="description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Write a description"
//             autocomplete="off"
//           />
//           {errors.description && (
//             <div className="invalid-feedback">{errors.description}</div>
//           )}
//         </div>
//         </div>

//         <div className="divStockColors">
//         <h5>Colors</h5>
//         {errors.stock && (
//           <div style={{color: "white"}}>{errors.stock}</div>
//           )}
//         <div className="divStock">
//             <div className="theRealLabelDiv">
//             <h6>S</h6>
//         <label className="stockWhite">
//           <input 
//           style={{color: "black"}}
//           className="input-goup"
//           id='blanco'
//           value={stock.s.white}
//           name='s'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='negro'
//           value={stock.s.black}
//           name='s'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='gris'
//           value={stock.s.grey}
//           name='s'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>
//         </div>

//             <div className="theRealLabelDiv">
//             <h6>M</h6>
//         <label className="stockWhite">
//           <input 
//            style={{color: "black"}}
//           className="input-goup"
//           id='blanco'
//           value={stock.m.white}
//           name='m'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='negro'
//           value={stock.m.black}
//           name='m'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='gris'
//           value={stock.m.grey}
//           name='m'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>
//         </div>

//         <div className="theRealLabelDiv">
//             <h6>L</h6>
//         <label className="stockWhite">
//           <input 
//            style={{color: "black"}}
//           className="input-goup"
//           id='blanco'
//           value={stock.l.white}
//           name='l'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='negro'
//           value={stock.l.black}
//           name='l'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='gris'
//           value={stock.l.grey}
//           name='l'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>


//         </div>

//         <div className="theRealLabelDiv">
//             <h6>XL</h6>
//         <label className="stockWhite">
//           <input 
//            style={{color: "black"}}
//           className="input-goup"
//           id='blanco'
//           value={stock.xl.white}
//           name='xl'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='negro'
//           value={stock.xl.black}
//           name='xl'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='gris'
//           value={stock.xl.grey}
//           name='xl'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>


//         </div>
//         </div>
//         </div>

//         <div className="d-grid gap-2 col-6 mx-auto">
//           <button 
//             type="submit"
//             className="btnForm"
//             disabled={Object.keys(errors).length > 0 || form.name.length < 1}
//             onClick={handleSubmit}
//           >
//             Create
//           </button>
//         </div>
//       </form>
//       </div>
//             {/* ***** */}
//             <div className="divImagenes">
//             <div className="theRealDiv">

//                 <div className="buttonStyles">
//                  {loading ? (
//                    <h5>Cargando Imagenes...</h5>
//                    ) : (
//                      <div className="imageButtonContainer">
//                        <hr />
//                   {image.principal ? (
//                     <button className="btn-close" aria-label="Close" name="principal" onClick={handleDeleteImg}/>
//                   ) : null}
//                   <button style={{backgroundImage: `url(${image.principal})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: "none"}} value='principal' onClick={carousel} className="imageUploaded">Frente</button>
//                     <hr />
//                 </div>
//               )}

//               {loading ? (
//                 <h5>Cargando Imagenes...</h5>
//               ) : (
//                 <div className="imageButtonContainer">
//                   <hr />                 
//                   {image.secundaria ? (
//                     <button className="btn-close" aria-label="Close" name="secundaria" onClick={handleDeleteImg}/>
//                     ) : null}
//                     <button style={{backgroundImage: `url(${image.secundaria})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='secundaria' onClick={carousel} className="imageUploaded">Dorso</button>   
//                     <hr />
//                   </div>             
//               )}

//               {loading ? (
//                 <h5>Cargando Imagenes...</h5>
//               ) : (
//                 <div className="imageButtonContainer">
//                   <hr />
//                   {image.extra ? (
//                     <button className="btn-close" aria-label="Close" name="extra" onClick={handleDeleteImg}/>
//                   ) : null}       
//                   <button style={{backgroundImage: `url(${image.extra})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='extra' onClick={carousel} className="imageUploaded">Extra</button>
//                   <hr />
//                 </div>
//               )}
//               </div>
//               <div className="containerImage">
//               {form.image && <img className="productImage" src={imagePP || form.image[0]}/>}
//               </div>
//               </div>


//             <div className="divInputs">
//               <input
//                   placeholder="Imagen 1"
//                   type="file"
//                   name="principal"
//                   onChange={uploadImage}
//               />
              
//               <input
//                 type="file"
//                 name="secundaria"
//                 onChange={uploadImage}
//               />
          
//               <input
//                 type="file"
//                 name="extra"
//                 onChange={uploadImage}
//               />
//             </div>
         
              
    

                
              
//             </div>
    
//             {/* *** */}

//       </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;

// import React, { useState } from "react";
// import axios from "axios";
// import validation from "./validations";
// import "./createProduct.css";
// import Nav from "../../components/nav/nav";

// const CreateProduct = () => {
//   const [imagePP, setImagePP] = useState("");
//   const [image, setImage] = useState({
//     principal: "",
//     secundaria: "",
//     extra:""
//   });
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     image: {
//     principal: "",
//     secundaria: "",
//     extra:""
//   },
//     description: "",
//     stock: {
//       S: {
//         white: '',
//         black: '',
//         grey: ''
//       },
//       M: {
//         white: '',
//         black: '',
//         grey: ''
//       },
//       L: {
//         white: '',
//         black: '',
//         grey: ''
//       },
//       XL: {
//         white: '',
//         black: '',
//         grey: ''
//       }
//     },
//     brand: "",
//   });
//   const [stock, setStock] = useState({
//       S: {
//         white: 0,
//         black: 0,
//         grey: 0
//       },
//       M: {
//         white: 0,
//         black: 0,
//         grey: 0
//       },
//       L: {
//         white: 0,
//         black: 0,
//         grey: 0
//       },
//       XL: {
//         white: 0,
//         black: 0,
//         grey: 0
//       }
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (event) => {
//     const {name, value} = event.target;
//     setForm({ ...form, [name]: value });
//     setErrors(validation({ ...form, [name]: value }));
//   };
  
//   const handleInputStock = (event) => {
//     const {value, name, id} = event.target;

//     setStock((prevStock) => ({
//       ...prevStock,
//       [name]: {
//         ...prevStock[name],
//         [id]: value
//       }
//     }))

//     setErrors(validation({
//       ...form,
//       [form.stock]: {
//         ...form.stock,
//         [name]: {
//           [id]: value
//         }
//       }
//     }));
// };
//   const uploadImage = async (event) => {
//     const name = event.target.name;
//     const files = event.target.files;

//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", "Trendy");
//     setLoading(true);

//     const res = await fetch(
//       "https://api.cloudinary.com/v1_1/dpqsnv9bu/image/upload",
//       { method: "POST", body: data }
//     );

//     const file = await res.json();
//     setImage({ ...image, [name]: file.secure_url });
//     // console.log(name);
//     setErrors(validation({ ...form, [form.image]: {[name]: file.secure_url}}))
//     setLoading(false);
//   };


//   const handleDeleteImg = (event) => {
//     const name = event.target.name;
//     setImage({ ...image, [name]: "" });
//   };


//   const carousel = (event) => {
//     setImagePP(form.image[event.target.value]);
//   }


//   form.image = image;
//   form.stock = stock;
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(form);
//     //----------------------------toLowerCase a los string y toUpperCase a la primera letra de cada palabra------------------
//     const postForm = form;
//     const lower = postForm.brand.toLocaleLowerCase();
//     let array = lower.split(" ");
//     let losArrays = array.map((palabra) => {
//       return palabra[0].toUpperCase() + palabra.slice(1);
//     });
    
//     const resultado = losArrays.join(" ");
//     postForm.brand = resultado;
//     //------------------------------------------------------------------------------------------------------------------------
//     await axios.post("http://localhost:3004/products/create", postForm);
//     setForm({
//       name: "",
//       price: "",
//       image: {},
//       description: "",
//       stock: {
//         S: {
//           white: '',
//           black: '',
//           grey: ''
//         },
//         M: {
//           white: '',
//           black: '',
//           grey: ''
//         },
//         L: {
//           white: '',
//           black: '',
//           grey: ''
//         },
//         XL: {
//           white: '',
//           black: '',
//           grey: ''
//         }
//       },
//       brand: ""
//     });
//     setStock({
//       S: {
//         white: 0,
//         black: 0,
//         grey: 0
//       },
//       M: {
//         white: 0,
//         black: 0,
//         grey: 0
//       },
//       L: {
//         white: 0,
//         black: 0,
//         grey: 0
//       },
//       XL: {
//         white: 0,
//         black: 0,
//         grey: 0
//       }
//     });
//     setImage({
//       principal: "",
//       secundaria: "",
//       extra:""
//     });
//     alert("The MAGIC BEST PRODUCT TRENDY-SPOT has been created");
//   };
  
//   return (
//     <div>
//       <Nav/>
//       <div className="allDiv">
//       <div className="tomasSeco">
//       <div className="divForm">
//       <form className="form">


//       <h3 className="mb-4 h3">Ingresar Prenda</h3>
//         <div className="maxContainerStock">
//         <div className="inputsProduct">
//           <input
//             type="text"
//             className={`form-control ${!errors.name && form.name !== "" ? "is-valid" : "is-invalid"}`}
//             id="name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Name"
//             autocomplete="off"
//             />
//             {errors.name && (
//               <div className="invalid-feedback">{errors.name}</div>
//               )}
//         </div>
//         <div className="inputsProduct">
//           <input
//             type="number"
//             className={`form-control ${!errors.price && form.price !== "" ? "is-valid" : "is-invalid"}`}
//             id="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Insert Price"
//             autocomplete="off"
//           />
//           {errors.price && (
//             <div className="invalid-feedback">{errors.price}</div>
//             )}
//         </div>

//         <div className="inputsProduct">
//           <input
//             type="text"
//             className={`form-control ${!errors.brand && form.brand !== "" ? "is-valid" : "is-invalid"}`}
//             id="brand"
//             name="brand"
//             value={form.brand}
//             onChange={handleChange}
//             placeholder="Brand"
//             autocomplete="off"
//           />
//           {errors.brand && (
//             <div className="invalid-feedback">{errors.brand}</div>
//             )}
//         </div>

//         <div className="inputsProduct">
//           <textarea
//             type="text"
//             className={`form-control ${form.description !== "" ? "is-valid" : "is-invalid"}`}
//             id="description"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Write a description"
//             autocomplete="off"
//           />
//           {errors.description && (
//             <div className="invalid-feedback">{errors.description}</div>
//           )}
//         </div>
//         </div>

//         <div className="divStockColors">
//         <h5>Colors</h5>
//         {errors.stock && (
//           <div className="">{errors.stock}</div>
//           )}
//         <div className="divStock">
//             <div className="theRealLabelDiv">
//             <h6>S</h6>
//         <label className="stockWhite">
//           <input 
//           style={{color: "black"}}
//           className="input-goup"
//           id='white'
//           value={stock.S.white}
//           name='S'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='black'
//           value={stock.S.black}
//           name='S'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='grey'
//           value={stock.S.grey}
//           name='S'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>
//         </div>

//             <div className="theRealLabelDiv">
//             <h6>M</h6>
//         <label className="stockWhite">
//           <input 
//            style={{color: "black"}}
//           className="input-goup"
//           id='white'
//           value={stock.M.white}
//           name='M'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='black'
//           value={stock.M.black}
//           name='M'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='grey'
//           value={stock.M.grey}
//           name='M'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>
//         </div>

//         <div className="theRealLabelDiv">
//             <h6>L</h6>
//         <label className="stockWhite">
//           <input 
//            style={{color: "black"}}
//           className="input-goup"
//           id='white'
//           value={stock.L.white}
//           name='L'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='black'
//           value={stock.L.black}
//           name='L'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='grey'
//           value={stock.L.grey}
//           name='L'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>


//         </div>

//         <div className="theRealLabelDiv">
//             <h6>XL</h6>
//         <label className="stockWhite">
//           <input 
//            style={{color: "black"}}
//           className="input-goup"
//           id='white'
//           value={stock.XL.white}
//           name='XL'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockBlack">
//           <input 
//           className="input-goup"
//           id='black'
//           value={stock.XL.black}
//           name='XL'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>

//         <label className="stockGrey">
//           <input 
//           className="input-goup"
//           id='grey'
//           value={stock.XL.grey}
//           name='XL'
//           type="number"
//           min="0" 
//           max="999"
//           onChange={handleInputStock}
//           />
//         </label>


//         </div>
//         </div>
//         </div>

//         <div className="d-grid gap-2 col-6 mx-auto">
//           <button 
//             type="submit"
//             className="btnForm"
//             disabled={Object.keys(errors).length > 0 || form.name.length < 1}
//             onClick={handleSubmit}
//           >
//             Create
//           </button>
//         </div>
//       </form>
//       </div>
//             {/* *********** */}
//             <div className="divImagenes">
//             <div className="theRealDiv">

//                 <div className="buttonStyles">
//                  {loading ? (
//                    <h5>Cargando Imagenes...</h5>
//                    ) : (
//                      <div className="imageButtonContainer">
//                        <hr />
//                   {image.principal ? (
//                     <button className="btn-close" aria-label="Close" name="principal" onClick={handleDeleteImg}/>
//                   ) : null}
//                   <button style={{backgroundImage: `url(${image.principal})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: "none"}} value='principal' onClick={carousel} className="imageUploaded">Frente</button>
//                     <hr />
//                 </div>
//               )}

//               {loading ? (
//                 <h5>Cargando Imagenes...</h5>
//               ) : (
//                 <div className="imageButtonContainer">
//                   <hr />                 
//                   {image.secundaria ? (
//                     <button className="btn-close" aria-label="Close" name="secundaria" onClick={handleDeleteImg}/>
//                     ) : null}
//                     <button style={{backgroundImage: `url(${image.secundaria})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='secundaria' onClick={carousel} className="imageUploaded">Dorso</button>   
//                     <hr />
//                   </div>             
//               )}

//               {loading ? (
//                 <h5>Cargando Imagenes...</h5>
//               ) : (
//                 <div className="imageButtonContainer">
//                   <hr />
//                   {image.extra ? (
//                     <button className="btn-close" aria-label="Close" name="extra" onClick={handleDeleteImg}/>
//                   ) : null}       
//                   <button style={{backgroundImage: `url(${image.extra})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '3px', border: 'none'}} value='extra' onClick={carousel} className="imageUploaded">Extra</button>
//                   <hr />
//                 </div>
//               )}
//               </div>
//               <div className="containerImage">
//               {form.image && <img className="productImage" src={imagePP || form.image[0]}/>}
//               </div>
//               </div>


//             <div className="divInputs">
//               <input
//                   placeholder="Imagen 1"
//                   type="file"
//                   name="principal"
//                   onChange={uploadImage}
//               />
              
//               <input
//                 type="file"
//                 name="secundaria"
//                 onChange={uploadImage}
//               />
          
//               <input
//                 type="file"
//                 name="extra"
//                 onChange={uploadImage}
//               />
//             </div>
         
              
    

                
              
//             </div>
    
//             {/* ********* */}

//       </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;
