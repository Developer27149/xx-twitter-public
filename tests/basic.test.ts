import { $fetch, isDev, setup } from '@nuxt/test-utils';
import { describe, expect, it } from 'vitest';

describe('example', async () => {
  await setup();
  it('Renders Hello Nuxt', async () => {
    // const html = await $fetch('/');
    // expect(html).toMatch('Hello');
  });

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"');
    });
  }
});
