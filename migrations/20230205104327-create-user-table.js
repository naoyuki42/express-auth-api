"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("user", {
    id: {
      type: "int",
      primaryKey: true,
      unsigned: true,
      autoIncrement: true,
    },
    name: {
      type: "string",
      notNull: true,
      unique: true,
    },
    password: {
      type: "string",
      notNull: true,
    },
    token: {
      type: "string",
    },
  });
};

exports.down = function (db) {
  return db.dropTable("user");
};

exports._meta = {
  version: 1,
};
