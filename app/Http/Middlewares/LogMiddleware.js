import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function LogMiddleware(req, res, next) {
    const isoDate = new Date().toISOString();
    const method = req.method;
    const route = req.originalUrl || req.url;

    const logMessage = `[${isoDate}] ${method} :: ${route}\n`;

    console.log(logMessage);

    // 1. Define o caminho da pasta e o caminho do arquivo
    const logDir = path.join(__dirname, '..', '..', '..', 'storage', 'logs');
    const logFilePath = path.join(logDir, 'log.txt');

    try {
        // 2. Cria a pasta se não existir. Se já existir, o `{ recursive: true }` evita que dê erro.
        fs.mkdirSync(logDir, { recursive: true });

        // 3. Grava no arquivo adicionando ao final (append)
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Erro ao gravar log no arquivo:', err);
            }
        });
    } catch (dirError) {
        // Trata um possível erro inesperado na criação do diretório (ex: falta de permissão)
        console.error('Erro crítico ao criar o diretório de logs:', dirError);
    }

    next();
}

export default LogMiddleware;