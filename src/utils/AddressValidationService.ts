import axios from 'axios';

export class AddressValidationService {
  private readonly apiKey: string ;
  private readonly apiUrl: string;


  constructor() {
    this.apiKey = process.env.EASYPOST_API_KEY || '';
    this.apiUrl = 'https://api.easypost.com/v2/addresses/verify'; // Replace with EasyPost API endpoint
  }

  async validateAddress(address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }): Promise<boolean> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          verify: ['delivery'],
          address: {
            street1: address.street,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      // Check the response from EasyPost
      console.log('Address validation response:', response.data.address);
      console.log('Address validation response:', response.data.address.verifications);
      if (response.data.address.verifications.delivery.success) {
        // Address is valid
        return true;
      }

      // Address is not valid
      return false;
    } catch (error) {
      console.error('Error validating address:', error);
      throw error;
    }
  }
}

