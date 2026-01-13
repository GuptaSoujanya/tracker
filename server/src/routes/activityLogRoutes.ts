import { Router } from 'express';
import {
  getActivityLogs,
  createOrUpdateActivityLog,
  toggleActivityLog,
  deleteActivityLog,
} from '../controllers/activityLogController';

const router = Router();

router.get('/', getActivityLogs);
router.post('/', createOrUpdateActivityLog);
router.post('/toggle', toggleActivityLog);
router.delete('/:id', deleteActivityLog);

export default router;

