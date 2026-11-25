
import os
import json
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

def load_json(filename):
    filepath = os.path.join(app.root_path, 'data', filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def index():
    projects = load_json('projects.json')
    skills = load_json('skills.json')
    site = load_json('site.json')
    vision = load_json('vision.json') if os.path.exists(os.path.join(app.root_path, 'data', 'vision.json')) else load_json('ideas.json')
    return render_template('index.html', projects=projects, skills=skills, site=site, vision=vision, ideas=vision)

@app.route('/resume')
def download_resume():
    docs_dir = os.path.join(app.root_path, 'static', 'documents')
    for candidate in ['devarshcv.pdf', 'resume.pdf', 'Devarsh_Patel_Resume.pdf']:
        if os.path.exists(os.path.join(docs_dir, candidate)):
            return send_from_directory(
                docs_dir,
                candidate,
                as_attachment=True,
                download_name='Devarsh_Patel_Resume.pdf'
            )
    if os.path.exists(docs_dir):
        for f in os.listdir(docs_dir):
            if f.lower().endswith('.pdf'):
                return send_from_directory(
                    docs_dir,
                    f,
                    as_attachment=True,
                    download_name='Devarsh_Patel_Resume.pdf'
                )
    return "Resume not found", 404

@app.route('/download/streaksy')
@app.route('/download/streaksy.apk')
def download_streaksy():
    apk_dir = os.path.join(app.root_path, 'static', 'apk')
    for candidate in ['streaksy.apk', 'Streaksy.apk', 'app-release.apk']:
        if os.path.exists(os.path.join(apk_dir, candidate)):
            return send_from_directory(
                apk_dir,
                candidate,
                as_attachment=True,
                download_name='streaksy.apk'
            )
    if os.path.exists(apk_dir):
        for f in os.listdir(apk_dir):
            if f.lower().endswith('.apk'):
                return send_from_directory(
                    apk_dir,
                    f,
                    as_attachment=True,
                    download_name=f
                )
    return "Streaksy APK not found. Please place your APK file in 'static/apk/' directory.", 404

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()
    
    errors = []
    if not name:
        errors.append('Name is required.')
    if not email or '@' not in email:
        errors.append('Valid email is required.')
    if not subject:
        errors.append('Subject is required.')
    if not message:
        errors.append('Message is required.')
    
    if errors:
        return jsonify({'success': False, 'errors': errors}), 400
    
    # In production, integrate with email service or database
    return jsonify({'success': True, 'message': 'Thank you for your message! I will get back to you soon.'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
