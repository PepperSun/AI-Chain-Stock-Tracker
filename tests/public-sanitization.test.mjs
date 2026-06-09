import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url);

function trackedFiles() {
  const output = execSync('git ls-files', { cwd: root, encoding: 'utf8' }).trim();
  return output ? output.split('\n') : [];
}

test('tracked files do not include private local artifacts', () => {
  const forbiddenPrefixes = [
    'Users/',
    '.wrangler/',
    '.netlify/',
    '.claude/',
    'DATA_RULE.md'
  ];
  const forbiddenExact = new Set(['.dev.vars']);

  for (const file of trackedFiles()) {
    assert.equal(forbiddenExact.has(file), false, `${file} should not be tracked`);

    for (const forbidden of forbiddenPrefixes) {
      assert.equal(
        file.startsWith(forbidden) || file === forbidden,
        false,
        `${file} should not be tracked in the public showcase`
      );
    }
  }
});

test('tracked text does not contain known private production markers', () => {
  const markers = [
    'N' + 'VDA',
    'A' + 'MD',
    'T' + 'SM',
    'G' + 'OOGL',
    'S' + 'EGMENT_WEIGHTS',
    'sub' + '_segments',
    'i' + 'rs',
    'l' + 'ss'
  ];

  const skipExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.ico']);
  for (const file of trackedFiles()) {
    if ([...skipExtensions].some((ext) => file.endsWith(ext))) continue;
    const text = readFileSync(new URL(file, root), 'utf8');
    for (const marker of markers) {
      assert.equal(text.includes(marker), false, `${basename(file)} contains ${marker}`);
    }
  }
});
