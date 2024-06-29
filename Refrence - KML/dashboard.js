document.addEventListener('DOMContentLoaded', function() {
    var openBtn = document.getElementById('openBtn');
    var closeBtn = document.getElementById('closeBtn');
    var drawer = document.getElementById('drawer');
    var mainContent = document.querySelector('.main-content');

    openBtn.addEventListener('click', function() {
        drawer.style.width = '250px';
        mainContent.classList.add('drawer-open');
    });

    closeBtn.addEventListener('click', function() {
        drawer.style.width = '0';
        mainContent.classList.remove('drawer-open');
    });
    document.getElementById("openBtn").addEventListener("click", function() {
        document.getElementById("drawer").classList.add("drawer-opened");
        // Hide the menu icon when the drawer is opened
        document.getElementById("openBtn").style.display = "none";
    });
    
    document.getElementById("closeBtn").addEventListener("click", function() {
        document.getElementById("drawer").classList.remove("drawer-opened");
        // Delay showing the menu icon until after the drawer has closed fully
        setTimeout(function() {
            document.getElementById("openBtn").style.display = "block";
        }, 50); // Adjust the delay time as needed (500ms in this example)
    });
    
    // Initialize Line Chart
    const ctx = document.getElementById('carbonChart').getContext('2d');
    const carbonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['15 April', '16 April', '17 April', '18 April', '19 April', '20 April', '21 April'],
            datasets: [{
                label: 'Tree carbon absorption',
                data: [100, 200, 300, 400, 500, 400, 300],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true  
            }, {
                label: 'City carbon emission',
                data: [300, 400, 500, 600, 700, 600, 500],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true
                },
                y: {
                    display: true
                }
            }
        }
    });

    // Initialize Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Cutting Requests', 'Pruning Requests'],
            datasets: [{
                label: 'Task Distribution',
                data: [60, 40], // Example data, update with actual data
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: {
            responsive: true
        }
    });

    // Initialize Leaflet map with fullscreen control
    const map = L.map('map', {
        fullscreenControl: true
    }).setView([26.9124, 75.7873], 13);

    // Define base layers
    const streetLayer = L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);
    const satelliteLayer = L.tileLayer.provider('Esri.WorldImagery');
    const streetsSatelliteLayer = L.tileLayer.provider('Esri.WorldStreetMap');

    // Add layer control
    const baseLayers = {
        "Street View": streetLayer,
        "Satellite View": satelliteLayer,
        "Streets Satellite View": streetsSatelliteLayer
    };
    L.control.layers(baseLayers).addTo(map);

    // Modal and KML Upload
    const modal = document.getElementById("kmlUploadModal");
    const openModalButton = document.getElementById("openModalButton");
    const closeButton = document.getElementsByClassName("close-button")[0];

    openModalButton.onclick = function() {
        modal.style.display = "block";
    }

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById("uploadForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("kmlFileInput");
        const file = fileInput.files[0];
        
        if (!file) {
            alert("Please choose a file before uploading.");
            return;
        }
        
        const fileType = file.name.split('.').pop().toLowerCase();
        if (fileType !== 'kml') {
            alert("Only .kml files are allowed.");
            return;
        }
        
        // Handle the file upload
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            // Parse KML content
            const parser = new DOMParser();
            const kmlDocument = parser.parseFromString(fileContent, "application/xml");

            // Add KML layer to Leaflet map
            const kmlLayer = omnivore.kml.parse(kmlDocument);
            map.addLayer(kmlLayer);

            // Fit the map to the KML layer bounds
            map.fitBounds(kmlLayer.getBounds());

            // Close modal and show success message
            alert("File uploaded successfully!");
            modal.style.display = "none";
        };
        reader.readAsText(file);
    });

    // Accordion functionality
    const accordionButtons = document.querySelectorAll(".accordion-button");
    accordionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;
            button.classList.toggle("active");
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
    
});
