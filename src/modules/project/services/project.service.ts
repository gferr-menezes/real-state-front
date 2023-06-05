import { api } from "src/boot/axios";

import {
  InputApiPaginationInterface,
  OutputApiPaginationInterface,
} from "src/common/contracts";
import { InputProject, OutputProject } from "../contracts";

export class ProjectService {
  protected readonly endpoint = "project";

  async create(project: InputProject): Promise<OutputProject> {
    const result = await api.post(this.endpoint, project);
    return result.data;
  }

  async findAll(): Promise<OutputApiPaginationInterface<OutputProject>> {
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

  async findOneById(id: number): Promise<OutputProject | null> {
    const result = await api.get(`${this.endpoint}/${id}`);
    return result.data;
  }

  async update(project: InputProject & { id: number }): Promise<any> {
    const result = await api.put(this.endpoint, project);
    return result.data;
  }
}
