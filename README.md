# Advanced Topics in Computer Science
Dieses Repository enthält Materialien, Projekte und Notizen zu fortgeschrittenen Themen der Informatik, die im Rahmen des Kurses **"Advanced Topics in Computer Science"** behandelt wurden.  
Der Fokus liegt auf praxisorientierten Anwendungen in den Bereichen **Deep Learning**, **algorithmischer Handel** und **Produktentwicklung (MVP)**.

---

## 📁 Projektstruktur

- **DeepLearning/**  
  Enthält Jupyter Notebooks zu neuronalen Netzen, CNNs, RNNs und Transfer Learning.

- **trading-mvp/**  
  Implementierung eines Minimum Viable Product (MVP) für eine KI-gestützte Trading-Plattform (siehe unten).

- **.gitignore**  
  Standard-Datei zum Ausschluss temporärer Dateien und Ordner.

- **README.md**  
  Diese Datei mit einer Übersicht über das Repository.

---

## 🚀 MVP: KI-gestützte Trading-Plattform

Der Ordner `trading-mvp/` enthält den ersten Prototyp einer Trading-Anwendung, die auf einer KI-basierten Handelsstrategie basiert.  
Ziel ist die Entwicklung eines interaktiven Frontends, über das Nutzer Long- oder Short-Positionen eröffnen können, basierend auf den Vorhersagen eines Machine-Learning-Modells.

### 🔑 Kernfunktionen

- **Vorhersage-Modul**:  
  Das Modell analysiert historische Kursdaten und trifft eine Entscheidung für Long/Short oder keine Aktion.

- **Benutzerinteraktion**:  
  Nutzer können einen Betrag und die gewünschte Richtung (Long/Short) angeben.  
  Das System öffnet automatisch Positionen und schließt sie bei neuen Signalen oder nach bestimmten Kriterien.

- **Frontend (Next.js)**:  
  Erste UI-Komponenten mit TypeScript, Tailwind und API-Anbindung.

- **Backend (Python)**:  
  Logik für Signalberechnung und Positionsmanagement (in Entwicklung).

### 🛠 Tech Stack

- **Frontend**: Next.js, TailwindCSS, TypeScript  
- **Backend**: Python (FastAPI in Planung)  
- **ML**: Scikit-learn, Pandas, NumPy  
- **Deployment**: Lokales Setup, Docker geplant

### 🧠 Zukunftsvision

Das MVP ist Teil der größeren Vision von **Stratify**, einer skalierbaren, KI-gestützten Investmentplattform, die intuitive Benutzerführung mit fortschrittlicher Analyse kombiniert.

---

## 🔧 Technologien & Tools

- **Programmiersprachen:** Python, TypeScript  
- **ML & Data Tools:** Jupyter, Pandas, scikit-learn, matplotlib  
- **Frontend:** HTML, CSS, Next.js, Tailwind  
- **Sonstige Tools:** PowerShell, Markdown, Git

---

## 📊 Inhaltliche Schwerpunkte

- **Deep Learning:** CNNs, RNNs, Transfer Learning  
- **KI-gestützter Handel:** Datenanalyse, Feature Engineering, Handelslogik  
- **MVP-Entwicklung:** Technische Umsetzung eines Prototyps im Webumfeld  
- **Produktvision:** Kombination von Data Science und nutzerzentriertem Design

---

## 📌 Hinweise

- Dieses Repository dient als Lernprojekt und Proof-of-Concept.  
- Für Details zu einzelnen Komponenten bitte die jeweiligen Ordner durchsehen.

