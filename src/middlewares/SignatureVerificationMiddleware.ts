import { Context } from "@tsed/platform-params";
import { MiddlewareMethods, Middleware } from "@tsed/platform-middlewares";
import { whitelistAddress } from "../whitelist/whitelist";
import { ethers } from "ethers";

@Middleware()
export class SignatureVerificationMiddleware implements MiddlewareMethods {
  use(@Context() $ctx: Context) {
    try {
      const { walletAddress, signedMessage, originalMessage, isAdmin } = $ctx.request.body;
      console.log(walletAddress, signedMessage, originalMessage, isAdmin);
      console.log("originalMessage", originalMessage);

      if(isAdmin) {
        console.log(whitelistAddress.includes(walletAddress));
        if (whitelistAddress.includes(walletAddress)) {
          console.log("wallet address is in whitelist");
          $ctx.response.status(200).body({
            message: "wallet address is in whitelist"
          });
        }
        console.log("wallet address is not in whitelist");
        $ctx.response.status(401).body({
          message: "wallet address is not in whitelist"
        });
      }
      const timestamp = parseInt(JSON.parse(originalMessage).timestamp)
      console.log("timestamp", timestamp);
      if (!timestamp) {
        $ctx.response.status(401).body({
          message: "Timestamp not found"
        });
      }

      // Check if the timestamp is older than 5 minutes (300,000 milliseconds)
      const currentTime = new Date().getTime();
      console.log("currentTime", currentTime);
      if (currentTime - timestamp > 300000) {
        $ctx.response.status(401).body({
          message: "Signature expired"
        });
      }

      console.log("originalMessage", originalMessage);
      const recoveredAddress = ethers.utils.verifyMessage(originalMessage, signedMessage);
      console.log("recoveredAddress", recoveredAddress);
      console.log("walletAddress", walletAddress);
      // Verify the recovered address and the wallet address
      if (recoveredAddress !== walletAddress || currentTime - timestamp > 300000) {
        $ctx.response.status(401).body({
          message: "Signature verification failed"
        });
      }
    } catch (error) {
      // Handle the error by sending a response with an error message and an appropriate status code
      $ctx.response.status(401).body({
        message: error.message
      });
    }
  }
}