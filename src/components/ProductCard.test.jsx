import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ProductCard from './ProductCard';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';

const sampleProduct = {
  id: 1,
  title: 'Wireless Headphones',
  price: 59.99,
  image: 'https://placehold.co/200',
};

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>{ui}</CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProductCard', () => {
  it('displays the product title and price', () => {
    renderWithProviders(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('$59.99')).toBeInTheDocument();
  });

  it('renders an Add to Cart button', () => {
    renderWithProviders(<ProductCard product={sampleProduct} />);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});