import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import CardsContainer from '../../components/cardsContainer/container'
import Filter from "../../components/filter/filter";
import Paginate from '../../components/paginate/Paginate';
import banner from '../../assets/Home.png'
import "./home.css";

const Home = () => {
  const allClothes1 = useSelector((state) => state.allClothes1);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1)

  }, [allClothes1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 400); // Scroll hacia arriba
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allClothes1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allClothes1.length / productsPerPage);

  if (allClothes1.length === 0) {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <img src={banner} className="background-image" />
    <div className="container py-3">
      <Filter onPageChange={(page) => setCurrentPage(page)}/>
      <CardsContainer currentProduct={currentProduct} />
      <Paginate currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
    </div>
    </div>
  );
};

export default Home;
