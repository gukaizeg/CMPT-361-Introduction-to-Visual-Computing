var gl;
var program;
var vPositionLoc;
var vColorLoc;
var verticesbufferId;
var colorBufferId;

var pacmanBoundVBO;
var pacmanBoundColorVBO;

var ghostBoundVBO;
var ghostBoundColorVBO;

var powerupVBO
var powerupColorVBO

var dashSizeLoc;
var gapSizeLoc;

var offsetLoc;

var timerElement;
var scoreElement;
var messageElement;
var livesElement;

var gameTime = 60;
var time = gameTime;
var score = 0;
var enemyScore = 0;
var pacmanTopLimit = 3.2;
var pacmanBottomLimit = 0.0;
var pacmanLeftLimit = -1.3;
var pacmanRightLimit = 1.3;

var lives = 0;

var ghostTopLimits = [
    1.422224,
    1.77778
]

var ghostBottomLimits = [
    -1.77778,
    -1.422224
]

var ghostLeftLimit = -1.3;
var ghostRightLimit = 1.3;

var gameOver = false;
var victory = false;
var pauseGame = false;
var gameStarted = false;

var pointPerDot = 100;

var lostPointsWhenCatched = 500;

var frameCount = 0

var updateInterval = 1000;
var ghostUpdateInterval = 800;


var game_border = [
    vec2(1.5, 1.8),
    vec2(1.5, -1.8),
    vec2(-1.5, -1.8),
    vec2(-1.5, 1.8)
];


var bordercolors = [
    vec4(0.7, 0.7, 0.7, 0.7), 
    vec4(0.7, 0.7, 0.7, 0.7),
    vec4(0.7, 0.7, 0.7, 0.7),
    vec4(0.7, 0.7, 0.7, 0.7)
];


var smallRectangles = [

    vec2(-1.1 , 1.4 ),
    vec2(-0.15 , 1.4 ),
    vec2(-0.15 , 0.8 ),
    vec2(-1.1 , 0.8 ),
     
    vec2(0.15 , 1.4 ),
    vec2(1.1 , 1.4 ),
    vec2(1.1 , 0.8 ),
    vec2(0.15 , 0.8 ),
    
    vec2(-1.1 , -0.8 ),
    vec2(-0.15 , -0.8 ),
    vec2(-0.15 , -1.4 ),
    vec2(-1.1 , -1.4 ),
    
    vec2(0.15 , -0.8 ),
    vec2(1.1 , -0.8 ),
    vec2(1.1 , -1.4 ),
    vec2(0.15 , -1.4 ), 
];

var smallRectanglesBounds = [
    [
    vec2(-1.1, 1.4),
    vec2(-0.15, 1.4),
    vec2(-0.15, 0.8),
    vec2(-1.1, 0.8)
    ],
    [
    vec2(0.15, 1.4),
    vec2(1.1, 1.4),
    vec2(1.1, 0.8),
    vec2(0.15, 0.8)
    ],
    [
    vec2(-1.1, -0.8),
    vec2(-0.15, -0.8),
    vec2(-0.15, -1.4),
    vec2(-1.1, -1.4)
    ],
    [
    vec2(0.15, -0.8),
    vec2(1.1, -0.8),
    vec2(1.1, -1.4),
    vec2(0.15, -1.4)
    ]
]


var smallRectangleColors = [

    vec4(0.0, 0.6, 0.1, 1.0), vec4(0.0, 0.6, 0.1, 1.0), vec4(0.0, 0.6, 0.1, 1.0), vec4(0.0, 0.6, 0.1, 1.0), //green
    vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), //red
    vec4(0.0, 0.9, 0.95, 1.0), vec4(0.0, 0.9, 0.95, 1.0), vec4(0.0, 0.9, 0.95, 1.0), vec4(0.0, 0.9, 0.95, 1.0)// 青色
]


var smallRectangles_middle_left_and_right=[

    vec2(-1.1 , 0.4 ),
    vec2(-0.8 , 0.4 ),
    vec2(-0.8 , -0.4 ),
    vec2(-1.1 , -0.4 ),

    vec2(0.8 , 0.4 ),
    vec2(1.1 , 0.4 ),
    vec2(1.1 , -0.4 ),
    vec2(0.8 , -0.4 )
]

