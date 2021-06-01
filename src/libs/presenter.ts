import { Presenter } from "@core";
import { Application } from "@types";

const createPresenter = (): Presenter => ({
  presentApplicationRoutingSuccess(application: Application) {
    console.log(
      `Successfully routed ${application.name} to ${application.port}`
    );
  },
  presentApplicationRoutingFailure(name: string) {
    console.log(`Failed to route ${name}`);
  },
});

export { createPresenter };
