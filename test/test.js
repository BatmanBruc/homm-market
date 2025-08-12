import UnitEntity from "../db/UnitEntity.js";

const unit = new UnitEntity();

(function() {
  console.time();
  let result;
  let msg;
  try {
    result = unit.list();
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
    result = unit.list(20);
    msg = 'Success execute next page getList';
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
    unit.list(20, 'Ске');
    msg = 'Success execute next page with search getList';
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
    unit.insert(unit.origin_table[0]['id'], 'inStock', true);
    msg = 'Success execute set';
  } catch (error) {
    console.error(error);
  }
  console.timeEnd();
  msg && console.log(msg);
})();