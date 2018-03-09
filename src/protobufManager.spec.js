import { encode, decode } from './protobufManager'
import tempfile from 'tempfile'
import fs from 'fs'

const protobufTestContent = `
package test;
syntax = "proto3";

message Test {
  required int32 id = 1;
  required string name = 2;
}
`
let tempProto = '' 
const typeName = 'test.Test'
const testPayload = { id: 1, name: 'test' }

beforeAll(async done => {
  tempProto = tempfile('.proto')
  await fs.writeFileAsync(tempProto, protobufTestContent)
  done()
})

afterAll(async done => {
  await fs.unlinkAsync(tempProto)
  done()
})

describe('Protobuf Manager', () => {
  it('Should encode the message', async () => {
    const encodedMessage = await encode(tempProto, typeName, testPayload)
    expect(encodedMessage).not.toBeNull()
  })

  it('Should decode the message', async () => {
    const messageInBytes = Buffer.from('CAESBHRlc3Q=', 'base64')
    const data = await decode(tempProto, typeName, messageInBytes)
    expect(data).not.toBeNull()
  })

  it('Should throw when incorrect payload used', async () => {
    try {
      await encode(tempProto, typeName, { a: 1, b: 2})
    } catch (err) {
      expect(err).not.toBeNull()
    }
  })
})