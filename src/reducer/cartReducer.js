const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product,user, userId } = action.payload;



  let cartProduct = {
      id: id + color,
      name: product.name,
      color,
      amount,
      image: product.image[0].url,
      price: product.price,
      max: product.stock,
      user: user,
      userId: userId,
    };

    return {
      ...state,
      cart: [...state.cart, cartProduct],
    };
  }

  if (action.type === "REMOVE_ID") {
    let newCart = state.cart.filter((item) => item.id !== action.payload);
    return {
      ...state,
      cart: newCart,
    };
  }

  if(action.type === "CLEAR_CART"){
    return {
      ...state,
      cart: [],
    }
  }

  if(action.type === "SET_DECREMENT"){
    let updatedProduct = state.cart.map((product) => {
      if(product.id === action.payload){
        if(product.amount > 1){
          product.amount--;
        }
      }
      return product
    })
    return {
      ...state,
      cart: updatedProduct,
    }
  }

  if(action.type === "SET_INCREMENT"){
    let newProd = state.cart.map((prod) => {
      if(prod.id === action.payload){
        if (prod.amount <= 10){
          prod.amount++;
        }
      }
      return prod;
    })
    return {
      ...state,
      cart: newProd,
    }
  }

  if (action.type === "CART_TOTAL"){
    const totalCartAmount = state.cart.reduce((accumalator, currentValue) => {
      let {amount} = currentValue;
      accumalator = accumalator + amount;
      return accumalator;
    } ,0);
    return {
      ...state,
      total_item: totalCartAmount,
    }
  }

  if(action.type === "TOTAL_AMT"){
    let totalAmt = state.cart.reduce((accum,curr) =>{
      accum = accum + curr.price * curr.amount;
      return accum;
    },0);
    return {
      ...state,
      total_amount: totalAmt,
    }
  }

    // if(action.type === "TOTAL_AMT"){
    //   return {
    //     ...state,
    //     total_amount: action.payload,
    //   };
    // }



  return state;
};

export default cartReducer;
