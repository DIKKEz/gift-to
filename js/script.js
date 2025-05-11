document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const bgm = document.getElementById('bgm');
    const musicControl = document.getElementById('musicControl');
    let isPlaying = false;

    // 音乐控制
    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            bgm.pause();
            musicControl.style.opacity = 0.6;
        } else {
            bgm.play().catch(() => {});
            musicControl.style.opacity = 1;
        }
        isPlaying = !isPlaying;
    });

    // 启动回忆
    startBtn.addEventListener('click', () => {
        // 微信音频处理
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i)) {
            bgm.play().then(() => {
                bgm.pause();
                bgm.currentTime = 0;
            });
        }

        bgm.play().catch(() => {
            musicControl.style.display = 'block';
        });
        isPlaying = true;
        musicControl.style.opacity = 1;

        // 封面页淡出
        document.getElementById('cover').classList.remove('active');
        
        // 初始化时间轴
        setTimeout(() => {
            showTimeline();
        }, 1000);
    });

    function showTimeline() {
        const timeline = document.getElementById('timeline');
        timeline.classList.add('active');
        
        // 逐个显示回忆卡片
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
                // 自动滚动
                if(index > 0) {
                    window.scrollTo({
                        top: item.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }, index * 800);
        });

        // 全部展示后进入最终页
        setTimeout(showFinalPage, items.length * 800 + 2000);
    }

    function showFinalPage() {
        // 隐藏时间轴
        const timeline = document.getElementById('timeline');
        timeline.classList.remove('active');
        timeline.style.display = 'none';

        // 显示最终页
        const finalPage = document.getElementById('final');
        finalPage.style.display = 'flex';
        setTimeout(() => {
            finalPage.classList.add('active');
            createFireworks();
        }, 300);
    }

    function createFireworks() {
        const container = document.querySelector('.heart-container');
        const colors = ['#ff6b6b', '#ffafbd', '#fff'];
        
        for(let i = 0; i < 15; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.cssText = `
                    left: ${Math.random() * 95}%;
                    top: ${Math.random() * 90}%;
                    background: ${colors[Math.floor(Math.random()*colors.length)]};
                `;
                container.appendChild(firework);
                
                setTimeout(() => {
                    firework.remove();
                }, 1500);
            }, i * 300);
        }
    }
});