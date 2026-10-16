mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

// console.log(coordinates);

// const markerElement = document.createElement("div");
// markerElement.className = "custom-marker";
// // markerElement.innerHTML = "\uF3E9";
// markerElement.innerHTML = '<i class="bi bi-geo-alt-fill"></i>';

// markerElement.addEventListener("mouseenter", () => {
//   markerElement.innerHTML = '<i class="bi bi-geo-alt-fill"></i>';
// });
// markerElement.addEventListener("mouseleave", () => {
//   markerElement.innerHTML = '<i class="bi bi-geo-fill"></i>';
// });

const markerElement = document.createElement("div");
markerElement.className = "custom-marker";

markerElement.innerHTML = `
  <i class="bi bi-geo-fill icon-default"></i>
  <i class="bi bi-house-check-fill icon-hover"></i>
`;

const marker = new mapboxgl.Marker({
  color: "red",
  element: markerElement,
  anchor: "bottom",
})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${listing.title}</h5><p>Exact location will be provided after booking</p>`,
    ),
  ) // add popup
  .addTo(map);
//🏡