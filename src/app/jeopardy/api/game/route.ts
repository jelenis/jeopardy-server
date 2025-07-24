import { NextResponse } from 'next/server';
const Jeopardy = require('jeopardy-json');



export async function GET(request: Request) {
  
  const url : URL = new URL(request.url);
  let showNum = url.searchParams.get('show');
  let gameID = url.searchParams.get('gameID');

  let game = null;
  if (gameID != null) {

    if (Number(gameID) == -1) {
      const list = await Jeopardy.getGamesList();
      gameID = list[list.length - 1].game_id;
    } 
    game = await Jeopardy.getGame(gameID);


    
  } else {    
    if (isNaN(Number(showNum)) || showNum == null) {
      showNum = '1';
    }
    game = await Jeopardy.getGameByShow(showNum);
  }
  return NextResponse.json(game); 
}
