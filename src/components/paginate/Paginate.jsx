import './pag-styles.css'

const Paginate = ({handlePageChange, currentPage, totalPages}) => {
  return (
    <div className="d-flex justify-content-center align-items-center py-3 pagination">
        <button
          className="btn btn-primary me-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr; Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`btn btn-outline-primary ${currentPage === index + 1 ? 'active' : ''} me-2`}
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente &rarr;
        </button>
      </div>
  )
}

export default Paginate