var smallRectangles_middle_left_and_right_bounds = 
[
    [
        vec2(-1.1, 0.4),
        vec2(-0.8, 0.4),
        vec2(-0.8, -0.4),
        vec2(-1.1, -0.4)
    ],
    [
        vec2(0.8, 0.4),
        vec2(1.1, 0.4),
        vec2(1.1, -0.4),
        vec2(0.8, -0.4)
    ]
]


var smallRectangles_middle=[
    vec2(-0.2,0.4),
    vec2(0.2,0.4),
    vec2(0.2,-0.4),
    vec2(-0.2,-0.4)
]

var smallRectangles_middle_bounds = makeRect(smallRectangles_middle);


var edge_colors =[

    vec4(0.0, 0.0, 1.0, 1.0),  vec4(0.0, 0.0, 1.0, 1.0),  vec4(0.0, 0.0, 1.0, 1.0),  vec4(0.0, 0.0, 1.0, 1.0)

]

var pacman = [
    vec2(0, -1.5),
    vec2(-0.075, -1.65),
    vec2(0.075, -1.65),
]

var pacmanPosition = [0.0, 0.0, 0.0, 1.0]

var pacmanBound = [
    vec2(-0.075, -1.5),
    vec2( 0.075, -1.5),
    vec2( 0.075, -1.65),
    vec2(-0.075, -1.65),
    vec2(-0.075, -1.5),
]

var pacmanBoundColor = 
[
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0)
]

var powerup = {}

var powerupColor =
[
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0)
]

var ghost =[
    vec2(-0.075, 0.3),
    vec2( 0.075, 0.3),
    vec2( 0.075, 0.15),
    vec2(-0.075, 0.15),

    vec2(-0.075, -0.15),
    vec2( 0.075, -0.15),
    vec2( 0.075, -0.3),
    vec2(-0.075, -0.3),
]

var ghostPositions = [
    vec4(0.0, 0.0, 0.0, 1.0),
    vec4(0.0, 0.0, 0.0, 1.0)
]

var ghostBounds = [
    [
        vec2(-0.075, 0.3),
        vec2( 0.075, 0.3),
        vec2( 0.075, 0.15),
        vec2(-0.075, 0.15),
        vec2(-0.075, 0.3)
    ],
    [
        vec2(-0.075, -0.15),
        vec2( 0.075, -0.15),
        vec2( 0.075, -0.3),
        vec2(-0.075, -0.3),
        vec2(-0.075, -0.15)
    ]
]

function makeRect(bound)
{
    let rect = {};

    rect.left = bound[0][0];
    rect.right = bound[1][0];
    rect.top = bound[0][1];
    rect.bottom = bound[2][1];

    return rect;
}

var pacmanCollidars = [
    makeRect(smallRectangles_middle),
    makeRect(smallRectangles_middle_left_and_right_bounds[0]),
    makeRect(smallRectangles_middle_left_and_right_bounds[1]),
    makeRect(smallRectanglesBounds[0]),
    makeRect(smallRectanglesBounds[1]),
    makeRect(smallRectanglesBounds[2]),
    makeRect(smallRectanglesBounds[3])
]

var ghostCollidars = [
    makeRect(smallRectangles_middle_left_and_right_bounds[0]),
    makeRect(smallRectangles_middle_left_and_right_bounds[1]),
    makeRect(smallRectanglesBounds[0]),
    makeRect(smallRectanglesBounds[1]),
    makeRect(smallRectanglesBounds[2]),
    makeRect(smallRectanglesBounds[3])
]

var pac_dot_Vertices = [];
var pac_dot_Colors = Array(90).fill(vec4(0.6, 0.6, 0.2, 1.0));

var pacDots = []

var rows = 10;
var columns = 9;

var x_start = -1.3;
var y_start = 1.6;

var x_spacing = parseFloat(((1.3 - (-1.3)) / (columns - 1)).toPrecision(6));
var y_spacing = parseFloat(((1.6 - (-1.6)) / (rows - 1)).toPrecision(6));

var EPSILON = 0.0001;

