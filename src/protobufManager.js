import protobuf from 'protobufjs'
import fs from 'fs'
import Promise from 'bluebird'

Promise.promisifyAll(fs)

/** 
 * 
*/
const getType = async (protoFile, typeName) => {
  await fs.statAsync(protoFile)
  
  const proto = await protobuf.load(protoFile)
  return proto.lookupType(typeName)
}

/**
 * 
 * @param {*} protoFile 
 * @param {*} message 
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
 * @param {*} protoFile 
 * @param {*} message 
 */
export async function decode(protoFile, typeName, messageInBytes) {
  const type = await getType(protoFile, typeName)
  const message = type.decode(messageInBytes)
  return type.toObject(message)
}