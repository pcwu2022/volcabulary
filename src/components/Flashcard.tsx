import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Card, Button, CardActions, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { getRandomWord } from '../api/axios';

import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Flashcard = () => {
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
                <Tooltip title={"I don't want to see it again"}>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{float: "right"}}>
                <Tooltip title={"I know this word!"}>
                  <IconButton>
                    <CheckCircleIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{float: "right"}}>
                <Tooltip title={"I want to learn it"}>
                  <IconButton>
                    <BookmarkIcon />
                  </IconButton>
                </Tooltip>
              </Box>
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
