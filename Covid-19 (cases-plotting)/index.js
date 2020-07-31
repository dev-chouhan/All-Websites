function updateMap() {
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.infected;
                if (cases > 255) {
                    color = "rgb(255, 0, 0)"
                } else {
                    color = `rgb(${cases}, 0, 0)`
                }
                // Mark on the Map
                new mapboxgl.Marker({
                        draggable: false,
                        // color variable must be used for changing colors
                        color: color
                    })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            })
        })
}

// in each 2 second our data wil Update
let interval = 2000;
setInterval(updateMap, interval);