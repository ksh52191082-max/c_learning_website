const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');
const { randomBytes } = require('crypto');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const PROBLEMS = [
  {
    id: '1000',
    tier: 'bronze',
    title: 'Hello World',
    difficulty: '브론즈',
    timeLimit: '1초',
    memoryLimit: '128MB',
    tags: ['출력'],
    readme: {
      stmt: ['"Hello, World!"를 출력한다.', '없음', '"Hello, World!"를 출력한다.', ['없음'], ['Hello, World!']]
    },
    hints: ['printf 사용', '끝에 줄바꿈 포함', 'printf("Hello, World!\n");']
  },
  {
    id: '1001',
    tier: 'bronze',
    title: 'A+B',
    difficulty: '브론즈',
    timeLimit: '1초',
    memoryLimit: '128MB',
    tags: ['사칙연산'],
    readme: {
      stmt: ['두 정수 A와 B를 입력받고 합을 출력한다.', '첫째 줄에 정수 A, B가 주어진다.', 'A와 B의 합을 출력한다.', ['3 5'], ['8']]
    },
    hints: ['두 수를 더한다', 'scanf로 입력받고 printf로 출력', 'int a, b; scanf("%d %d", &a, &b);']
  },
  {
    id: '1002',
    tier: 'bronze',
    title: 'A-B',
    difficulty: '브론즈',
    timeLimit: '1초',
    memoryLimit: '128MB',
    tags: ['사칙연산'],
    readme: {
      stmt: ['두 정수 A와 B를 입력받고 차를 출력한다.', '첫째 줄에 정수 A, B가 주어진다.', 'A에서 B를 뺀 값을 출력한다.', ['3 5'], ['-2']]
    },
    hints: ['A에서 B를 뺀다', 'scanf로 입력받고 printf로 출력', 'printf("%d", a - b);']
  }
];

const submissions = [];

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(body));
}

