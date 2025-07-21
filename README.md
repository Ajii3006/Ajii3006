# 🎯 Attacking Depression - 3D Therapy Game

A powerful therapeutic 3D game designed to help transform negative thoughts and emotions into strength. Upload images from your mobile gallery and attack them in an immersive 3D environment with realistic sound effects and custom background music.

## 🌟 Features

### Core Gameplay
- **3D Shooting Environment**: Immersive 3D space with realistic lighting and particle effects
- **Mobile Gallery Integration**: Upload any image from your phone's gallery as targets
- **Custom Audio Support**: Load your own background music from device storage
- **Realistic Sound Effects**: Authentic gunshot sounds and audio feedback
- **Progressive Difficulty**: Targets get stronger as you progress

### Therapeutic Elements
- **Depression-themed Targets**: Default targets include "ANXIETY", "SADNESS", "FEAR", "DOUBT", "WORRY"
- **Positive Reinforcement**: Motivational messages and health boosts for progress
- **Visual Feedback**: Explosive particle effects and hit indicators
- **Empowerment Mechanics**: Score system that rewards overcoming challenges

### Mobile Optimized
- **Touch Controls**: Tap anywhere to shoot, optimized for mobile devices
- **Responsive Design**: Works perfectly on all screen sizes
- **PWA Support**: Install as an app on your mobile device
- **Offline Capable**: Play without internet connection

## 🚀 How to Play

### Getting Started
1. **Open the Game**: Load `index.html` in your mobile browser
2. **Start Therapy**: Tap "🎯 START THERAPY" to begin
3. **Upload Image** (Optional): 
   - Tap the 📷 camera button
   - Select any image from your mobile gallery
   - The image becomes a target with crosshairs overlay

### Controls
- **Shooting**: Tap anywhere on the screen or use the 🔥 fire button
- **Upload Image**: 📷 button opens your mobile gallery
- **Background Music**: 🎵 button loads audio files from your device
- **Crosshair**: Aim with the white crosshair in the center

### Game Mechanics
- **Health System**: Maintain your mental health bar
- **Scoring**: Earn points for each hit (50 points for uploaded images, 25 for default targets)
- **Target Destruction**: Destroy targets completely for bonus points
- **Progressive Healing**: Every 5 hits restores health and shows encouragement

## 🎮 Game Features Breakdown

### 3D Environment
```javascript
// The game creates an immersive 3D space with:
- Dynamic lighting system with point lights
- Floating particle backgrounds
- Realistic shadows and reflections
- Smooth camera movements and shake effects
```

### Audio System
```javascript
// Advanced audio features:
- Web Audio API for realistic gunshot synthesis
- Background music support for personal audio files
- 3D spatial audio effects
- Volume controls and audio optimization
```

### Mobile Gallery Access
```javascript
// Secure image upload with:
- HTML5 File API for gallery access
- Canvas processing for image optimization
- Automatic crosshair overlay generation
- Memory management for large images
```

## 🛠 Technical Requirements

### Browser Support
- **Mobile Browsers**: Chrome, Safari, Firefox, Edge (latest versions)
- **Desktop**: All modern browsers with WebGL support
- **Required APIs**: WebGL, File API, Web Audio API (optional)

### Permissions
- **Camera/Gallery**: Required for image upload feature
- **Audio**: Optional for background music
- **Fullscreen**: Enhanced gaming experience

### Performance
- **Minimum**: Mobile device with WebGL support
- **Recommended**: 2GB RAM, modern GPU
- **Optimal**: Latest smartphones with hardware acceleration

## 📱 Installation Instructions

### As a Web App
1. Open the game in your mobile browser
2. Add to home screen when prompted
3. Launch from your app drawer like a native app

### For Development
```bash
# Simple HTTP server (any of these methods):

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Then visit: http://localhost:8000
```

## 🎯 Therapeutic Benefits

### Mental Health Support
- **Stress Relief**: Physical action of "attacking" negative thoughts
- **Empowerment**: Visual representation of overcoming challenges
- **Progress Tracking**: Score system shows improvement over time
- **Positive Reinforcement**: Encouraging messages and health restoration

### Customization Therapy
- **Personal Triggers**: Upload images that represent your specific challenges
- **Music Therapy**: Use calming or empowering music during gameplay
- **Visual Processing**: Transform negative associations through gameplay

## 🔧 Customization Options

### Adding Your Own Targets
```javascript
// The game automatically processes uploaded images:
1. Resizes to optimal resolution (512x512)
2. Adds red overlay for target effect
3. Overlays white crosshairs
4. Creates 3D texture mapping
```

### Audio Customization
- **Background Music**: MP3, WAV, OGG formats supported
- **Volume Control**: Built-in audio management
- **Loop Settings**: Continuous background music playback

## 🌈 Success Stories & Usage

### Recommended Usage Patterns
- **Daily Sessions**: 5-10 minutes of focused gameplay
- **Stress Moments**: Quick sessions during anxiety spikes
- **Therapy Complement**: Use alongside professional mental health support
- **Progress Tracking**: Monitor scores to see improvement over time

### Safety Notes
- This game is a supportive tool, not a replacement for professional therapy
- If experiencing severe depression, please seek professional help
- The game uses positive reinforcement and empowerment mechanics
- No violent or harmful imagery is encouraged

## 🚀 Future Enhancements

### Planned Features
- **Multiplayer Support**: Team up with friends for group therapy
- **Achievement System**: Unlock rewards for consistent play
- **Meditation Modes**: Calm, non-violent target practice
- **Progress Analytics**: Detailed statistics and improvement tracking
- **VR Support**: Enhanced immersion with virtual reality

### Community Features
- **Shared Challenges**: Community-created target sets
- **Leaderboards**: Anonymous progress comparison
- **Support Groups**: In-game chat and encouragement

## 🤝 Support & Community

### Getting Help
- Check browser console for any error messages
- Ensure microphone/camera permissions are granted
- Try refreshing the page if targets don't load
- Use latest browser version for best compatibility

### Contributing
This is a therapeutic tool designed to help people. Contributions that enhance the positive, empowering experience are welcome.

---

## 🎉 Ready to Transform Your Struggles into Strength?

**Launch the game and start your journey toward mental empowerment!**

*Remember: Every shot you take is a step toward conquering your challenges. You have the power to overcome anything that tries to bring you down.*

🎯 **ATTACK YOUR DEPRESSION - RECLAIM YOUR POWER!** 🎯
