import React from 'react';
import Flashcard from './Flashcard';
import { UserDataIndex } from '../types/types';

const Main = () => {
  return (
    <div>
      <Flashcard
        word={""}
        level={0}
        data={{}}
        onCheck={(word: string, level: number | UserDataIndex) => {

        }}
        onDiscard={(word: string, level: number | UserDataIndex) => {

        }}
        onSave={(word: string, level: number | UserDataIndex) => {

        }}
        onRemember={(word: string, level: number | UserDataIndex) => {
          
        }}
        onForget={(word: string, level: number | UserDataIndex) => {
          
        }}
      />
    </div>
  )
}

export default Main;