function rectIntersection(rect1, rect2)
{
    let leftRight = (rect1.left > rect2.right) ||
                    (rect1.right < rect2.left);

    let topBottom = (rect1.top < rect2.bottom) ||
                    (rect1.bottom > rect2.top);

    return !(leftRight || topBottom);
}


function pointInRect(rect, point)
{
    let x = point[0];
    let y = point[1];
    let result1 = x > rect.left;
    let result2 = x < rect.right;
    let result3 = y > rect.bottom;
    let result4 = y < rect.top;

    return result1 && result2 && result3 && result4;
}


function updatePacDots()
{
    if (pacDotCount == 0 && score > 0)
    {
        victory = true;
        score += pointPerDot * time;
        messageElement.innerText = 'You win!';
        return;
    }

    for (let i = 0; i < pacDots.length; i++)
    {
        if (!pacDots[i].alive) continue;

        
        if (pointInRect(makeRect(pacmanBound), pacDots[i].position))
        {
            pacDots[i].alive = false;
            score += pointPerDot;
            scoreElement.innerText = 'Score: ' + score;
            pacDotCount--;
        }

        
        for (let j = 0; j < ghostBounds.length; j++)
        {
            if (pointInRect(makeRect(ghostBounds[j]), pacDots[i].position)) {
                pacDots[i].alive = false;
                score -= pointPerDot;
                scoreElement.innerText = 'Score: ' + score;
                if (score <= 0)
                {
                    gameOver = true;
                    messageElement.innerText = 'Game Over!';
                }
                pacDotCount--;
            }
        }
    }
}


function randomInRange(min, max)
{
    return Math.round(Math.random() * (max - min) + min);
}


