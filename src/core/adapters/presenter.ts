import { Application } from "@types";

interface Presenter {
  presentApplicationRoutingSuccess(application: Application): void;
  presentApplicationRoutingFailure(name: string): void;
}

export { Presenter };
