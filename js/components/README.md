# AI Coding Hub Components

This directory contains modular JavaScript components for the AI Coding Hub website.

## Components

### HeaderComponent (`header.js`)
- Automatically detects current page and sets active navigation state
- Handles path adjustments for pages in subfolders
- Responsive navigation with enhanced styling
- Easy to customize and extend

**Usage:**
```javascript
const header = new HeaderComponent();
header.replace(); // Replace existing header
// or
header.mount('body'); // Add to beginning of body
```

### FooterComponent (`footer.js`)
- Configurable footer with social links
- Automatic year updates
- Optional disclaimer section
- Support for custom sections

**Usage:**
```javascript
const footer = new FooterComponent({
    year: 2025,
    siteName: 'My Site',
    showDisclaimer: true
});
footer.replace(); // Replace existing footer
```

### Component Loader (`loader.js`)
- Automatically initializes components on page load
- Handles card animations
- Adds keyboard navigation shortcuts
- Performance monitoring utilities

**Keyboard Shortcuts:**
- `Alt + H`: Navigate to home
- `Alt + S`: Focus search input
- `/`: Focus search input

## Performance Features

### Performance Monitoring (`../performance.js`)
- Monitors Core Web Vitals (LCP, FID)
- Memory usage tracking
- Lazy loading for images
- Animation optimizations for low-end devices
- Resource hints for external domains

### Accessibility Features
- Skip-to-main-content link
- Reduced motion support
- High contrast mode support
- Keyboard navigation
- Screen reader friendly markup

### Browser Support
- Modern browsers (Chrome 60+, Firefox 60+, Safari 12+)
- Graceful degradation for older browsers
- Progressive enhancement approach

## File Structure
```
js/
├── components/
│   ├── header.js       # Header component
│   ├── footer.js       # Footer component
│   ├── loader.js       # Component loader
│   └── README.md       # This file
├── performance.js      # Performance utilities
├── main.js            # Main JavaScript
└── search.js          # Search functionality
```

## Customization

### Adding New Navigation Items
Edit the `navItems` array in `header.js`:

```javascript
this.navItems = [
    { href: 'new-page.html', label: 'New Page', isActive: false },
    // ... existing items
];
```

### Customizing Footer
Pass options to FooterComponent constructor:

```javascript
const footer = new FooterComponent({
    author: {
        name: 'Your Name',
        patreon: 'https://patreon.com/yourname'
    },
    disclaimer: 'Your custom disclaimer text'
});
```

### Performance Optimization
The components include several performance optimizations:
- `will-change` properties for smooth animations
- CSS containment for layout optimization
- Throttled scroll events
- Memory usage monitoring
- Reduced motion support

## Browser Console
Open browser console to see performance warnings and memory usage information during development.