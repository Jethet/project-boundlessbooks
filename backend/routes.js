const express = require("express")
const router = express.Router()
const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.PGUSER,
  host: "localhost",
  database: "info_inspiration",
  password: process.env.PGPASSWORD,
  port: 5432,
});


module.exports = router;