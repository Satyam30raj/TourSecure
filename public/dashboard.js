// Background Animation Script (same as login)
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let DPR = 1, W = 0, H = 0;

function resize() {
    DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    canvas.width = Math.floor(cssW * DPR);
    canvas.height = Math.floor(cssH * DPR);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    W = canvas.width; H = canvas.height;
}
window.addEventListener('resize', resize, { passive: true });
resize();

class Particle {
    constructor(x, y) {
        const speed = 0.25 + Math.random() * 0.75;
        const angle = Math.random() * Math.PI * 2;
        this.x = x; this.y = y;
        this.vx = Math.cos(angle) * speed * DPR;
        this.vy = Math.sin(angle) * speed * DPR;
        this.r = (1 + Math.random() * 2) * DPR;
        this.alpha = 0.4 + Math.random() * 0.4;
    }
    step() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = '#cccccc';
        ctx.fill();
    }
}

const particles = [];
const MAX_PARTICLES = 100;
const LINK_DISTANCE = 120;

function seed(n = 70) {
    particles.length = 0;
    for (let i = 0; i < n; i++) {
        particles.push(new Particle(Math.random() * W, Math.random() * H));
    }
}
seed();

window.addEventListener('mousemove', (e) => {
    const x = e.clientX * DPR, y = e.clientY * DPR;
    particles.push(new Particle(x, y));
    if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
}, { passive: true });

function drawLinks() {
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#888888';
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < LINK_DISTANCE * DPR) {
                ctx.lineWidth = (1 - dist / (LINK_DISTANCE * DPR)) * 1.0 * DPR;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
}

function animate() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) { p.step(); p.draw(); }
    drawLinks();
    requestAnimationFrame(animate);
}
animate();

// Dashboard Functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const showEfirBtn = document.getElementById('show-efir-btn');
    const efirForm = document.getElementById('efir-form');

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            window.location.href = 'login.html';
        }
    });

    // E-FIR form toggle
    showEfirBtn.addEventListener('click', () => {
        if (efirForm.style.display === 'none' || efirForm.style.display === '') {
            efirForm.style.display = 'block';
            showEfirBtn.textContent = 'Hide E-FIR Form';
        } else {
            efirForm.style.display = 'none';
            showEfirBtn.textContent = 'Generate E-FIR';
        }
    });

    // Generate E-FIR functionality
    const generateBtn = efirForm.querySelector('.generate-btn');
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = efirForm.querySelectorAll('.efir-input');
        let allFilled = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                input.style.borderColor = '#ff4757';
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });

        if (allFilled) {
            alert('E-FIR generated successfully!\nFIR Number: FIR-2024-' + Math.floor(Math.random() * 10000));
            inputs.forEach(input => input.value = '');
            efirForm.style.display = 'none';
            showEfirBtn.textContent = 'Generate E-FIR';
        } else {
            alert('Please fill in all fields to generate E-FIR.');
        }
    });

    // Real-time data updates simulation
    function updateStats() {
        // Update tourist numbers randomly
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat, index) => {
            if (stat.textContent !== 'Medium' && stat.textContent !== '4' && stat.textContent !== '7') {
                const currentValue = parseInt(stat.textContent);
                const change = Math.random() > 0.5 ? 1 : -1;
                const newValue = Math.max(0, currentValue + change);
                stat.textContent = newValue;
            }
        });

        // Update cluster numbers
        const clusters = document.querySelectorAll('.cluster');
        clusters.forEach(cluster => {
            const currentValue = parseInt(cluster.textContent);
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newValue = Math.max(1, currentValue + change);
            cluster.textContent = newValue;
        });
    }

    // Update stats every 10 seconds
    setInterval(updateStats, 10000);

    // Add hover effects to dashboard cards
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 2rem 3rem rgba(0, 0, 0, 0.4)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 1rem 2rem rgba(0, 0, 0, 0.3)';
        });
    });

    // Simulate real-time alerts
    function addNewAlert() {
        const alertsContainer = document.querySelector('.dashboard-card:nth-child(4)');
        const existingAlerts = alertsContainer.querySelectorAll('.alert-item');
        
        const alertTypes = [
            { icon: 'fas fa-user-times', text: 'New missing person report', time: 'Just now' },
            { icon: 'fas fa-map-pin', text: 'Unusual crowd movement detected', time: 'Just now' },
            { icon: 'fas fa-exclamation-circle', text: 'Emergency alert triggered', time: 'Just now' }
        ];

        const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
        
        const newAlert = document.createElement('div');
        newAlert.className = 'alert-item';
        newAlert.style.opacity = '0';
        newAlert.style.transform = 'translateY(-20px)';
        
        newAlert.innerHTML = `
            <i class="${randomAlert.icon} alert-icon"></i>
            <div class="alert-text">
                <div>${randomAlert.text}</div>
                <div class="alert-time">${randomAlert.time}</div>
            </div>
        `;

        // Insert as first alert
        if (existingAlerts.length > 0) {
            alertsContainer.insertBefore(newAlert, existingAlerts[0]);
        }

        // Animate in
        setTimeout(() => {
            newAlert.style.transition = 'all 0.5s ease';
            newAlert.style.opacity = '1';
            newAlert.style.transform = 'translateY(0)';
        }, 100);

        // Remove oldest alert if more than 3
        if (existingAlerts.length >= 3) {
            existingAlerts[existingAlerts.length - 1].remove();
        }
    }

    // Add new alert every 30 seconds
    setInterval(addNewAlert, 30000);

    // Initialize dashboard with animation
    const dashboardContainer = document.querySelector('.dashboard-container');
    dashboardContainer.style.opacity = '0';
    dashboardContainer.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        dashboardContainer.style.transition = 'all 1s ease';
        dashboardContainer.style.opacity = '1';
        dashboardContainer.style.transform = 'translateY(0)';
    }, 500);
});