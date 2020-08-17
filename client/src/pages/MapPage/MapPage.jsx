import React, { useState, useEffect } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

import './MapPage.css';
import axios from 'axios';
import Marker from './components/TreeMarker';

const MapPage = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    axios
      .get('/trees')
      .then(res => {
        setMarkers(
          res.data.map(tree => <Marker tree={tree} key={tree.treeId} />)
        );
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Map center={[46.1639, 16.8335]} zoom={12} zoomControl={false}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers}
      <ZoomControl position='bottomright' />
    </Map>
  );
};

export default MapPage;
