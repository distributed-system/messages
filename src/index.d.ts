import lib from './index'

declare class Product {
  name:string
  description:string
  sku:string
  createdAt:number

  constructor(name: string, description: string, sku: string, createdAt:number)
  
  encode():Promise<Uint8Array>
  decode(message:Uint8Array):Promise<Product>
}

declare namespace protobufManager {
  export function encode(protoFile:string, typeName:string, payload:Object):Promise<Uint8Array>
  export function decode(protoFile:string, typeName:string, messageInBytes:Uint8Array):Promise<Object>
}