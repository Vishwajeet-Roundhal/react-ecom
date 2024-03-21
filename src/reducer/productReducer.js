
const prodctReducer = (state,action) => {
    if( action.type === 'API_LOADING'){
        return {...state, isLoading: true}
    }
    
    if ( action.type === 'ERROR'){
        return {
            ...state,
            isLoading:false,
            isError:true,
        }
    }

    switch(action.type){
        case "MY_API_DATA":
            console.log(action.payload)
            const featData = action.payload.filter((curr) =>{
                return curr.featured === true;
            });

            return{
                ...state,
                isLoading:false,
                products: action.payload,
                featuredProd: featData,
            }

        case "SINGLE_API_LOADING":
            return{
                ...state,
                isSingleLoading:true,
            }

        case "MY_SINGLE_DATA":
            return {
                ...state,
                isSingleLoading:false,
                singleProd: action.payload,
            }
        case "err":
            return {
                ...state,
                isSingleLoading:false,
                isError:true,
            }
        default:
            return state
    }

}


export default prodctReducer