import './Alerta.css'

const Alerta = ({alerta}) => {
    return (
      <div className={ `${alerta.error ? 'alertRed' : 'alertOk' } bg-gradient-to-br`}>
          {alerta.msg}
      </div>
    )
  }
  
  export default Alerta
  
  