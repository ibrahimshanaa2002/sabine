document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById("no");
    const yesButton = document.getElementById("yes");
    const messageBox = document.getElementById("message-box");
    const shareBox = document.querySelector(".share-box");
    const container = document.querySelector(".container");
    const emojiContainer = document.querySelector(".emoji-container");
    const confettiContainer = document.querySelector(".confetti-container");

    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 100,
                        "size": 5,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Make sure message box is hidden on page load
    messageBox.classList.add("hidden");
    messageBox.style.display = "none";

    // Track No button evasion count
    let noButtonEvadeCount = 0;
    
    // Make the "No" button move away with progressively more difficulty
    noButton.addEventListener("mouseover", () => {
        noButtonEvadeCount++;
        
        // Make the movement more erratic as user tries more times
        const speed = Math.min(noButtonEvadeCount * 50, 400);
        const moveX = Math.random() > 0.5 ? 1 : -1;
        const moveY = Math.random() > 0.5 ? 1 : -1;
        
        // Calculate new position with boundaries
        const maxX = window.innerWidth - noButton.clientWidth - 20;
        const maxY = window.innerHeight - noButton.clientHeight - 20;
        
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;
        
        // Keep button fully on screen
        newX = Math.max(20, Math.min(newX, maxX));
        newY = Math.max(20, Math.min(newY, maxY));
        
        // Apply smooth movement with transition
        noButton.style.position = "absolute";
        noButton.style.transition = `all ${0.2 + Math.random() * 0.3}s ease-out`;
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
        
        // Make the Yes button more prominent
        yesButton.style.transform = 'scale(1.1)';
        setTimeout(() => {
            yesButton.style.transform = 'scale(1)';
        }, 300);
        
        // If they've tried more than 3 times, show encouraging messages
        if (noButtonEvadeCount >= 3) {
            const messages = [
                "You know it's true! 🐴",
                "Stop denying it! 😂",
                "The truth hurts, doesn't it?",
                "Sabine = 🐴, just admit it!",
                "We all know Sabine is a donkey!",
                "Why are you defending a donkey?",
                "This button won't let you lie!"
            ];
            
            // Create and show a floating message
            const messageIdx = Math.min(noButtonEvadeCount - 3, messages.length - 1);
            showFloatingMessage(messages[messageIdx]);
        }
    });

    // Show message when clicking "Yes"
    yesButton.addEventListener("click", () => {
        // Hide the main container
        container.style.opacity = "0";
        container.style.transform = "scale(0.8)";
        
        // Show celebration
        setTimeout(() => {
            messageBox.classList.remove("hidden");
            messageBox.style.display = "flex";
            createConfetti();
            createBurstEmojis();
        }, 300);
        
        // Add sound if browser allows
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-cartoon-positive-sound-2255.mp3');
            audio.volume = 0.5;
            audio.play();
        } catch (e) {
            console.log("Browser blocked audio autoplay");
        }
    });

    // Try to click the No button (make it harder to click)
    noButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        // 95% chance the click doesn't work
        if (Math.random() < 0.95) {
            // Move the button
            const x = Math.random() * (window.innerWidth - noButton.clientWidth - 100);
            const y = Math.random() * (window.innerHeight - noButton.clientHeight - 100);
            noButton.style.position = "absolute";
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
            
            showFloatingMessage("Nice try! You can't deny it! 🐴");
            return false;
        }
    });

    // Share box features
    if (shareBox) {
        shareBox.addEventListener("click", () => {
            // Create a fun surprise
            createEmojiExplosion();
            
            // Change message text
            const messageText = messageBox.querySelector("p");
            const donkeyFacts = [
                "Sabine's donkey status is now official! 🏆",
                "Now everyone will know Sabine is a donkey! 📢",
                "Sabine has earned his donkey certification! 🎓",
                "Sabine: 10% human, 90% donkey! 🐴",
                "Breaking news: Sabine identified as donkey! 📰"
            ];
            messageText.textContent = donkeyFacts[Math.floor(Math.random() * donkeyFacts.length)];
            
            // Add donkey braying sound if browser allows
            try {
                const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-funny-cartoon-tones-2255.mp3');
                audio.volume = 0.5;
                audio.play();
            } catch (e) {
                console.log("Browser blocked audio autoplay");
            }
        });
    }

    // Generate Floating Emojis background
    function createEmoji() {
        const emoji = document.createElement("div");
        const emojiTypes = ["🐴", "🐎", "🐄", "🐮", "🧠", "❓", "😂"];
        emoji.innerHTML = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
        emoji.classList.add("emoji");
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDuration = Math.random() * 3 + 3 + "s"; // Random speed
        emoji.style.fontSize = Math.random() * 15 + 15 + "px"; // Random size

        emojiContainer.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 6000);
    }

    // Start creating emojis
    setInterval(createEmoji, 300);

    // Burst Emojis when clicking "Yes"
    function createBurstEmojis() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const emoji = document.createElement("div");
                const emojiTypes = ["🐴", "🐎", "🐄", "🧠", "😂", "🤣", "🐴"];
                emoji.innerHTML = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
                emoji.classList.add("emoji");
                emoji.style.left = `${50 + (Math.random() - 0.5) * 60}vw`; // Random spread near center
                emoji.style.top = `${50 + (Math.random() - 0.5) * 60}vh`;
                emoji.style.animationDuration = Math.random() * 3 + 2 + "s";
                emoji.style.fontSize = Math.random() * 25 + 25 + "px"; // Bigger for celebration

                emojiContainer.appendChild(emoji);

                setTimeout(() => {
                    emoji.remove();
                }, 5000);
            }, i * 100);
        }
    }

    // Create confetti for celebration
    function createConfetti() {
        const colors = ['#a18cd1', '#fbc2eb', '#8a5fff', '#fad0c4', '#ffecd2', '#a6c0fe'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = `${Math.random() * 10 + 5}px`;
                confetti.style.height = `${Math.random() * 10 + 5}px`;
                confetti.style.opacity = Math.random();
                confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
                confetti.style.animationDelay = `${Math.random() * 2}s`;
                
                // Random shapes for confetti
                const shapes = ['circle', 'square', 'triangle'];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                switch (shape) {
                    case 'circle':
                        confetti.style.borderRadius = '50%';
                        break;
                    case 'square':
                        // No additional styling needed
                        break;
                    case 'triangle':
                        confetti.style.width = '0';
                        confetti.style.height = '0';
                        confetti.style.borderLeft = `${Math.random() * 5 + 5}px solid transparent`;
                        confetti.style.borderRight = `${Math.random() * 5 + 5}px solid transparent`;
                        confetti.style.borderBottom = `${Math.random() * 10 + 10}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
                        confetti.style.background = 'transparent';
                        break;
                }
                
                if (confettiContainer) {
                    confettiContainer.appendChild(confetti);
                } else {
                    document.body.appendChild(confetti);
                }
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 50);
        }
    }

    // Create emoji explosion effect
    function createEmojiExplosion() {
        const totalEmojis = 150;
        const emojiTypes = ["🐴", "🐎", "🐄", "🧠", "😂", "🤣", "🐴"];
        
        for (let i = 0; i < totalEmojis; i++) {
            setTimeout(() => {
                const emoji = document.createElement("div");
                emoji.innerHTML = emojiTypes[Math.floor(Math.random() * emojiTypes.length)];
                emoji.style.position = "absolute";
                emoji.style.fontSize = `${Math.random() * 30 + 10}px`;
                emoji.style.zIndex = "200";
                
                // Calculate position - start from center of message box
                const boxRect = messageBox.getBoundingClientRect();
                const centerX = boxRect.left + boxRect.width / 2;
                const centerY = boxRect.top + boxRect.height / 2;
                
                // Random angle and distance
                const angle = Math.random() * Math.PI * 2; // 0 to 2π
                const distance = Math.random() * 150 + 50; // 50-200px
                
                const posX = centerX + Math.cos(angle) * distance;
                const posY = centerY + Math.sin(angle) * distance;
                
                emoji.style.left = `${posX}px`;
                emoji.style.top = `${posY}px`;
                
                // Add animation
                emoji.style.transition = `all ${Math.random() * 1 + 1}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
                emoji.style.opacity = "0";
                
                document.body.appendChild(emoji);
                
                // Animate after a tiny delay to ensure transition works
                setTimeout(() => {
                    emoji.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
                    emoji.style.opacity = "0";
                }, 10);
                
                setTimeout(() => {
                    emoji.remove();
                }, 2000);
            }, i * 10);
        }
    }

    // Show floating message
    function showFloatingMessage(text) {
        const message = document.createElement("div");
        message.textContent = text;
        message.style.position = "absolute";
        message.style.color = "#7d55c7";
        message.style.fontWeight = "bold";
        message.style.fontSize = "20px";
        message.style.padding = "10px 20px";
        message.style.background = "rgba(255, 255, 255, 0.9)";
        message.style.borderRadius = "20px";
        message.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
        message.style.zIndex = "50";
        
        // Position near the no button
        const noRect = noButton.getBoundingClientRect();
        message.style.left = `${noRect.left}px`;
        message.style.top = `${noRect.top - 50}px`;
        
        // Add to body
        document.body.appendChild(message);
        
        // Animate in
        message.style.transition = "all 0.5s ease-in-out";
        message.style.opacity = "0";
        message.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            message.style.opacity = "1";
            message.style.transform = "translateY(0)";
        }, 10);
        
        // Remove after a delay
        setTimeout(() => {
            message.style.opacity = "0";
            message.style.transform = "translateY(-20px)";
            
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 2000);
    }
});