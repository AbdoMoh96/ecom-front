import React, {useEffect, useState} from 'react';
import Layout from "../../Layout";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ProductInterface from "../../App/Interfaces/ProductInterface";
import {useForm, SubmitHandler, Controller, useWatch} from "react-hook-form";
import {TextField} from "@mui/material";
import "./Resources/Scss/index.scss";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TypeInterface from "../../App/Interfaces/TypeInterface";
import axios from "axios";


interface propTypes {

}


const CreateProduct: React.FC<propTypes> = ({}) => {

    const navigate = useNavigate();
    const [types, setTypes] = useState<Array<TypeInterface>>([]);


    const {control, handleSubmit, watch, formState: {errors}} = useForm<ProductInterface>();
    const onSubmit: SubmitHandler<ProductInterface> = data => console.log(data);

    const headerJsx = (): JSX.Element => {
        return <>
            <div className='actions_new'>
                <Button variant="outlined" onClick={() => navigate('/products/list')}>Go Back</Button>
                <Button variant="contained" type='submit' color="success" form='product-form'>Save</Button>
            </div>
        </>
    }

    const currentType = useWatch<ProductInterface>({
        control: control,
        name: 'type_id'
    });

    const handleSetTypes = async () => {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/products/types/list`);
        setTypes(response.data);
    }

    useEffect(() => {
        handleSetTypes().catch();
    }, [])

    return (
        <Layout pageTitle='Product Add' headerJsx={headerJsx}>
            <form id='product-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='from_group'>
                    <Controller
                        name="sku"
                        defaultValue=''
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            fullWidth
                            size={"small"}
                            label="SKU"
                            type="text"
                            variant="outlined"/>}
                    />
                </div>

                <div className='from_group'>
                    <Controller
                        name="name"
                        defaultValue=''
                        control={control}
                        render={({field}) => <TextField
                            {...field}
                            fullWidth
                            size={"small"}
                            label="Name"
                            type="text"
                            variant="outlined"/>}
                    />
                </div>

                <div className='from_group'>
                    <Controller
                        name="price"
                        control={control}
                        render={({field}) => <TextField
                            fullWidth
                            size={"small"}
                            value={field.value || ''}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            label="Price"
                            variant="outlined"/>}
                    />
                </div>

                <div className='from_group'>
                    <Controller
                        name="type_id"
                        control={control}
                        render={({field}) => <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Type Switcher</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field.value || ''}
                                label="Type Switcher"
                                onChange={field.onChange}
                            >
                                {types.map(type => {
                                    return <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>}
                    />
                </div>


                {currentType === 1 &&
                    <>
                        <h1>type is dvd</h1>
                    </>
                }

                {currentType === 2 &&
                    <>
                        <h1>type is book</h1>
                    </>
                }

                {currentType === 3 &&
                    <>
                        <h1>type is furniture</h1>
                    </>
                }

            </form>
        </Layout>
    )
}

export default CreateProduct;