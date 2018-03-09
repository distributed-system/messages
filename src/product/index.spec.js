import Product from './index'

describe('Product message', () => {
  it('Should encode correctly the message', async () => {
    const product = new Product('name', 'description', 'sku')
    const message = await product.encode()

    expect(message).not.toBeNull()
    expect(message.length).toBe(24)
    expect(message.base64Slice()).toBe('CgRuYW1lEgNza3UaC2Rlc2NyaXB0aW9u')
  })

  it('Should decode correctly the message', async () => {
    const encodedMessage = Buffer.from('CgRuYW1lEgNza3UaC2Rlc2NyaXB0aW9u', 'base64')
    const product = await (new Product()).decode(encodedMessage)

    expect(product).toBeDefined()
    expect(product).not.toBeNull()
    expect(product.name).toBe('name')
    expect(product.description).toBe('description')
    expect(product.sku).toBe('sku')
  })
})