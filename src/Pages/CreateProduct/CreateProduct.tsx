import React, {useEffect, useState} from 'react';
import Layout from "../../Layout";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import ProductFormInterface from "../../App/Interfaces/ProductFormInterface";
import {useForm, SubmitHandler, Controller, useWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import productFormSchema from "./Validation/productFormSchema";
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


    const {control, handleSubmit, setError, formState: {errors}} = useForm<ProductFormInterface>({
        resolver: yupResolver(productFormSchema),
        reValidateMode: 'onChange',
        mode: 'all'
    });

    const onSubmit: SubmitHandler<ProductFormInterface> = async data => {
        try {
            let response = await axios.post(`${import.meta.env.VITE_API_URL}/products/new`, data);
            if (response.status === 200) {
                navigate('/products/list');
            }
        } catch (error: any) {
            if (error.response.status === 400) {
                setError('sku', {type: 'custom', message: error.response.data.message});
            }
        }
    };

    const headerJsx = (): JSX.Element => {
        return <>
            <div className='actions_new'>
                <Button variant="outlined" onClick={() => navigate('/products/list')}>Go Back</Button>
                <Button variant="contained" type='submit' color="success" form='product-form'>Save</Button>
            </div>
        </>
    }

    const currentType = useWatch<ProductFormInterface>({
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
                    <p className='error'>{errors.sku?.message}</p>
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
                    <p className='error'>{errors.name?.message}</p>
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
                            type='number'
                            variant="outlined"/>}
                    />
                    <p className='error'>{errors.price?.message}</p>
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
                    <p className='error'>{errors.type_id?.message}</p>
                </div>


                {currentType === 1 &&
                    <div className='product_type_wrapper'>
                        <div className='from_group'>
                            <Controller
                                name="size"
                                control={control}
                                render={({field}) => <TextField
                                    fullWidth
                                    size={"small"}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    label="Size"
                                    type='number'
                                    variant="outlined"/>}
                            />
                            <p className='error'>{errors.size?.message}</p>
                        </div>

                        <p className='description'>Enter DVD size in mega bites (MP) in this field.</p>
                    </div>
                }

                {currentType === 2 &&
                    <div className='product_type_wrapper'>
                        <div className='from_group'>
                            <Controller
                                name="weight"
                                control={control}
                                render={({field}) => <TextField
                                    fullWidth
                                    size={"small"}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    label="Weight"
                                    type="number"
                                    variant="outlined"/>}
                            />
                            <p className='error'>{errors.weight?.message}</p>
                        </div>
                        <p className='description'>Enter Book weight in kilograms (kg) in this field.</p>
                    </div>
                }

                {currentType === 3 &&
                    <div className='product_type_wrapper'>
                        <div className='from_group'>
                            <Controller
                                name="height"
                                control={control}
                                render={({field}) => <TextField
                                    fullWidth
                                    size={"small"}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    label="Height"
                                    type="number"
                                    variant="outlined"/>}
                            />
                            <p className='error'>{errors.height?.message}</p>
                        </div>

                        <div className='from_group'>
                            <Controller
                                name="width"
                                control={control}
                                render={({field}) => <TextField
                                    fullWidth
                                    size={"small"}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    label="Width"
                                    type="number"
                                    variant="outlined"/>}
                            />
                            <p className='error'>{errors.width?.message}</p>
                        </div>

                        <div className='from_group'>
                            <Controller
                                name="length"
                                control={control}
                                render={({field}) => <TextField
                                    fullWidth
                                    size={"small"}
                                    value={field.value || ''}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                    label="Length"
                                    type="number"
                                    variant="outlined"/>}
                            />
                            <p className='error'>{errors.length?.message}</p>
                        </div>

                        <p className='description'>Enter Furniture dimensions (height, width, length) in centimeters
                            (cm).</p>
                    </div>
                }

            </form>
        </Layout>
    )
}

export default CreateProduct;