function updateGhosts()
{
    for (let i = 0; i < ghostPositions.length; i++)
    {
        let direction = randomInRange(0, 3);

        // direction = 1;

        let ghostPosition = ghostPositions[i];
        let ghostBound = ghostBounds[i];

        switch (direction)
        {
            case 0:     
                ghostPosition[1] += y_spacing;

                ghostBound[0][1] += y_spacing;
                ghostBound[1][1] += y_spacing;
                ghostBound[2][1] += y_spacing;
                ghostBound[3][1] += y_spacing;
                ghostBound[4][1] += y_spacing;

                for (let i = 0; i < ghostCollidars.length; i++) 
                {
                    if (rectIntersection(ghostCollidars[i], makeRect(ghostBound))) 
                    {
                        ghostPosition[1] -= y_spacing;

                        ghostBound[0][1] -= y_spacing;
                        ghostBound[1][1] -= y_spacing;
                        ghostBound[2][1] -= y_spacing;
                        ghostBound[3][1] -= y_spacing;
                        ghostBound[4][1] += y_spacing;

                        console.log("collision");
                    }
                }

                if (ghostPosition[1] > ghostTopLimits[i] + EPSILON) 
                {
                    ghostPosition[1] = ghostTopLimits[i];

                    ghostBound[0][1] -= y_spacing;
                    ghostBound[1][1] -= y_spacing;
                    ghostBound[2][1] -= y_spacing;
                    ghostBound[3][1] -= y_spacing;
                    ghostBound[4][1] -= y_spacing;
                }

                // console.log(ghostPosition[1]);
            break;
        case 1:     
            ghostPosition[1] -= y_spacing;

            ghostBound[0][1] -= y_spacing;
            ghostBound[1][1] -= y_spacing;
            ghostBound[2][1] -= y_spacing;
            ghostBound[3][1] -= y_spacing;
            ghostBound[4][1] -= y_spacing;

            for (let i = 0; i < ghostCollidars.length; i++) 
            {
                if (rectIntersection(ghostCollidars[i], makeRect(ghostBound))) 
                {
                    ghostPosition[1] += y_spacing;

                    ghostBound[0][1] += y_spacing;
                    ghostBound[1][1] += y_spacing;
                    ghostBound[2][1] += y_spacing;
                    ghostBound[3][1] += y_spacing;
                    ghostBound[4][1] += y_spacing;

                    console.log("collision");
                }
            }

            if (ghostPosition[1] < ghostBottomLimits[i] - EPSILON) 
            {
                ghostPosition[1] = ghostBottomLimits[i];

                ghostBound[0][1] += y_spacing;
                ghostBound[1][1] += y_spacing;
                ghostBound[2][1] += y_spacing;
                ghostBound[3][1] += y_spacing;
                ghostBound[4][1] += y_spacing;
            }

            // console.log(ghostPosition[1]);
            break
        case 2:     
            ghostPosition[0] -= x_spacing;

            ghostBound[0][0] -= x_spacing;
            ghostBound[1][0] -= x_spacing;
            ghostBound[2][0] -= x_spacing;
            ghostBound[3][0] -= x_spacing;
            ghostBound[4][0] -= x_spacing;

            for (let i = 0; i < ghostCollidars.length; i++) 
            {
                if (rectIntersection(ghostCollidars[i], makeRect(ghostBound))) 
                {
                    ghostPosition[0] += x_spacing;

                    ghostBound[0][0] += x_spacing;
                    ghostBound[1][0] += x_spacing;
                    ghostBound[2][0] += x_spacing;
                    ghostBound[3][0] += x_spacing;
                    ghostBound[4][0] += x_spacing;

                    console.log("collision");
                }
            }

            if (ghostPosition[0] < ghostLeftLimit - EPSILON) 
            {
                ghostPosition[0] = ghostLeftLimit;

                ghostBound[0][0] += x_spacing;
                ghostBound[1][0] += x_spacing;
                ghostBound[2][0] += x_spacing;
                ghostBound[3][0] += x_spacing;
                ghostBound[4][0] += x_spacing;
            }

            // console.log(ghostPosition[0]);
            break;
        case 3:     
            ghostPosition[0] += x_spacing;

            ghostBound[0][0] += x_spacing;
            ghostBound[1][0] += x_spacing;
            ghostBound[2][0] += x_spacing;
            ghostBound[3][0] += x_spacing;
            ghostBound[4][0] += x_spacing;

            for (let i = 0; i < ghostCollidars.length; i++) 
            {
                if (rectIntersection(ghostCollidars[i], makeRect(ghostBound)))
                {
                    ghostPosition[0] -= x_spacing;

                    ghostBound[0][0] -= x_spacing;
                    ghostBound[1][0] -= x_spacing;
                    ghostBound[2][0] -= x_spacing;
                    ghostBound[3][0] -= x_spacing;
                    ghostBound[4][0] -= x_spacing;

                    console.log("collision");
                }
            }

            if (ghostPosition[0] > ghostRightLimit + EPSILON) 
            {
                ghostPosition[0] = ghostRightLimit;

                ghostBound[0][0] -= x_spacing;
                ghostBound[1][0] -= x_spacing;
                ghostBound[2][0] -= x_spacing;
                ghostBound[3][0] -= x_spacing;
                ghostBound[4][0] -= x_spacing;
            }

            // console.log(ghostPosition[0]);
            break;
        }
    }
}


function updateGhostCollision()
{
    for (let i = 0; i < ghostBounds.length; i++)
    {
        if (rectIntersection(makeRect(ghostBounds[i]), makeRect(pacmanBound))) 
        {
            ghostPositions[i] = [0.0, 0.0, 0.0, 1.0];

            if (i == 0) 
            {

                ghostBounds[i] = [vec2(-0.075, 0.3),
                vec2(0.075, 0.3),
                vec2(0.075, 0.15),
                vec2(-0.075, 0.15),
                vec2(-0.075, 0.3)]
            }
            else if (i == 1) 
            {
                ghostBounds[i] = [vec2(-0.075, -0.15),
                vec2(0.075, -0.15),
                vec2(0.075, -0.3),
                vec2(-0.075, -0.3),
                vec2(-0.075, -0.15)]
            }

            if (lives > 0) 
            {
                lives--;
                livesElement.innerText = 'Lives:' + lives;
            }
            else 
            {
                score -= lostPointsWhenCatched;
                scoreElement.innerText = 'Score:' + score;
            }

            if (score <= 0) 
            {
                gameOver = true;
                messageElement.innerText = 'Game Over!';
            }
        }
    }
}

for (var i = 0; i < rows; i++) 
{
    for (var j = 0; j < columns; j++) 
    {
        pac_dot_Vertices.push(vec2(x_start + j * x_spacing, y_start - i * y_spacing)); 
        var pacDot = {};
        pacDot.position = vec2(x_start + j * x_spacing, y_start - i * y_spacing);
        pacDot.alive = true;
        pacDots.push(pacDot);
    }
}

