import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  IconButton,
  Link,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import { ScoreData, SubjectInfo } from '../../../myBucket';

interface ScoreModalProps {
  open: boolean;
  onClose: () => void;
  scoreData: ScoreData;
}

const ScoreModal: React.FC<ScoreModalProps> = ({ open, onClose, scoreData }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ m: 0 }}>
          成績表
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: scoreData.canGraduate ? 'success.main' : 'error.main',
              fontWeight: 'bold',
            }}
          >
            {scoreData.canGraduate ? '卒業可能です' : 'まだ卒業できません'}
          </Typography>
        </Box>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableBody>
              {scoreData.subjects.map((subject: SubjectInfo) => (
                <TableRow key={subject.name}>
                  <TableCell sx={{ fontSize: 16 }}>{subject.name}</TableCell>
                  <TableCell sx={{ fontSize: 16 }} align="right">
                    必要単位数: {subject.requiredCredits}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 16,
                      color: subject.remainingCredits > 0 ? 'error.main' : 'success.main',
                    }}
                    align="right"
                  >
                    残り: {subject.remainingCredits} 単位
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }} align="right">
          <Link href={scoreData.referenceURL} underline="hover" target="_blank" rel="noopener">
            参考便覧URL
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ScoreModal;
