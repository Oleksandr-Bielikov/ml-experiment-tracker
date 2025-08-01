# ML Experiment Tracker

A simple frontend application for uploading, exploring, and visualizing machine learning experiment logs from CSV files.

## 🔍 Overview

This app allows users to:

- Upload a CSV file containing experiment logs;
- View a list of all available experiments;
- Select one or more experiments for comparison;
- Display interactive line charts for all tracked metrics;

## 🧪 Expected CSV Format

The default format expects the following columns:

- `experiment_id`: A string identifying a training run;
- `metric_name`: Name of the tracked metric;
- `step`: Training step (e.g., 1, 2, 3...);
- `value`: Metric value at that step.

## ⚙️ Technologies Used

- **React**
- **Material UI**
- **Plotly.js** via `react-plotly.js`
- **React Router**
- **PapaParse** — for fast CSV parsing

## 🚀 Live Demo

👉 [Click here to try the app](https://ml-experiment-tracker.vercel.app/)

## 🚀 Getting Started

To run locally:

```bash
git clone https://github.com/Oleksandr-Bielikov/ml-experiment-tracker.git
cd ml-experiment-tracker
npm install
npm start
```
