import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';
import './NewProduct.css';

const NewProduct = props => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredId, setEnteredId] = useState('');

  const titleChangeHandler = event => {
    setEnteredTitle(event.target.value);
  };

  const priceChangeHandler = event => {
    setEnteredPrice(event.target.value);
  };

  const idChangeHandler = event => {
    setEnteredId(event.target.value);
  };

  const submitProductHandler = event => {
    event.preventDefault();
    props.onAddProduct(enteredTitle, enteredPrice, enteredId);
  };

  return (
    <section id="new-product">
      <h2>Add a New Product</h2>
      <form onSubmit={submitProductHandler}>
        <Input
          type="text"
          label="Title"
          id="title"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
        <Input
          type="number"
          label="Price"
          step={0.01}
          id="price"
          value={enteredPrice}
          onChange={priceChangeHandler}
        />
        <Input
          type="number"
          label="ID"
          step={0.01}
          id="id"
          value={enteredId}
          onChange={idChangeHandler}
        />
        <Button type="submit">ADD PRODUCT</Button>
      </form>
    </section>
  );
};

export default NewProduct;
