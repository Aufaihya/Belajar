let teks = localStorage.getItem("tugas");

const tombolTambah = document.getElementById("tombolTambah");
let Tugas = JSON.parse(teks) || [];
let nomer = Math.max(0, ...Tugas.map((t) => t.id));

tampilkan(Tugas);

tombolTambah.addEventListener("click", () => {
  const inputTugas = document.getElementById("inputTugas");

  if (inputTugas.value === "") {
    return;
  }

  let nama = Tugas.map((t) => t.nama);
  let asli = inputTugas.value;
  let namaBaru = asli;
  let n = 1;

  while (nama.includes(namaBaru)) {
    namaBaru = asli + " " + n;
    n = n + 1;
  }

  nomer = nomer + 1;

  let temp = { id: nomer, nama: namaBaru, selesai: false };
  Tugas.push(temp);
  localStorage.setItem("tugas", JSON.stringify(Tugas));
  tampilkan(Tugas);
  inputTugas.value = "";
});

function tampilkan(data) {
  const daftar = document.getElementById("daftar");
  daftar.innerHTML = "";

  data.forEach((n, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${n.nama}`;
    daftar.appendChild(li);

    let tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    li.appendChild(tombolHapus);

    tombolHapus.addEventListener("click", () => {
      Tugas = Tugas.filter((t) => t.id !== n.id);
      localStorage.setItem("tugas", JSON.stringify(Tugas));
      tampilkan(Tugas);
    });

    let tombolSelesai = document.createElement("button");
    n.selesai
      ? (tombolSelesai.textContent = "selesai")
      : (tombolSelesai.textContent = "belum");
    li.appendChild(tombolSelesai);

    tombolSelesai.addEventListener("click", () => {
      n.selesai = !n.selesai;
      localStorage.setItem("tugas", JSON.stringify(Tugas));
      tampilkan(Tugas);
    });
  }); // ini adalah akhir foreach
}