function contentTypeFor(filePath) {
  return mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function safePath(urlPath) {
  const sanitized = path.normalize(urlPath).replace(/^\.+/, '');
  return path.join(PUBLIC_DIR, sanitized);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function findProblem(id) {
  return PROBLEMS.find(p => p.id === id);
}

function getDailyChallenge() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return PROBLEMS[seed % PROBLEMS.length];
}

function compilerPath() {
  const compilers = ['gcc', 'clang', 'tcc'];
  for (const compiler of compilers) {
    const result = spawnSync('where', [compiler], { shell: true, stdio: 'pipe' });
    if (result.status === 0 && result.stdout.toString().trim()) {
      return compiler;
    }
  }
  return null;
}

function compileAndRunC(code, stdin) {
  const tempDir = path.join(os.tmpdir(), 'cstudio_' + randomBytes(6).toString('hex'));
  fs.mkdirSync(tempDir, { recursive: true });
  const sourcePath = path.join(tempDir, 'Main.c');
  const exePath = path.join(tempDir, os.platform() === 'win32' ? 'Main.exe' : 'Main.out');
  fs.writeFileSync(sourcePath, code, 'utf8');

  const compiler = compilerPath();
  if (!compiler) {
    return { status: 'compiler-not-found', stderr: '컴파일러가 설치되어 있지 않습니다. 로컬 샌드박스 모드로 실행합니다.' };
  }

  const compileArgs = ['-std=c99', '-O2', '-Wall', '-Wextra', sourcePath, '-o', exePath];
  const compileResult = spawnSync(compiler, compileArgs, { shell: true, encoding: 'utf8', timeout: 10000 });

  if (compileResult.status !== 0) {
    return {
      status: 'compile-error',
      stdout: compileResult.stdout || '',
      stderr: compileResult.stderr || compileResult.stdout || '컴파일 오류가 발생했습니다.'
    };
  }

  const runResult = spawnSync(exePath, { shell: true, input: stdin || '', encoding: 'utf8', timeout: 2000, maxBuffer: 10 * 1024 * 1024 });
  return {
    status: runResult.status === 0 ? 'ok' : 'runtime-error',
    stdout: runResult.stdout || '',
    stderr: runResult.stderr || ''
  };
}

function simpleInterpreter(code, stdin) {
  try {
    const lines = code.split('\n');
    const inputs = (stdin || '').trim().split(/\s+/).filter(Boolean).map(n => parseInt(n, 10));
    let inputIndex = 0;
    const vars = {};
    let output = '';

    function getValue(expr) {
      expr = expr.trim();
      if (/^-?\d+$/.test(expr)) return parseInt(expr, 10);
      if (vars[expr] !== undefined) return vars[expr];
      if (expr.indexOf('+') >= 0) {
        const parts = expr.split('+');
        return getValue(parts[0]) + getValue(parts[1]);
      }
      if (expr.indexOf('-') >= 0 && expr.indexOf('->') === -1) {
        const parts = expr.split('-');
        return getValue(parts[0]) - getValue(parts[1]);
      }
      if (expr.indexOf('*') >= 0) {
        const parts = expr.split('*');
        return getValue(parts[0]) * getValue(parts[1]);
      }
      if (expr.indexOf('/') >= 0) {
        const parts = expr.split('/');
        return Math.floor(getValue(parts[0]) / getValue(parts[1]));
      }
      return vars[expr] || 0;
    }

    lines.forEach(line => {
      const text = line.replace(/\/\/.*$/, '').trim();
      if (!text) return;
      if (text.startsWith('int ') && text.includes('=')) {
        const match = text.match(/int\s+(\w+)\s*=\s*(.+);/);
        if (match) vars[match[1]] = getValue(match[2]);
      } else if (text.startsWith('int ') && text.endsWith(';')) {
        const match = text.match(/int\s+(\w+)\s*;/);
        if (match) vars[match[1]] = 0;
      } else if (text.startsWith('printf')) {
        const match = text.match(/printf\s*\(\s*"([^"]*)"\s*(,\s*(.+))?\);/);
        if (match) {
          let formatted = match[1].replace(/\\n/g, '\n');
          if (match[3]) {
            const value = getValue(match[3]);
            formatted = formatted.replace('%d', value).replace('%s', value).replace('%c', String.fromCharCode(value));
          }
          output += formatted;
        }
      } else if (text.startsWith('scanf')) {
        const match = text.match(/scanf\s*\(\s*"%d"\s*,\s*(&\w+)\s*\);/);
        if (match && inputIndex < inputs.length) {
          vars[match[1].slice(1)] = inputs[inputIndex++];
        }
      }
    });

    return { status: 'ok', stdout: output, stderr: '' };
  } catch (error) {
    return { status: 'runtime-error', stdout: '', stderr: error.message };
  }
}

async function handleApiRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  if (pathname === '/api/ping' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, version: '1.0.0' });
  }

  if (pathname === '/api/problems' && req.method === 'GET') {
    return sendJson(res, 200, PROBLEMS.map(p => ({ id: p.id, title: p.title, tier: p.tier, difficulty: p.difficulty, tags: p.tags })));
  }

  if (pathname.startsWith('/api/problems/') && req.method === 'GET') {
    const id = pathname.split('/').pop();
    const problem = findProblem(id);
    if (!problem) return sendJson(res, 404, { error: 'Problem not found' });
    return sendJson(res, 200, problem);
  }

  if (pathname === '/api/today' && req.method === 'GET') {
    return sendJson(res, 200, getDailyChallenge());
  }

  if (pathname === '/api/run' && req.method === 'POST') {
    let body;
    try {
      body = await parseJsonBody(req);
    } catch (error) {
      return sendJson(res, 400, { error: 'Invalid JSON body' });
    }
    const { code, stdin } = body;
    if (!code || typeof code !== 'string') return sendJson(res, 400, { error: 'code is required' });

    let result = compileAndRunC(code, stdin || '');
    if (result.status === 'compiler-not-found') {
      result = simpleInterpreter(code, stdin || '');
    }

    return sendJson(res, 200, result);
  }

  if (pathname === '/api/submit' && req.method === 'POST') {
    let body;
    try {
      body = await parseJsonBody(req);
    } catch (error) {
      return sendJson(res, 400, { error: 'Invalid JSON body' });
    }
    const { problemId, code, stdin } = body;
    if (!problemId || !code) return sendJson(res, 400, { error: 'problemId and code are required' });
    const problem = findProblem(problemId);
    if (!problem) return sendJson(res, 404, { error: 'Problem not found' });

    const input = stdin || (Array.isArray(problem.readme.stmt[3]) ? problem.readme.stmt[3].join(' ') : problem.readme.stmt[3]);
    let result = compileAndRunC(code, input);
    if (result.status === 'compiler-not-found') {
      result = simpleInterpreter(code, input);
    }

    const expected = Array.isArray(problem.readme.stmt[4]) ? problem.readme.stmt[4].join('\n') : String(problem.readme.stmt[4]);
    const actual = String(result.stdout || '').trim();
    const passed = actual === expected.trim();

    const record = {
      id: submissions.length + 1,
      problemId,
      code: code.slice(0, 1000),
      stdin: input,
      stdout: result.stdout,
      stderr: result.stderr,
      status: passed ? 'accepted' : 'wrong-answer',
      timestamp: new Date().toISOString()
    };
    submissions.push(record);

    return sendJson(res, 200, {
      verdict: passed ? 'accepted' : 'wrong-answer',
      stdout: result.stdout,
      stderr: result.stderr,
      expected: expected,
      actual: actual,
      submission: record
    });
  }

  return sendJson(res, 404, { error: 'API route not found' });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  if (parsedUrl.pathname.startsWith('/api/')) {
    return handleApiRequest(req, res);
  }

  const requestedPath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  const filePath = safePath(requestedPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});