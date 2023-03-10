import React, {useEffect, useState, ChangeEvent} from 'react';
import {useNavigate} from "react-router-dom";
import './Resources/Scss/index.scss';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import ProductInterface from "../../App/Interfaces/ProductInterface";
import ProductBox from "./Components/ProductBox";
import Layout from "../../Layout";

interface PropTypes {

}

const Products : React.FC<PropTypes> = ({}) => {

    const [action, setAction] = useState<string>('');
    const [productIds, setProductIds] = useState<Array<number>>([]);
    const [products, setProducts] = useState<Array<ProductInterface>>([]);
    const navigate = useNavigate();

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

    const handleApplyButton = async ()  => {
       if (action === 'delete' && productIds.length > 0){
           let response = await axios.delete(`${import.meta.env.VITE_API_URL}/products/delete`,{
               method : 'delete',
               data : {
                   "product_ids" : productIds
               }
           });
           if (response.status === 200){
               handleSetProducts().catch();
           }
       }
    }


    useEffect(() => {
       handleSetProducts().catch();
    }, []);

    const headerJsx = () : JSX.Element => {
        return <>
            <div className='actions'>
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Action</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={action}
                        label="Age"
                        onChange={handleActionChange}
                    >
                        <MenuItem value={'delete'}>Mass Delete Action</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleApplyButton}>Apply</Button>
                <Button variant="contained" color="success" onClick={() => navigate('/products/new')}>ADD</Button>
            </div>
        </>
    }

    return(
        <Layout pageTitle='Product List' headerJsx={headerJsx}>
            <section className='products_section'>
                {products.map(product => {
                    return <ProductBox
                              key={product.product_id}
                              product={product}
                              handleSetProductIds={handleSetProductIds}
                           />
                })}
            </section>
        </Layout>
    )
}

export default Products;