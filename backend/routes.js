const express = require("express")
const { Pool } = require("pg")

const pool = new Pool({
  user: process.env.PGUSER,
  host: "localhost",
  database: "info_inspiration",
  password: process.env.PGPASSWORD,
  port: 5432,
});

