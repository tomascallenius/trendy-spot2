import { NavLink } from "react-router-dom";

export const ConfirmationPage = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">¡Compra completada con éxito!</h1>
        <p className="lead">
          Gracias por comprar en Trendyspot. Tu pedido está siendo procesado y
          pronto lo recibirás en tu domicilio.
        </p>
        <hr className="my-4" />
        <p>
          Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
        </p>

        <NavLink to="/home" className="btn btn-primary btn-lg">
          Volver a Trendyspot
        </NavLink>
      </div>
    </div>
  );
};