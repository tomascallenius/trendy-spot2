import Card from "../card/card.jsx";

const cardsContainer = ({currentProduct}) => {
    return (
        <div className="row">
        {currentProduct?.map((product, index) => (
          <div className="col-sm-12 col-md-2 col-lg-4 col-xl-4" key={index}>
            <Card 
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              productbrand={product.productbrand}
            />
          </div>
        ))}
      </div>
    )
};

export default cardsContainer;