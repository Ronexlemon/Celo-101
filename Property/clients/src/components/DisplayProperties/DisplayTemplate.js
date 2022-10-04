import React from "react"
import "./display_module.css"

const DisplayTemplate =(props) =>{
    return <div className="card-container">
    <h1 id='available-tenders-page-h1'>Available Properties</h1>
    <hr id='horizontal-line' />
    {props.properties.map((property, index) => (
      <div className='PropertyCard' key={property.index} >
        <div className='tenderCardHeader' id='tenderCardHeader'>
          <div className="tenderCardHeader-blank"></div>
          <div className="tenderCardHeader-content">
          <img src={property.image} alt="Transparent Red Jeep Clipart - Audi R8 Car Png, Png Download@kindpng.com"/>
            
            <p id='tender-description' className='tender-amount-description-p'>{property.descriptions}</p>
            <p id='tender-amount' className='tender-amount-description-p'>Proprty worth: {property.price / 1000000000000}</p>
          </div>
        </div>
        <div className='tenderCard-middle' id='tendercard-middle'>
          <h5>&nbsp;{property.description}&emsp;&emsp;&emsp;&emsp;&nbsp; </h5>
        </div>
        <div className='bid-btn' id='bid-btn-approve-btn'>

          <button className='btn-bid'  id='btn-bid' >BUY</button>

        </div>


      </div>

    ))}

  </div>

}
export default DisplayTemplate;