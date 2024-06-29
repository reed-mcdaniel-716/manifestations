/* eslint-disable no-undef */
require("dotenv").config();
const pg = require("pg");
const _ = require("lodash");

const constructError = (error, functionName) => {
  const errName = error.name ?? "error";
  const errSeverity = error.severity ?? "ERROR";
  const errDetail =
    error.detail ?? error.message ?? `An error has occured in ${functionName}`;
  const errConstraint = error.constraint ?? null;
  const err = {
    name: errName,
    severity: errSeverity,
    detail: errDetail,
    constraint: errConstraint,
  };
  return err;
};

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: true,
});

const getManifestation = async () => {
  try {
    const result = await pool.query(
      "select * from manifestations.manifestations order by random() limit 1"
    );

    const manifestation = result.rows[0];
    return { manifestation: manifestation, error: null };
  } catch (err) {
    const errObj = constructError(err, "getManifestation");
    console.error(`Error getting manifestation: ${JSON.stringify(errObj)}`);
    return { manifestation: null, error: errObj };
  }
};

module.exports = {
  getManifestation
}