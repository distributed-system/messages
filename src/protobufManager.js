import protobuf from 'protobufjs'
import fs from 'fs'
import Promise from 'bluebird'

Promise.promisifyAll(fs)

/** 
 * Return type based on the .proto file.
 * 
 * @param {string} protoFile - Relative path for proto file.
 * @param {string} typeName - Name of the namespace + type defined on the .proto.
 * 
 * @example await getType('./my-file.proto', 'my.Type')
*/
const getType = async (protoFile, typeName) => {
  await fs.statAsync(protoFile)
  
  const proto = await protobuf.load(protoFile)
  return proto.lookupType(typeName)
}

/**
 * Encode the payload based on the .proto file and the namespace + type.
 * 
 * @param {string} protoFile - Relative path for proto file.
 * @param {string} typeName - Name of the namespace + type defined on the .proto.
 * @param {Object} payload - The payload to encode.
 * 
 * @example const encodedPayload = await encode('./my-file.proto', 'my.Type', { a:1, b:2 })
 */
export async function encode(protoFile, typeName, payload) {
  const type = await getType(protoFile, typeName)
  const err = type.verify(payload)

  if(err)
    throw Error(err)

  const message = type.create(payload) // or use .fromObject if conversion is necessary
  return type.encode(message).finish()
}

/**
 * 
 * @param {string} protoFile - Relative path for proto file.
 * @param {string} typeName - Name of the namespace + type defined on the .proto.
 * @param {Uint8Array} messageInBytes - Message in bytes to decode .
 * 
 * @example const payload = await decode('./my-file.proto', 'my.Type', arrayOfBytes)
 */
export async function decode(protoFile, typeName, messageInBytes) {
  const type = await getType(protoFile, typeName)
  const message = type.decode(messageInBytes)
  return type.toObject(message)
}