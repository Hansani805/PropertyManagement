import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>{detailProduct.product_id}</h6>
                    </div>
                    
                    <span>Rs. {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Reserved: {detailProduct.sold}</p>
                    {detailProduct.sold === 0 ? 

                    <Link to={{pathname:"/paymentmodal",state:detailProduct}} className="cart" 
                    
                    // onClick={() => addCart(detailProduct)}

                    >
                        Book Now
                    
                    </Link>
                    : <p className="cart">Booked</p>}

                    <br></br>
                    {/* < div className="rating"> */}
                    <Link
            to={{
              pathname: "/feedback",
              state: {
                product_id: params.id,
              },
            }}
            className="rating"
          >
           Rates/Reviews
          </Link>
                   

                    {/* </div> */}
                    
                    
                </div>
               
            </div>

      <div>
        <h2>Related Accommodations</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
