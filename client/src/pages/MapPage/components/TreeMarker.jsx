import React from 'react';
import dayjs from 'dayjs';

// LEAFLET
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

// STYLE
import './TreeMarker.css';

// ICONS
import TreeIconSvg from '../assets/TreeIcon.svg';
import TreeIconShadowSvg from '../assets/TreeIconShadow.svg';

const TreeIcon = new Icon({
  iconUrl: TreeIconSvg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  shadowUrl: TreeIconShadowSvg,
  shadowSize: [40, 40],
  shadowAnchor: [10, 40],
});

const TreeMarker = props => {
  const { image, location, description, plantedAt, createdAt } = props.tree;
  return (
    <Marker position={[location[0], location[1]]} icon={TreeIcon}>
      <Popup closeButton={false} className='tree-popup'>
        <img src={image} alt='tree' className='tree-img' />

        <p className='tree-desc'>{description}</p>
        <hr />
        <p className='tree-plantedAt'>
          Posađeno: {dayjs(plantedAt).format('DD. / MM. / YYYY.')}
        </p>
        <p className='tree-createdAt'>
          Dodano: {dayjs(createdAt).format('DD. / MM. / YYYY.')}
        </p>
      </Popup>
    </Marker>
  );
};

export default TreeMarker;
