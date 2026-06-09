/**
 * Demo-only presentation helpers.
 *
 * The production repository uses a private research model. That model, its
 * taxonomy, its weighting logic, and its ranking method are intentionally not
 * represented here.
 */

export function getDisplayGroups(groups, instruments) {
  return groups.map((group) => ({
    ...group,
    instruments: instruments.filter((item) => item.group === group.id)
  }));
}

export function colorForChange(change) {
  if (change > 1.5) return 'strong-up';
  if (change > 0) return 'up';
  if (change < -1.5) return 'strong-down';
  if (change < 0) return 'down';
  return 'flat';
}

export function formatSignedPercent(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

