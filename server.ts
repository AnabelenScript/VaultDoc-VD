import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Configurar para aceptar solicitudes del túnel de Cloudflare
  server.set('trust proxy', true);

  // Middleware para validar hosts permitidos
  server.use((req, res, next) => {
    const host = req.get('host');
    const allowedHosts = [
      'localhost:4000',
      'localhost:4200',
      '.trycloudflare.com' // Permite todos los subdominios de trycloudflare.com
    ];

    const isAllowed = allowedHosts.some(allowedHost => {
      if (allowedHost.startsWith('.')) {
        // Para dominios con wildcard como .trycloudflare.com
        return host?.endsWith(allowedHost.substring(1));
      }
      return host === allowedHost;
    });

    if (!isAllowed) {
      res.status(403).send(`Host "${host}" is not allowed`);
      return; // Importante: return después de res.send()
    }

    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
