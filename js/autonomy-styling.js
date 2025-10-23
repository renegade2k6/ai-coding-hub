// Autonomy Styling Enhancement
// Automatically adds CSS classes based on autonomy text content

document.addEventListener('DOMContentLoaded', function() {
    // Find all autonomy elements and add appropriate classes
    const autonomyElements = document.querySelectorAll('.autonomy');
    
    autonomyElements.forEach(element => {
        const text = element.textContent.trim().toLowerCase();
        
        // Remove any existing level classes
        element.classList.remove('high', 'medium', 'low', 'semi', 'assistive');
        
        // Add appropriate class based on text content
        switch(text) {
            case 'high':
                element.classList.add('high');
                element.setAttribute('data-level', 'high');
                break;
            case 'medium':
                element.classList.add('medium');
                element.setAttribute('data-level', 'medium');
                break;
            case 'low':
                element.classList.add('low');
                element.setAttribute('data-level', 'low');
                break;
            case 'semi':
                element.classList.add('semi');
                element.setAttribute('data-level', 'semi');
                break;
            case 'assistive':
                element.classList.add('assistive');
                element.setAttribute('data-level', 'assistive');
                break;
            default:
                // Default to high if no match
                element.classList.add('high');
                element.setAttribute('data-level', 'high');
                // Unknown autonomy level: ${text}, defaulting to high
        }
    });
    
    console.log(`Applied autonomy styling to ${autonomyElements.length} elements`);
});