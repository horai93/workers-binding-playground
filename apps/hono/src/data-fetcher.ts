import { WorkerEntrypoint } from "cloudflare:workers";

export class DataFetcher extends WorkerEntrypoint {
  async now(): Promise<Date> {
    return new Date();
  }
}
