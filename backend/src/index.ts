import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import authRouter from "./routes/auth";
dotenv.config();

// Express setup
const app = express();
app.use(express.json());

// HTTP server and Socket.IO setup
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  pingInterval: 2000,
  pingTimeout: 2300,
});

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

app.use((req, res, next) => {
  // @ts-ignore -> express Request tipine custom property ekliyoruz
  req.supabase = supabase;
  next();
});

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Supabase + Express + TypeScript API 🚀");
});

// Socket.IO Event Constants
const EVENT_JOIN_ROOM = "join-room";
const EVENT_ROOM_USERS = "room-users";
const EVENT_SEND_SCORE = "send-score";
const EVENT_SCORE_UPDATE = "score-update";
const EVENT_RESET_SCORES = "reset-scores";
const EVENT_SHOW_ALL_SCORES = "show-all-scores";
const EVENT_DISCONNECT = "disconnect";

// Type definitions
interface SelectedScore {
  score: number;
  scoreId: string;
}

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
  deviceId: string;
  selectedScore: SelectedScore | null;
  isOnline: boolean;
}

interface SocketData {
  room: string;
  name: string;
  isAdmin: boolean;
  deviceId: string;
  userId: string;
}

interface JoinRoomPayload {
  userId: string;
  room: string;
  name: string;
  isAdmin: boolean;
  deviceId: string;
}

interface SendScorePayload {
  scoreId: string;
  score: number;
  userId: string;
}

interface ShowAllScoresPayload {
  show: boolean;
}

interface ScoreCount {
  score: number;
  count: number;
}

interface PieChartDataPoint {
  id: number;
  value: number;
  label: string;
  count: number;
}

interface RoomUsers {
  [socketId: string]: User;
}

interface Rooms {
  [roomId: string]: RoomUsers;
}

type CustomSocket = Socket & { data: SocketData };

// Store rooms and users
const rooms: Rooms = {};

// Socket.IO connection handler
io.on("connection", (socket: CustomSocket) => {
  socket.on(EVENT_JOIN_ROOM, (payload: JoinRoomPayload) =>
    handleJoinRoom(socket, payload)
  );
  socket.on(EVENT_SEND_SCORE, (payload: SendScorePayload) =>
    handleSendScore(socket, payload)
  );
  socket.on(EVENT_RESET_SCORES, () => handleResetScores(socket));
  socket.on(EVENT_SHOW_ALL_SCORES, (payload: ShowAllScoresPayload) =>
    handleShowAllScores(socket, payload)
  );
  socket.on(EVENT_DISCONNECT, () => handleDisconnect(socket));
});

function handleShowAllScores(
  socket: CustomSocket,
  { show }: ShowAllScoresPayload
): void {
  const { room } = socket.data;
  if (!room) return;
  io.to(room).emit("show-all-scores", show);
}

function handleResetScores(socket: CustomSocket): void {
  const { room } = socket.data;
  if (!room || !rooms[room]) return;

  for (const user of Object.values(rooms[room])) {
    user.selectedScore = null;
  }

  io.to(room).emit("show-all-scores", false);
  io.to(room).emit("room-users", Object.values(rooms[room]));
  io.to(room).emit("is-reset", true);
}

