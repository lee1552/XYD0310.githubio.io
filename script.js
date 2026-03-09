// 等待页面加载完成
window.addEventListener('load', () => {
    const envelope = document.getElementById('envelope');
    const cardContent = document.getElementById('cardContent');
    const letterModal = document.getElementById('letterModal');
    const letterBtn = document.getElementById('letterBtn');
    const closeBtn = document.getElementById('closeBtn');
    const playBtn = document.getElementById('playBtn');
    const music = document.getElementById('birthdayMusic');
    const nameText = document.getElementById('name');
    // 新增：获取提示语元素
    const tapHint = document.querySelector('.tap-hint');

    // 兼容手机端触摸事件 + 点击事件
    function bindMultiEvent(element, eventNames, handler) {
        const events = eventNames.split(' ');
        events.forEach(event => {
            element.addEventListener(event, handler, false);
        });
    }

    // 信封打开（兼容点击+触摸）+ 隐藏提示语
    bindMultiEvent(envelope, 'click touchstart', (e) => {
        // 阻止触摸事件冒泡，防止手机端误触
        e.preventDefault();
        envelope.classList.add('open');
        // 新增：隐藏提示语（立即消失，可加动画）
        if (tapHint) {
            tapHint.style.opacity = '0';
            tapHint.style.visibility = 'hidden';
            tapHint.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
        }
        setTimeout(() => {
            cardContent.classList.add('show');
        }, 800);
    });

    // 信封内所有子元素绑定触摸/点击事件（兜底）+ 隐藏提示语
    const envelopeElements = envelope.querySelectorAll('*');
    envelopeElements.forEach(el => {
        bindMultiEvent(el, 'click touchstart', (e) => {
            e.preventDefault();
            envelope.classList.add('open');
            // 新增：隐藏提示语
            if (tapHint) {
                tapHint.style.opacity = '0';
                tapHint.style.visibility = 'hidden';
                tapHint.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            }
            setTimeout(() => {
                cardContent.classList.add('show');
            }, 800);
        });
    });

    // 打开信件弹窗（兼容触摸）
    // 打开信件弹窗（兼容触摸）
bindMultiEvent(letterBtn, 'click touchstart', (e) => {
    e.preventDefault();
    letterModal.style.display = 'flex';
    // 新增：添加show类触发拆信动画
    letterModal.classList.add('show');
});

// 关闭信件弹窗（兼容触摸）
bindMultiEvent(closeBtn, 'click touchstart', (e) => {
    e.preventDefault();
    // 新增：移除show类，重置动画
    letterModal.classList.remove('show');
    setTimeout(() => {
        letterModal.style.display = 'none';
    }, 300);
});

// 点击弹窗外关闭（兼容触摸）
bindMultiEvent(letterModal, 'click touchstart', (e) => {
    if (e.target === letterModal) {
        letterModal.classList.remove('show');
        setTimeout(() => {
            letterModal.style.display = 'none';
        }, 300);
    }
});

    // 播放/暂停音乐（兼容触摸）
    bindMultiEvent(playBtn, 'click touchstart', (e) => {
        e.preventDefault();
        if (music) { // 兼容无音乐文件的情况
            if (music.paused) {
                music.play().catch(err => {
                    // 手机端需要用户交互才能播放音频，提示用户
                    alert('请点击屏幕允许播放音乐～');
                });
                playBtn.textContent = '暂停音乐 🎵';
            } else {
                music.pause();
                playBtn.textContent = '播放生日歌 🎵';
            }
        }
    });

    // 打字机效果（女友名字）
    const girlfriendName = '亲爱的宝贝'; // 替换成女友名字
    let index = 0;
    nameText.textContent = '';
    const typeWriter = setInterval(() => {
        if (index < girlfriendName.length) {
            nameText.textContent += girlfriendName.charAt(index);
            index++;
        } else {
            clearInterval(typeWriter);
        }
    }, 200);
});