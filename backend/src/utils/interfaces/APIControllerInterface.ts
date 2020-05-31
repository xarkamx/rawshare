export interface APIControllerInterface {
  index(req: any, res: any): object;
  show(req: any, res: any): object;
  store(req: any, res: any): object;
  update(req: any, res: any): object;
  delete(req: any, res: any): object;
}
