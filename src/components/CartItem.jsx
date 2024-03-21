import React from 'react'
import FormatPrice from "../Helpers/FormatPrice"
import CartButton from './CartButton'
import { FaTrash } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';

function CartItem({id,name,image,amount,color,price,stock}) {
  const {removeId, setDec,setInc} = useCartContext();
  
  return (
    <div className='card_heading grid grid-five-column'>
      <div className="cart-image--name">
        <div>
        <figure>
          <img src={image} alt={id} />
        </figure>
        </div>
      <div>
        <p>{name}</p>
        <div className="color-div">
          <p>color</p>
          <div className="color-style" style={{backgroundColor: color, color:color}}></div>
          </div>
      </div>
      </div>
      <div className="cart-hide">
        <p><FormatPrice price={price}/></p>
      </div>
      <div>
      <CartButton amount={amount}
        setDec={() => setDec(id)}
        setInc={() => setInc(id)}
        
      />
      </div>
      <div className="cart-hide">
        <p>
          <FormatPrice price={price*amount}/>
        </p>
      </div>
      <div>
        <FaTrash color='black' className="remove_icon" onClick={() => removeId(id)}/>
      </div>
    </div>
  )
}

export default CartItem