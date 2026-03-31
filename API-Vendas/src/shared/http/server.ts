import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from '../routes';
import AppError from '../errors/AppError';
import { AppDataSource } from '../typeorm/data-source';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error
        })
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3333, () => {
      console.log("Server started on port 3333");
    });
  })
  .catch((err) => {
    console.error("Error during data source initialization:", err);
  });