document.addEventListener('DOMContentLoaded', function() {
    let currentMember = null;
    let audioPlayer = document.getElementById('audio-player');

const songs = [
    'assets/numb.wav', // 0
    'assets/u.wav', // 1
    'assets/ler.mp3', // 2
    'assets/moon.mp3',  // 3
    'assets/u.wav',   // 4
    'assets/glam.mp3', // 5
    'assets/way.mp3', // 6
    'assets/ye.mp3', // 7
    'assets/penis.mp3',// 8
    'assets/life.mp3',// 9
    'assets/main.mp3' // 10
];

function showMember(member) {
    const memberInfo = {
        'ПОРОЧНОСТЬ': { 'name': 'ПОРОЧНОСТЬ', 'image': 'assets/mooon.gif', 'description': 'FIND MY FACE.', 'songIndex': 0 },
        'BIO': { 'name': 'BIO', 'image': 'assets/spy.jpg', 'description': 'CONTACT ME.', 'songIndex': 1 }, 

    };
 const hardcodedVolume = 0.2; 
    if (audioPlayer) {
        audioPlayer.volume = hardcodedVolume; 
    }
        const info = memberInfo[member];
        if (!info) return;

        const memberDiv = document.getElementById('member-info');
        const selectedElement = document.querySelector(`[onclick="showMember('${member}')"]`);

        if (currentMember) {
            currentMember.classList.remove('selected');
            const previousDot = document.getElementById(`${currentMember.getAttribute('data-member')}-dot`);
            if (previousDot) previousDot.innerHTML = '::';
            stopMusic();
        }

        if (currentMember === selectedElement) {
            currentMember = null;
            memberDiv.innerHTML = '';
            playDefaultSong();
            return;
        }

        if (selectedElement) {
            selectedElement.classList.add('selected');
            selectedElement.setAttribute('data-member', member);
        } else {
            console.warn('Selected element not found for member:', member);
            return;
        }

        document.querySelectorAll('.yellow').forEach(dot => {
            dot.innerHTML = '::';
        });

        const currentDot = document.getElementById(`${member}-dot`);
        if (currentDot) {
            currentDot.innerHTML = '<span style="color: #ff0000; margin-top: -2px;">&bull;</span>';
        }

memberDiv.innerHTML = `
    <img src="${info.image}" class="fade-in" style="width: 120px; height: 120px;" draggable="false">
    <p style="margin-top: 5px; margin-bottom: 0; color: #ff0000;">[ ${info.name} ]</p>
    <hr style="border-top: 1px solid #ff0000; margin: 3px 0;">
    <p class="glitch" style="margin-top: 5px;">${info.description}</p>
`;


        changeSong(info.songIndex);

        currentMember = selectedElement;
    }

    function playDefaultSong() {
        const defaultSongIndex = songs.length - 1;
        changeSong(defaultSongIndex);
    }

    function changeSong(songIndex) {
        if (!audioPlayer) {
            console.error('Audio player element not found');
            return;
        }

        const songPath = songs[songIndex] || songs[songs.length - 1];
        audioPlayer.src = songPath;
        audioPlayer.play().catch(error => {
            console.error('Error playing song:', error);
        });
    }

    function stopMusic() {
        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }
    }

    function removeOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
            playDefaultSong();
        }
    }

    window.showMember = showMember;
    window.removeOverlay = removeOverlay;
});
