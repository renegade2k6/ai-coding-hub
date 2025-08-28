# AI Coding Hub - Futuristic Neon Theme

A comprehensive directory of AI coding tools with a sleek, futuristic neon/glass theme. This website organizes and presents various AI tools for developers in 2025.

## Features

- **Futuristic Neon/Glass Theme**: Modern UI with glass morphism effects, conic gradients, and neon accents
- **Comprehensive Tool Database**: Organized categories for CLI tools, IDEs, extensions, and more
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search Functionality**: Quickly find tools by name, description, or category
- **Keyboard Shortcuts**: Press `/` to focus the search bar
- **Category Filtering**: Filter tools by specific categories

## Categories

1. **CLI Tools**: Command-line interfaces for AI-assisted coding
2. **AI IDEs**: Full-featured AI-powered integrated development environments
3. **Extensions**: AI coding extensions for existing editors like VS Code
4. **Local Runtimes**: Tools for running AI models locally on your machine
5. **RAG Tools**: Retrieval-Augmented Generation tools for document understanding
6. **Agent Frameworks**: Frameworks for building and orchestrating AI agents
7. **Model Providers**: AI model providers and inference platforms
8. **Browser Extensions**: AI extensions that work everywhere in your browser
9. **MCP**: Model Context Protocol resources and documentation

## Technologies Used

- HTML5
- CSS3 (with modern features like conic gradients and backdrop filters)
- JavaScript (ES6+)
- Responsive design principles

## Getting Started

1. Clone or download the repository
2. Open `index.html` in your browser, or
3. Run a local server:
   ```bash
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000` in your browser

## Customization

### Theme Colors

The theme uses CSS variables for easy customization:

- `--bg0`: Deep space background
- `--bg1`: Indigo background
- `--panel`: Glass base color
- `--panel-2`: Hover state for panels
- `--ink`: Main text color
- `--muted`: Secondary text color
- `--accent`: Neon cyan accent color
- `--accent-2`: Neon violet accent color

### Adding New Tools

To add new tools, simply edit the HTML files in the `pages` directory and follow the existing structure:

```html
<div class="tool-card">
    <h4>Tool Name</h4>
    <div class="tag">Vendor</div>
    <p>Brief description of the tool</p>
    <ul>
        <li>Key feature 1</li>
        <li>Key feature 2</li>
        <li>Key feature 3</li>
    </ul>
    <a href="https://tool-website.com" target="_blank" class="btn">Website</a>
</div>
```

## Keyboard Shortcuts

- Press `/` to quickly focus the search bar

## Browser Support

This website uses modern CSS features and works best in:
- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

## License

This project is open source and available under the MIT License.