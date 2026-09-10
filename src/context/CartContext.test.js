import { describe, it, expect } from 'vitest';
import { cartReducer } from './CartContext';

describe('cartReducer', () => {
  const sampleProduct = { id: 1, title: 'Test Product', price: 9.99 };

  it('adds a new item with quantity 1', () => {
    const result = cartReducer([], { type: 'ADD_ITEM', payload: sampleProduct });
    expect(result).toEqual([{ ...sampleProduct, quantity: 1 }]);
  });

  it('increments quantity when adding an existing item', () => {
    const initialState = [{ ...sampleProduct, quantity: 1 }];
    const result = cartReducer(initialState, { type: 'ADD_ITEM', payload: sampleProduct });
    expect(result).toEqual([{ ...sampleProduct, quantity: 2 }]);
  });

  it('removes an item by id', () => {
    const initialState = [{ ...sampleProduct, quantity: 1 }];
    const result = cartReducer(initialState, { type: 'REMOVE_ITEM', payload: 1 });
    expect(result).toEqual([]);
  });

  it('clears the entire cart', () => {
    const initialState = [{ ...sampleProduct, quantity: 3 }];
    const result = cartReducer(initialState, { type: 'CLEAR_CART' });
    expect(result).toEqual([]);
  });
});