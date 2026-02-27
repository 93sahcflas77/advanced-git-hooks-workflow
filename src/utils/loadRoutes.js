const fs = require('fs');
const path = require('path');

function loadRoutes(router, basepath) {
  fs.readdirSync(basepath).forEach((versionFolder) => {
    const versionPath = path.join(basepath, versionFolder);
    if (!fs.statSync(versionPath).isDirectory()) return;

    const versionRouter = require("express").Router();

    fs.readdirSync(versionPath).forEach((file) => {

      if (!file.endsWith('.routes.js')) return;

      const fullPath = path.join(versionPath, file);
      const routeName = file.replace('.routes.js', '');

      versionRouter.use(`/${routeName}`, require(fullPath));
    });
    router.use(`/${versionFolder}`, versionRouter);

  });
}

module.exports = loadRoutes;
