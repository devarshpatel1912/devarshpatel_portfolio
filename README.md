# Devarsh Patel — Portfolio Website

A modern, dark-themed professional portfolio website built with Python Flask.

## Features

- Dark futuristic UI with neon turquoise accents
- Responsive design for all devices
- Project showcase with category filtering
- Professional experience timeline
- Technical skills showcase
- Contact form with validation
- Resume download
- Smooth animations and transitions

## Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML5, CSS3, JavaScript
- **Templating:** Jinja2
- **Data:** JSON files
- **Icons:** Font Awesome 6

## Local Development

### Prerequisites
- Python 3.9+

### Setup

```bash
# Clone the repository
git clone https://github.com/devarshpatel1912/myportfolio.git
cd myportfolio

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the development server
python app.py
```

Visit `http://localhost:5000` in your browser.

## Deployment (Render)

1. Push the repository to GitHub.
2. Connect the repo on [Render](https://render.com).
3. Render will auto-detect `render.yaml` and configure the service.
4. The `SECRET_KEY` environment variable is generated automatically.

## Project Structure

```
myportfolio/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── Procfile                # Gunicorn process file
├── render.yaml             # Render deployment config
├── README.md
├── data/
│   ├── site.json           # Site metadata & personal info
│   ├── projects.json       # Project data
│   └── skills.json         # Skills & expertise data
├── templates/
│   ├── base.html           # Base template
│   └── index.html          # Main single-page template
└── static/
    ├── css/
    │   └── style.css       # All styles
    ├── js/
    │   └── main.js         # Interactions & animations
    ├── images/             # Project images & assets
    └── documents/
        └── resume.pdf      # Downloadable resume
```

## License

© 2026 Devarsh Patel. All rights reserved.
