import React from "react"

const DisplayTemplate =(props) =>{
    return <div className="card-container">
    <h1 id='available-tenders-page-h1'>Available Tenders</h1>
    <hr id='horizontal-line' />
    {props.properties.map((tender, index) => (
      <div className='tenderCard' key={tender.index} >
        <div className='tenderCardHeader' id='tenderCardHeader'>
          <div className="tenderCardHeader-blank"></div>
          <div className="tenderCardHeader-content">

            <h4 id='company-name'> &nbsp;{tender.name}</h4>
            <p id='tender-description' className='tender-amount-description-p'>{tender.descriptions}</p>
            <p id='tender-amount' className='tender-amount-description-p'>Tender worth: {tender.price / 1000000000000}</p>
          </div>
        </div>
        <div className='tenderCard-middle' id='tendercard-middle'>
          <h5>&nbsp;{tender.description}&emsp;&emsp;&emsp;&emsp;&nbsp;{tender.image} </h5>
        </div>
        <div className='bid-btn' id='bid-btn-approve-btn'>

          <button className='btn-bid'  id='btn-bid' >BID</button>

        </div>


      </div>

    ))}

  </div>

}
export default DisplayTemplate;