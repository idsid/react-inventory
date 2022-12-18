import { useEffect, useState } from "react"
import ProductItem from './ProductItem';

const Products = ({ product }) => {
    let [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = new Headers();

                headers.append('Origin','http://localhost:8080');
                const response = await fetch('http://localhost:8080/products', {
                    mode: 'cors',
                    method: 'GET',
                    headers: headers
                });
                const json = await response.json();
                setData(json);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        // Multi Platform app when database got changed web changed too
        const interval = setInterval(() => {
            fetchData();
        }, 30000);

        fetchData();

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>{error.message}</div>;
    }

    if (data) {
        if (product) {
            console.log(product);
            data.data.push(product);
        }

        return (
            <ul>
                {data.data.map(product => (
                    <ProductItem 
                        key={product.Id} 
                        product={{
                            id: product.Id,
                            name: product.Name, 
                            price: product.Price, 
                            quantity: product.Quantity, 
                            status: product.Status
                        }}>
                    </ProductItem>
                ))}
            </ul>
        )
    }
}

export default Products;