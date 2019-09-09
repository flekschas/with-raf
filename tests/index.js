const test = require('tape');
const withRaf = require('../dist/with-raf');

const sum = (...args) => args.reduce((s, x) => s + x, 0);

// Sanity check
test('sum function', (t) => {
  t.plan(1);
  t.ok(sum(1, 2, 3) === 6);
});

// Simulate throttling with `setTimeout`
test('RAF-based throttling', (t) => {
  t.plan(1);
  const fakeRaf = fn => setTimeout(() => { fn(); t.ok(true); }, 250);
  withRaf(sum, null, fakeRaf)(1, 2, 3);
});

// Test callback
test('onCall callback function', (t) => {
  t.plan(1);
  const fakeRaf = fn => setTimeout(() => { fn(); }, 250);
  const onCall = value => t.ok(value === 6);
  withRaf(sum, onCall, fakeRaf)(1, 2, 3);
});

// Make sure the last call is evaluated and not the first
test('last called arguments are used', (t) => {
  t.plan(2);
  const fakeRaf = fn => setTimeout(() => { fn(); t.ok(true); }, 250);
  const onCall = value => t.ok(value === 12);
  const sumRaf = withRaf(sum, onCall, fakeRaf);
  sumRaf(1, 2, 3);
  sumRaf(2, 3, 4);
  sumRaf(3, 4, 5);
});
