import { Abi, encodeFunctionData } from "viem";
import { cookieJarAbi, cookieJarContractAddress } from "@/utils/const";
import { transaction } from "frames.js/core";
import { frames } from "../frames";

export const POST = frames(async (ctx) => {
  if (!ctx?.message) {
    throw new Error("Invalid frame message");
  }
  console.log(ctx.searchParams["jarId"]);

  console.log(ctx.searchParams["SourcechainId"]);
  console.log(ctx.searchParams["chain"]);
  console.log(ctx.message.inputText);
  function ethToWei(eth: string): bigint {
    const weiPerEth = BigInt(10 ** 18);
    const ethInWei = BigInt(parseInt(eth)) * weiPerEth;
    return ethInWei;
  }
  console.log(ethToWei(ctx.searchParams["amount"]));
  const SourcechainId = ctx.searchParams["SourcechainId"];
  const chain = ctx.searchParams["chain"];
  const jarId = ctx.searchParams["jarId"] as `0x${string}`;
  const amount = ethToWei(ctx.searchParams["amount"]);
  const note = ctx.message.inputText ?? "";
  const calldata = encodeFunctionData({
    abi: cookieJarAbi,
    functionName: "withdraw",
    args: [jarId, amount, note],
  });

  const crosschianCalldata = encodeFunctionData({
    abi: cookieJarAbi,
    functionName: "withdrawCC",
    args: [jarId, amount, note, parseInt(chain)],
  });

  // if (SourcechainId == "84532") {
  if (chain == "84532") {
    return transaction({
      chainId: "eip155:84532", // OP Sepolia
      method: "eth_sendTransaction",
      params: {
        abi: cookieJarAbi as Abi,
        to: cookieJarContractAddress(parseInt(SourcechainId)),
        data: calldata,
        value: "0",
      },
    });
  } else {
    return transaction({
      chainId: "eip155:84532", // OP Sepolia
      method: "eth_sendTransaction",
      params: {
        abi: cookieJarAbi as Abi,
        to: cookieJarContractAddress(parseInt(SourcechainId)),
        data: crosschianCalldata,
        value: "0",
      },
    });
  }
  // } else {
  //   if (chain == "84532") {
  //     return transaction({
  //       chainId: "eip155:11155420", // OP Sepolia
  //       method: "eth_sendTransaction",
  //       params: {
  //         abi: cookieJarAbi as Abi,
  //         to: cookieJarContractAddress(parseInt(SourcechainId)),
  //         data: crosschianCalldata,
  //         value: "0",
  //       },
  //     });
  //   } else {
  //     return transaction({
  //       chainId: "eip155:11155420", // OP Sepolia
  //       method: "eth_sendTransaction",
  //       params: {
  //         abi: cookieJarAbi as Abi,
  //         to: cookieJarContractAddress(parseInt(SourcechainId)),
  //         data: calldata,
  //         value: "0",
  //       },
  //     });
  //   }
  // }
});
