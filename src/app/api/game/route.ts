import { NextResponse } from 'next/server';
const Jeopardy = require('jeopardy-json');


export async function GET(request: Request) {
 
  const url : URL = new URL(request.url);
  let id = url.searchParams.get('id');
  if (isNaN(Number(id)) || id == null) {
    id = '1';
  }
  console.log('Fetching game with ID:',  id);

  const data = await Jeopardy.getGame(id);
  
  return NextResponse.json(data); 
}
