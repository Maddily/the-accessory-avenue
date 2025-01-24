import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuantityInCart from './QuantityInCart';

describe('QuantityInCart', () => {
  it('Displays the quantity added to cart when quantityInCart is above 0', () => {
    render(<QuantityInCart quantityInCart={5} />);

    const quantityInCart = screen.getByRole('paragraph', {
      name: 'quantity in cart',
    });

    expect(quantityInCart.textContent).toMatch(/5 in cart/);
  });

  it('does not render anything when the product is not in the cart', () => {
    render(<QuantityInCart />);

    const quantityInCart = screen.queryByRole('paragraph', {
      name: 'quantity in cart',
    });

    expect(quantityInCart).toBeNull();
  });
});
