import React from 'react';
import Layout from "../../Layout";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

import "./Resources/Scss/index.scss";

interface propTypes {

}




const CreateProduct : React.FC<propTypes> = ({}) => {

    const navigate = useNavigate();

    const headerJsx = () : JSX.Element => {
     return <>
         <div className='actions_new'>
             <Button variant="outlined" onClick={() => navigate('/products/list')}>Go Back</Button>
             <Button variant="contained" color="success" >Save</Button>
         </div>
     </>
 }

    return(
        <Layout pageTitle='Product Add' headerJsx={headerJsx}>
            <form>


            </form>
        </Layout>
    )
}

export default CreateProduct;