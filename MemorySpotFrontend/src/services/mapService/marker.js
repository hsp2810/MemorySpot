import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { addCircles } from './geofencing';
import customMarkerImg from '../../assets/images/Memory Spot - Icons_MsIcon-Coral.png'; // replace with your own image path
import { fetchVisibleMarkers } from './visibleMarkers';
import MarkerPopupContent from '../../components/Map/MarkerPopupContent';

export const addMarkers = (
  map,
  memories,
  dispatch,
  userLongitude,
  userLatitude,
  MapboxDirections,
  setShowDirectionsSidebar,
  setDirectionCredentials,
  homeUser
) => {
  const markers = [];
  console.log('Prinitng the friends memories: ', memories);
  memories.forEach(memory => {
    // Setting up the marker
    const markerElement = document.createElement('img');
    markerElement.src = customMarkerImg;
    markerElement.style.width = '50px';
    markerElement.style.height = '60px';

    const popupContent = document.createElement('div');

    const marker = new mapboxgl.Marker({
      element: markerElement,
    })
      .setLngLat([memory.longitude, memory.latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25, memory: memory }).setDOMContent(
          popupContent
        )
      )
      .addTo(map);

    // Click on the marker
    marker.getElement().addEventListener('click', () => {
      createRoot(popupContent).render(
        <MarkerPopupContent
          map={map}
          memory={memory}
          userLongitude={userLongitude}
          userLatitude={userLatitude}
          MapboxDirections={MapboxDirections}
          setShowDirectionsSidebar={setShowDirectionsSidebar}
          setDirectionCredentials={setDirectionCredentials}
          homeUser={homeUser}
        />
      );
    });

    // map.on('load', function () {
    //   addCircles(map, [memory.longitude, memory.latitude], memory.radius);
    // });

    // add event listeners to the marker
    marker.getElement().addEventListener('mouseenter', () => {
      marker.getElement().style.cursor = 'pointer';
    });

    markers.push(marker);
  });

  map.on('moveend', () => {
    console.log('Fetching the memories again');
    fetchMemories(map, markers, memories, dispatch);
  });

  return fetchMemories(map, markers, memories, dispatch);
};

const fetchMemories = (map, markers, memories, dispatch) => {
  const visibleMemories = fetchVisibleMarkers(map, markers);
  console.log('Visible memories: ', visibleMemories);

  const sortedVisibleMemories = visibleMemories.sort(
    (a, b) => new Date(b.uploadedDate) - new Date(a.uploadedDate)
  );

  console.log('SOrted based on time: ', sortedVisibleMemories);

  const mergedMemories = sortedVisibleMemories.concat(
    memories.filter(
      memory =>
        !sortedVisibleMemories.some(
          visibleMemory => visibleMemory._id === memory._id
        )
    )
  );

  console.log('Merged Memories: ', mergedMemories);
  dispatch({
    type: 'setMemoriesToShow',
    payload: mergedMemories,
  });
  return mergedMemories;
};
