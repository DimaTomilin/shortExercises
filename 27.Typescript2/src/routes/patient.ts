import express from 'express';
import patientService from '../services/patientServise';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSsnPatients());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
