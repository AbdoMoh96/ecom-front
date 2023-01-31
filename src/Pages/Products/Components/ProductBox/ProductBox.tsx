import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import ProductInterface from "../../../../App/Interfaces/ProductInterface";

interface propTypes {
    product : ProductInterface,
    handleSetProductIds : (e : ChangeEvent<HTMLInputElement>, id : number) => void
}

const ProductBox : React.FC<propTypes> = ({product, handleSetProductIds}) => {

    return (
        <div className='product_box'>
            <span>{product.sku}</span>
            <span>{product.name}</span>
            <span>{product.price} $</span>

            {product.type_id === 1 && <span>size: {product.size} MB</span> }

            {product.type_id === 2 && <span>weight: {product.weight} kg</span>}

            {product.type_id === 3 &&
                <span>
                    Dimensions: {product.height}x{product.width}x{product.length}
                </span>
            }

            <Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetProductIds(e,product.product_id)} />
        </div>
    )
}

export default ProductBox;