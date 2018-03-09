import { decode, encode } from '../../protobufManager'
import debug from 'debug'
import path from 'path'

const log = debug('message:log')

//eslint-disable-next-line no-console
log.log = console.log.bind(console)
global.log = log

const productProtoFile = path.resolve(`${__dirname}/../protos/product.proto`)
const typeName = 'product.NewProduct'

/**
 * Product class, used to exchange messages
 */
export default class Product {
  /**
   * Constructor for Product class.
   * 
   * @param {string} name - Name of the product.
   * @param {string} description - Description of the product.
   * @param {string} sku - SKU of the product.
   * @param {int64} createdAt - Creation date in timestamp.
   * 
   * @example new Product()
   */
  constructor(name, description, sku, createdAt) {
    this.name = name
    this.description = description
    this.sku = sku
    this.createdAt = createdAt || new Date().getTime()
  }

  /**
   * Method to especialize the protobufManager and return the encoded info.
   * 
   * @example const encodedMessage = await encode()
   */
  async encode() {
    return await encode(
      productProtoFile, 
      typeName,
      this
    )
  }

  /**
   * Method to especialize the protobufManager and return the decoded payload.
   * 
   * @param {Uint8Array} message - Payload to decode.
   * 
   * @example const payload = await decode(arrayOfBytes)
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
      data.sku,
      data.createdAt.toNumber()
    )
  }
}
