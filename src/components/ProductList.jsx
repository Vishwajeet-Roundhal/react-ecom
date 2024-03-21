import React from 'react'
import GridView from './GridView'
import { useProductProvider } from '../context/ProductListing'
import ListView from './ListView'


function ProductList() {
    const {filter_products, grid_view} = useProductProvider()

    if(grid_view){
        return <GridView data={filter_products}/>
    }
    if(!grid_view){
        return <ListView data={filter_products}/>
    }
    return (
    <div></div>
  )
}

export default ProductList