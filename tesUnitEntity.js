import UnitEntity from "../db/UnitEntity.js";

const unit = new UnitEntity();

unit.sort_indexes_table.slice(0, 20).map((i) => unit._merge(unit.origin_table[i]));
(function() {
  console.time();
  let result;
  let msg;
  try {
    result = unit.list();
    msg = 'Success execute list';
  } catch (error) {
    console.error(error);
  }
  console.timeEnd();
  msg && console.log(msg);
})();

(function() {
  console.time();
  let result;
  let msg;
  try {
    result = unit.list(20);
    msg = 'Success execute next page list';
  } catch (error) {
    console.error(error);
  }
  console.timeEnd();
  msg && console.log(msg);
})();

(function() {
  console.time();
  let result;
  let msg;
  try {
    result = unit.list(0, 'ск');
    msg = 'Success execute next page with search getList';
  } catch (error) {
    console.error(error);
  }
  console.timeEnd();
  msg && console.log(msg, result);
})();

(function() {
  console.time();
  let result;
  let msg;
  try {
    unit.moveIndex(20, 0);
    result = unit.table_indexes;
    msg = 'Success execute moveUnit';
  } catch (error) {
    console.error(error);
  }
  console.timeEnd();
  msg && console.log(msg);
})();

(function() {
  console.time();
  let result;
  let msg;
  try {
    unit.update(unit.origin_table[0]['internal_id'], 'inStock', true);
    msg = 'Success execute update in stock';
  } catch (error) {
    console.error(error);
  }
  console.timeEnd();
  msg && console.log(msg);
})();