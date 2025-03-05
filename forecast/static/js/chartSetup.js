document.addEventListener('DOMContentLoaded', () => {
    try {
        // Check if Chart.js is available
        if (typeof Chart === 'undefined') {
            console.error('Chart.js library not loaded.');
            return;
        }

        // Get canvas element
        const chartElement = document.getElementById('chart');
        if (!chartElement) {
            console.error('Canvas element with id "chart" not found.');
            return;
        }

        // Get 2D context
        const ctx = chartElement.getContext('2d');
        if (!ctx) {
            console.error('Failed to get 2D context for the canvas.');
            return;
        }

        // Create gradient for line color
        const gradient = ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, 'rgba(250, 0, 0, 1)');
        gradient.addColorStop(1, 'rgba(136, 255, 0, 1)');

        // Select all forecast items
        const forecastItems = document.querySelectorAll('.forecast-item');
        if (forecastItems.length === 0) {
            console.error('No forecast items found.');
            return;
        }

        const temps = [];
        const times = [];

        forecastItems.forEach((item, index) => {
            try {
                const timeElement = item.querySelector('.forecast-time');
                const tempElement = item.querySelector('.forecast-temperatureValue');
                
                if (!timeElement || !tempElement) {
                    console.warn(`Missing time or temperature element in forecast item #${index + 1}. Skipping...`);
                    return;
                }

                const time = timeElement.textContent.trim();
                const temp = parseFloat(tempElement.textContent.trim());

                if (!time || isNaN(temp)) {
                    console.warn(`Invalid data in forecast item #${index + 1}: Time: "${time}", Temp: "${temp}". Skipping...`);
                    return;
                }

                times.push(time);
                temps.push(temp);
            } catch (error) {
                console.error(`Error processing forecast item #${index + 1}:`, error);
            }
        });

        if (temps.length === 0 || times.length === 0) {
            console.error('No valid temperature or time data found.');
            return;
        }

        // Create the chart
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: times,
                datasets: [
                    {
                        label: 'Celsius Degrees',
                        data: temps,
                        borderColor: gradient,
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 2,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        display: false,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                    y: {
                        display: false,
                        grid: {
                            drawOnChartArea: false,
                        },
                    },
                },
                animation: {
                    duration: 750,
                },
            },
        });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
    }
});
