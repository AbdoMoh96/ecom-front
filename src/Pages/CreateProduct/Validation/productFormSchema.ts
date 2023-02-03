import * as Yup from 'yup';

const ProductFormSchema = Yup.object().shape({
    sku: Yup.string().required('SKU is required'),
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required'),
    type_id: Yup.number().required('Product Type Is Required'),
    size: Yup.number().when('type_id', {
        is: 1,
        then: Yup.number().required('Size is required'),
    }),
    weight: Yup.number().when('type_id', {
        is: 2,
        then: Yup.number().required('Weight is required'),
    }),
    height: Yup.number().when('type_id', {
        is: 3,
        then: Yup.number().required('Height is required'),
    }),
    width: Yup.number().when('type_id', {
        is: 3,
        then: Yup.number().required('Width is required'),
    }),
    length: Yup.number().when('type_id', {
        is: 3,
        then: Yup.number().required('Length is required'),
    }),
});

export default ProductFormSchema;