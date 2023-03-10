// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

const config = {
    reactStrictMode: true,
    transpilePackages: ["@nft-explorer/ui"],
    images: {
        dangerouslyAllowSVG: true,
        domains: [
            "nft-cdn.alchemy.com",
            "i.seadn.io",
            "static.pinkshitape.com",
        ],
    },
};

export default config;
