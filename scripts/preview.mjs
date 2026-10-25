import http from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';

const root = await realpath('out');
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const port = Number(process.env.PORT ?? 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

http.createServer(async (request, response) => {
  for (const header of config.headers[0].headers) response.setHeader(header.key, header.value);
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const filename = path.resolve(root, `.${pathname}`);
    if (!filename.startsWith(root + path.sep) && filename !== root) throw new Error('Outside export');
    if (pathname.split('/').some(segment => segment.startsWith('.')) || pathname.includes('\\')) throw new Error('Hidden file');
    let target = filename;
    if ((await stat(target)).isDirectory()) {
      if (!url.pathname.endsWith('/')) {
        response.writeHead(308, { Location: url.pathname + '/' + url.search }).end();
        return;
      }
      target = path.join(target, 'index.html');
    }
    const resolved = await realpath(target);
    if (!resolved.startsWith(root + path.sep)) throw new Error('Outside export');
    const body = await readFile(resolved);
    if (url.pathname.startsWith('/_next/static/')) response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream', 'Content-Length': body.length });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    const body = await readFile(path.join(root, '404.html'));
    response.writeHead(404, { 'Content-Type': types['.html'] });
    response.end(request.method === 'HEAD' ? undefined : body);
  }
}).listen(port, '127.0.0.1', () => console.log(`Prévia do export: http://localhost:${port}`));
