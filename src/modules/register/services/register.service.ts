import { api } from "src/boot/axios";
import { InputUser, OutputUser } from "../contracts";
import {
  InputApiPaginationInterface,
  OutputApiPaginationInterface,
} from "src/common/contracts";

export class RegisterService {
  protected readonly endpoint = "user";

  async create(register: InputUser): Promise<OutputUser> {
    const result = await api.post(this.endpoint, register);
    return result.data;
  }

  async findAll(): Promise<OutputApiPaginationInterface<OutputUser>> {
    const query_params: {
      filter: {
        input?: string;
      };
      pagination?: InputApiPaginationInterface;
    } = {
      filter: {
        input: "",
      },
      pagination: {
        page: 1,
        per_page: 300,
      },
    };

    const result = await api.get(this.endpoint);
    return result.data;
  }

  async findOneById(id: number): Promise<OutputUser | null> {
    const result = await api.get(`${this.endpoint}/${id}`);
    return result.data;
  }

  async update(register: InputUser): Promise<any> {
    const dataUpdate: any = { ...register };
    if (dataUpdate.password === "NO_CHANGE_PASSWORD") {
      delete dataUpdate.password;
      delete dataUpdate.password_confirmation;
    }
    const result = await api.put(`${this.endpoint}`, dataUpdate);
    return result;
  }
}
