import { Application } from "@types";

interface Proxy {
  proxyRequest(application: Application): Promise<void>;
}

export { Proxy };
