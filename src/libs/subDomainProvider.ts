import { Request } from "express";

interface SubDomainProvider {
  provideSubDomain(): string;
}

const createSubDomainProvider = (request: Request): SubDomainProvider => ({
  provideSubDomain: () => request.subdomains[0] || "",
});

export { createSubDomainProvider, SubDomainProvider };
