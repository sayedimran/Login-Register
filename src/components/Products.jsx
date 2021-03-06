import React, { useState, useEffect } from "react"
import productStyles from "../styles/products.module.css"
import { Link, navigate } from "gatsby"
import AddProduct from "../images/plus.png"

const Products = () => {
  const [products, setProducts] = useState([])
  const [deleteProduct, setDeleteProduct] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(response => response.json())
      .then(data => {
        console.log(data.Products)
        setProducts(data.Products)
      })
      .catch(err => console.log(err))
  }, [deleteProduct])

  return (
    <section>
      <h1 style={{ textAlign: `center` }}>All Products</h1>
      <ul className={productStyles.container}>
        {products.map(product => (
          <li className={productStyles.products} key={product._id}>
            <h1>{product.name} </h1>
            <p> {product.price} </p>
            <Link to={`/app/product/${product._id}`}>
              <button> More Details</button>
            </Link>{" "}
            <button
              onClick={e => {
                e.preventDefault()
                fetch(`http://localhost:3000/products/${product._id}`, {
                  method: "DELETE",
                })
                  .then(data => {
                    alert("Data Deleted")
                    setDeleteProduct(true)
                    navigate("/app/dashboard")
                  })
                  .catch(err => console.log(err))
              }}
            >
              Delete
            </button>
            <Link to={`/app/edit/${product._id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
      <section className={productStyles.iconContainer}>
        <button
          className={productStyles.btn}
          onClick={e => {
            e.preventDefault()
            navigate("/app/product/new")
          }}
        >
          <img className={productStyles.icon} src={AddProduct} alt="plusicon" />
        </button>
      </section>
    </section>
  )
}

export default Products
