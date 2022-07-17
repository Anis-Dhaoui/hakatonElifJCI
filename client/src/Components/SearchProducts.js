import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../shared_data/Url';
import '../css/searchProducts.css';

export default function SearchProducts (props) {

  const [search, setSearch] = useState("");

  // Search input   
  const onInput = e => setSearch(e.target.value);
  // Select the wrapper and toggle className 'focus'
  const onFocus = e => e.target.parentNode.parentNode.classList.add('focus');
  const onBlur = e => e.target.parentNode.parentNode.classList.remove('focus');

    if (!props.products) {
      return <p>Loading...</p>
    }
    let filtered = props.products.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));


    return (
      <div id="search-container">
        <div className="wrapper">
            <div className="search">
                <input
                id="search"
                type="search"
                value={search}
                placeholder="Chercher une place par nom..."
                onChange={onInput}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete="off"
                />
                <i className="fa fa-search"></i>
            </div>

          {search.length > 0 && filtered.length > 0 && (
            <ul className="list">
              {filtered.map((product, index) => (
                <Link to={`/products/${product._id}`} key={product._id}>
                    <li className={index % 2 === 0 ? "row bgLightGray mb-1" : "row bgLight mb-1"}>
                        <div className="col-2">
                            <img className="rounded" src={url + product.images[0]} width="50px" height="50px" alt={product.name} />
                        </div>
                        <div className="d-flex align-items-center col-10">
                            <h6 className="mx-auto mx-md-0 text-uppercase">{product.name}</h6>
                        </div>
                    </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
};