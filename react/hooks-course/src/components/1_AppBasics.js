import NameTag from './A_Props_Attributes';
import NameTagChildren from './B_Props_Children';
import Input from './C_Props_Destructuring';
import NameTagCond from './D_Props_Conditional';
import NameTagBase from './E2_HigherOrder_Component';
import makeGreen from './E1_HigherOrder_Components';
import cleanStyle from './E3_HigherOrder_Component';
import React from 'react';

// New Function Component NameTagGreen built out of the
const NameTagGreen = makeGreen(NameTagBase);
// NameTagBase after "decorating" it the makeGreen HoC
// Yet another new Function Component to clean any style
const NameTagNoStyle = cleanStyle(NameTagBase);

function AppBasics() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="name title">Names List</h1>
        <NameTag
          style={{ color: 'red' }}
          firstName="Peter"
          lastName="Basicus"
        ></NameTag>
        <NameTagGreen firstName="Lawrence" lastName="Highorder"></NameTagGreen>
        <NameTagBase
          style={{ color: 'pink' }}
          firstName="Sasha"
          lastName="Highstyle"
        ></NameTagBase>
        <NameTagNoStyle
          style={{ color: 'red' }}
          firstName="Erstenia"
        ></NameTagNoStyle>
        <NameTagCond firstName="John" lastName="Iflogic"></NameTagCond>
        <NameTagCond firstName="Erstif"></NameTagCond>
        <NameTagCond></NameTagCond>
        <NameTagChildren>Jill Childrenic</NameTagChildren>
        <Input placeholder="Your name here" type="text"></Input>
        <Input placeholder="Your email here" type="email"></Input>
      </header>
    </div>
  );
}

export default AppBasics;
