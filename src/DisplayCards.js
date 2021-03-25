import React, { useState } from "react";
import "./DisplayCards.css";

const productsArray = [
  {
    productId: "1",
    name: "Apples",
    upvotes: 30,
    downvotes: 11,
  },
  {
    productId: "2",
    name: "Oranges",
    upvotes: 12,
    downvotes: 10,
  },
  {
    productId: "3",
    name: "Avocado",
    upvotes: 18,
    downvotes: 15,
  },
  {
    productId: "4",
    name: "Honey",
    upvotes: 23,
    downvotes: 38,
  },
  {
    productId: "5",
    name: "Milk",
    upvotes: 16,
    downvotes: 20,
  },
];

function ProductCard({ product, upvote, downvote }) {
  return (
    <div className="productCard">
      <div className="row">
      <div className="col-sm-6">
        <h2>{product.name}</h2>
        <ul style={{ listStyleType: "none" }}>
          <li>Upvotes: {product.upvotes}</li>
          <li>Downvotes: {product.downvotes}</li>
        </ul>
      </div>
      <div className="col-sm-6">
        <div className="d-flex flex-column">
          <button className="btn btn-info buttons m-1" data-target={product.productId} onClick={upvote}>
            Upvote
          </button>
          <button className="btn btn-info buttons m-1" data-target={product.productId} onClick={downvote}>
            Downvote
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default function DisplayCards() {
  const [products, setProducts] = useState(productsArray);
  const upvote = event => {
    const productId = event.currentTarget.getAttribute("data-target");
    setProducts(prevState => {
      return prevState.map(product => {
        if (product.productId === productId) return { ...product, upvotes: product.upvotes + 1 };
        else return product;
      });
    });
  };
  const downvote = event => {
    const productId = event.currentTarget.getAttribute("data-target");
    setProducts(prevState => {
      return prevState.map(product => {
        if (product.productId === productId) return { ...product, downvotes: product.downvotes + 1 };
        else return product;
      });
    });
  };
  const sortProducts = (basedOn, order) => {
    setProducts(prevState => {
      prevState.sort((a, b) => {
        if (basedOn === "upvotes") {
          if (order === "ascending") return a.upvotes - b.upvotes;
          else return b.upvotes - a.upvotes;
        } else {
          if (order === "ascending") return a.downvotes - b.downvotes;
          else return b.downvotes - a.downvotes;
        }
      });
      return prevState.slice();//so that we are not mutating state, otherwise render won't get affected;
    });
  };
  return (
    <div>
      <div className="row"> 
      {products.map(product => (
        <div className="col-sm-4">
        <ProductCard key={Math.random()*100123} product={product} upvote={upvote} downvote={downvote} />
        </div>
      ))}
      <div className="col-sm-8"></div>
      </div>
        <div className="row mb-5 mt-2">
          <div col="col-sm-2">
          <h2 className="mb-3 mt-2">Sort By:</h2>
          </div>
        <div className="col-sm-3">
        <button className="btn btn-info" onClick={() => sortProducts("upvotes", "ascending")}>Upvotes in ASC order</button>
        </div>
        <div className="col-sm-3">
        <button className="btn btn-info" onClick={() => sortProducts("upvotes", "descending")}>Upvotes in DESC order</button>
        </div>
        <div className="col-sm-3">
        <button className="btn btn-info" onClick={() => sortProducts("downvotes", "ascending")}>Downvotes in ASC order</button>
        </div>
        <div className="col-sm-3">
        <button className="btn btn-info" onClick={() => sortProducts("downvotes", "descending")}>Downvotes in DESC order</button>
        </div>
        </div>
      </div>
  );
}