if (typeof Storage !== 'undefined') {
  // localStorage.setItem(
  //   'dataPasien',
  //   JSON.stringify([
  //     {
  //       id: '001',
  //       nama: 'Uin',
  //       alamat: 'Jl. Gamelab Indonesia',
  //       penyakit: 'Flu',
  //       nomorRuang: 'R203',
  //       bpjs: 'Kelas I',
  //       tanggalMasuk: '2020-02-05',
  //       tanggalKeluar: '2020-02-13',
  //     },
  //   ])
  // );

  var dataPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];

  function showDataPasien() {
    var tbody = document.getElementById('dataPasien');

    dataPasien.forEach(function (pasien) {
      var tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${pasien.id}</td>
      <td>${pasien.nama}</td>
      <td>${pasien.alamat}</td>
      <td>${pasien.penyakit}</td>
      <td>${pasien.nomorRuang}</td>
      <td>${pasien.bpjs}</td>
      <td>${pasien.tanggalMasuk}</td>
      <td>${pasien.tanggalKeluar ? pasien.tanggalKeluar : 'Masih dirawat'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function addPasien() {
    var id = document.getElementById('id').value;
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    var penyakit = document.getElementById('penyakit').value;
    var nomorRuang = document.getElementById('nomorRuang').value;
    var bpjs = document.getElementById('bpjs').value;
    var tanggalMasuk = document.getElementById('tanggalMasuk').value;
    var tanggalKeluar = document.getElementById('tanggalKeluar').value;

    var newPasien = {
      id: id,
      nama: nama,
      alamat: alamat,
      penyakit: penyakit,
      nomorRuang: nomorRuang,
      bpjs: bpjs,
      tanggalMasuk: tanggalMasuk,
      tanggalKeluar: tanggalKeluar,
    };

    var isIdExist = dataPasien.find(function (pasien) {
      return pasien.id === id;
    });

    if (isIdExist) {
      updatePasien(newPasien);
    } else {
      dataPasien.push(newPasien);
      localStorage.setItem('dataPasien', JSON.stringify(dataPasien));
      var tbody = document.getElementById('dataPasien');
      tbody.innerHTML = '';
      showDataPasien(newPasien);
      clearForm();
      alert('Data berhasil disimpan');
    }
  }

  function clearForm() {
    document.getElementById('id').value = '';
    document.getElementById('nama').value = '';
    document.getElementById('alamat').value = '';
    document.getElementById('penyakit').value = '';
    document.getElementById('nomorRuang').value = '';
    document.getElementById('bpjs').value = '';
    document.getElementById('tanggalMasuk').value = '';
    document.getElementById('tanggalKeluar').value = '';
  }

  function searchPasien(id) {
    var tbody = document.getElementById('dataPasien');
    tbody.innerHTML = '';

    var pasien = dataPasien.find(function (pasien) {
      return pasien.id === document.getElementById('id').value;
    });

    if (pasien) {
      showDataPasien(pasien);
      document.getElementById('nama').value = pasien.nama;
      document.getElementById('alamat').value = pasien.alamat;
      document.getElementById('penyakit').value = pasien.penyakit;
      document.getElementById('nomorRuang').value = pasien.nomorRuang;
      document.getElementById('bpjs').value = pasien.bpjs;
      document.getElementById('tanggalMasuk').value = pasien.tanggalMasuk;
      document.getElementById('tanggalKeluar').value = pasien.tanggalKeluar;
    } else {
      alert('Data tidak ditemukan');
      showDataPasien();
    }
  }

  function updatePasien(newPasien) {
    var pasien = dataPasien.find(function (pasien) {
      return pasien.id === newPasien.id;
    });

    if (pasien) {
      var index = dataPasien.indexOf(pasien);
      dataPasien[index] = newPasien;
      localStorage.setItem('dataPasien', JSON.stringify(dataPasien));
      clearForm();
      var tbody = document.getElementById('dataPasien');
      tbody.innerHTML = '';
      showDataPasien();
      alert('Data berhasil diupdate');
    } else {
      alert('Data tidak ditemukan');
      showDataPasien();
    }
  }

  function deletePasien() {
    var pasien = dataPasien.find(function (pasien) {
      return pasien.id === document.getElementById('id').value;
    });

    if (pasien) {
      confirm('Data Pasien akan dihapus, apakah Anda yakin?');
      var index = dataPasien.indexOf(pasien);
      dataPasien.splice(index, 1);
      localStorage.setItem('dataPasien', JSON.stringify(dataPasien));
      clearForm();
      var tbody = document.getElementById('dataPasien');
      tbody.innerHTML = '';
      showDataPasien();
      alert('Data berhasil dihapus');
    } else {
      alert('Data tidak ditemukan');
      var tbody = document.getElementById('dataPasien');
      tbody.innerHTML = '';
      showDataPasien();
    }
  }

  document.getElementById('save').addEventListener('click', function (event) {
    event.preventDefault();
    if (
      !document.getElementById('id').value ||
      !document.getElementById('nama').value ||
      !document.getElementById('alamat').value ||
      !document.getElementById('penyakit').value ||
      !document.getElementById('nomorRuang').value ||
      !document.getElementById('bpjs').value ||
      !document.getElementById('tanggalMasuk').value
    ) {
      alert('Data tidak boleh kosong');
      return;
    }
    addPasien();
  });

  document.getElementById('search').addEventListener('click', function (event) {
    event.preventDefault();
    searchPasien();
  });

  document.getElementById('show').addEventListener('click', function (event) {
    event.preventDefault();
    var tbody = document.getElementById('dataPasien');
    tbody.innerHTML = '';
    showDataPasien();
  });

  document.getElementById('delete').addEventListener('click', function (event) {
    event.preventDefault();
    deletePasien();
  });

  showDataPasien();
} else {
  alert('Browser tidak mendukung Web Storage');
}
