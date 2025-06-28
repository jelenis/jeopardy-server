import { NextResponse } from 'next/server';
const Jeopardy = require('jeopardy-json');



export async function GET(request: Request) {
  
  const url : URL = new URL(request.url);
  let showNum = url.searchParams.get('show');
  if (isNaN(Number(showNum)) || showNum == null) {
    showNum = '1';
  }
  const game = await Jeopardy.getGameByShow(showNum);
  return NextResponse.json(game); 
}
