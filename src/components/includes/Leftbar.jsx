import React, { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import BrandItem from '../products/components/BrandItem'

export default function Leftbar(props) {
    const [lPrice, setLprice] = useState("");
    const [hPrice, setHprice] = useState("");

    const handlePrice = e => e.target.name === "lowPrice" ? setLprice(e.target.value) : setHprice(e.target.value);
    const submitFormResearchByPrices = e => {
        e.preventDefault();
        props.fetchProductPlageOfPrice(parseFloat(lPrice), parseFloat(hPrice));
    }


    return (
        <div className="col-2">
            <h4 className="text-center">Recherche</h4> <hr/>
            <h6>Par Marque</h6>
            <input type="radio" name="brand" value="0" onClick={props.fetchProductByBrand.bind(this, 0)} /> Toutes <br/>
            <div>
                {
                    props.all_brands.map(brand => (
                        <BrandItem 
                            brand={brand} key={brand.id} 
                            fetchProductByBrand={props.fetchProductByBrand}
                        />
                    ))
                }
            </div> <hr/>
            <h6>Par Prix</h6>
            <div>
            {/* {props.fetchProductPlageOfPrice.bind(this)} */}
                <form onSubmit={submitFormResearchByPrices} id="form">
                    <div className="form-group col-xs-2">
                        <input type="number" className="form-control" name="lowPrice" min="5" max="20000" placeholder="Prix minimal" onChange={handlePrice} value={lPrice} />
                    </div>
                    <div className="form-group col-xs-2">
                        <input type="number" className="form-control" name="highPrice" min="5" max="20000" placeholder="Prix maximal" onChange={handlePrice} value={hPrice} />
                    </div>
                    <div className="form-group col-xs-2">
                        <input type="submit" value="Rechercher" className="btn btn-dark float-right"/>
                    </div>
                </form>
            </div>
        </div>
    )
}
