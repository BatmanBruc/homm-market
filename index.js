import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import Unit from "./models/Unit.js";
import UnitEntity from "./db/UnitEntity.js";

const db = new UnitEntity();
const unit = new Unit(db);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'homm-market/dist/assets')));

app.get("/api/unit/items", (req, res) => {
  const { search_string = "", page = 0 } = req.query;
  const result = unit.getList(page, search_string)
  res.json(result);
});

app.get("/api/unit/move", (req, res) => {
  const { fromIndex, toIndex } = req.query;
  const result = unit.move(fromIndex, toIndex);
  res.json({
    success: true
  });
});

app.get("/api/unit/trade/:id", (req, res) => {
  const { id } = req.params;
  const { trade } = req.query;
  if (trade) {
    unit.buy(id);
  } else {
    unit.dismiss(id);
  }
  res.json({
    success: true
  });
});

app.get("/", (__req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