var indicesToRemove = [10];
indicesToRemove = indicesToRemove.concat([10,11,14,15,16,19,20,21,23,24,25,37,40,43,46,49,52,64,65,66,68,69,70,73,74,75,77,78,79,85]);  // 添加索引来删除连续的元素


for (var i = indicesToRemove.length - 1; i >= 0; i--) 
{
    pac_dot_Vertices.splice(indicesToRemove[i], 1);
    pac_dot_Colors.splice(indicesToRemove[i], 1);
    pacDots.splice(indicesToRemove[i], 1);
}

var pacDotCount = pacDots.length;

function resetGame()
{
    pacDots = [];

    for (var i = 0; i < rows; i++) 
    {
        for (var j = 0; j < columns; j++) 
        {
            var pacDot = {};
            pacDot.position = vec2(x_start + j * x_spacing, y_start - i * y_spacing);
            pacDot.alive = true;
            pacDots.push(pacDot);
        }
    }

    for (var i = indicesToRemove.length - 1; i >= 0; i--) 
    {
        pacDots.splice(indicesToRemove[i], 1);
    }

    pacDotCount = pacDots.length;

    pacmanPosition = [0.0, 0.0, 0.0, 1.0]

    pacmanBound = 
    [
        vec2(-0.075, -1.5),
        vec2( 0.075, -1.5),
        vec2( 0.075, -1.65),
        vec2(-0.075, -1.65),
        vec2(-0.075, -1.5)
    ]

    ghostPositions = [
        vec4(0.0, 0.0, 0.0, 1.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    ]

    ghostBounds = [
        [
            vec2(-0.075, 0.3),
            vec2( 0.075, 0.3),
            vec2( 0.075, 0.15),
            vec2(-0.075, 0.15),
            vec2(-0.075, 0.3)
        ],
        [
            vec2(-0.075, -0.15),
            vec2( 0.075, -0.15),
            vec2( 0.075, -0.3),
            vec2(-0.075, -0.3),
            vec2(-0.075, -0.15)
        ]
    ]

    time = gameTime;
    score = 0;
    enemyScore = 0;
    gameOver = false;
    victory = false;
    pauseGame = false;
    gameStarted = false;
    lives = 0;
    frameCount = 0;

    timerElement.innerText = 'Time:' + time;
    scoreElement.innerText = 'Score:' + score;
    messageElement.innerText = 'Pres S to start game';
    livesElement.innerText = 'Lives:' + lives;
}

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

  
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

 
    vPositionLoc = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPositionLoc);

 
    vColorLoc = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColorLoc);

    dashSizeLoc = gl.getUniformLocation(program, "dashSize");
    gapSizeLoc = gl.getUniformLocation(program, "gapSize");

    useDashedLineLoc = gl.getUniformLocation(program, "useDashedLine");
    useCircularPointLocation = gl.getUniformLocation(program, "useCircularPoint");

    offsetLoc = gl.getUniformLocation(program, "offset");


    verticesbufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(game_border.concat(smallRectangles,smallRectangles_middle_left_and_right,smallRectangles_middle,pacman,ghost,pac_dot_Vertices)), gl.STATIC_DRAW);

    colorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(bordercolors.concat(smallRectangleColors,edge_colors,pac_dot_Colors)), gl.STATIC_DRAW);

    pacmanBoundVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pacmanBoundVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pacmanBound), gl.STATIC_DRAW);

    pacmanBoundColorVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pacmanBoundColorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pacmanBoundColor), gl.STATIC_DRAW);

    ghostBoundVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ghostBoundVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ghostBounds[1]), gl.STATIC_DRAW);

    ghostBoundColorVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ghostBoundColorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pacmanBoundColor), gl.STATIC_DRAW);

    powerup.position =
    [
        vec2(pac_dot_Vertices[0][0] - 0.075, pac_dot_Vertices[0][1] + 0.075),
        vec2(pac_dot_Vertices[0][0] + 0.075, pac_dot_Vertices[0][1] + 0.075),
        vec2(pac_dot_Vertices[0][0] + 0.075, pac_dot_Vertices[0][1] - 0.075),
        vec2(pac_dot_Vertices[0][0] - 0.075, pac_dot_Vertices[0][1] - 0.075)
    ]

    powerupVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, powerupVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(powerup.position), gl.STATIC_DRAW);

    powerupColorVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, powerupColorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(powerupColor), gl.STATIC_DRAW);

    document.addEventListener("keydown", function (event) 
    {
        switch (event.code) 
        {
            case 'ArrowLeft': 
                if (pauseGame || !gameStarted || gameOver || victory) return;

        
                pacmanPosition[0] -= x_spacing;

                pacmanBound[0][0] -= x_spacing;
                pacmanBound[1][0] -= x_spacing;
                pacmanBound[2][0] -= x_spacing;
                pacmanBound[3][0] -= x_spacing;
                pacmanBound[4][0] -= x_spacing;

                for (let i = 0; i < pacmanCollidars.length; i++)
                {
                    if (rectIntersection(pacmanCollidars[i], makeRect(pacmanBound)))
                    {
                        pacmanPosition[0] += x_spacing;

                        pacmanBound[0][0] += x_spacing;
                        pacmanBound[1][0] += x_spacing;
                        pacmanBound[2][0] += x_spacing;
                        pacmanBound[3][0] += x_spacing;
                        pacmanBound[4][0] += x_spacing;

                        console.log("collision");
                    }
                }
                
                if (pacmanPosition[0] < pacmanLeftLimit - EPSILON)
                {
                    pacmanPosition[0] = pacmanLeftLimit;

                    pacmanBound[0][0] += x_spacing;
                    pacmanBound[1][0] += x_spacing;
                    pacmanBound[2][0] += x_spacing;
                    pacmanBound[3][0] += x_spacing;
                    pacmanBound[4][0] += x_spacing;
                }

                updatePacDots();

                // console.log(pacmanPosition[0]);
                break;
            case 'ArrowUp': 
                if (pauseGame || !gameStarted || gameOver || victory) return;

          
                pacmanPosition[1] += y_spacing;

                pacmanBound[0][1] += y_spacing;
                pacmanBound[1][1] += y_spacing;
                pacmanBound[2][1] += y_spacing;
                pacmanBound[3][1] += y_spacing;
                pacmanBound[4][1] += y_spacing;

                for (let i = 0; i < pacmanCollidars.length; i++)
                {
                    if (rectIntersection(pacmanCollidars[i], makeRect(pacmanBound)))
                    {
                        pacmanPosition[1] -= y_spacing;

                        pacmanBound[0][1] -= y_spacing;
                        pacmanBound[1][1] -= y_spacing;
                        pacmanBound[2][1] -= y_spacing;
                        pacmanBound[3][1] -= y_spacing;
                        pacmanBound[4][1] -= y_spacing;

                        console.log("collision");
                    }
                }

                if (pacmanPosition[1] > pacmanTopLimit + EPSILON)
                {
                    pacmanPosition[1] = pacmanTopLimit;

                    pacmanBound[0][1] -= y_spacing;
                    pacmanBound[1][1] -= y_spacing;
                    pacmanBound[2][1] -= y_spacing;
                    pacmanBound[3][1] -= y_spacing;
                    pacmanBound[4][1] -= y_spacing;
                }

                updatePacDots();

                // console.log(pacmanPosition[1]);
                break;
            case 'ArrowRight': 
                if (pauseGame || !gameStarted || gameOver || victory) return;

              
                pacmanPosition[0] += x_spacing;

                pacmanBound[0][0] += x_spacing;
                pacmanBound[1][0] += x_spacing;
                pacmanBound[2][0] += x_spacing;
                pacmanBound[3][0] += x_spacing;
                pacmanBound[4][0] += x_spacing;

                for (let i = 0; i < pacmanCollidars.length; i++)
                {
                    if (rectIntersection(pacmanCollidars[i], makeRect(pacmanBound)))
                    {
                        pacmanPosition[0] -= x_spacing;

                        pacmanBound[0][0] -= x_spacing;
                        pacmanBound[1][0] -= x_spacing;
                        pacmanBound[2][0] -= x_spacing;
                        pacmanBound[3][0] -= x_spacing;
                        pacmanBound[4][0] -= x_spacing;
                        
                        console.log("collision");
                    }
                }
                
                if (pacmanPosition[0] > pacmanRightLimit + EPSILON)
                {
                    pacmanPosition[0] = pacmanRightLimit;

                    pacmanBound[0][0] -= x_spacing;
                    pacmanBound[1][0] -= x_spacing;
                    pacmanBound[2][0] -= x_spacing;
                    pacmanBound[3][0] -= x_spacing;
                    pacmanBound[4][0] -= x_spacing;
                }

                updatePacDots();

                // console.log(pacmanPosition[0]);
                break;
            case 'ArrowDown': 
                if (pauseGame || !gameStarted || gameOver || victory) return;

              
                pacmanPosition[1] -= y_spacing;

                pacmanBound[0][1] -= y_spacing;
                pacmanBound[1][1] -= y_spacing;
                pacmanBound[2][1] -= y_spacing;
                pacmanBound[3][1] -= y_spacing;
                pacmanBound[4][1] -= y_spacing;
                
                // console.log(pacmanPosition[1]);

                for (let i = 0; i < pacmanCollidars.length; i++)
                {
                    if (rectIntersection(pacmanCollidars[i], makeRect(pacmanBound)))
                    {
                        pacmanPosition[1] += y_spacing;

                        pacmanBound[0][1] += y_spacing;
                        pacmanBound[1][1] += y_spacing;
                        pacmanBound[2][1] += y_spacing;
                        pacmanBound[3][1] += y_spacing;
                        pacmanBound[4][1] += y_spacing;

                        console.log("collision");
                    }
                }

                if (pacmanPosition[1] < pacmanBottomLimit - EPSILON)
                {
                    pacmanPosition[1] = pacmanBottomLimit;

                    pacmanBound[0][1] += y_spacing;
                    pacmanBound[1][1] += y_spacing;
                    pacmanBound[2][1] += y_spacing;
                    pacmanBound[3][1] += y_spacing;
                    pacmanBound[4][1] += y_spacing;
                }

                updatePacDots();

                break;
            case 'KeyS':
                gameStarted = true;
                messageElement.innerText = 'Playing';

                if (gameOver)
                {
                    resetGame();
                }
                break;
            case 'KeyP':
                pauseGame = true;
                messageElement.innerText = 'Paused';
                break;
            case 'KeyR':
                if (pauseGame)
                {
                    pauseGame = false;
                    messageElement.innerText = 'Playing';
                }
                break;
            case 'KeyQ':
                ghostPositions[1] = [0.0, 0.0, 0.0, 1.0]
                ghostBounds[1] = [vec2(-0.075, -0.15),
                                  vec2(0.075, -0.15),
                                  vec2(0.075, -0.3),
                                  vec2(-0.075, -0.3),
                                  vec2(-0.075, -0.15)]
                break;
        }

      
        if (powerup.alive)
        {
            if (rectIntersection(makeRect(powerup.position), makeRect(pacmanBound)))
            {
                powerup.alive = false;
                console.log("powerup");
                lives++;
                livesElement.innerText = 'Lives:' + lives;
            }
        }

        if (event.shiftKey && event.code === 'KeyR')
        {
            resetGame();
            console.log("Reset Game");
        }
    });

    timerElement = document.getElementById('timer');
    scoreElement = document.getElementById('score');
    messageElement = document.getElementById('message');
    livesElement = document.getElementById('lives');

    // Update the HUD every second
    setInterval(function () 
    {
        if (!gameStarted || pauseGame || gameOver || victory) return;

        // Decrease the timer and update the timer element
        time--;
        timerElement.innerText = 'Time: ' + time;

        if (time <= 0 && pacDotCount > 0)
        {
            gameOver = true;
            messageElement.innerText = "Game Over!";
        }

        // For this example, let's just increase the score every second
    }, updateInterval);

    setInterval(function () 
    {
        if (!gameStarted || pauseGame || gameOver || victory) return;

        if (frameCount > 3)
        {
            update();
            updatePacDots();
        }

        if (frameCount % 10 == 0) {
            let positionIndex = randomInRange(0, pac_dot_Vertices.length - 1);

            powerup.position =
            [
                vec2(pac_dot_Vertices[positionIndex][0] - 0.075, pac_dot_Vertices[positionIndex][1] + 0.075),
                vec2(pac_dot_Vertices[positionIndex][0] + 0.075, pac_dot_Vertices[positionIndex][1] + 0.075),
                vec2(pac_dot_Vertices[positionIndex][0] + 0.075, pac_dot_Vertices[positionIndex][1] - 0.075),
                vec2(pac_dot_Vertices[positionIndex][0] - 0.075, pac_dot_Vertices[positionIndex][1] - 0.075)
            ]
            powerup.alive = true;
        }

        frameCount++;

        // For this example, let's just increase the score every second
    }, ghostUpdateInterval);

    requestAnimationFrame(render);
};