function handleJoinRoom(
  socket: CustomSocket,
  { userId, room, name, isAdmin, deviceId }: JoinRoomPayload
): void {
  socket.join(room);
  socket.data = { room, name, isAdmin, deviceId, userId };

  if (!rooms[room]) {
    rooms[room] = {};
  }

  let existingSocketId: string | null = null;
  for (const [id, user] of Object.entries(rooms[room])) {
    if (user.deviceId === deviceId) {
      existingSocketId = id;
      break;
    }
  }

  if (existingSocketId) {
    const existingUser = rooms[room][existingSocketId];
    delete rooms[room][existingSocketId];

    rooms[room][socket.id] = {
      id: userId,
      name,
      isAdmin,
      deviceId,
      selectedScore: existingUser.selectedScore ?? null,
      isOnline: true,
    };

    if (existingUser?.selectedScore) {
      socket.emit(EVENT_SCORE_UPDATE, {
        user: {
          id: userId,
          name,
          isAdmin,
          deviceId,
          selectedScore: existingUser.selectedScore,
          isOnline: true,
        },
      });
    }
  } else {
    rooms[room][socket.id] = {
      id: userId,
      name,
      isAdmin,
      deviceId,
      selectedScore: null,
      isOnline: true,
    };
  }

  io.to(room).emit(EVENT_ROOM_USERS, Object.values(rooms[room]));
  io.to(room).emit(EVENT_SCORE_UPDATE, {
    user: rooms[room][socket.id],
  });
}

function handleSendScore(
  socket: CustomSocket,
  { scoreId, score, userId }: SendScorePayload
): void {
  const { room, name, isAdmin, deviceId } = socket.data;

  if (!room || !rooms[room] || !deviceId) return;

  const userEntry = Object.entries(rooms[room]).find(
    ([_, user]) => user.deviceId === deviceId
  );

  if (!userEntry) return;

  const [, user] = userEntry;

  user.selectedScore = {
    score,
    scoreId,
  };

  const scoresData = getScoreCounts(rooms[room]);

  // Calculate average score
  const totalVotes = scoresData.reduce((sum, item) => sum + item.count, 0);
  const average =
    scoresData.reduce((sum, item) => sum + item.score * item.count, 0) /
    totalVotes;

  // Calculate winner score
  const winnerScore = findClosestFibonacci(average);

  // Create chart data
  const pieChartData = convertToPieChartData(scoresData);

  io.to(room).emit(EVENT_SCORE_UPDATE, {
    user: {
      id: userId,
      name,
      deviceId,
      isAdmin,
      selectedScore: {
        score,
        scoreId,
      },
    },
    calculateScore: { chart: pieChartData, winnerScore },
  });
}

function handleDisconnect(socket: CustomSocket): void {
  const { room, userId } = socket.data || {};
  if (!room || !rooms[room]) return;

  const userEntry = Object.entries(rooms[room]).find(
    ([_, user]) => user.id === userId
  );

  if (!userEntry) return;
  const [socketId, user] = userEntry;

  user.isOnline = false;
  rooms[room][socketId] = user;

  io.to(room).emit(EVENT_ROOM_USERS, Object.values(rooms[room]));
}

function convertToPieChartData(scoresData: ScoreCount[]): PieChartDataPoint[] {
  const totalVotes = scoresData.reduce((sum, item) => sum + item.count, 0);
  return scoresData.map((item, index) => ({
    id: index,
    value: (item.count / totalVotes) * 100,
    label: item.score.toString(),
    count: item.count,
  }));
}

function getScoreCounts(roomData: RoomUsers): ScoreCount[] {
  const counts: { [key: number]: number } = {};

  for (const userId in roomData) {
    const user = roomData[userId];
    if (!user) continue;

    const score = user?.selectedScore?.score;
    if (score !== undefined && score !== null && score !== 0) {
      counts[score] = (counts[score] || 0) + 1;
    }
  }

  return Object.entries(counts).map(([score, count]) => ({
    score: parseInt(score),
    count,
  }));
}

function findClosestFibonacci(target: number): number {
  if (target <= 0) return 0;

  let a = 0;
  let b = 1;

  while (b < target) {
    const next = a + b;
    a = b;
    b = next;
  }

  const distA = Math.abs(target - a);
  const distB = Math.abs(b - target);

  if (distA < distB) {
    return a;
  } else if (distB < distA) {
    return b;
  } else {
    // Return the larger one if equal distance
    return b;
  }
}

const port = Number(process.env.PORT) || 3001;
server.listen(port, () =>
  console.log(`Server running on http://0.0.0.0:${port}`)
);
