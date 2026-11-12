import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('legacy page redirects to the canonical Arc website', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('content="0;url=https://pumkin4534.github.io/"'));
  assert.ok(html.includes('rel="canonical" href="https://pumkin4534.github.io/"'));
  assert.ok(!html.includes('<script'));
});

test('legacy installer delegates to the canonical HTTPS installer', async () => {
  const script = await readFile(new URL('../install.sh', import.meta.url), 'utf8');
  assert.ok(script.includes("'https://pumkin4534.github.io/install.sh'"));
  assert.ok(script.includes("--proto '=https' --proto-redir '=https'"));
  assert.ok(script.includes('/bin/bash "$work/install.sh"'));
  assert.ok(!script.includes('gh api'));
});
