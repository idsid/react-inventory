import React, { useState } from 'react';
import { config } from '../config';

const ProductAdd = ({ onNewProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('true');

  const handleNewProduct = (p) => {
    p.Id = name;
    p.Name = name;
    p.Price = price;
    p.Quantity = quantity;
    p.Status = selectedStatus;
    onNewProduct(p);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && price && quantity) {
        const data = { name, price, quantity, selectedStatus };
        data.price = parseFloat(data.price);
        data.quantity = parseInt(data.price);
        data.status = selectedStatus === 'true' ? true : false;
        
        let headers = new Headers();
        headers.append('Origin', config.host);

        fetch(`${config.host}/product`, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
          .then((response) => {
            response.json()
            setName('')
            setPrice('')
            setQuantity('')
            setSelectedStatus('true')

            handleNewProduct(data);
        })
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  }

  return (
    <div>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                />
            </label>
            <br />
            <label>
                Price:
                <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                />
            </label>
            <br />
            <label>
                Quantity:
                <input
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                />
            </label>
            <br />
            <label>
                Status:
                <label>
                    <input
                    type="radio"
                    value="true"
                    checked={selectedStatus === 'true'}
                    onChange={handleStatusChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                    type="radio"
                    value="false"
                    checked={selectedStatus === 'false'}
                    onChange={handleStatusChange}
                    />
                    No
                </label>
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}

export default ProductAdd;
