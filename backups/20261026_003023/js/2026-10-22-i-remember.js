(function () {
  "use strict";

  var canvas = document.getElementById("writing");
  if (!canvas || !canvas.getContext) {
    return;
  }

  var ctx = canvas.getContext("2d");

  var STORY = [
    "There once was a child named Mournwell Crane,",
    "who sat with a board upon his lap,",
    "and drew, each day, the selfsame way,",
    "a line that led to nowhere exactly.",
    "",
    "His pencil moved as pencils do,",
    "in small grey arcs of no consequence,",
    "a doodle here, a smudge gone there,",
    "of absolutely nothing in particular.",
    "",
    "His aunt had said, draw something fine,",
    "and Mournwell nodded, bleak and polite,",
    "then drew a shape that looked like dust,",
    "or possibly a very small umbrella.",
    "",
    "The nursery clock ticked on and on.",
    "Nobody came to see his page.",
    "He drew a loop. He drew a line.",
    "He drew the shape of being unwatched.",
    "",
    "On tuesday last the lamp went out",
    "and no one noticed for a week.",
    "Mournwell kept on with his board,",
    "drawing nothing, quite precisely.",
    "",
    "They found him still, upon the stair,",
    "his pencil resting in his hand,",
    "the paper filled with idle loops,",
    "a record of a watched for nothing.",
    "",
    "And if you look, and look away,",
    "the swirls creep in to fill the gaps,",
    "for stories drift when no one is there,",
    "and tidy up when someone is watching.",
  ];

  // Every letter is a hand-drawn skeleton: a sequence of points, in a unit
  // box (baseline y = 0, up is negative, down/descenders positive). The
  // pen tweens between consecutive points along a curve (not a straight
  // jump), so the line flows the way a real stroke would. Letters within
  // a word stay one continuous line.
  var GLYPHS = {
    a: { w: 0.5, p: [[0, 0], [0, -0.4], [0.22, -0.5], [0.4, -0.3], [0.36, 0.02], [0.14, 0.03], [0.1, -0.2], [0.5, -0.03]] },
    b: { w: 0.5, p: [[0.03, -0.85], [0.02, -0.3], [0.04, 0], [0.28, 0.02], [0.42, -0.22], [0.26, -0.46], [0.04, -0.26], [0.5, -0.02]] },
    c: { w: 0.42, p: [[0.38, -0.4], [0.14, -0.5], [0, -0.26], [0.04, -0.03], [0.26, 0.03], [0.42, -0.1]] },
    d: { w: 0.52, p: [[0.38, -0.4], [0.14, -0.5], [0, -0.26], [0.04, -0.03], [0.28, 0.04], [0.4, -0.18], [0.4, -0.85], [0.52, 0]] },
    e: { w: 0.42, p: [[0, -0.2], [0.2, -0.4], [0.36, -0.2], [0.1, -0.02], [0, -0.22], [0.28, 0.02], [0.42, -0.08]] },
    f: { w: 0.42, p: [[0.2, -0.9], [0.3, -0.58], [0.05, -0.38], [0.3, -0.38], [0.12, -0.08], [0.1, 0.35], [0.42, 0]] },
    g: { w: 0.5, p: [[0.4, -0.4], [0.16, -0.5], [0.02, -0.26], [0.06, -0.03], [0.3, 0.04], [0.4, -0.2], [0.4, 0.3], [0.18, 0.46], [0, 0.3], [0.5, 0]] },
    h: { w: 0.52, p: [[0.03, -0.85], [0.02, 0], [0.04, -0.28], [0.22, -0.44], [0.4, -0.28], [0.4, 0], [0.52, 0]] },
    i: { w: 0.3, p: [[0.08, -0.46], [0.1, 0], [0.3, 0]] },
    j: { w: 0.32, p: [[0.12, -0.46], [0.14, 0.2], [0, 0.42], [-0.1, 0.3], [0.32, 0]] },
    k: { w: 0.5, p: [[0.03, -0.85], [0.02, -0.3], [0.02, 0], [0, -0.3], [0.26, -0.48], [0.08, -0.2], [0.3, 0.02], [0.5, 0]] },
    l: { w: 0.34, p: [[0.1, -0.85], [0.1, 0], [0.34, 0]] },
    m: { w: 0.72, p: [[0, 0], [0.02, -0.38], [0.14, -0.48], [0.26, -0.26], [0.26, 0], [0.3, -0.38], [0.42, -0.48], [0.54, -0.26], [0.54, 0], [0.72, 0]] },
    n: { w: 0.5, p: [[0, 0], [0.02, -0.4], [0.16, -0.48], [0.3, -0.28], [0.28, 0], [0.5, 0]] },
    o: { w: 0.46, p: [[0, -0.24], [0.1, -0.48], [0.34, -0.48], [0.44, -0.24], [0.34, 0], [0.1, 0], [0, -0.24], [0.46, -0.03]] },
    p: { w: 0.48, p: [[0.04, 0.4], [0.02, -0.46], [0.04, 0], [0.28, 0.03], [0.42, -0.22], [0.26, -0.44], [0.04, -0.26], [0.48, 0]] },
    q: { w: 0.46, p: [[0.4, -0.4], [0.16, -0.5], [0.02, -0.26], [0.06, -0.03], [0.3, 0.04], [0.4, -0.2], [0.4, 0.42], [0.46, 0]] },
    r: { w: 0.36, p: [[0, 0], [0.02, -0.4], [0.04, -0.48], [0.2, -0.46], [0.1, -0.28], [0.36, -0.04]] },
    s: { w: 0.4, p: [[0.32, -0.42], [0.1, -0.48], [0, -0.32], [0.2, -0.2], [0.34, -0.1], [0.2, 0.04], [0, -0.02], [0.4, -0.06]] },
    t: { w: 0.4, p: [[0.0, -0.4], [0.26, -0.4], [0.12, -0.75], [0.1, -0.1], [0.3, 0.03], [0.4, 0]] },
    u: { w: 0.5, p: [[0, -0.38], [0.02, 0], [0.16, 0.04], [0.28, -0.18], [0.28, -0.38], [0.3, 0], [0.5, 0]] },
    v: { w: 0.44, p: [[0, -0.38], [0.1, 0.02], [0.22, -0.38], [0.44, 0]] },
    w: { w: 0.68, p: [[0, -0.38], [0.08, 0.02], [0.18, -0.28], [0.28, 0.02], [0.38, -0.28], [0.48, 0.02], [0.58, -0.38], [0.68, 0]] },
    x: { w: 0.42, p: [[0, -0.38], [0.42, 0.02], [0.21, -0.18], [0, 0.02], [0.42, -0.38]] },
    y: { w: 0.46, p: [[0, -0.38], [0.1, 0.02], [0.22, -0.32], [0.3, 0.1], [0.14, 0.45], [0, 0.3], [0.46, 0]] },
    z: { w: 0.4, p: [[0, -0.4], [0.36, -0.4], [0.05, 0], [0.4, 0]] },

    A: { w: 0.55, p: [[0, 0], [0.2, -0.82], [0.4, 0], [0.1, -0.3], [0.3, -0.3], [0.6, 0]] },
    C: { w: 0.45, p: [[0.4, -0.65], [0.15, -0.8], [0, -0.42], [0.06, -0.08], [0.3, 0.05], [0.45, -0.1]] },
    D: { w: 0.5, p: [[0, 0], [0, -0.82], [0.3, -0.82], [0.46, -0.58], [0.46, -0.22], [0.3, 0], [0, 0], [0.55, 0]] },
    H: { w: 0.55, p: [[0, -0.82], [0, -0.42], [0.4, -0.42], [0.4, -0.82], [0.4, 0], [0.6, 0]] },
    M: { w: 0.75, p: [[0, 0], [0, -0.82], [0.32, 0], [0.32, -0.82], [0.64, 0], [0.75, 0]] },
    N: { w: 0.55, p: [[0, 0], [0, -0.82], [0.45, 0], [0.45, -0.82], [0.6, 0]] },
    O: { w: 0.52, p: [[0, -0.28], [0.1, -0.78], [0.4, -0.78], [0.5, -0.28], [0.4, 0.04], [0.1, 0.04], [0, -0.28], [0.55, 0]] },
    T: { w: 0.5, p: [[0, -0.82], [0.5, -0.82], [0.25, -0.82], [0.25, 0], [0.55, 0]] },

    ",": { w: 0.2, p: [[0.05, 0], [0, 0.2], [0.1, 0.1]] },
    ".": { w: 0.18, p: [[0.03, 0], [0.05, 0.03], [0.03, 0]] },
    "'": { w: 0.15, p: [[0.05, -0.7], [0.08, -0.5]] },
    "-": { w: 0.3, p: [[0, -0.2], [0.3, -0.2]] },
  };

  var BASE_SIZE = 24;
  var LINE_HEIGHT = 36;
  var MARGIN = 24;
  var SPACE_WIDTH = 0.42;
  var GROW_STEP = LINE_HEIGHT * 4;
  var MAX_HEIGHT = 2600;
  var GROW_TWEEN_MS = 500;
  var IDLE_DELAY = 5000;
  // Pen speed is distance-based (ms per pixel of curve travelled) rather
  // than a fixed time per point -- anchors are unevenly spaced within a
  // glyph, and a fixed duration per segment made the pen visibly speed up
  // over short hops and crawl over long ones. Tuned ~1/3 faster than the
  // original fixed-duration pacing.
  var STEADY_MS_PER_PX = 6.5;
  var SLOPPY_MS_PER_PX_MIN = 5.5;
  var SLOPPY_MS_PER_PX_MAX = 22;
  var MIN_DRAW_SEGMENT_MS = 8;
  var MAX_DRAW_SEGMENT_MS = 180;
  var IDLE_RAMP_MS = 7000;
  var LIFT_SEGMENT_MS = 60;
  var NEWLINE_SEGMENT_MS = 280;

  // A coarse grid over the canvas marking which patches already have ink
  // on them, so the pen can find genuinely empty paper to jump to instead
  // of guessing blindly and writing over itself.
  var CELL_SIZE = 26;
  var grid = [];
  var gridCols = 0;
  var gridRows = 0;

  var width, height;
  var penX, penY;
  var lineIndex = 0;
  var charIndex = 0;
  var idle = false;
  var idleSince = 0;
  var idleIntensity = 0;
  // True whenever the next letter is the first of a word -- that's when
  // it's worth checking the upcoming word will actually fit.
  var wordStart = true;
  var lastMoveTime = performance.now();
  var rafId = null;

  // The pen's path: a queue of {x, y, draw} target points, each consumed
  // one at a time. draw === false means the pen lifts and glides to the
  // next point without leaving a mark. The active segment tweens the pen
  // from its last resting point to the next queued point along a cubic
  // Bezier curve (built from the surrounding points, Catmull-Rom style),
  // drawing only the newly-revealed bit of curve each frame.
  var queue = [];
  var lastPoint = null;
  var beforeLastPoint = null;
  var segment = null;

  // While the canvas is growing taller, pen drawing pauses -- the tween
  // below is the only thing animating.
  var growAnim = null;

  // A real browser-resize: the width changed (or this is the first call),
  // so there is nothing sensible to preserve -- just reset at the new size.
  function resize() {
    var rect = canvas.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(canvas.style.height ? parseFloat(canvas.style.height) : rect.height || 90, 1);
    applyCanvasPixelSize();
    initGrid();
  }

  // Sized for MAX_HEIGHT up front so growing the canvas later never needs
  // to resize the grid -- rows past the current height are simply unused
  // until the canvas grows into them.
  function initGrid() {
    gridCols = Math.max(1, Math.ceil(width / CELL_SIZE));
    gridRows = Math.max(1, Math.ceil(MAX_HEIGHT / CELL_SIZE));
    grid = new Array(gridRows);
    for (var r = 0; r < gridRows; r++) {
      grid[r] = new Array(gridCols).fill(false);
    }
  }

  function markWritten(x, y) {
    var col = Math.floor(x / CELL_SIZE);
    var row = Math.floor(y / CELL_SIZE);
    if (row >= 0 && row < gridRows && col >= 0 && col < gridCols) {
      grid[row][col] = true;
    }
  }

  // True if a run of numCols cells starting at (row, colStart) -- and the
  // rows directly above/below it, to give ascenders/descenders a little
  // berth -- are all still blank paper.
  // margin extends the check to neighboring rows too. Text lines sit only
  // CELL_SIZE-ish rows apart, so a margin here would make every line
  // falsely "collide" with the one above it -- callers checking normal,
  // same-line writing should pass margin 0 and only widen it when
  // genuinely hunting for a fresh patch of paper away from existing lines.
  function rowRunFree(row, colStart, numCols, margin) {
    for (var r = row - margin; r <= row + margin; r++) {
      if (r < 0 || r >= gridRows) {
        continue;
      }
      for (var c = colStart; c < colStart + numCols; c++) {
        if (c < 0 || c >= gridCols || grid[r][c]) {
          return false;
        }
      }
    }
    return true;
  }

  function hasRoomForWord(x, y, widthNeeded) {
    var row = Math.floor(y / CELL_SIZE);
    var colStart = Math.floor(x / CELL_SIZE);
    var numCols = Math.max(1, Math.ceil(widthNeeded / CELL_SIZE));
    if (colStart + numCols >= gridCols - 1) {
      return false;
    }
    return rowRunFree(row, colStart, numCols, 0);
  }

  // Scans the grid, within the canvas's current (already-grown) height,
  // for a run of cells wide enough to fit widthNeeded pixels of writing
  // and returns its left edge. Falls back to a plain random spot if the
  // whole visible area is too crowded to fit it anywhere.
  function findEmptySpot(widthNeeded) {
    var usableRows = Math.max(1, Math.floor((height - MARGIN) / CELL_SIZE));
    var numCols = Math.max(1, Math.ceil(widthNeeded / CELL_SIZE));
    var candidates = [];
    for (var r = 1; r < usableRows && r < gridRows; r++) {
      for (var c = 1; c < gridCols - numCols; c++) {
        if (rowRunFree(r, c, numCols, 1)) {
          candidates.push({ row: r, col: c });
        }
      }
    }
    if (candidates.length === 0) {
      return {
        x: MARGIN + Math.random() * Math.max(width - MARGIN * 2 - widthNeeded, 0),
        y: MARGIN + LINE_HEIGHT + Math.random() * Math.max(height - MARGIN * 2 - LINE_HEIGHT, 0),
      };
    }
    var pick = candidates[Math.floor(Math.random() * candidates.length)];
    return { x: pick.col * CELL_SIZE, y: pick.row * CELL_SIZE + CELL_SIZE / 2 };
  }

  // Estimated pixel width of the word starting at STORY[lineIdx][charIdx],
  // without consuming it -- used to check there's room before committing
  // to write it.
  function peekWordWidth(lineIdx, charIdx) {
    var line = STORY[lineIdx];
    if (line === undefined) {
      return 0;
    }
    var total = 0;
    for (var i = charIdx; i < line.length; i++) {
      var c = line.charAt(i);
      if (c === " ") {
        break;
      }
      var g = GLYPHS[c] || GLYPHS[c.toLowerCase()];
      total += (g ? g.w : SPACE_WIDTH * 0.6) * BASE_SIZE + 1.5;
    }
    return total;
  }

  function relocateForWord(widthNeeded) {
    queue = [];
    var spot = findEmptySpot(widthNeeded);
    penX = spot.x;
    penY = spot.y;
    lastPoint = null;
    beforeLastPoint = null;
    segment = null;
  }

  function applyCanvasPixelSize() {
    var dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  }

  // Resizes the canvas to exactly newHeight, preserving whatever was
  // already drawn (resizing the backing buffer would otherwise wipe it).
  function setCanvasHeight(newHeight) {
    var snapshot = document.createElement("canvas");
    snapshot.width = canvas.width;
    snapshot.height = canvas.height;
    snapshot.getContext("2d").drawImage(canvas, 0, 0);

    height = newHeight;
    canvas.style.height = height + "px";
    applyCanvasPixelSize();

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(snapshot, 0, 0);
    ctx.restore();
  }

  // Tweens the canvas taller as the story reaches the bottom of it, so the
  // writing looks like it is gradually filling more of the page rather
  // than snapping open. The buffer is kept 1:1 with the displayed size at
  // every frame so the already-drawn lines never stretch or squash.
  function advanceGrow(now) {
    var t = Math.min(1, (now - growAnim.startTime) / growAnim.duration);
    var eased = easeInOut(t);
    setCanvasHeight(growAnim.from + (growAnim.to - growAnim.from) * eased);
    if (t >= 1) {
      growAnim = null;
    }
  }

  function resetCursor() {
    penX = MARGIN;
    penY = MARGIN + LINE_HEIGHT;
    lastPoint = null;
    beforeLastPoint = null;
    segment = null;
    wordStart = true;
  }

  function jumpToEmptySpot() {
    relocateForWord(peekWordWidth(lineIndex, charIndex) || BASE_SIZE * 3);
    wordStart = true;
  }

  // Moves the pen's target to the next line, without severing the pen's
  // last position -- the caller queues a (slow) lift to the new spot so
  // the carriage return reads as a deliberate glide, not a teleport.
  function advanceLine() {
    penX = MARGIN;
    penY += LINE_HEIGHT;
    if (penY > height - MARGIN) {
      if (height < MAX_HEIGHT) {
        growAnim = {
          from: height,
          to: Math.min(height + GROW_STEP, MAX_HEIGHT),
          startTime: performance.now(),
          duration: GROW_TWEEN_MS,
        };
      } else {
        ctx.clearRect(0, 0, width, height);
        initGrid();
        penY = MARGIN + LINE_HEIGHT;
      }
    }
  }

  function nextChar() {
    var line = STORY[lineIndex];
    if (line === undefined) {
      lineIndex = 0;
      charIndex = 0;
      return " ";
    }
    if (charIndex >= line.length) {
      lineIndex++;
      charIndex = 0;
      return "\n";
    }
    var ch = line.charAt(charIndex);
    charIndex++;
    return ch;
  }

  function fillQueueWithLetter(sloppy) {
    if (wordStart) {
      wordStart = false;
      var widthNeeded = peekWordWidth(lineIndex, charIndex);
      if (widthNeeded > 0 && !hasRoomForWord(penX, penY, widthNeeded)) {
        relocateForWord(widthNeeded);
      }
    }

    var ch = nextChar();

    if (ch === "\n") {
      advanceLine();
      queue.push({ x: penX, y: penY, draw: false, slow: true });
      wordStart = true;
      return;
    }

    if (ch === " ") {
      penX += SPACE_WIDTH * BASE_SIZE;
      queue.push({ x: penX, y: penY, draw: false });
      wordStart = true;
      return;
    }

    var glyph = GLYPHS[ch] || GLYPHS[ch.toLowerCase()];
    if (!glyph) {
      penX += SPACE_WIDTH * BASE_SIZE * 0.6;
      queue.push({ x: penX, y: penY, draw: false });
      return;
    }

    var size = sloppy ? BASE_SIZE * (0.85 + idleIntensity * 0.3 + Math.random() * 0.3) : BASE_SIZE;
    var slant = sloppy ? (Math.random() - 0.5) * (0.4 + idleIntensity * 0.6) : 0.18;
    var jitterAmt = sloppy ? 0.03 + idleIntensity * 0.12 : 0;
    var startX = penX;

    for (var i = 0; i < glyph.p.length; i++) {
      var lx = glyph.p[i][0];
      var ly = glyph.p[i][1];
      var jx = sloppy ? (Math.random() - 0.5) * jitterAmt : 0;
      var jy = sloppy ? (Math.random() - 0.5) * jitterAmt : 0;
      var sx = startX + (lx + jx + ly * slant) * size;
      var sy = penY + (ly + jy) * size;
      queue.push({ x: sx, y: sy, draw: true });
    }

    penX = startX + glyph.w * size + (sloppy ? (Math.random() - 0.5) * 4 : 1.5);

    if (penX > width - MARGIN - BASE_SIZE) {
      advanceLine();
      queue.push({ x: penX, y: penY, draw: false, slow: true });
    }
  }

  // Idle doodles: a handful of different squiggle shapes so the margin
  // scribbles don't all read as the same spiral. Picked with weights so
  // swirls stay the most common, waves and loops show up now and then.
  function fillQueueWithDoodle() {
    var roll = Math.random();
    if (roll < 0.45) {
      drawSpiralDoodle();
    } else if (roll < 0.65) {
      drawLoopDoodle();
    } else if (roll < 0.9) {
      drawWaveDoodle();
    } else {
      drawScribbleDoodle();
    }
  }

  function pushDoodlePoint(x, y, lift) {
    queue.push({ x: x, y: y, draw: !lift, swirl: true });
  }

  // An inward-or-outward spiral, winding either direction.
  function drawSpiralDoodle() {
    var cx = penX + (Math.random() - 0.5) * 36;
    var cy = penY - 10 + (Math.random() - 0.5) * 24;
    var turns = 1.5 + Math.random() * (2.5 + idleIntensity * 2.5);
    var maxRadius = 18 + Math.random() * (30 + idleIntensity * 40);
    var rotation = Math.random() * Math.PI * 2;
    var steps = 20 + Math.floor(Math.random() * 14);
    var spin = Math.random() < 0.5 ? 1 : -1;
    var inward = Math.random() < 0.5;

    pushDoodlePoint(cx, cy, true);
    for (var i = 1; i <= steps; i++) {
      var t = i / steps;
      var r = inward ? (1 - t) : t;
      var angle = rotation + spin * t * turns * Math.PI * 2;
      var radius = r * maxRadius;
      pushDoodlePoint(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius * 0.6, false);
    }
    penX += 20 + Math.random() * 20;
  }

  // A figure-eight / infinity-symbol loop (lemniscate of Gerono).
  function drawLoopDoodle() {
    var cx = penX + 10 + Math.random() * 14;
    var cy = penY - 8 + (Math.random() - 0.5) * 14;
    var amp = 14 + Math.random() * (14 + idleIntensity * 24);
    var tilt = (Math.random() - 0.5) * 0.6;
    var steps = 26 + Math.floor(Math.random() * 10);

    pushDoodlePoint(cx, cy, true);
    for (var i = 1; i <= steps; i++) {
      var t = (i / steps) * Math.PI * 2;
      var lx = amp * Math.sin(t);
      var ly = amp * 0.6 * Math.sin(t) * Math.cos(t);
      pushDoodlePoint(cx + lx * Math.cos(tilt) - ly * Math.sin(tilt), cy + lx * Math.sin(tilt) + ly * Math.cos(tilt), false);
    }
    penX = cx + amp + 10 + Math.random() * 10;
  }

  // A wavy, sine-like line drifting sideways across the margin.
  function drawWaveDoodle() {
    var startX = penX + (Math.random() - 0.5) * 10;
    var startY = penY - 6 + (Math.random() - 0.5) * 16;
    var waveLength = 60 + Math.random() * (60 + idleIntensity * 80);
    var amp = 6 + Math.random() * (10 + idleIntensity * 18);
    var cycles = 1.5 + Math.random() * 2;
    var steps = 24 + Math.floor(Math.random() * 16);
    var phase = Math.random() * Math.PI * 2;

    pushDoodlePoint(startX, startY, true);
    for (var i = 1; i <= steps; i++) {
      var t = i / steps;
      var x = startX + t * waveLength;
      var y = startY + Math.sin(phase + t * cycles * Math.PI * 2) * amp;
      pushDoodlePoint(x, y, false);
    }
    penX = startX + waveLength + 10;
  }

  // A tight, jittery scribble -- a small wobbling loop, like an aimless
  // knot of pen strokes rather than a clean curve.
  function drawScribbleDoodle() {
    var cx = penX + (Math.random() - 0.5) * 20;
    var cy = penY - 8 + (Math.random() - 0.5) * 14;
    var baseRadius = 8 + Math.random() * (6 + idleIntensity * 14);
    var wobble = 3 + idleIntensity * 8;
    var turns = 2.5 + Math.random() * 2;
    var steps = 28 + Math.floor(Math.random() * 16);
    var rotation = Math.random() * Math.PI * 2;

    pushDoodlePoint(cx, cy, true);
    for (var i = 1; i <= steps; i++) {
      var t = i / steps;
      var angle = rotation + t * turns * Math.PI * 2;
      var radius = baseRadius + Math.sin(t * Math.PI * 7) * wobble;
      pushDoodlePoint(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius * 0.7, false);
    }
    penX += 14 + Math.random() * 14;
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // Cubic Bezier point at parameter t, through control points built with a
  // Catmull-Rom style tangent so the curve flows smoothly through p1 (the
  // segment start) and p2 (the segment end), bending toward p0 and p3.
  function bezierPoint(p0, p1, p2, p3, t) {
    var c1x = p1.x + (p2.x - p0.x) / 6;
    var c1y = p1.y + (p2.y - p0.y) / 6;
    var c2x = p2.x - (p3.x - p1.x) / 6;
    var c2y = p2.y - (p3.y - p1.y) / 6;
    var mt = 1 - t;
    var a = mt * mt * mt;
    var b = 3 * mt * mt * t;
    var c = 3 * mt * t * t;
    var d = t * t * t;
    return {
      x: a * p1.x + b * c1x + c * c2x + d * p2.x,
      y: a * p1.y + b * c1y + c * c2y + d * p2.y,
    };
  }

  // Duration scales with how far this segment actually has to travel, so
  // the pen moves at a roughly constant speed instead of lurching between
  // the tightly- and widely-spaced anchors within a glyph.
  function segmentDuration(target, from) {
    if (!target.draw) {
      return target.slow ? NEWLINE_SEGMENT_MS : LIFT_SEGMENT_MS;
    }
    var dist = Math.hypot(target.x - from.x, target.y - from.y);
    var msPerPx = idle
      ? SLOPPY_MS_PER_PX_MIN + idleIntensity * (SLOPPY_MS_PER_PX_MAX - SLOPPY_MS_PER_PX_MIN)
      : STEADY_MS_PER_PX;
    return Math.min(MAX_DRAW_SEGMENT_MS, Math.max(MIN_DRAW_SEGMENT_MS, dist * msPerPx));
  }

  function startSegment(target, now) {
    var from = lastPoint || target;
    var before = beforeLastPoint || from;
    var after = queue.length > 0 ? queue[0] : target;
    if (target.draw) {
      markWritten(from.x, from.y);
      markWritten(target.x, target.y);
    }
    segment = {
      from: from,
      to: target,
      before: before,
      after: after,
      draw: target.draw,
      swirl: !!target.swirl,
      startTime: now,
      duration: segmentDuration(target, from),
      drawn: from,
    };
  }

  function advanceSegment(now) {
    var t = Math.min(1, (now - segment.startTime) / segment.duration);
    var eased = easeInOut(t);

    if (segment.draw) {
      var point = bezierPoint(segment.before, segment.from, segment.to, segment.after, eased);
      ctx.save();
      ctx.strokeStyle = segment.swirl ? "rgba(55, 48, 90, 0.5)" : idle ? "rgba(55, 48, 90, 0.6)" : "#2a2550";
      ctx.lineWidth = segment.swirl ? 2.2 : idle ? 1.4 : 1.8;
      ctx.beginPath();
      ctx.moveTo(segment.drawn.x, segment.drawn.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      ctx.restore();
      segment.drawn = point;
    }

    if (t >= 1) {
      beforeLastPoint = segment.from;
      lastPoint = segment.to;
      segment = null;
    }
  }

  function tick(now) {
    if (growAnim) {
      advanceGrow(now);
      rafId = window.requestAnimationFrame(tick);
      return;
    }

    if (!idle && now - lastMoveTime > IDLE_DELAY) {
      idle = true;
      idleSince = now;
    }
    idleIntensity = idle ? Math.min(1, (now - idleSince) / IDLE_RAMP_MS) : 0;

    if (!segment) {
      if (queue.length === 0) {
        if (idle && Math.random() < 0.1 + idleIntensity * 0.25) {
          fillQueueWithDoodle();
        } else {
          fillQueueWithLetter(idle);
        }
      }
      var next = queue.shift();
      if (next) {
        startSegment(next, now);
      }
    } else {
      advanceSegment(now);
    }

    rafId = window.requestAnimationFrame(tick);
  }

  function onMouseMove() {
    lastMoveTime = performance.now();
    if (idle) {
      idle = false;
      idleIntensity = 0;
      jumpToEmptySpot();
    }
  }

  window.addEventListener("resize", function () {
    resize();
  });

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("scroll", onMouseMove, { passive: true });
  document.addEventListener("touchstart", onMouseMove, { passive: true });
  document.addEventListener("touchmove", onMouseMove, { passive: true });

  resize();
  resetCursor();
  rafId = window.requestAnimationFrame(tick);
})();
