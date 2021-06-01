import { Repository } from "../adapters/repository";
import { Proxy } from "../adapters/proxy";
import { Presenter } from "../adapters/presenter";

type ApplicationRoutingInteractor = (name: string) => void;

const createApplicationRoutingInteractor =
  (
    repository: Repository,
    proxy: Proxy,
    presenter: Presenter
  ): ApplicationRoutingInteractor =>
  (name) =>
    repository
      .findApplication(name)
      .then((application) =>
        application
          ? proxy
              .proxyRequest(application)
              .then(() =>
                presenter.presentApplicationRoutingSuccess(application)
              )
          : presenter.presentApplicationRoutingFailure(name)
      )
      .catch((e) => {
        console.log(e);
        presenter.presentApplicationRoutingFailure(name);
      });

export { createApplicationRoutingInteractor, ApplicationRoutingInteractor };
