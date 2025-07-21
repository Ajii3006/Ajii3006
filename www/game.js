// Attacking Depression - 3D Therapy Game
class AttackingDepressionGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.targets = [];
        this.score = 0;
        this.hits = 0;
        this.health = 100;
        this.isGameRunning = false;
        this.userImage = null;
        this.backgroundMusic = null;
        
        // Mobile touch controls
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isTouching = false;
        
        // Particle system
        this.particles = [];
        this.particleCanvas = null;
        this.particleCtx = null;
        
        this.init();
        this.setupEventListeners();
        this.setupParticleSystem();
        this.createAudioContext();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x001122);
        
        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;
        
        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Append renderer to body
        document.body.appendChild(this.renderer.domElement);
        
        // Add lighting
        this.setupLighting();
        
        // Create environment
        this.createEnvironment();
        
        // Start render loop
        this.animate();
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point lights for atmosphere
        const pointLight1 = new THREE.PointLight(0xff4757, 1, 100);
        pointLight1.position.set(-10, 10, 10);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x3742fa, 1, 100);
        pointLight2.position.set(10, -10, 10);
        this.scene.add(pointLight2);
    }

    createEnvironment() {
        // Create floating particles in background
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true,
            opacity: 0.6
        });
        
        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(particleSystem);
        
        // Create default targets
        this.createDefaultTargets();
    }

    createDefaultTargets() {
        const geometry = new THREE.PlaneGeometry(2, 2);
        
        // Create some default depression-themed targets
        const defaultTexts = [
            "ANXIETY", "SADNESS", "FEAR", "DOUBT", "WORRY"
        ];
        
        defaultTexts.forEach((text, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');
            
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, 512, 512);
            gradient.addColorStop(0, '#ff4757');
            gradient.addColorStop(1, '#2f3542');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);
            
            // Add text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 256, 256);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshPhongMaterial({ 
                map: texture,
                transparent: true
            });
            
            const target = new THREE.Mesh(geometry, material);
            target.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 10 - 5
            );
            target.userData = { 
                isTarget: true, 
                health: 100,
                originalScale: target.scale.clone()
            };
            
            this.scene.add(target);
            this.targets.push(target);
        });
    }

    createTargetFromImage(imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas texture from user image
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                
                // Draw image
                ctx.drawImage(img, 0, 0, 512, 512);
                
                // Add overlay effect
                ctx.fillStyle = 'rgba(255, 71, 87, 0.3)';
                ctx.fillRect(0, 0, 512, 512);
                
                // Add target crosshair
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(256, 100);
                ctx.lineTo(256, 412);
                ctx.moveTo(100, 256);
                ctx.lineTo(412, 256);
                ctx.stroke();
                
                const texture = new THREE.CanvasTexture(canvas);
                const geometry = new THREE.PlaneGeometry(3, 3);
                const material = new THREE.MeshPhongMaterial({ 
                    map: texture,
                    transparent: true
                });
                
                const target = new THREE.Mesh(geometry, material);
                target.position.set(
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 4,
                    -3
                );
                target.userData = { 
                    isTarget: true, 
                    health: 150,
                    isUserImage: true,
                    originalScale: target.scale.clone()
                };
                
                this.scene.add(target);
                this.targets.push(target);
                
                this.showMessage("🎯 TARGET LOADED! ATTACK YOUR FEARS!");
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    }

    setupEventListeners() {
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        // Upload image button
        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });
        
        // Music button
        document.getElementById('musicBtn').addEventListener('click', () => {
            document.getElementById('musicInput').click();
        });
        
        // Fire button
        document.getElementById('fireBtn').addEventListener('click', (e) => {
            this.shoot(e);
        });
        
        // Image input
        document.getElementById('imageInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.createTargetFromImage(file);
                this.showMessage("📷 IMAGE UPLOADED AS TARGET!");
            }
        });
        
        // Music input
        document.getElementById('musicInput').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                const bgMusic = document.getElementById('bgMusic');
                bgMusic.src = url;
                bgMusic.play();
                this.showMessage("🎵 BACKGROUND MUSIC LOADED!");
            }
        });
        
        // Touch events for mobile
        this.renderer.domElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isTouching = true;
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
        });
        
        this.renderer.domElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.isTouching && this.isGameRunning) {
                this.shoot(e);
            }
            this.isTouching = false;
        });
        
        // Mouse events for desktop
        this.renderer.domElement.addEventListener('click', (e) => {
            if (this.isGameRunning) {
                this.shoot(e);
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.resizeParticleCanvas();
        });
    }

    setupParticleSystem() {
        this.particleCanvas = document.getElementById('particles');
        this.particleCtx = this.particleCanvas.getContext('2d');
        this.resizeParticleCanvas();
        this.animateParticles();
    }

    resizeParticleCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    createParticleExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                color: `hsl(${Math.random() * 60 + 340}, 100%, 50%)`
            });
        }
    }

    animateParticles() {
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            particle.vy += 0.1; // gravity
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.particleCtx.save();
            this.particleCtx.globalAlpha = particle.life;
            this.particleCtx.fillStyle = particle.color;
            this.particleCtx.beginPath();
            this.particleCtx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            this.particleCtx.fill();
            this.particleCtx.restore();
        }
        
        requestAnimationFrame(() => this.animateParticles());
    }

    createAudioContext() {
        // Create a more realistic gunshot sound
        this.createGunshotSound();
    }

    createGunshotSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            this.playGunshot = () => {
                const duration = 0.1;
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + duration);
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            };
        } catch (e) {
            // Fallback for browsers without Web Audio API
            this.playGunshot = () => {
                const gunshot = document.getElementById('gunshot');
                gunshot.currentTime = 0;
                gunshot.play().catch(() => {}); // Ignore play errors
            };
        }
    }

    startGame() {
        document.getElementById('menuOverlay').style.display = 'none';
        document.getElementById('gameUI').style.display = 'block';
        this.isGameRunning = true;
        
        // Start background music if available
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic.src) {
            bgMusic.play().catch(() => {}); // Ignore play errors
        }
        
        this.showMessage("🎯 GAME STARTED! ATTACK YOUR DEPRESSION!");
    }

    shoot(event) {
        if (!this.isGameRunning) return;
        
        // Play gunshot sound
        this.playGunshot();
        
        // Get mouse/touch position
        let clientX, clientY;
        if (event.touches) {
            clientX = event.touches[0]?.clientX || event.changedTouches[0]?.clientX;
            clientY = event.touches[0]?.clientY || event.changedTouches[0]?.clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        
        // Create particle explosion at click/touch point
        this.createParticleExplosion(clientX, clientY);
        
        // Raycast to detect hits
        const mouse = new THREE.Vector2();
        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        
        const intersects = raycaster.intersectObjects(this.targets);
        
        if (intersects.length > 0) {
            const hit = intersects[0];
            this.hitTarget(hit.object, clientX, clientY);
        }
        
        // Camera shake effect
        this.cameraShake();
    }

    hitTarget(target, x, y) {
        if (!target.userData.isTarget) return;
        
        target.userData.health -= 25;
        this.hits++;
        this.score += target.userData.isUserImage ? 50 : 25;
        
        // Visual feedback
        target.material.emissive.setHex(0xff4757);
        setTimeout(() => {
            target.material.emissive.setHex(0x000000);
        }, 100);
        
        // Scale animation
        target.scale.multiplyScalar(0.9);
        
        // Show hit indicator
        this.showHitIndicator(x, y, target.userData.isUserImage ? "BREAKTHROUGH!" : "HIT!");
        
        // Remove target if health is depleted
        if (target.userData.health <= 0) {
            this.destroyTarget(target);
        }
        
        // Update UI
        this.updateUI();
        
        // Positive reinforcement
        if (this.hits % 5 === 0) {
            this.showMessage("💪 YOU'RE GETTING STRONGER!");
            this.health = Math.min(100, this.health + 10);
        }
    }

    destroyTarget(target) {
        // Destruction animation
        const targetIndex = this.targets.indexOf(target);
        if (targetIndex > -1) {
            this.targets.splice(targetIndex, 1);
        }
        
        // Fade out animation
        const originalOpacity = target.material.opacity;
        const fadeOut = () => {
            target.material.opacity -= 0.05;
            if (target.material.opacity <= 0) {
                this.scene.remove(target);
                target.geometry.dispose();
                target.material.dispose();
            } else {
                requestAnimationFrame(fadeOut);
            }
        };
        fadeOut();
        
        this.score += 100;
        this.showMessage("🎉 TARGET DESTROYED! DEPRESSION DEFEATED!");
        
        // Create new target after a delay
        setTimeout(() => {
            this.createDefaultTargets();
        }, 2000);
    }

    cameraShake() {
        const originalPosition = this.camera.position.clone();
        const shakeIntensity = 0.1;
        const shakeDuration = 100;
        
        const shake = () => {
            this.camera.position.x = originalPosition.x + (Math.random() - 0.5) * shakeIntensity;
            this.camera.position.y = originalPosition.y + (Math.random() - 0.5) * shakeIntensity;
        };
        
        shake();
        setTimeout(() => {
            this.camera.position.copy(originalPosition);
        }, shakeDuration);
    }

    showHitIndicator(x, y, text) {
        const indicator = document.createElement('div');
        indicator.className = 'hit-indicator';
        indicator.textContent = text;
        indicator.style.left = x + 'px';
        indicator.style.top = y + 'px';
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            document.body.removeChild(indicator);
        }, 1000);
    }

    showMessage(message) {
        // Create floating message
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 18px;
            font-weight: bold;
            z-index: 3000;
            animation: messageSlide 3s ease-out forwards;
        `;
        
        // Add CSS animation
        if (!document.querySelector('#messageStyles')) {
            const style = document.createElement('style');
            style.id = 'messageStyles';
            style.textContent = `
                @keyframes messageSlide {
                    0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                    20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                document.body.removeChild(messageEl);
            }
        }, 3000);
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('hits').textContent = this.hits;
        
        const healthFill = document.getElementById('healthFill');
        healthFill.style.width = this.health + '%';
        
        if (this.health < 30) {
            healthFill.style.background = 'linear-gradient(90deg, #ff4757, #ff3838)';
        } else if (this.health < 60) {
            healthFill.style.background = 'linear-gradient(90deg, #ff4757, #ffa502)';
        } else {
            healthFill.style.background = 'linear-gradient(90deg, #ff4757, #ffa502, #2ed573)';
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Animate targets
        this.targets.forEach((target, index) => {
            if (target.userData.isTarget) {
                target.rotation.y += 0.01;
                target.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
            }
        });
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AttackingDepressionGame();
});

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        location.reload();
    }, 500);
});