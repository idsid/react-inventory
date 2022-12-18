const ProductItem = ({product, onClickDeleteHandler}) => {
    return (
        <div>
            <h3>{product.name}</h3>
            <ul>
                <li>Price : {product.price}</li>
                <li>Quantity : {product.quantity}</li>
                <li>Status : {product.status}</li>
            </ul>
        </div>
    )
}

export default ProductItem