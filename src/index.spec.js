import { Product } from './index'

describe('NPM Startup lib', () => {
  it('Should expose product class', () => {
    const product = new Product('a', 'b', 'c')
    expect(product.name).toBe('a')
    expect(product.description).toBe('b')
    expect(product.sku).toBe('c')
  })
})