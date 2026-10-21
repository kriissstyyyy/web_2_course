const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'airplanes.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const seed = [
  {
    id: 1,
    name: 'Boeing 737-800',
    fuelVolume: 26020,
    passengers: 189,
    description: 'The most widely used narrow-body airliner. Reliable short-to-medium haul aircraft.',
    image: 'assets/plane1.jpg',
    lastUpdated: '2 hours ago',
    type: 'narrow-body'
  },
  {
    id: 2,
    name: 'Airbus A320neo',
    fuelVolume: 26730,
    passengers: 180,
    description: 'Fuel-efficient next-generation single-aisle aircraft with advanced engines.',
    image: 'assets/plane2.jpg',
    lastUpdated: '5 hours ago',
    type: 'narrow-body'
  },
  {
    id: 3,
    name: 'Boeing 777-300ER',
    fuelVolume: 181280,
    passengers: 396,
    description: 'Long-range wide-body twinjet. One of the most successful commercial aircraft ever.',
    image: 'assets/plane3.jpg',
    lastUpdated: '1 day ago',
    type: 'wide-body'
  },
  {
    id: 4,
    name: 'Airbus A350-900',
    fuelVolume: 141160,
    passengers: 325,
    description: 'Modern long-haul wide-body with composite fuselage and excellent fuel efficiency.',
    image: 'assets/plane4.jpg',
    lastUpdated: '3 hours ago',
    type: 'wide-body'
  },
  {
    id: 5,
    name: 'Embraer E190',
    fuelVolume: 13000,
    passengers: 114,
    description: 'Regional jet ideal for shorter routes. Comfortable cabin and good performance.',
    image: 'assets/plane5.jpg',
    lastUpdated: '6 hours ago',
    type: 'regional'
  },
  {
    id: 6,
    name: 'Bombardier CRJ900',
    fuelVolume: 10630,
    passengers: 90,
    description: 'Popular regional jet used by many airlines for connecting flights.',
    image: 'assets/plane6.jpg',
    lastUpdated: '12 hours ago',
    type: 'regional'
  },
  {
    id: 7,
    name: 'Boeing 787-9 Dreamliner',
    fuelVolume: 126370,
    passengers: 290,
    description: 'Advanced composite aircraft with lower fuel consumption and longer range.',
    image: 'assets/plane7.jpg',
    lastUpdated: '4 hours ago',
    type: 'wide-body'
  },
  {
    id: 8,
    name: 'Airbus A380-800',
    fuelVolume: 320000,
    passengers: 555,
    description: "The world's largest passenger airliner. Double-deck superjumbo.",
    image: 'assets/plane8.jpg',
    lastUpdated: '8 hours ago',
    type: 'superjumbo'
  }
];

function ensureData() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
  }
}

function readAll() {
  ensureData();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return seed.slice();
  }
}

function writeAll(list) {
  ensureData();
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

function nextId(list) {
  if (!list.length) return 1;
  return Math.max(...list.map((p) => Number(p.id) || 0)) + 1;
}

function log(action, message) {
  const time = new Date().toLocaleTimeString('uk-UA');
  console.log(`[${time}] [${action}] ${message}`);
}

app.get('/api/airplanes', (req, res) => {
  const { search } = req.query;
  const list = readAll();

  if (search) {
    const q = String(search).trim().toLowerCase();
    const filtered = list.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
    const matchedNames = filtered.map((p) => `"${p.name}"`).join(', ') || 'нічого';
    log('ПОШУК', `Запит: "${search}" | Знайдено: ${filtered.length} з ${list.length} (${matchedNames})`);
    return res.json(filtered);
  }

  const totalPassengers = list.reduce((sum, p) => sum + (p.passengers || 0), 0);
  const totalFuel = list.reduce((sum, p) => sum + (p.fuelVolume || 0), 0);
  log(
    'ПІДРАХУНОК',
    `Загальна кількість літаків у базі: ${list.length} | Сумарна місткість: ${totalPassengers} пас. | Сумарне паливо: ${totalFuel} л`
  );

  res.json(list);
});

app.get('/api/airplanes/count', (req, res) => {
  const list = readAll();
  const count = list.length;
  const totalPassengers = list.reduce((sum, p) => sum + (p.passengers || 0), 0);
  const totalFuel = list.reduce((sum, p) => sum + (p.fuelVolume || 0), 0);

  log('ПІДРАХУНОК', `Запит статистики: ${count} літаків, ${totalPassengers} пасажирів, ${totalFuel} л палива`);
  res.json({ totalAirplanes: count, totalPassengers, totalFuel });
});

app.get('/api/airplanes/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = readAll().find((p) => p.id === id);
  if (!item) return res.status(404).json({ error: 'Airplane not found' });
  res.json(item);
});

