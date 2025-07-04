
const button = document.getElementById("open-invitation");
const invitation = document.getElementById("main-invitation");
const cover = document.querySelector(".welcome-container");
const bodyElement = document.body;
const htmlElement = document.documentElement;

htmlElement.style.overflowY = 'hidden';
bodyElement.style.overflowY = 'hidden';

button.addEventListener("click", () => {
  console.log('Tombol Buka Undangan diklik!'); // Pastikan ini muncul
  cover.style.display = "none";
  console.log('Welcome display:', cover.style.display); // Harusnya 'none'

  invitation.classList.remove("hidden");
  invitation.classList.add("show");
  console.log('Invitation classes:', invitation.classList); // Cek class listnya
  
  // Tunggu sejenak agar browser sempat render (meski biasanya tidak perlu)
  setTimeout(() => {
      console.log('Invitation computed display:', window.getComputedStyle(invitation).display); // Cek style display aktual
      console.log('Invitation offsetHeight:', invitation.offsetHeight); // Cek tinggi aktual elemen
  }, 10); // Delay 10ms

  htmlElement.style.overflowY = 'auto';
  bodyElement.style.overflowY = 'auto';
  console.log('Scrolling enabled.');
});
const elementsToAnimate = document.querySelectorAll('.quote-section, .dekorasi-kanan');

if (elementsToAnimate.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger saat 10% elemen masuk layar
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // Jika elemen yang diamati masuk ke viewport
      if (entry.isIntersecting) {
        // Tambahkan class ke elemen SPESIFIK yang masuk viewport
        entry.target.classList.add('animate-on-scroll');
        // Hentikan pengamatan elemen ini agar animasi tidak berulang
        observer.unobserve(entry.target);
      }
    });
  };

  // Buat instance observer
  const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

  elementsToAnimate.forEach(el => {
    intersectionObserver.observe(el);
  });
}
const targetDate = new Date("2025-08-25T09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days > 0 ? days : 0;
  document.getElementById("hours").innerText = hours > 0 ? hours : 0;
  document.getElementById("minutes").innerText = minutes > 0 ? minutes : 0;
  document.getElementById("seconds").innerText = seconds > 0 ? seconds : 0;
}

setInterval(updateCountdown, 1000);

const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get('to');
if (namaTamu) {
  document.querySelector('.text-overlay p strong').textContent = decodeURIComponent(namaTamu);
}
// --- Form dan Daftar Ucapan ---
const ucapanForm = document.querySelector('.wish-form');
const ucapanListContainer = document.getElementById('ucapan-list'); 
const inputNamaPengirim = document.getElementById('wishSenderName');
const textareaPesan = document.getElementById('wishMessageText');

if (ucapanForm && inputNamaPengirim && textareaPesan && ucapanListContainer) {
  ucapanForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah submit form standar

    const nama = inputNamaPengirim.value.trim();
    const pesan = textareaPesan.value.trim();

    if (!nama || !pesan) {
      alert('Mohon isi nama dan ucapan Anda.'); // Pesan error yang lebih ramah
      return;
    }

    // Membuat elemen item ucapan baru
    const ucapanItem = document.createElement('div');
    ucapanItem.classList.add('ucapan-item'); // Sesuai dengan class di CSS

    // Membuat header ucapan (nama + centang)
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('ucapan-header'); // Sesuai dengan class di CSS

    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username'); // Sesuai dengan class di CSS
    usernameSpan.textContent = nama;

    const centangSpan = document.createElement('span');
    centangSpan.classList.add('centang'); 
    centangSpan.innerHTML = '<i class="fas fa-check"></i>'; // Jika ingin menggunakan Font Awesome

    headerDiv.appendChild(usernameSpan);
    headerDiv.appendChild(centangSpan);

    // Membuat paragraf untuk teks pesan
    const pesanParagraf = document.createElement('p');
    pesanParagraf.textContent = pesan;

    // Memasukkan header dan paragraf pesan ke dalam item ucapan
    ucapanItem.appendChild(headerDiv);
    ucapanItem.appendChild(pesanParagraf);

    ucapanListContainer.appendChild(ucapanItem);

    // Otomatis scroll ke ucapan terbaru (jika daftar bisa di-scroll)
    ucapanListContainer.scrollTop = ucapanListContainer.scrollHeight;

    // Mengosongkan form setelah submit
    ucapanForm.reset(); // Cara paling sederhana untuk reset form
    // atau:
    // inputNamaPengirim.value = '';
    // textareaPesan.value = '';
  });
} else {
  console.warn('Satu atau lebih elemen untuk form ucapan tidak ditemukan. Periksa kelas ".wish-form" dan ID "wishSenderName", "wishMessageText", "ucapan-list".');
}

