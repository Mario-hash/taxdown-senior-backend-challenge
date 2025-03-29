import { Router, Request, Response } from 'express';

const router = Router();

router.post('/customers/:id/credit', (req: Request, res: Response) => {
  const { id } = req.params;
  // Por ahora devuelvo mensaje fijo
  res.status(200).json({ message: `Added credit to customer ${id} (stub)` });
});

export default router;