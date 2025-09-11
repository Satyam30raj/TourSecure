// Sidebar functionality
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// Variable to track if sidebar is manually opened
let isManuallyOpened = false;

// Open sidebar on click
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    isManuallyOpened = true; // Mark as manually opened
});

// Open sidebar on hover
menuToggle.addEventListener('mouseenter', () => {
    if (!isManuallyOpened) { // Only open on hover if not manually opened
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
    }
});

// Close sidebar on mouse leave (only if it was opened by hover, not click)
menuToggle.addEventListener('mouseleave', () => {
    if (!isManuallyOpened) {
        setTimeout(() => {
            // Check if mouse is not over sidebar before closing
            if (!sidebar.matches(':hover') && !menuToggle.matches(':hover')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        }, 100); // Small delay to prevent flickering
    }
});

// Keep sidebar open when hovering over it (for hover-opened sidebar)
sidebar.addEventListener('mouseenter', () => {
    if (!isManuallyOpened) {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
    }
});

// Close hover-opened sidebar when leaving sidebar area
sidebar.addEventListener('mouseleave', () => {
    if (!isManuallyOpened) {
        setTimeout(() => {
            if (!menuToggle.matches(':hover') && !sidebar.matches(':hover')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        }, 100);
    }
});

// Close sidebar manually
closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    isManuallyOpened = false; // Reset manual open state
});

// Close sidebar when clicking overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    isManuallyOpened = false; // Reset manual open state
});

// Close sidebar when clicking on navigation links
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        isManuallyOpened = false; // Reset manual open state
    });
});

// Close sidebar on window resize if screen is large
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        isManuallyOpened = false; // Reset manual open state
    }
});

// Swiper initialization (keeping existing functionality)
var swiper = new Swiper(".home-slider", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      loop:true,
      autoplay:{
        delay: 3000,
        disableOnInteraction: false,
      }
    });

var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
      grabCursor: true,
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        700: {
          slidesPerView: 2,
        },
        1050: {
          slidesPerView: 3,
        },
      },
      autoplay:{
        delay: 5000,
        disableOnInteraction: false,
      }
    });

// Get the button
let scrollBtn = document.getElementById("scrollBtn");

// Show button when scrolled down
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

// Scroll to top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}






// Chatbot functionality
class TourSecureChatbot {
    constructor() {
        this.isOpen = false;
        this.init();
        this.setupEventListeners();
        this.loadResponses();
    }

    init() {
        // Set welcome message time
        const welcomeTimeEl = document.getElementById('welcomeTime');
        if (welcomeTimeEl) {
            welcomeTimeEl.textContent = this.getCurrentTime();
        }
    }

