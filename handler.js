'use strict';
const db = require('./database')

module.exports.getProducts = async (event, context, callback) => {
  const products = await db.getProducts()
  return formatResponse(products)
}

module.exports.setProductToCart = async (event, context, callback) => {
  const { id, name, price, url } = JSON.parse(event.body)

  await db.setProductToCart(id, name, price, url)
  return formatResponse({sucess: true })
}

module.exports.getCart = async (event, context, callback) => {
  const cart = await db.getCart()

  return formatResponse(cart)
}

module.exports.removeProductToCart = async (event, context, callback) => {
  const id = event.queryStringParameters.id

  await db.removeProductToCart(id)
  return formatResponse({sucess: true })
}

const formatResponse = (body) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
  },
    body: JSON.stringify(body)
  }
}
