import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


function HomeAbut(props) {

  const openInNewTab = url => {
    //setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='container-fluid'>
      <div className="container text-black my-5 about-home ">
        <h2 className='display-6 text-center pt-2 fw-bold fst-italic text-white'>About</h2>
        <div className='row  '>

          <div className='col-md-6'>
            <h3 className='text-center fw-light text-white'>About us</h3>
            <h4 className='fs-5 '>For us music is a way of life and not just a business</h4>
            <p className='ms-1 lead '>Music shop, created out of love for music.<br /> For us music is a way of life and not just a business.<br /> And musicians are not just our customers.<br />
              They are also our sales people.<br /> Each of the employees, from the chain's branches, the national service center and the management itself, has a deep and sincere love for music.<br />
              As musicians we are committed to bringing you the best products, while providing the best service and purchasing experience that will remain etched in your memory. </p>
          </div>

          <div className='col-md-6'>
            <h3 className='text-center fw-light text-white'>Our location</h3>
            <MapContainer center={[32.065741, 34.767355]} zoom={17} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[32.065800, 34.767430]}>
                <Popup>
                  <button className=' pop_up_map' onClick={() => openInNewTab("https://www.waze.com/he/live-map")}>
                    <div className='text' style={{ border: "0" }}> התבור 16 תל אביב / hatvor 16 TLV</div>
                  </button>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomeAbut;