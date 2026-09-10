import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const sampleProduct = { id: 1, title: 'Test Product', price: 19.99, image: 'x.png' };

describe('cart flow', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('username', 'testuser');
  });

  it('updates the Navbar cart count when Add to Cart is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <ProductCard product={sampleProduct} />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Cart (0)')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
  });
});