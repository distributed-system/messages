import { decode, encode } from '../protobufManager'
import debug from 'debug'
import path from 'path'

const log = debug('message:log')

//eslint-disable-next-line no-console
log.log = console.log.bind(console)
global.log = log

const productProtoFile = path.resolve(`${__dirname}/product.proto`)
const typeName = 'product.NewProduct'

/**
 * 
 */
export default class Product {
  /**
   * Teste.
   * 
   * @example new ()
   */
  constructor(name, description, sku) {
    this.name = name
    this.description = description
    this.sku = sku
  }
  /**
   * 
   */
  async encode() {
    return await encode(
      productProtoFile, 
      typeName,
      this
    )
  }

  /**
   * 
   * @param {*} message 
   */
  async decode(message) {
    const data = await decode(
      productProtoFile, 
      typeName,
      message
    )

    return new Product(
      data.name,
      data.description,
      data.sku
    )
  }
}
