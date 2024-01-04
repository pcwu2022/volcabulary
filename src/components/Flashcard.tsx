import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Card, Button, CardActions, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { getRandomWord } from '../api/axios';

import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HelpIcon from '@mui/icons-material/Help';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DictionaryData, UserDataIndex } from '../types/types';

type FlashCardProps = {
  word: string,
  level: number | UserDataIndex,
  data: DictionaryData,
  onSave: (word: string, level: number | UserDataIndex) => void,
  onDiscard: (word: string, level: number | UserDataIndex) => void,
  onCheck: (word: string, level: number | UserDataIndex) => void,
  onRemember: (word: string, level: number | UserDataIndex) => void,
  onForget: (word: string, level: number | UserDataIndex) => void
}

const Flashcard = ({
  word, level, data, onSave, onDiscard, onCheck, onRemember, onForget
}: FlashCardProps) => {
  const isSaved = (typeof level !== "number")
  const [flip, setFlip] = useState<boolean>(false);
  return (
    <>
      <ReactCardFlip
        isFlipped={flip}
        flipDirection='vertical'
      >
        <Card 
          sx={{ 
            minWidth: 275,
            minHeight: 300
          }}
        >
          <CardContent>
            <div 
              className='h-64 flex items-center justify-center cursor-pointer'
              onClick={(e) => {
                setFlip(true);
              }}
            >
              <Typography variant="h5" component="div">
                {getRandomWord()[0]}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <Box sx={{display: 'relative', width: "100%"}}>
              <Box sx={{float: "left"}}>
                <Tooltip title={"I don't want to see it again."}>
                  <IconButton
                    onClick={() => {
                      onDiscard(word, level);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {isSaved?
              <>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"I remember!"}>
                    <IconButton
                      onClick={() => {
                        onRemember(word, level);
                      }}
                    >
                      <LightbulbIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"I forgot..."}>
                    <IconButton
                      onClick={() => {
                        onForget(word, level);
                      }}
                    >
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>:
              <>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"I know this word!"}>
                    <IconButton
                      onClick={() => {
                        onCheck(word, level);
                      }}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{float: "right"}}>
                  <Tooltip title={"New word! Save it!"}>
                    <IconButton
                      onClick={() => {
                        onSave(word, level);
                      }}
                    >
                      <BookmarkIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>}
            </Box>

          </CardActions>
        </Card>
        <Card 
          sx={{ 
            minWidth: 275,
            minHeight: 300,
            cursor: "pointer"
          }}
          onClick={(e) => {
            setFlip(false);
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Word
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              meaning
            </Typography>
            <Typography variant="body2">
              example
            </Typography>
          </CardContent>
        </Card>
      </ReactCardFlip>
    </>
  )
}

export default Flashcard;
