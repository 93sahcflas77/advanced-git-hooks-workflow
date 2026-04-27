const fs = require('fs');
const path = require('path');

module.exports = loadRoutes = (router, routesPath) => {
  fs.readdirSync(routesPath).forEach((file) => {
    if (file === 'index.js') {
      return;
    }

    if (!file.endsWith('.routes.js')) {
      return;
    }

    const fullPath = path.join(routesPath, file);
    const routeName = file.replace('.routes.js', '');

    router.use(`/${routeName}`, require(fullPath));
  });
};
