import express from "express";
let app = express();
export function API(path: string, apiController: any) {
  app.get(`${path}`, (req, res) => {
    res.send(apiController.index(req, res));
  });
  app.get(`${path}/:id`, (req, res) => {
    res.send(apiController.show(req, res));
  });
  app.post(`${path}`, (req, res) => {
    res.send(apiController.store(req, res));
  });
  app.put(`${path}/:id`, (req, res) => {
    res.send(apiController.update(req, res));
  });
  app.delete(`${path}/:id`, (req, res) => {
    res.send(apiController.delete(req, res));
  });
}
