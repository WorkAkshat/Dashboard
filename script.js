document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('kmlModal');
  const btn = document.getElementById('uploadKmlButton');
  const span = document.getElementsByClassName('close')[0];

  btn.onclick = function () {
      modal.style.display = 'block';
  };

  span.onclick = function () {
      modal.style.display = 'none';
  };

  window.onclick = function (event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  };

  const ctx = document.getElementById('growthChart').getContext('2d');
  const growthChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: [ 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May',],
          datasets: [{
      label: 'Trees Planted',
      data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      tension: 0.4,
    }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  // Example data for Department-Wise Tree Plantation Distribution
  const departmentData = [
      { name: 'Forest Department', treesPlanted: 15000, percentage: 75 },
      { name: 'Education Department', treesPlanted: 8000, percentage: 40 },
      { name: 'Health Department', treesPlanted: 6000, percentage: 30 },
      { name: 'Agriculture Department', treesPlanted: 20000, percentage: 100 },
      { name: 'Transport Department', treesPlanted: 3000, percentage: 15 },
      { name: 'Water Department', treesPlanted: 5000, percentage: 25 },
      { name: 'Municipal Department', treesPlanted: 7000, percentage: 35 }
  ];

  const departmentTableBody = document.getElementById('departmentTableBody');
  departmentData.forEach(department => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${department.name}</td><td>${department.treesPlanted}</td><td>${department.percentage}%</td>`;
      departmentTableBody.appendChild(row);
  });

  // Leaflet map initialization
  const map = L.map('map').setView([27.0238, 74.2179], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  document.getElementById('uploadKmlFile').addEventListener('click', () => {
      const fileInput = document.getElementById('kmlFileInput');
      const file = fileInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const kml = omnivore.kml.parse(e.target.result);
              kml.addTo(map);
              modal.style.display = 'none';
          };
          reader.readAsText(file);
      } else {
          alert('Please select a KML file first.');
      }
  });
});


    document.addEventListener('DOMContentLoaded', function() {
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    });


