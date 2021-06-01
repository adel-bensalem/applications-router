import { Presenter } from "./adapters/presenter";
import { Proxy } from "./adapters/proxy";
import { Repository } from "./adapters/repository";
import {
  createApplicationRoutingInteractor,
  ApplicationRoutingInteractor,
} from "./useCases/routeApplication";

type Core = {
  routeApplication: ApplicationRoutingInteractor;
};

type DependenciesMap = {
  presenter: Presenter;
  proxy: Proxy;
  repository: Repository;
};

const createCore = (dependencies: DependenciesMap): Core => ({
  routeApplication: createApplicationRoutingInteractor(
    dependencies.repository,
    dependencies.proxy,
    dependencies.presenter
  ),
});

export { createCore, Core, Repository, Proxy, Presenter };
