const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'data', 'airplanes.json');

app.use(cors());
app.use(express.json());

function ensureData() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
  }
}

function readAll() {
  ensureData();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function log(action, message) {
  const time = new Date().toLocaleTimeString('uk-UA');
  console.log(`[${time}] [${action}] ${message}`);
}

app.get('/api/airplanes', (req, res) => {
  let list = readAll();
  const total = list.length;
  const { search, type } = req.query;

  if (type && type !== 'all') {
    list = list.filter((p) => p.type === type);
  }

  if (search) {
    const q = String(search).trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q))
    );
  }

  const names = list.map((p) => p.name).join(', ') || 'нічого';
  log(
    'GET',
    `Знайдено: ${list.length} з ${total} | type=${type || 'all'} | search="${search || ''}" | (${names})`
  );

  res.json(list);
});

app.get('/api/airplanes/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = readAll().find((p) => p.id === id);

  if (!item) {
    log('GET', `Літак id=${id} не знайдено | статус: 404`);
    return res.status(404).json({ error: 'Airplane not found' });
  }

  log('GET', `Літак id=${id} | "${item.name}" | статус: 200`);
  res.json(item);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  ensureData();
  console.log(`SkyFleet API: http://localhost:${PORT}`);
});