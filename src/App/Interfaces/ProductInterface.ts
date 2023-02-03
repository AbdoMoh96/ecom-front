interface ProductInterface {
    "product_id": number,
    "sku": string,
    "name": string,
    "price": number,
    "type_id": number,
    "type": string,
    "size": number|undefined|null,
    "weight": number|undefined|null,
    "height": number|undefined|null,
    "width": number|undefined|null,
    "length": number|undefined|null
}

export default ProductInterface;