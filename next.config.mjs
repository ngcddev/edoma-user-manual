import { createMDX } from 'fumadocs-mdx/next';
import withSerwistInit from '@serwist/next';

const withMDX = createMDX();

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withSerwist(withMDX(config));
