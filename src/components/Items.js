import React from 'react'
import { Link } from 'react-router-dom'
import {FaBed,FaBath} from 'react-icons/fa'
//import image2 from "../images/Img1.avif";


const Items = ({listing,id,onDelete,onEdit}) => {
  return (
    <div className='Listing-decoration' >
      <Link to={`/Category/${listing.type}/${id}`}>
      <img src={listing.imgUrls[0]} alt={listing.name} className='items-image' />
      <div className='item-details' >
        <p >{listing.location}</p>
        <h2>{listing.name}</h2>
        <p>
          Rs : {""}
          {listing.offer ? listing.discountedPrice : listing.regularPrice}
           / Month
        </p>
        <p>
          <FaBed/>
          {listing.bedrooms>1 ? `${listing.bedrooms} Bedrooms` : "1 Bedroom" }
        </p>
        <p>
          <FaBath/>
          {listing.bathrooms>1 ? `${listing.bathrooms} Bathrooms` : "1 Bathroom" }
        </p>
      </div>
      </Link>
      <div>
            {onDelete && (
              <button
                className="delete-button"
                onClick={() => onDelete(listing.id)}
              >
                Delete Listing
              </button>
            )}
             {onEdit && (
              <button
                className="edit-button"
                onClick={() => onEdit(listing.id)}
              >
                Edit Listing
              </button>
            )}
          </div>
      </div>
    
  )
}

export default Items
