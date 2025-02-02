import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartContent from './CartContent';
import useLoading from '../../../../hooks/useLoading';
import CartItem from '../CartItem/CartItem';
import { useOutletContext } from 'react-router-dom';

vi.mock('../CartItem/CartItem');
CartItem.mockImplementation(() => <div data-testid="cart item"></div>);

vi.mock('react-loader-spinner', () => ({
  ThreeDots: vi.fn(() => <div data-testid="loading-animation"></div>),
}));

vi.mock('../../../../hooks/useLoading', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(() => [
    [
      { id: 1, name: 'product1' },
      { id: 2, name: 'product2' },
    ],
    vi.fn(),
  ]),
  Link: vi.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

describe('CartContent', () => {
  beforeEach(() => {
    vi.mocked(useLoading).mockReturnValue({
      loading: false,
    });

    render(<CartContent />);
  });

  it('renders loading component', () => {
    vi.mocked(useLoading).mockReturnValueOnce({
      loading: true,
    });

    render(<CartContent />);

    const loadingComponent = screen.getByTestId('loading-animation');
    expect(loadingComponent).toBeInTheDocument();
  });

  it('renders an appropriate message and home link when there are no products in cart', () => {
    vi.mocked(useOutletContext).mockReturnValueOnce([[], vi.fn()]);

    render(<CartContent />);

    const heading = screen.getByRole('heading', {
      name: /your cart is empty/i,
    });
    const homeLink = screen.getByRole('link', { name: /back to homepage/i });

    expect(heading).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders a heading', () => {
    const yourCartHeading = screen.getByRole('heading', { name: /your cart/i });

    expect(yourCartHeading).toBeInTheDocument();
  });

  it('renders headers for each column in the cart', () => {
    const productHeader = screen.getByRole('columnheader', {
      name: /product/i,
    });
    const quantityHeader = screen.getByRole('columnheader', {
      name: /quantity/i,
    });
    const totalHeader = screen.getAllByRole('columnheader', {
      name: /total/i,
    });

    expect(productHeader).toBeInTheDocument();
    expect(quantityHeader).toBeInTheDocument();
    expect(totalHeader.length).toEqual(2);
  });

  it('renders cart items', () => {
    const cartItems = screen.getAllByTestId('cart item');

    expect(cartItems.length).toEqual(2);
  });
});
