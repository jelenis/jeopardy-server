import { NextResponse } from 'next/server';
const Jeopardy = require('jeopardy-json');



export async function GET(request: Request) {
  const list = await Jeopardy.getGamesList()
  return NextResponse.json(list);
}
