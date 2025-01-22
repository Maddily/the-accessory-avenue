import useProduct from './useProduct';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdilMinusCircle, mdilPlusCircle } from '@mdi/light-js';
import Stars from '../../../../components/Stars/Stars';
import styles from './Product.module.css';

/**
 * Renders a product's details.
 *
 * @param {object} props - product and cart data.
 * @returns {JSX.Element}
 */
export default function Product(props) {
  const {
    quantity,
    stepHandler,
    addToCartHandler,
    removeFromCart,
    quantityInCart,
  } = useProduct(props);
  const { imageUrl, title, rating, price } = props;

  return (
    <article className={styles.product}>
      <img className={styles.image} src={imageUrl} alt="product image" />
      <div className={styles['card-body']}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.rating}>
          <span aria-labelledby="product-rating" aria-label="star rating">
            <Stars rating={rating} title={title} />
          </span>
          <span id="product-rating" aria-label="rating">
            {rating}
          </span>
        </div>
        <p aria-label="price" className={styles.price}>
          ${price}
        </p>
      </div>
      <div className={styles['input-container']}>
        <label htmlFor={title} className={styles['visually-hidden']}>
          product quantity
        </label>
        <button
          className={styles['step-down-button']}
          type="button"
          onClick={stepHandler}
          data-step="down"
          aria-label="decrease"
        >
          <Icon
            title="Decrease"
            className={styles['minus']}
            path={mdilMinusCircle}
            size={1}
          />
        </button>
        <input
          className={styles.input}
          type="number"
          name="product quantity"
          id={title}
          min={0}
          value={quantity}
          onChange={stepHandler}
        />
        <button
          className={styles['step-up-button']}
          type="button"
          onClick={stepHandler}
          data-step="up"
          aria-label="increase"
        >
          <Icon
            title="Increase"
            className={styles['plus']}
            path={mdilPlusCircle}
            size={1}
          />
        </button>
      </div>
      <button
        type="button"
        className={styles['add-to-cart']}
        onClick={addToCartHandler}
      >
        Add to cart
      </button>
      {quantityInCart && (
        <p className={styles['quantity-in-cart']}>
          {quantityInCart} in cart <span style={{fontWeight: 'normal'}}>-</span>{' '}
          <button
            onClick={() => removeFromCart(props.id)}
            className={styles.remove}
          >
            Remove
          </button>
        </p>
      )}
    </article>
  );
}

Product.propTypes = {
  id: PropTypes.number,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  rating: PropTypes.number,
  price: PropTypes.number,
};