function update()
{
    updateGhosts();
}

function render() 
{
    updateGhostCollision();

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform4fv(offsetLoc, [0.0, 0.0, 0.0, 1.0]);

    
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, (game_border.length + smallRectangleColors.length)*4*Float32Array.BYTES_PER_ELEMENT);
    gl.drawArrays(gl.LINE_LOOP, 0, 4);


    for (var i = 0; i < 4; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
        gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, (i+1)*8*Float32Array.BYTES_PER_ELEMENT);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
        gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 16*Float32Array.BYTES_PER_ELEMENT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

        gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, (game_border.length + smallRectangleColors.length)*4*Float32Array.BYTES_PER_ELEMENT);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }
    

    for (var i = 0; i < 2; i++)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
        gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, (40+i*8)*Float32Array.BYTES_PER_ELEMENT);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
        gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 16*Float32Array.BYTES_PER_ELEMENT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        
        gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, (game_border.length + smallRectangleColors.length)*4*Float32Array.BYTES_PER_ELEMENT);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }

    gl.uniform1f(dashSizeLoc, 10.0);
    gl.uniform1f(gapSizeLoc, 10.0);
    gl.uniform1f(useDashedLineLoc, 1.0);

  
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 56*Float32Array.BYTES_PER_ELEMENT);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, (game_border.length + smallRectangleColors.length)*4*Float32Array.BYTES_PER_ELEMENT);
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    

    gl.uniform4fv(offsetLoc, pacmanPosition);

    gl.uniform1f(useDashedLineLoc, 0.0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 64*Float32Array.BYTES_PER_ELEMENT);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, (game_border.length + smallRectangleColors.length)*4*Float32Array.BYTES_PER_ELEMENT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.uniform4fv(offsetLoc, [0.0, 0.0, 0.0, 1.0]);

    pacmanBoundVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pacmanBoundVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pacmanBound), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pacmanBoundColorVBO);
    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 0);

    // gl.drawArrays(gl.LINE_STRIP, 0, 5);

    if (powerup.alive)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, powerupVBO);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(powerup.position), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, powerupColorVBO);
        gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    gl.uniform4fv(offsetLoc, [0.0, 0.0, 0.0, 1.0]);


    for (var i = 0; i < 2; i++)
    {
        gl.uniform4fv(offsetLoc, ghostPositions[i]);

        gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
        gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, (70+i*8)*Float32Array.BYTES_PER_ELEMENT);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
        gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0,  (32+i*16)*Float32Array.BYTES_PER_ELEMENT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

 
    gl.uniform4fv(offsetLoc, [0.0, 0.0, 0.0, 1.0]);

    ghostBoundVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ghostBoundVBO);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ghostBounds[1]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pacmanBoundColorVBO);
    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 0);

    // gl.drawArrays(gl.LINE_STRIP, 0, 5);

    gl.uniform4fv(offsetLoc, [0.0, 0.0, 0.0, 1.0]);

   
    gl.uniform1f(useCircularPointLocation, 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesbufferId);
    
    gl.vertexAttribPointer(vPositionLoc, 2, gl.FLOAT, false, 0, 86 * Float32Array.BYTES_PER_ELEMENT);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);

    gl.vertexAttribPointer(vColorLoc, 4, gl.FLOAT, false, 0, 80 * Float32Array.BYTES_PER_ELEMENT);

    for (let i = 0; i < pacDots.length; i++)
    {
        if (pacDots[i].alive)
        {
            gl.drawArrays(gl.POINTS, i, 1);
        }
    }

    requestAnimationFrame(render);
}