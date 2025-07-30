import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const Jeopardy = require('jeopardy-json');


const dbPath = process.env.NODE_ENV === 'production'
  ? '/data/db/jeopardy.sqlite'
  : path.join(process.cwd(), 'data', 'jeopardy.sqlite');

// Ensure local dir exists (for local dev)
if (process.env.NODE_ENV !== 'production') {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

console.log("using databse: ", dbPath);

export async function GET(request: Request) {
  
  const db = new Database(dbPath);
  db.prepare(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      current_game INTEGER UNIQUE NOT NULL,
      next_game INTEGER NOT NULL,
      prev_game INTEGER NOT NULL,
      data TEXT NOT NULL
    )
  `).run();
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS game_meta (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER UNIQUE NOT NULL,              
      show_number INTEGER NOT NULL,
      air_date TEXT NOT NULL,
      season INTEGER NOT NULL
    )
  `).run();
  


  const url : URL = new URL(request.url);
  let gameID = url.searchParams.get('gameID');
  let game = null;

  if (gameID != null) {
    // prefer to use gameID

    if (Number(gameID) <= -1) {
      let countResult = db.prepare(`SELECT COUNT(*) as count FROM game_meta`).get() as {count: number}
      if (countResult.count) {
        let idResult = db.prepare(`SELECT game_id FROM game_meta ORDER BY id DESC LIMIT 1`).get() as {game_id: number}
        gameID = String(idResult.game_id);

      } else {
        const list = await Jeopardy.getGamesList();
        const insert = db.prepare(`
          INSERT OR IGNORE INTO game_meta (game_id, show_number, air_date, season)
          VALUES (?, ?, ?, ?)
        `);
        const insertAll = db.transaction((games: any) => {
          for (const game of games) {
            insert.run(game.game_id, game.show_number, game.air_date, game.season);
          }
        });
  
        insertAll(list);
        gameID = list[list.length - 1].game_id;

      }
      
    } 


    // check if this game is already in db
    const seen = db.prepare(`
      SELECT data FROM games WHERE current_game = ?
    `).get(gameID) as {data: string};

    if (!seen) {   
      game = await Jeopardy.getGame(gameID);

      
      db.prepare(`
        INSERT OR IGNORE INTO games (title, current_game, next_game, prev_game, data)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        game.title,
        game.current_game,
        game.next_game ?? null,
        game.prev_game ?? null,
        JSON.stringify(game)
      );
    } else {
      // game was found
      console.log("loaded from database");
      game = JSON.parse(seen.data);
    }
  } else {
   
    let showNum = url.searchParams.get('show');
    // if not gameID get by show number
    if (isNaN(Number(showNum)) || showNum == null) {
      showNum = '1';
    }
    console.log("parsing show ", showNum);
    const seen = db.prepare(`
      SELECT games.data
      FROM game_meta
      JOIN games ON game_meta.game_id = games.current_game
      WHERE game_meta.id = ?
    `).get(showNum) as {data: string};
      
    // check if show was already in the database
    if (seen) {
      console.log("loaded from database");
      game = JSON.parse(seen.data) ;
    } else {
      if (Number(showNum) < 0) {
        let countResult = db.prepare(`SELECT COUNT(*) as count FROM game_meta`).get() as {count: number}
        showNum = String(countResult.count + Number(showNum));
        console.log("negative shownum: ", showNum)
      }

      game = await Jeopardy.getGameByShow(showNum);
     
      db.prepare(`
        INSERT  OR IGNORE INTO games (title, current_game, next_game, prev_game, data)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        game.title,
        game.current_game,
        game.next_game ?? null,
        game.prev_game ?? null,
        JSON.stringify(game)
      );
    }
    gameID = game.current_game;
  }

    const game_meta = db.prepare(`
    SELECT id FROM game_meta WHERE game_id = ?
  `).get(gameID) as {id: number};
    
  
  //gaurd against access to games that havent been indexed yet
  if (game_meta) {
    game.index = game_meta.id;
    const last_id = db.prepare(`
      SELECT MAX(id) as id FROM game_meta
    `).get() as { id: number };
    
    if (game_meta.id == last_id.id) {
      game.next_game = null;
    }
    return NextResponse.json(game); 
  } 

  return NextResponse.json(
    { error: 'Not in database' },
    { status: 404 }
  );
  
}
