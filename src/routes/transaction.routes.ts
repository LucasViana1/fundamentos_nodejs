import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO OK?
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance()

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO OK?
    const { title, value, type } = request.body;

    const createTransactionService = new CreateTransactionService(transactionsRepository);

    const transactions = createTransactionService.execute({ title, value, type })

    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
