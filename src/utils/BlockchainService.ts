import { Injectable } from "@tsed/di";
import { ethers } from "ethers";
import * as params from "../params.json"; // Import contract parameters from params.json
// import * as contractAbi from "./abi.json"; // Import contract ABI from abi.json

@Injectable()
export class BlockchainService {
  private readonly provider: ethers.providers.JsonRpcProvider;

  constructor() {
    const polygonRpcUrl = params.rpc;
    // const contractAddress = params.contractAddress;

    this.provider = new ethers.providers.JsonRpcProvider(polygonRpcUrl);
  }

  async verifyOwnership(tokenId: number, walletAddress: string): Promise<boolean> {
    try {
      /*
      const contractAbiArray = contractAbi as any[]; // Convert imported ABI to an array

      const contract = new ethers.Contract(contractAddress, contractAbiArray, this.provider);

      const owner = await contract.ownerOf(tokenId);

      return owner === walletAddress.toLowerCase();
      */
      return true;

    } catch (error) {
      console.error("Error verifying ownership:", error);
      return false;
    }
  }

  // async getPrintStatus(tokenId: number): Promise<number> {
  //   // TODO
  // }
}