    setupEventListeners() {
        const toggle = document.getElementById('chatbotToggle');
        const container = document.getElementById('chatbotContainer');
        const closeBtn = document.getElementById('chatbotClose');
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('sendBtn');

        if (toggle) {
            toggle.addEventListener('click', () => this.toggleChatbot());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChatbot());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !container?.contains(e.target) && 
                !toggle?.contains(e.target)) {
                this.closeChatbot();
            }
        });
    }

    loadResponses() {
        this.responses = {
            'what is toursecure': {
                text: "TourSecure is a Smart Tourist Safety Monitoring & Incident Response System designed to create a secure environment for travelers. We use AI, Blockchain, and Geo-Fencing to provide real-time monitoring and emergency response.",
                quickReplies: ['How does it work?', 'What features do you offer?', 'Is it free?']
            },
            'panic button': {
                text: "Our Panic Button is an emergency feature that instantly shares your live location with the nearest police unit and your emergency contacts. Just one tap sends an immediate alert for swift response when you're in danger.",
                quickReplies: ['How to set emergency contacts?', 'What about privacy?', 'Other safety features?']
            },
            'pricing': {
                text: "We offer flexible pricing:\n• Trial: Free with basic features\n• 1 Month: $4.99 - Full services with AI\n• 3 Months: $19.99 - Best value\n• 1 Year: $49.99 - Maximum savings\n\nAll paid plans include personal reviews, AI suggestions, and embedded chatbot.",
                quickReplies: ['Start free trial', 'Payment methods?', 'Refund policy?']
            },
            'features': {
                text: "Our key features include:\n• Digital Tourist ID (Blockchain-based)\n• Geo-Fencing Alerts for restricted areas\n• AI Anomaly Detection\n• Real-time Authority Dashboard\n• Emergency Response System\n• 24/7 Monitoring",
                quickReplies: ['Digital ID benefits?', 'How does AI work?', 'Contact support']
            },
            'how does it work': {
                text: "TourSecure works in 3 simple steps:\n1. Register and get your Digital Tourist ID\n2. Download our mobile app for real-time monitoring\n3. Travel safely with automatic alerts and emergency features\n\nOur AI continuously monitors for unusual patterns and potential risks.",
                quickReplies: ['Download app', 'Registration process?', 'Device compatibility?']
            },
            'contact': {
                text: "You can reach us through:\n📞 +123-456-7890\n📞 +111-222-3334\n📧 info@toursecure.com\n📧 support@toursecure.com\n\nWe're available 24/7 for emergency support!",
                quickReplies: ['Emergency hotline?', 'Technical support', 'Feedback']
            },
            'download app': {
                text: "Our mobile app is available on:\n• Google Play Store (Android)\n• Apple App Store (iOS)\n\nDownload links are available on our website. The app provides real-time monitoring, panic button access, and location sharing features.",
                quickReplies: ['App features?', 'System requirements?', 'User guide?']
            },
            'safety': {
                text: "Your safety is our top priority! We provide:\n• 24/7 real-time monitoring\n• Instant emergency alerts\n• Location tracking in danger zones\n• Direct connection to local authorities\n• Secure data encryption\n• Privacy protection",
                quickReplies: ['Privacy policy?', 'Data security?', 'Emergency response time?']
            },
            'locations': {
                text: "TourSecure currently operates in:\n• New Delhi\n• Noida\n• Ghaziabad\n• Gurugram\n\nWe're expanding to more cities soon! Contact us if you'd like TourSecure in your area.",
                quickReplies: ['Expansion plans?', 'International coverage?', 'Partnership opportunities?']
            },
            'default': {
                text: "Right now I can’t answer custom queries. But you can choose from the options below to continue:  ",
                quickReplies: ['Safety features', 'Pricing plans', 'How it works', 'Contact support']
            }
        };
    }

    toggleChatbot() {
        const container = document.getElementById('chatbotContainer');
        const toggle = document.getElementById('chatbotToggle');
        const icon = document.getElementById('chatbotIcon');

        if (container && toggle && icon) {
            this.isOpen = !this.isOpen;
            container.classList.toggle('active');
            toggle.classList.toggle('active');
            
            if (this.isOpen) {
                icon.className = 'fas fa-times';
                this.scrollToBottom();
            } else {
                icon.className = 'fas fa-comments';
            }
        }
    }

    closeChatbot() {
        this.isOpen = false;
        const container = document.getElementById('chatbotContainer');
        const toggle = document.getElementById('chatbotToggle');
        const icon = document.getElementById('chatbotIcon');

        if (container && toggle && icon) {
            container.classList.remove('active');
            toggle.classList.remove('active');
            icon.className = 'fas fa-comments';
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateResponse(message);
        }, 1000 + Math.random() * 1000);
    }

    sendQuickReply(message) {
        this.addMessage(message, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateResponse(message);
        }, 800);
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        messagesContainer.appendChild(messageDiv);

        this.scrollToBottom();
    }

    addBotMessage(content, quickReplies = []) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content.replace(/\n/g, '<br>');

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        // Add quick replies if provided
        if (quickReplies.length > 0) {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';

            quickReplies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'quick-reply';
                button.textContent = reply;
                button.onclick = () => sendQuickReply(reply);
                quickRepliesDiv.appendChild(button);
            });

            messageDiv.appendChild(quickRepliesDiv);
        }

        messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        let response = this.responses.default;

        // Find matching response
        for (const [key, value] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }

        // Special handling for greetings
        if (lowerMessage.match(/\b(hi|hello|hey|good morning|good evening)\b/)) {
            response = {
                text: "Hello! Welcome to TourSecure. I'm here to help you with any questions about our tourist safety system. How can I assist you today?",
                quickReplies: ['What is TourSecure?', 'Safety features', 'Pricing']
            };
        }

        // Special handling for thanks
        if (lowerMessage.match(/\b(thank|thanks|appreciate)\b/)) {
            response = {
                text: "You're welcome! I'm glad I could help. Is there anything else you'd like to know about TourSecure's safety features or services?",
                quickReplies: ['More features', 'Get started', 'Contact support']
            };
        }

        this.addBotMessage(response.text, response.quickReplies);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.id = 'typing-indicator';

        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'typing-indicator';

        const dotsDiv = document.createElement('div');
        dotsDiv.className = 'typing-dots';

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            dotsDiv.appendChild(dot);
        }

        indicatorDiv.appendChild(dotsDiv);
        typingDiv.appendChild(indicatorDiv);
        messagesContainer.appendChild(typingDiv);

        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (messagesContainer) {
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

// Global function for quick replies (called from HTML)
function sendQuickReply(message) {
    if (window.tourSecureChatbot) {
        window.tourSecureChatbot.sendQuickReply(message);
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.tourSecureChatbot = new TourSecureChatbot();
});