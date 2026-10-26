# 🏎️ Highway Rush — Car Racing Game

## 🚀 About the Project

**Highway Rush** is a 2D endless car racing game built using HTML, CSS, and JavaScript without using any game engine!

The goal of the game is simple: drive your car along a busy highway, avoid incoming traffic, and survive as long as possible to achieve the highest score.

This project was created for **Hack Club Mipmap**, a game development program that challenges participants to build games without using traditional game engines.

## 🎮 How to Play

1. Open the game in your web browser.
2. Click the **PLAY GAME** button or press **Space** to start.
3. Control your red car using the left and right arrow keys.
4. Avoid colliding with other vehicles.
5. Earn points by surviving and successfully dodging traffic.
6. As your score increases, the game becomes faster and more challenging.
7. If you crash into another car, the game ends.
8. Click **PLAY AGAIN** or press **Space** to restart.

### 🕹️ Game Controls

| Key | Action |
|---|---|
| ⬅️ Left Arrow | Move one lane left |
| ➡️ Right Arrow | Move one lane right |
| A | Move left |
| D | Move right |
| Space | Start or restart |
| P | Pause or resume |

The game also includes on-screen left and right buttons.

## ✨ Game Features

### 🚗 Player-Controlled Car
Control a red racing car and switch between three highway lanes to avoid traffic.

### 🛣️ Endless Scrolling Highway
The road continuously scrolls to create the feeling of driving forward.

### 🚙 Random Traffic Generation
Enemy vehicles appear in different lanes with randomly selected colors.

### 💥 Collision Detection
The game detects collisions between the player's car and enemy vehicles. A collision immediately ends the game.

### ⚡ Increasing Difficulty
The speed of the game gradually increases as the player's score rises, making survival more challenging.

### 🏆 Score System
Players earn points for surviving and receive bonus points when enemy vehicles pass them.

### 🥇 High-Score Tracking
The highest score is saved using the browser's local storage, allowing players to compete against their previous records.

### ⏸️ Pause and Resume
Players can pause and resume gameplay using the P key.

### 🔄 Restart System
After crashing, players can restart the game without refreshing the webpage.

## 🛠️ Technologies Used

This game was developed using three core web technologies:

- **HTML5:** Creates the structure of the game.
- **CSS3:** Styles the interface, buttons, menus, and background.
- **JavaScript:** Handles movement, animations, collisions, scoring, and gameplay.

The game uses the **HTML5 Canvas API** to draw the highway, cars, and other visual elements.

JavaScript's `requestAnimationFrame()` function is used to create smooth animations.

**No game engine or external game-development framework is required.**

## 📁 Project Structure

```text
Highway-Rush-Mipmap/
│
├── index.html       # Game interface and HTML structure
├── style.css        # Game styling and visual design
├── script.js        # Game logic, animations, and controls
└── README.md        # Project documentation
```

## 💻 How to Run Locally

You can run Highway Rush directly on your computer.

### Step 1
Download or clone this GitHub repository.

### Step 2
Open the project folder.

### Step 3
Locate the `index.html` file.

### Step 4
Double-click `index.html` to open it in your web browser.

### Step 5
Click **PLAY GAME** and start racing!

No installation, game engine, or additional software is required.

## 🧠 How the Game Works

The game uses a custom JavaScript game loop.

During each animation frame, JavaScript updates the positions of vehicles, moves the highway markings, checks for collisions, updates the score, and redraws the game.

The player can move between three lanes using keyboard input.

Enemy vehicles are generated at random intervals and move toward the bottom of the screen.

The game uses rectangle-based collision detection to determine whether the player's car has collided with another vehicle.

When a collision occurs, the game stops and displays the player's final score.

## 🤖 AI Assistance

AI assistance was used to help generate the initial HTML, CSS, and JavaScript code, explain the game's structure, and provide development guidance.

The project uses standard web technologies rather than a prebuilt game engine.

This README documents the initial implementation. Any additional improvements and changes will be recorded as development continues.

## 🔮 Future Improvements

Some features I would like to explore include:

- More detailed car graphics and animations.
- Engine sounds and crash effects.
- Nitro boost functionality.
- Collectible coins and power-ups.
- Multiple vehicle designs.
- Additional road environments.
- Improved menus and settings.
- New levels and challenges.

## ❤️ Acknowledgements

Thanks to **Hack Club** for encouraging young developers to experiment with programming, creativity, and game development.

Highway Rush was created as a learning project to explore how games can be built using JavaScript and the HTML5 Canvas API.

---



<img width="732" height="1032" alt="Screenshot 2026-10-26 162542" src="https://github.com/user-attachments/assets/b241b88e-1979-497c-942b-0199c0546056" />
<img width="758" height="1032" alt="Screenshot 2026-10-26 162554" src="https://github.com/user-attachments/assets/9a976246-d766-4056-b1c6-2019b5a8f788" />


### 🏁 Highway Rush

**Dodge the traffic. Survive the highway. Beat your high score!**