// --- Contoh Data Ucapan untuk Testing (opsional, bisa dihapus jika sudah live) ---
// Pastikan ini dijalankan setelah DOM siap dan ucapanListContainer ada
document.addEventListener('DOMContentLoaded', () => {
    if (ucapanListContainer) { // Periksa lagi karena DOMContentLoaded
        function addContohUcapan(nama, isiUcapan) {
            const ucapanItem = document.createElement('div');
            ucapanItem.classList.add('ucapan-item');
            const headerDiv = document.createElement('div');
            headerDiv.classList.add('ucapan-header');
            const usernameSpan = document.createElement('span');
            usernameSpan.classList.add('username');
            usernameSpan.textContent = nama;
            const centangSpan = document.createElement('span');
            centangSpan.classList.add('centang');
            centangSpan.innerHTML = '<i class="fas fa-check"></i>';
            headerDiv.appendChild(usernameSpan);
            headerDiv.appendChild(centangSpan);
            const pesanParagraf = document.createElement('p');
            pesanParagraf.textContent = isiUcapan;
            ucapanItem.appendChild(headerDiv);
            ucapanItem.appendChild(pesanParagraf);
            ucapanListContainer.appendChild(ucapanItem);
        }

        // Tambahkan beberapa contoh
        addUcapanToDisplay("Umam", "Happy wedding !♥️");
        addUcapanToDisplay("Najib", "Barakallah, samawa dunia akhirat yaaa.");
        if (ucapanListContainer.scrollHeight > ucapanListContainer.clientHeight) {
            ucapanListContainer.scrollTop = ucapanListContainer.scrollHeight;
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const openInvitationButton = document.getElementById('open-invitation');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeBgVideo = document.getElementById('welcome-bg-video');

    const transitionPlayerContainer = document.getElementById('transition-player-container');
    const oneTimeTransitionVideo = document.getElementById('one-time-transition-video');

    const mainInvitation = document.getElementById('main-invitation');
    const mainBgVideo = document.getElementById('main-bg-video');

    function playVideo(videoElement) {
        if (videoElement && typeof videoElement.play === 'function') {
            videoElement.currentTime = 0;
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn(`Gagal memutar video ${videoElement.id}:`, error);
                    if (videoElement === oneTimeTransitionVideo) {
                        console.error("Video transisi gagal diputar. Menampilkan undangan utama.");
                        switchToMainInvitation();
                    }
                });
            }
        } else {
            if (videoElement === oneTimeTransitionVideo) {
                console.error("Elemen video transisi tidak valid atau tidak ditemukan. Menampilkan undangan utama.");
                switchToMainInvitation();
            }
        }
    }

    function switchToMainInvitation() {
        if (transitionPlayerContainer) {
            transitionPlayerContainer.classList.add('hidden');
            transitionPlayerContainer.classList.remove('show-flex');
        }

        if (mainInvitation) {
            mainInvitation.classList.remove('hidden');
            mainInvitation.classList.add('show-flex');

            requestAnimationFrame(() => {
                mainInvitation.style.opacity = '1';
                mainInvitation.classList.add('visible');
            });

            if (mainBgVideo) {
                playVideo(mainBgVideo);

                // ✅ Tambahkan efek zoom
                mainBgVideo.classList.add('zoom-effect');
                console.log('Zoom effect triggered on main background video.');
            }
        } else {
            console.error("Kontainer undangan utama (#main-invitation) tidak ditemukan.");
        }
    }

    if (!openInvitationButton) console.error("Tombol 'open-invitation' tidak ditemukan.");
    if (!welcomeScreen) console.error("Kontainer 'welcomeScreen' tidak ditemukan.");
    if (!transitionPlayerContainer) console.error("Kontainer 'transition-player-container' tidak ditemukan.");
    if (!oneTimeTransitionVideo) console.error("Video 'one-time-transition-video' tidak ditemukan.");
    if (!mainInvitation) console.error("Kontainer 'main-invitation' tidak ditemukan.");

    if (openInvitationButton) {
        openInvitationButton.addEventListener('click', function() {
            if (welcomeScreen) {
                welcomeScreen.classList.add('hidden');
                welcomeScreen.classList.remove('show-flex');
            }
            if (welcomeBgVideo && !welcomeBgVideo.paused) {
                welcomeBgVideo.pause();
            }

            if (transitionPlayerContainer) {
                transitionPlayerContainer.classList.remove('hidden');
                transitionPlayerContainer.classList.add('show-flex');

                if (oneTimeTransitionVideo) {
                    playVideo(oneTimeTransitionVideo);
                } else {
                    console.warn("Elemen video transisi tidak ditemukan di DOM, langsung ke undangan utama.");
                    switchToMainInvitation();
                }
            } else {
                console.warn("Kontainer video transisi tidak ditemukan di DOM, langsung ke undangan utama.");
                switchToMainInvitation();
            }
        });
    }

    if (oneTimeTransitionVideo) {
        oneTimeTransitionVideo.addEventListener('ended', function() {
            switchToMainInvitation();
        });

        oneTimeTransitionVideo.addEventListener('error', function(e) {
            console.error("Error saat memuat atau memutar video transisi:", e);
            switchToMainInvitation();
        });
    }
});

  const video = document.getElementById("main-bg-video");
  const loopStart =  video.duration - 2; // akan di-set setelah metadata loaded

  video.addEventListener("loadedmetadata", () => {
    const loopStartTime = video.duration - 2; // misalnya 10 detik terakhir
    let isLooping = false;

    video.addEventListener("timeupdate", () => {
      // Saat video selesai pertama kali
      if (!isLooping && video.currentTime >= video.duration - 0.1) {
        isLooping = true;
        video.currentTime = loopStartTime;
        video.play();
      }

      // Saat looping berjalan terus-menerus
      if (isLooping && video.currentTime >= video.duration - 0.1) {
        video.currentTime = loopStartTime;
        video.play();
      }
    });
  });
document.addEventListener("DOMContentLoaded", function () {
  const welcomeBgVideo = document.getElementById("welcome-bg-video");

  if (welcomeBgVideo) {
    // Pastikan video siap untuk dimainkan
    welcomeBgVideo.addEventListener("canplay", function () {
      const duration = welcomeBgVideo.duration;
      const skipTo = duration - 3; // Mulai dari 5 detik terakhir

      if (duration && skipTo > 0) {
        welcomeBgVideo.currentTime = skipTo;

        // Paksa play ulang dari titik itu
        const playPromise = welcomeBgVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Gagal autoplay video:", error);
          });
        }
      }
    });
  } else {
    console.warn("Elemen video tidak ditemukan");
  }
});
  