app.post('/api/airplanes', (req, res) => {
  const { name, description, fuelVolume, passengers, type, image } = req.body;

  if (!name || String(name).trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' });
  }
  if (!description || String(description).trim().length < 10) {
    return res.status(400).json({ error: 'Description must be at least 10 characters' });
  }
  const fuel = Number(fuelVolume);
  const pax = Number(passengers);
  if (!fuel || fuel < 1000 || fuel > 500000) {
    return res.status(400).json({ error: 'Fuel volume must be between 1000 and 500000' });
  }
  if (!pax || pax < 1 || pax > 1000) {
    return res.status(400).json({ error: 'Passengers must be between 1 and 1000' });
  }
  if (!type) {
    return res.status(400).json({ error: 'Type is required' });
  }

  const list = readAll();
  const plane = {
    id: nextId(list),
    name: String(name).trim(),
    description: String(description).trim(),
    fuelVolume: fuel,
    passengers: pax,
    type: String(type),
    image: image && String(image).startsWith('assets/')
      ? image
      : `assets/plane${(list.length % 8) + 1}.jpg`,
    lastUpdated: 'just now'
  };

  list.push(plane);
  writeAll(list);

  log(
    'СТВОРЕННЯ',
    `Створено літак "${plane.name}" (ID: ${plane.id}, Тип: ${plane.type}, Пасажири: ${plane.passengers}). Всього записів тепер: ${list.length}`
  );

  res.status(201).json(plane);
});

app.put('/api/airplanes/:id', (req, res) => {
  const id = Number(req.params.id);
  const list = readAll();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Airplane not found' });

  const { name, description, fuelVolume, passengers, type, image } = req.body;

  if (name !== undefined) {
    if (!String(name).trim() || String(name).trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }
    list[idx].name = String(name).trim();
  }
  if (description !== undefined) {
    if (String(description).trim().length < 10) {
      return res.status(400).json({ error: 'Description must be at least 10 characters' });
    }
    list[idx].description = String(description).trim();
  }
  if (fuelVolume !== undefined) {
    const fuel = Number(fuelVolume);
    if (!fuel || fuel < 1000 || fuel > 500000) {
      return res.status(400).json({ error: 'Fuel volume must be between 1000 and 500000' });
    }
    list[idx].fuelVolume = fuel;
  }
  if (passengers !== undefined) {
    const pax = Number(passengers);
    if (!pax || pax < 1 || pax > 1000) {
      return res.status(400).json({ error: 'Passengers must be between 1 and 1000' });
    }
    list[idx].passengers = pax;
  }
  if (type !== undefined) {
    if (!type) return res.status(400).json({ error: 'Type is required' });
    list[idx].type = String(type);
  }
  if (image !== undefined) {
    list[idx].image = image;
  }

  list[idx].lastUpdated = 'just now';
  writeAll(list);

  log('ЗМІНА', `Оновлено дані для літака "${list[idx].name}" (ID: ${id})`);
  res.json(list[idx]);
});

app.delete('/api/airplanes/:id', (req, res) => {
  const id = Number(req.params.id);
  const list = readAll();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Airplane not found' });

  const deleted = list.splice(idx, 1)[0];
  writeAll(list);

  log(
    'ВИДАЛЕННЯ',
    `Видалено літак "${deleted.name}" (ID: ${deleted.id}). Залишилося в базі: ${list.length}`
  );

  res.json({ message: 'Deleted', airplane: deleted });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  ensureData();
  console.log(`Airplanes API: http://localhost:${PORT}`);
});