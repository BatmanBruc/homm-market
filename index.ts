import express from "express";
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import UnitMediator from "./UnitMediator.js";
import UnitEntity from "./UnitEntity.js";

const unitEntity = new UnitEntity();
const unitMediator = new UnitMediator(unitEntity);

//@ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../view/dist')));
app.use(bodyParser.json());

app.post("/api/unit/items", (req, res) => {
  const { search_string = '', page = 1 } = req.body;
  const result = unitMediator.getList(page, search_string);
  res.json(result);
});

app.post("/api/unit/move", (req, res) => {
  const { fromIndex, toIndex } = req.body;
  unitMediator.move(fromIndex, toIndex);
  res.json({
    success: true
  });
});

app.post("/api/unit/trade/:id", (req, res) => {
  const { id } = req.params;
  const { trade } = req.body;
  if (trade) {
    unitMediator.buy(+id);
  } else {
    unitMediator.dismiss(+id);
  }
  res.json({
    success: true
  });
});

app.post("/api/unit/generate", (req, res) => {
  const { lenght } = req.body;
  unitEntity.createTable(lenght);
  res.json({
    success: true
  });
});

app.get("/", (__req, res) => {
  res.sendFile(path.join(__dirname, "../view/dist/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
