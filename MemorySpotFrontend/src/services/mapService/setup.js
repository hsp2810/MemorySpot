import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const ImplementMapbox = (
  userLongitude,
  userLatitude,
  userZoom,
  mapContainerRef,
  dispatch
) => {
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/lyndenkidd/cldndunyh001j01ra7qzxgh01',
    center: [userLongitude, userLatitude],
    zoom: userZoom,
  });

  // set user position from geolocation API
  navigator.geolocation.getCurrentPosition(position => {
    console.log('User Longitude: ', position.coords.longitude);
    console.log('User Latitude: ', position.coords.latitude);
    dispatch({
      type: 'setUserLongitude',
      payload: position.coords.longitude,
    });

    dispatch({
      type: 'setUserLatitude',
      payload: position.coords.latitude,
    });
    map.setCenter([position.coords.longitude, position.coords.latitude]);

    // After I have figured out the lat and lng of the user. I want to evaluate the address and store it in redux
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const address = data.features[0].place_name;
        console.log('Address: ' + address);
        dispatch({
          type: 'setUserAddress',
          payload: address,
        });
      });
  });

  // add zoomin and out controls + navigation
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // locate user to its current location.
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: false },
      trackUserLocation: true,
      showAccuracyCircle: false,
      showUserHeading: true,
    })
  );

  return map;
};

export default ImplementMapbox;
