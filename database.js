const db = require('./firebaseconfig')
const collections = {
  products: 'products',
  cart: 'cart'
}

module.exports.getProducts = async () => {
  let firebaseProducts = []

  await db.collection(collections.products).get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        firebaseProducts.push({
          id: doc.id,
          ...doc.data()
        })
      })
    })

  return firebaseProducts
}

module.exports.setProductToCart = async (id, name, price, url) => {
  let isUpdateOrNot = false
  let count = 0
  
  await db.collection(collections.cart).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const productCartId = doc.id

        if (productCartId === id) {
          isUpdateOrNot = true
          count = doc.data().count
        }
      })
    })

  if (isUpdateOrNot) {
    await db.collection(collections.cart).doc(id)
      .update({
        count: count + 1
      })
  } else {
    await db.collection(collections.cart).doc(id)
      .set({
        name,
        price,
        url,
        count: 1 
      })
  }
  
}

module.exports.getCart = async () => {
  let firebaseCart = []

  await db.collection(collections.cart).get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        firebaseCart.push({
          id: doc.id,
          ...doc.data()
        })
      })
    })

  return firebaseCart
}

module.exports.removeProductToCart = async (id) => {
  await db.collection(collections.cart).doc(id).delete()
}