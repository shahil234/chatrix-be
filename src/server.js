import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import passport from "passport";
import session from "express-session";
import { errorHandler, notFound } from "./middlewares/error-handler.js";

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  // Log the incoming request
  console.log(`\n🚀 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`📝 Headers:`, {
    'user-agent': req.get('User-Agent'),
    'content-type': req.get('Content-Type'),
    'authorization': req.get('Authorization') ? 'Present' : 'Not present'
  });

  // Log request body if present
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`📦 Body:`, req.body);
  }

  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    const duration = Date.now() - start;
    console.log(`✅ ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)\n`);
    originalEnd.call(this, chunk, encoding);
  };

  next();
});

app.use(
  cors({
    origin: "https://chatrix-468i1uvu9-shahil234s-projects.vercel.app/",
    credentials: true
  })
);

app.use(
  session({
    secret: "blahblahblah",
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: "lax", secure: false, maxAge: 1000 * 60 * 60 },
  })
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

app.use(errorHandler);
app.use(notFound)

app.listen(4001, async () => {
  console.log("Server running at port ", 4001);
  console.log("📊 Request logging enabled - you'll see all incoming requests below:\n");
});
