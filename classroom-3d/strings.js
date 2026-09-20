// All tour copy lives here. EN/BM facts follow the repository's 20 Sep 2026 brief.
// Product names and the illustrative code are identical in both languages.
export const sceneText = {
  designName: 'Astra / Codex', buildName: 'Claude Code', file: 'paddle.gd', folder: 'design/', score: '1 : 0',
  code: '<span class="pink">extends</span> Area2D\n\n<span class="pink">func</span> _process(dt):\n  <span class="green">var move =\n    Input.get_axis(\n      "up", "down")\n  position.y +=\n    move * 400 * dt</span>'
};
export const strings = {
  en: {
    pageTitle: 'The classroom, in 3D · Todak Academy', home: 'Home', slides: 'Slides',
    brand: 'TODAK ACADEMY', edition: 'AI CREATOR PROGRAM', language: 'Language',
    district: 'THE CLASSROOM, IN 3D', world: 'A small world. A real learning journey.',
    plan: 'THE PROGRAM PLAN', demo: 'Today’s demo: Pong. The full district is the plan.',
    overview: 'Overview', previous: 'Previous stop', next: 'Next stop', play: 'Play tour', pause: 'Pause tour',
    replay: 'Replay tour', touring: 'ON TOUR', paused: 'PAUSED', exploring: 'EXPLORING', finished: 'TOUR COMPLETE',
    orbit: 'Drag to orbit · Scroll to zoom', touch: 'Drag to orbit · Swipe the caption for stops',
    resume: 'Next returns to the tour', reduced: 'Reduced motion · Explore at your pace',
    disclaimer: 'Animation, not a screenshot. Demonstrator, not the kit.',
    loading: 'Building your little world…', fallbackTitle: 'This world needs WebGL.',
    fallbackBody: 'The 3D view isn’t available in this browser. The slides tell the same story.',
    fallbackLink: 'Open the slides', sceneLabel: 'Animated 3D classroom and Academy district. Drag to orbit; use the tour controls to visit ten stops.',
    chapters: 'Tour stops', stop: 'Stop', legend: ['Prompts', 'Assets', 'Code', 'Builds'], storeNames: ['Google Play', 'TestFlight / App Store', 'itch.io', 'Steam', 'Epic'],
    names: { classroom: 'The classroom', github: 'GitHub', recording: 'Recording store', assets: 'Asset services', kay: 'Kay server', mac: 'Mac mini', course: 'course.neotodak.com', review: 'Review gate', stores: 'Todak Studios', hero: 'Your Windows PC', projector: 'Class dashboard', tunnel: 'Tunnel · no student login', board: 'Design board' },
    details: { classroom: 'Academy Windows PCs', github: 'Student repositories', recording: 'Supabase · Todak organisation', assets: 'Rented GPU · asset services', kay: 'Collector · publisher · build queue', mac: 'Academy IT room', course: 'Site · /play · /journey', review: 'Lecturer · Neo · Lan', stores: 'Stores street', hero: 'One Workbench. Two AI desks.', projector: 'Steps · builds · showcase links', tunnel: 'Academy-managed access', board: 'The student chooses' },
    screen: { title: 'TODAK WORKBENCH', week: 'WEEK 3 / PONG', steps: 'TODAY’S STEPS', stepList: ['Scaffold', 'Paddle moves', 'Ball bounces', 'Publish to web'], board: 'Design board', links: 'Builds & links', journey: 'Journey', actions: ['Run', 'Build', 'Review', 'Publish'], saved: 'recording · saved', design: 'Design desk', build: 'Build desk', active: 'OPEN', closed: 'CLOSED', designPrompt: 'Paddles, a ball and a title. Make it Arcade.', designReply: 'Three directions. Choose one, then explain why.', buildPrompt: 'Make the left paddle move with W and S.', buildReply: 'paddle.gd updated. Run it in Godot.', live: 'GODOT / LIVE VIEW', keys: 'W / S', assets: 'design/ → design board', code: 'Code → Run → Godot', note: 'One desk open at a time', files: ['design/', 'scripts/', 'assets/'], launch: 'tgk new → Run', handoff: 'Design → Build → Review → Publish → Journey' },
    dashboard: { title: 'THE LECTURER’S VIEW', subtitle: 'CLASS DASHBOARD / ILLUSTRATED', columns: ['Steps', 'Build', 'Showcase'], rows: ['Student A', 'Student B', 'Student C'], ready: 'Ready', progress: 'In progress', open: 'Open game', footer: 'Personal prompt histories stay off the projector.', journey: 'Private lecturer view · /journey', trail: ['Prompt', 'Commit', 'Build', 'Review', 'Game'] },
    reviewPanel: { title: 'ONE REVIEWER. THREE PEOPLE.', chairs: ['Lecturer', 'Neo', 'Lan'], ai: 'AI review report', bypass: 'Neo’s bypass', note: 'Skips the wait for human approval. The reviewer still runs; the reason is logged.', update: 'Publish → learn → update → review again', ladder: ['Web + itch.io · all three games', 'Play testing · games 2 & 3', 'Play production + TestFlight · game 3', 'App Store · optional', 'Steam + Epic · showcase picks'], planned: 'Epic organisation: to open' },
    buildPanel: { title: 'THE PUBLISHING ROUTE', steps: ['Kay queue', 'Tunnel', 'Mac mini', 'Review', 'Showcase'], note: 'Academy machines. Students never log in to the Mac mini.' },
    recordingPanel: { title: 'EVERY PROMPT LEAVES A TRAIL', steps: ['Either desk', 'Kay collector', 'Recording store', 'Your journey'], note: 'Both desks are recorded. The student sees their own journey; the lecturer sees their class.' },
    takehome: { title: 'YOURS TO TAKE FORWARD', cards: ['Game 01', 'Game 02', 'Final game'], footer: 'Three games · a portfolio · a journey export', link: 'Explore the program', demoLink: 'Try today’s demo' },
    stops: [
      { title: 'One classroom. A whole world.', tag: 'WELCOME TO THE DISTRICT', lines: ['Follow an idea from a student’s desk to a game people can play.', 'This is the program plan; today’s demonstrator starts with Pong.'] },
      { title: 'It starts with a student.', tag: '01 / THE CLASSROOM', lines: ['Academy Windows PCs, a lecturer, and a Workbench at every desk.', 'Play, change, explain. The projector shows the class’s steps, builds and games.'] },
      { title: 'One Workbench. Two AI desks.', tag: '02 / THE STUDENT’S SCREEN', lines: ['The Todak sidebar holds the steps; code sits in the middle; Godot shows the game.', 'Start with tgk new, then Run. Open one AI desk at a time.'] },
      { title: 'Give the idea a shape.', tag: '03 / DESIGN WITH ASTRA', lines: ['The Design desk helps with ideas, art, character sheets and screen designs.', 'Assets land on the design board. The student chooses a direction and explains why.'] },
      { title: 'Make it move. See it work.', tag: '04 / BUILD WITH CLAUDE CODE', lines: ['Ask for W and S paddle controls. Claude Code edits the script; run it in Godot.', 'The game moves beside the code. Approved changes belong in the student’s GitHub repository.'] },
      { title: 'The work leaves a journey.', tag: '05 / RECORDING', lines: ['A copy of every prompt from both desks goes through the collector to the recording store.', 'The student and lecturer can follow prompts, commits, builds and reviews in the journey.'] },
      { title: 'A small machine. A bigger audience.', tag: '06 / BUILD & PUBLISH', lines: ['The Kay queue sends a job through the tunnel to the Academy’s Mac mini.', 'The build goes through review, then to the showcase. Students never log in to the build server.'] },
      { title: 'A review before the wider world.', tag: '07 / REVIEW & THE STORES', lines: ['One AI reviewer assists the lecturer, Neo and Lan. Neo can bypass the wait; the bypass is logged.', 'Publish under Todak Studios along the game’s publishing ladder. Learn to ship updates too.'] },
      { title: 'The lecturer sees the learning.', tag: '08 / THE LECTURER’S VIEW', lines: ['The journey connects a prompt to its commit, build, review and published game.', 'Project class progress. Keep personal histories private. Walkthroughs and oral defence decide passing.'] },
      { title: 'Three games. Your name on them.', tag: '09 / WHAT YOU TAKE HOME', lines: ['Two small games and a final game become a portfolio you can show.', 'Keep your authorship, your published games and an export of your prompt journey.'] }
    ]
  },
  bm: {
    pageTitle: 'Bilik darjah dalam 3D · Todak Academy', home: 'Utama', slides: 'Slaid',
    brand: 'TODAK ACADEMY', edition: 'PROGRAM PENCIPTA AI', language: 'Bahasa',
    district: 'BILIK DARJAH DALAM 3D', world: 'Dunia kecil. Perjalanan pembelajaran sebenar.',
    plan: 'PELAN PROGRAM', demo: 'Demo hari ini: Pong. Seluruh daerah ini ialah pelannya.',
    overview: 'Gambaran', previous: 'Hentian sebelumnya', next: 'Hentian seterusnya', play: 'Main lawatan', pause: 'Jeda lawatan',
    replay: 'Ulang lawatan', touring: 'LAWATAN', paused: 'DIJEDA', exploring: 'MENEROKA', finished: 'LAWATAN SELESAI',
    orbit: 'Seret untuk putar · Skrol untuk zum', touch: 'Seret untuk putar · Leret kapsyen untuk hentian',
    resume: 'Seterusnya menyambung lawatan', reduced: 'Kurang gerakan · Teroka mengikut rentak anda',
    disclaimer: 'Animasi, bukan tangkapan skrin. Demonstrator, bukan kit sebenar.',
    loading: 'Membina dunia kecil anda…', fallbackTitle: 'Dunia ini memerlukan WebGL.',
    fallbackBody: 'Paparan 3D tidak tersedia dalam pelayar ini. Slaid menerangkan cerita yang sama.',
    fallbackLink: 'Buka slaid', sceneLabel: 'Animasi 3D bilik darjah dan daerah Academy. Seret untuk putar; gunakan kawalan lawatan untuk sepuluh hentian.',
    chapters: 'Hentian lawatan', stop: 'Hentian', legend: ['Prompt', 'Aset', 'Kod', 'Binaan'], storeNames: ['Google Play', 'TestFlight / App Store', 'itch.io', 'Steam', 'Epic'],
    names: { classroom: 'Bilik darjah', github: 'GitHub', recording: 'Stor rekod', assets: 'Perkhidmatan aset', kay: 'Pelayan Kay', mac: 'Mac mini', course: 'course.neotodak.com', review: 'Pintu semakan', stores: 'Todak Studios', hero: 'PC Windows anda', projector: 'Papan pemuka kelas', tunnel: 'Terowong · tiada log masuk pelajar', board: 'Papan reka bentuk' },
    details: { classroom: 'PC Windows Academy', github: 'Repositori pelajar', recording: 'Supabase · organisasi Todak', assets: 'GPU sewaan · perkhidmatan aset', kay: 'Pengumpul · penerbit · baris gilir', mac: 'Bilik IT Academy', course: 'Laman · /play · /journey', review: 'Pensyarah · Neo · Lan', stores: 'Jalan gedung', hero: 'Satu Workbench. Dua meja AI.', projector: 'Langkah · binaan · pautan permainan', tunnel: 'Akses diurus Academy', board: 'Pelajar membuat pilihan' },
    screen: { title: 'TODAK WORKBENCH', week: 'MINGGU 3 / PONG', steps: 'LANGKAH HARI INI', stepList: ['Rangka awal', 'Paddle bergerak', 'Bola melantun', 'Terbit ke web'], board: 'Papan reka bentuk', links: 'Binaan & pautan', journey: 'Perjalanan', actions: ['Jalankan', 'Bina', 'Semak', 'Terbit'], saved: 'rakaman · disimpan', design: 'Meja reka bentuk', build: 'Meja binaan', active: 'DIBUKA', closed: 'DITUTUP', designPrompt: 'Paddle, bola dan tajuk. Guna gaya Arcade.', designReply: 'Tiga arah. Pilih satu, kemudian jelaskan sebabnya.', buildPrompt: 'Gerakkan paddle kiri dengan W dan S.', buildReply: 'paddle.gd dikemas kini. Jalankan dalam Godot.', live: 'GODOT / PAPARAN LANGSUNG', keys: 'W / S', assets: 'design/ → papan reka bentuk', code: 'Kod → Jalankan → Godot', note: 'Satu meja dibuka pada satu masa', files: ['design/', 'scripts/', 'assets/'], launch: 'tgk new → Jalankan', handoff: 'Reka → Bina → Semak → Terbit → Perjalanan' },
    dashboard: { title: 'PANDANGAN PENSYARAH', subtitle: 'PAPAN PEMUKA KELAS / ILUSTRASI', columns: ['Langkah', 'Binaan', 'Pameran'], rows: ['Pelajar A', 'Pelajar B', 'Pelajar C'], ready: 'Sedia', progress: 'Sedang dibuat', open: 'Buka permainan', footer: 'Sejarah prompt peribadi tidak dipaparkan pada projektor.', journey: 'Paparan peribadi pensyarah · /journey', trail: ['Prompt', 'Komit', 'Binaan', 'Semakan', 'Permainan'] },
    reviewPanel: { title: 'SATU PENYEMAK. TIGA ORANG.', chairs: ['Pensyarah', 'Neo', 'Lan'], ai: 'Laporan semakan AI', bypass: 'Pintasan Neo', note: 'Melangkau waktu menunggu kelulusan manusia. AI tetap menyemak; sebab pintasan direkodkan.', update: 'Terbit → belajar → kemas kini → semak lagi', ladder: ['Web + itch.io · ketiga-tiga permainan', 'Ujian Play · permainan 2 & 3', 'Play produksi + TestFlight · permainan 3', 'App Store · pilihan', 'Steam + Epic · pilihan pameran'], planned: 'Organisasi Epic: akan dibuka' },
    buildPanel: { title: 'LALUAN PENERBITAN', steps: ['Baris gilir Kay', 'Terowong', 'Mac mini', 'Semakan', 'Pameran'], note: 'Mesin Academy. Pelajar tidak log masuk ke Mac mini.' },
    recordingPanel: { title: 'SETIAP PROMPT MENINGGALKAN JEJAK', steps: ['Mana-mana meja', 'Pengumpul Kay', 'Stor rekod', 'Perjalanan anda'], note: 'Kedua-dua meja direkodkan. Pelajar melihat perjalanan sendiri; pensyarah melihat kelas mereka.' },
    takehome: { title: 'BEKALAN UNTUK LANGKAH SETERUSNYA', cards: ['Permainan 01', 'Permainan 02', 'Permainan akhir'], footer: 'Tiga permainan · portfolio · eksport perjalanan', link: 'Teroka program', demoLink: 'Cuba demo hari ini' },
    stops: [
      { title: 'Satu bilik darjah. Seluruh dunia.', tag: 'SELAMAT DATANG KE DAERAH INI', lines: ['Ikuti idea dari meja pelajar hingga menjadi permainan yang boleh dimainkan.', 'Ini pelan program; demonstrator hari ini bermula dengan Pong.'] },
      { title: 'Semuanya bermula dengan pelajar.', tag: '01 / BILIK DARJAH', lines: ['PC Windows Academy, seorang pensyarah dan Workbench di setiap meja.', 'Main, ubah, terangkan. Projektor menunjukkan langkah, binaan dan permainan kelas.'] },
      { title: 'Satu Workbench. Dua meja AI.', tag: '02 / SKRIN PELAJAR', lines: ['Langkah di bar sisi Todak; kod di tengah; Godot memaparkan permainan.', 'Mulakan dengan tgk new, kemudian Jalankan. Buka satu meja AI pada satu masa.'] },
      { title: 'Berikan bentuk kepada idea.', tag: '03 / REKA BERSAMA ASTRA', lines: ['Meja reka bentuk membantu dengan idea, seni, helaian watak dan reka bentuk skrin.', 'Aset masuk ke papan reka bentuk. Pelajar memilih arah dan menjelaskan sebabnya.'] },
      { title: 'Gerakkannya. Lihat hasilnya.', tag: '04 / BINA BERSAMA CLAUDE CODE', lines: ['Minta kawalan paddle W dan S. Claude Code mengubah skrip; jalankan dalam Godot.', 'Permainan bergerak di sebelah kod. Perubahan yang diluluskan masuk ke repositori GitHub pelajar.'] },
      { title: 'Hasil kerja membentuk perjalanan.', tag: '05 / RAKAMAN', lines: ['Salinan setiap prompt daripada kedua-dua meja melalui pengumpul ke stor rekod.', 'Pelajar dan pensyarah boleh mengikuti prompt, komit, binaan dan semakan dalam perjalanan.'] },
      { title: 'Mesin kecil. Penonton lebih ramai.', tag: '06 / BINA & TERBIT', lines: ['Baris gilir Kay menghantar tugas melalui terowong ke Mac mini Academy.', 'Binaan disemak sebelum ke pameran. Pelajar tidak log masuk ke pelayan binaan.'] },
      { title: 'Semakan sebelum ke dunia luar.', tag: '07 / SEMAKAN & GEDUNG', lines: ['Satu penyemak AI membantu pensyarah, Neo dan Lan. Neo boleh memintas giliran; pintasan direkodkan.', 'Terbit di bawah Todak Studios mengikut tangga penerbitan. Belajar menghantar kemas kini juga.'] },
      { title: 'Pensyarah melihat pembelajaran.', tag: '08 / PANDANGAN PENSYARAH', lines: ['Perjalanan menghubungkan prompt dengan komit, binaan, semakan dan permainan diterbitkan.', 'Paparkan kemajuan kelas, simpan sejarah peribadi. Penerangan kod dan viva menentukan kelulusan.'] },
      { title: 'Tiga permainan. Nama anda.', tag: '09 / HASIL YANG DIBAWA PULANG', lines: ['Dua permainan kecil dan satu permainan akhir menjadi portfolio untuk ditunjukkan.', 'Kekalkan hak sebagai pencipta, permainan diterbitkan dan eksport perjalanan prompt anda.'] }
    ]
  }
};
