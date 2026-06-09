import assert from 'node:assert/strict';
import test from 'node:test';

import { sampleGroups, sampleInstruments } from '../src/sample-data.js';
import {
  colorForChange,
  formatSignedPercent,
  getDisplayGroups
} from '../src/sample-weighting.js';

test('demo instruments belong to demo groups', () => {
  const groupIds = new Set(sampleGroups.map((group) => group.id));
  assert.ok(sampleInstruments.length > 0);

  for (const item of sampleInstruments) {
    assert.ok(groupIds.has(item.group), `${item.code} has an unknown group`);
    assert.match(item.code, /^[A-Z]-\d{2}$/);
  }
});

test('display groups attach instruments without calculating production metrics', () => {
  const groups = getDisplayGroups(sampleGroups, sampleInstruments);
  assert.equal(groups.length, sampleGroups.length);

  const totalAttached = groups.reduce((sum, group) => sum + group.instruments.length, 0);
  assert.equal(totalAttached, sampleInstruments.length);
});

test('formatting helpers are deterministic', () => {
  assert.equal(formatSignedPercent(1.25), '+1.3%');
  assert.equal(formatSignedPercent(-1.25), '-1.3%');
  assert.equal(formatSignedPercent(0), '0.0%');

  assert.equal(colorForChange(2), 'strong-up');
  assert.equal(colorForChange(0.5), 'up');
  assert.equal(colorForChange(0), 'flat');
  assert.equal(colorForChange(-0.5), 'down');
  assert.equal(colorForChange(-2), 'strong-down');
});

