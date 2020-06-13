- MODEL: 
  - TREE:
    - image: img
    - description: string 
    - plantedAt: date
    - coords: [longitude, latitude, elevation]
    - createdAt: date
    - createdBy: uid

  - USER:
    - handle: string
    - email: string
    - createdAt: date
  SKOLA: (to implement in v 2.0.0)

- BUILDING PLAN:
  - setup backend points
    (public)
    - [x] |- login
    - [x] |- signup (TODO: needs to have a specific code to create an acc)
    - [x] |- get trees
    (private)
    - [x] |- upload image
    - [ ] |- update tree
    - [x] |- create tree
    - [x] |- delete tree

  - [x] setup map and markers

- V2:
  - FRONTEND
    - [ ] setup auth
    - [ ] setup adding tree
    - [ ] setup deleting tree 
    - [ ] setup updating tree

  - BACKEND
    - [ ] Add marker grouping if zoomed out [https://www.npmjs.com/package/react-leaflet-markercluster]