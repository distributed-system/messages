import Product from './index'

const createdAt = 1520604725706

describe('Product message', () => {
  it('Should encode correctly the message', async () => {
    const product = new Product('name', 'description', 'sku', createdAt)
    const message = await product.encode()

    expect(message).not.toBeNull()
    expect(message.length).toBe(31)
    expect(message.base64Slice()).toBe('CgRuYW1lEgNza3UaC2Rlc2NyaXB0aW9uIMqD69igLA==')
  })

  it('Should decode correctly the message', async () => {
    const encodedMessage = Buffer.from('CgRuYW1lEgNza3UaC2Rlc2NyaXB0aW9uIMqD69igLA==', 'base64')
    const product = await (new Product()).decode(encodedMessage)

    expect(product).toBeDefined()
    expect(product).not.toBeNull()
    expect(product.name).toBe('name')
    expect(product.description).toBe('description')
    expect(product.sku).toBe('sku')
    expect(product.createdAt).toBe(createdAt)
  })
})