const parseBoolean = (value) => {
  if (value === undefined || value === null) return false;
  const normalized = String(value).trim().toLowerCase();
  return ['1', 'true', 'yes', 'y', 'on'].includes(normalized);
};

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const createResponse = (isDocker) => {
  const environment = isDocker ? 'docker' : 'local';

  const databaseHost = isDocker
    ? process.env.POSTGRES_HOST || 'postgres_host'
    : process.env.POSTGRES_HOST || 'localhost';

  const databasePort = isDocker
    ? parseNumber(process.env.POSTGRES_PORT_INTERNAL, 5432)
    : parseNumber(process.env.POSTGRES_PORT, 6789);

  const webHost = isDocker
    ? process.env.NODE_WEB_HOST || 'nodeweb_host'
    : process.env.NODE_WEB_HOST || 'localhost';

  const webPort = isDocker
    ? parseNumber(process.env.NODE_WEB_PORT_EXTERNAL, 8080)
    : parseNumber(process.env.NODE_WEB_PORT, 3000);

  return {
    environment,
    database: {
      host: databaseHost,
      port: databasePort,
    },
    web: {
      host: webHost,
      port: webPort,
    },
  };
};

const EnvironmentController = (_req, res) => {
  const isDocker = parseBoolean(process.env.IS_DOCKER);
  const payload = createResponse(isDocker);
  return res.json(payload);
};

export default EnvironmentController;
