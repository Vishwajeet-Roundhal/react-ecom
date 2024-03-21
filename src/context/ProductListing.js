import React, { createContext, useEffect, useReducer } from 'react'
import { useProvider } from './provideContext'
import reducer from "../reducer/productListing"

const ProductContext = createContext()

const initialState = {
    filter_products : [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters : {
        text:"",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0
    },
};

export const ProductProvider = ({ children }) => {
    const {products} = useProvider();

    const [state,dispatch] = useReducer(reducer,initialState)

    const setGridView = () => {
        return dispatch({type:"SET_GRID_VIEW"})
    }

    const setListView = () => {
        return dispatch({type:"SET_LIST_VIEW"})
    }

    const sortt = (event) => {
        let userVal = event.target.value;
        dispatch({type:"GET_SORT_VALUES", payload: userVal})

    }

    const updateFilter = (event) =>{
        const name = event.target.name;
        const value = event.target.value;

       return dispatch({type:"UPDATE_FILTERS_VALUE", payload:{ name,value }})
    }

    const clearFilter = () => {
        dispatch({ type:'CLEAR_FILTERS' });

    }

    useEffect(() =>{
        dispatch({type:"FILTER_PRODUCTS"})
        dispatch({type:"SORTING_PRODUCTS"})
    },[products,state.sorting_value,state.filters])

    useEffect(() =>{
        dispatch({type:"LOAD_FILTER_PRODUCTS", payload: products})

    },[products])


    return (
        <ProductContext.Provider value={{ ...state, setGridView,setListView,sortt,updateFilter,clearFilter}}>{children}</ProductContext.Provider>
    )
}

export const useProductProvider = () => {
    return React.useContext(ProductContext)
}
