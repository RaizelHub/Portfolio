import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getUserLikedSlugs, hasUserLiked, getCachedLikeCounts, saveUserLikedSlugs, setCachedLikeCount } from '../src/lib/projectLikeStorage.ts';

const likedKey = 'portfolio_user_liked_slugs_v1';
const countKey = 'portfolio_project_like_counts_v1';
let values;
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
beforeEach(() => {
  values = new Map();
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {} });
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  } });
});
afterEach(() => {
  for (const [key, descriptor] of [['window', originalWindow], ['localStorage', originalStorage]]) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
});

for (const raw of ['null', '[]', '[true]', '"text"', '42', 'true', '{broken']) {
  test(`invalid saved records are safe: ${raw}`, () => {
    values.set(likedKey, raw); values.set(countKey, raw);
    assert.deepEqual(getUserLikedSlugs(), {});
    assert.equal(hasUserLiked('collabcanvas'), false);
    assert.deepEqual(getCachedLikeCounts(), {});
    setCachedLikeCount('collabcanvas', 3);
    assert.equal(getCachedLikeCounts().collabcanvas, 3);
  });
}
test('valid existing likes and counts survive unchanged', () => {
  saveUserLikedSlugs({ collabcanvas: true, vocara: false });
  setCachedLikeCount('collabcanvas', 8); setCachedLikeCount('vocara', 0);
  assert.equal(hasUserLiked('collabcanvas'), true);
  assert.equal(hasUserLiked('vocara'), false);
  assert.deepEqual(getCachedLikeCounts(), { collabcanvas: 8, vocara: 0 });
});
test('invalid entry types do not suppress the button or corrupt counts', () => {
  values.set(likedKey, JSON.stringify({ collabcanvas: 'false', vocara: true, studio: 1 }));
  values.set(countKey, '{"collabcanvas":"9","vocara":4,"negative":-2,"fraction":1.5,"infinite":1e400}');
  assert.deepEqual(getUserLikedSlugs(), { vocara: true });
  assert.deepEqual(getCachedLikeCounts(), { vocara: 4 });
});
test('a missing project never inherits a liked value from Object.prototype', () => {
  assert.equal(hasUserLiked('constructor'), false);
  assert.equal(hasUserLiked('toString'), false);
});
test('missing storage and server rendering return empty records', () => {
  assert.deepEqual(getUserLikedSlugs(), {});
  assert.deepEqual(getCachedLikeCounts(), {});
  delete globalThis.window;
  assert.equal(hasUserLiked('collabcanvas'), false);
  assert.doesNotThrow(() => setCachedLikeCount('collabcanvas', 1));
});
test('blocked storage does not crash a project page', () => {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('SecurityError'); } });
  assert.equal(hasUserLiked('collabcanvas'), false);
  assert.deepEqual(getCachedLikeCounts(), {});
  assert.doesNotThrow(() => saveUserLikedSlugs({ collabcanvas: true }));
  assert.doesNotThrow(() => setCachedLikeCount('collabcanvas', 2));
});
