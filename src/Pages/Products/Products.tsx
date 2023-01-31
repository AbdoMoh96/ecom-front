import React, {useEffect, useState, ChangeEvent} from 'react';
import './Resources/Scss/index.scss';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Checkbox, {CheckboxProps} from '@mui/material/Checkbox';
import ProductInterface from "../../App/Interfaces/ProductInterface";

interface PropTypes {

}

const Products : React.FC<PropTypes> = ({}) => {

    const [action, setAction] = useState<string>('');
    const [productIds, setProductIds] = useState<Array<number>>([]);
    const [products, setProducts] = useState<Array<ProductInterface>>([]);

    const handleSetProducts = async () => {
      let response = await axios.get(`${import.meta.env.VITE_API_URL}/products/list`);
      setProducts(response.data);
    }

    const handleActionChange = (event : SelectChangeEvent) => {
       setAction(event.target.value);
    }

    const handleSetProductIds = (event : ChangeEvent<HTMLInputElement>, id : number) => {
        let isChecked = event.target.checked;

        if (isChecked){
            setProductIds([...productIds, id]);
        }

        if (!isChecked){
            setProductIds(productIds.filter(productId => productId != id));
        }
    }

    const handleApplyButton = () => {
       if (action === 'delete'){
           // axios post call to delete all products in productIds
       }
    }


    useEffect(() => {
       handleSetProducts().catch();
    }, []);

    return(
        <main>
            <header>
                <span className='title'>product list</span>

                <div className='mass-delete'>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Action</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={action}
                            label="Age"
                            onChange={handleActionChange}
                        >
                            <MenuItem value={'add'}>Add New Product</MenuItem>
                            <MenuItem value={'delete'}>Mass Delete Action</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={handleApplyButton}>Apply</Button>
                </div>
            </header>

            <section className='products_section'>
                {products.map(product => {
                    return <div className='product_box' key={product.product_id}>
                        <span>{product.sku}</span>
                        <span>{product.name}</span>
                        <span>{product.price} $</span>
                        <span>size 700M</span>
                        <Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetProductIds(e,product.product_id)} />
                    </div>
                })}
            </section>
        </main>
    )
}

export default Products;