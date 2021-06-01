import { Application } from "@types";

interface Repository {
  findApplication(name: string): Promise<Application | null>;
}

export { Repository };
