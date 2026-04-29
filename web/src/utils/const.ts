import {
  CookieJarProtocolAbi,
  CookieJarProtocol,
} from "@gitmyabi/fabianfernos-team-32776d12--cookie-jar-protocol";

export const cookieJarSubgraphUrl = (chainId: number) => {
  if (chainId === 84532) {
    return "https://api.goldsky.com/api/public/project_clzphgane7fmt01v37dcxbj7t/subgraphs/cookiejar-base-sepolia/1.0.0/gn";
  }
  return "https://api.goldsky.com/api/public/project_clzphgane7fmt01v37dcxbj7t/subgraphs/cookiejar-optimism-sepolia/1.0.0/gn";
};

export const cookieJarAbi = CookieJarProtocolAbi;

export { CookieJarProtocol };

export const cookieJarContractAddress = (chainId: number) => {
  if (chainId === 11155420) {
    return "0xA0b3Fa18a089F8bff398Fe8B83B8aC97DFF90548";
  } else if (chainId === 84532) {
    return "0x0810b2d3c23d7207c6b15fb6b3303e99561cb80f";
  }
  return "0x0810b2d3c23d7207c6b15fb6b3303e99561cb80f";
};
