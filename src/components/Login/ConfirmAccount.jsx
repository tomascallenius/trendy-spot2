import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../Login/";
import axiosClient from "../../contextlogin/config/axiosClient";
import "./styles.css";

export const ConfirmAccount = () => {
  const [alerta, setAlerta] = useState({});
  const [accountConfirmated, setAccountConfirmated] = useState(false);

  const params = useParams();
  const { id } = params; //desestructuramos extrayendo id de params

  useEffect(() => {
    const ConfirmAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        // const {data} = await clienteAxios(url)
        const { data } = await axiosClient.post(url);

        // console.log(data)
        setAlerta({
          msg: data.msg,
          error: false,
        });
        setAccountConfirmated(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.error,
          error: true,
        });
      }
    };
    ConfirmAccount();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <div>ConfirmAccount</div>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {accountConfirmated && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/login"
          >
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

