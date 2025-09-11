// Reset Password Form Logic
document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('reset-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Form submission handler
    resetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('reset-user-id').value.trim();
        const dob = document.getElementById('reset-dob').value;
        
        // Hide previous messages
        hideMessages();
        
        // Basic validation
        if (!userId || !dob) {
            showError('Please fill in all fields.');
            return;
        }
        
        // Additional validation
        if (userId.length < 3) {
            showError('User ID must be at least 3 characters long.');
            return;
        }
        
        // Check if DOB is not in future
        const selectedDate = new Date(dob);
        const today = new Date();
        if (selectedDate > today) {
            showError('Date of birth cannot be in the future.');
            return;
        }
        
        // Simulate password reset process
        processReset(userId, dob);
    });
    
    // Process reset function
    function processReset(userId, dob) {
        const submitBtn = resetForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = 'Processing...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // In real implementation, this would be an actual API call
            // For demo purposes, we'll simulate success
            const success = Math.random() > 0.2; // 80% success rate for demo
            
            if (success) {
                showSuccess('Password reset instructions have been sent to your registered email address.');
                resetForm.reset();
            } else {
                showError('User ID and Date of Birth combination not found. Please try again.');
            }
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
    }
    
    // Show success message
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
    // Hide all messages
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
    
    // Input field enhancements
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        // Clear error message when user starts typing
        input.addEventListener('input', hideMessages);
        
        // Add focus effects (already handled by CSS, but can add more JS effects here)
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-1px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Date input placeholder fix for older browsers
    const dobInput = document.getElementById('reset-dob');
    if (dobInput.type !== 'date') {
        dobInput.placeholder = 'DD/MM/YYYY';
    }
});