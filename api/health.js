"use strict";

module.exports = async function handler(_req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify(
      {
        ok: true,
        provider: "openrouter",
        model: process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-super-120b-a12b:free",
        has_api_key: Boolean(process.env.OPENROUTER_API_KEY)
      },
      null,
      2
    )
  );
};
