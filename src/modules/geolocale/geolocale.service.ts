import { api } from 'src/boot/axios';

export type Locale = {
  label: string;
  value: string;
};

export interface GeolocaleAddress {
  zip_code: string;
  address: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export class GeolocaleService {
  protected readonly endpoint = 'geolocale';

  async getStates(): Promise<Locale[] | []> {
    const response = await api.get(`${this.endpoint}/states`);
    return response?.data ?? [];
  }

  async getCities(state: string): Promise<Locale[] | []> {
    const response = await api.get(`${this.endpoint}/cities`, { params: { state } });
    return response?.data ?? [];
  }

  async getAddressPerZipCode(zip_code: string): Promise<GeolocaleAddress | null> {
    const response = await api.get(`${this.endpoint}/address`, { params: { zip_code } });
    return response?.data ?? null;
  }
}
