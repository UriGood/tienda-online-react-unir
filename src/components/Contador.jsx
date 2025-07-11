import { useState } from 'react'
import '../styles/components/Contador.css'
export const Contador = () => {
    const [contadorValue, setContadorValue] = useState(1);

    const updatecontador = (value) => {
        if(value<1 && contadorValue == 1) return;
        setContadorValue(c=>c+value);
    }
 
  return (
    <div className="contador">
        <button className='contador__less' onClick={ () => updatecontador(-1) }>-</button>
            <input type="text" disabled className='contador__input' value={contadorValue}/>
        <button className='contador__more' onClick={ () => updatecontador(+1) }>+</button>
    </div>
  )
}
