// Configuración de tu base de datos remota en Firebase
// Reemplaza con tus llaves reales desde la consola de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Control de pestañas
function switchTab(tabId, element) {
  document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  element.classList.add('active');
}

// Subida de archivos
function handleUpload() {
  const fileInput = document.getElementById('mediaInput');
  const btn = document.getElementById('btnUpload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Por favor selecciona un archivo primero.');
    return;
  }

  let type = 'image';
  if (file.type.startsWith('video/')) type = 'video';
  else if (file.type.startsWith('audio/')) type = 'audio';

  btn.disabled = true;
  btn.innerText = 'Subiendo a la nube...';

  uploadSharedMedia(file, type, () => {
    btn.disabled = false;
    btn.innerText = 'Guardar en la Nube';
    fileInput.value = '';
  });
}

function uploadSharedMedia(file, type, callback) {
  const storageRef = storage.ref(`gallery/${Date.now()}_${file.name}`);
  storageRef.put(file).then(snapshot => {
    snapshot.ref.getDownloadURL().then(url => {
      db.collection("shared_gallery").add({
        url: url,
        type: type,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        if(callback) callback();
      });
    });
  }).catch(err => {
    alert('Error al subir: ' + err.message);
    if(callback) callback();
  });
}

// Renderizado dinámico
function renderMediaItem(type, url, date, id) {
  const card = document.createElement('div');
  card.className = 'media-card';

  const formattedDate = date ? new Date(date.toDate()).toLocaleDateString() : '';

  if (type === 'image') {
    card.innerHTML = `<img src="${url}" loading="lazy"><span class="media-date">${formattedDate}</span>`;
    document.getElementById('photosTab').appendChild(card);
  } else if (type === 'video') {
    card.innerHTML = `<video src="${url}" controls></video><span class="media-date">${formattedDate}</span>`;
    document.getElementById('videosTab').appendChild(card);
  } else if (type === 'audio') {
    card.innerHTML = `<audio src="${url}" controls></audio><span class="media-date">${formattedDate}</span>`;
    document.getElementById('audiosTab').appendChild(card);
  }
}

// Escuchador en tiempo real
db.collection("shared_gallery").orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    document.getElementById('photosTab').innerHTML = '';
    document.getElementById('videosTab').innerHTML = '';
    document.getElementById('audiosTab').innerHTML = '';
    
    snapshot.forEach(doc => {
      const data = doc.data();
      renderMediaItem(data.type, data.url, data.createdAt, doc.id);
    });
  });