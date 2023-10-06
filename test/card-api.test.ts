import axios from "axios";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Checkout Card API Test", () => {
  it("should return a string", async () => {
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/card/1`);

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    expect(response.data).to.be.an("string");
  });
  it("should be a valid link", async () => {
    // Make a GET request to the API endpoint
    const response = await axios.post(`http://0.0.0.0:8083/rest/checkout/card/1`);

    // Assert the status code using Chai
    expect(response.status).to.equal(200);

    // Assert the response body properties using Chai
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    expect(response.data).to.match(urlRegex);
  });
});