const DataKelas = [
    {
        "id": "a1",
        "nama": "X RPL 1",
        "grade": 10,
    },
    {
        "id": "a2",
        "nama": "XI RPL 1",
        "grade": 11,
    },
    {
        "id": "a3",
        "nama": "XII RPL 1",
        "grade": 12,
    },
        
]

const DataSiswa = [
    {
        id: "b1",
        nama: "Aldi",
        id_kelas: "a1",
    },
    {
        id: "b2",
        nama: "Budi",
        id_kelas: "a1",
    },
    {
        id: "b3",
        nama: "Caca",
        id_kelas: "a1",
    },
    {
        id: "b4",
        nama: "Dedi",
        id_kelas: "a1",
    },
    {
        id: "b5",
        nama: "Eka",
        id_kelas: "a1",
    },
]

const DataGuru = [
    {
        id: "c1",
        nama: "Pak A",
    },
    {
        id: "c2",
        nama: "Pak B",
    },
    {
        id: "c3",
        nama: "Pak C",
    },
    {
        id: "c4",
        nama: "Pak D",
    },
]

const DataMataPelajaran = [
    {
        id: "d1",
        nama: "Matematika",
    },
    {
        id: "d2",
        nama: "Bahasa Indonesia",
    },
]

const DataAjaran = [
    {
        id: "e1",
        id_guru: "c1",
        id_mapel: "d1",
    },
    {
        id: "e2",
        id_guru: "c2",
        id_mapel: "d2",
    },
    {
        id: "e3",
        id_guru: "c3",
        id_mapel: "d1",
    },
    {
        id: "e4",
        id_guru: "c4",
        id_mapel: "d2",
    },
]


const DataJadwal = [
    {
        id: "h1",
        id_kelas: "a1",
        id_ajaran: "e1",
        periode: "1",
        hari: "Senin",
    },
    {
        id: "h2",
        id_kelas: "a1",
        id_ajaran: "e2",
        periode: "2",
        hari: "Senin",
    },
]

const DataAbsensi = [
    // id_jadwal: h1
    { id: "i1", id_jadwal: "h1", tanggal: "2021-09-01" },
    { id: "i2", id_jadwal: "h1", tanggal: "2021-09-08" },
    { id: "i3", id_jadwal: "h1", tanggal: "2021-09-15" },
    { id: "i4", id_jadwal: "h1", tanggal: "2021-09-22" },
    { id: "i5", id_jadwal: "h1", tanggal: "2021-09-29" },
    { id: "i6", id_jadwal: "h1", tanggal: "2021-10-06" },
    { id: "i7", id_jadwal: "h1", tanggal: "2021-10-13" },
    { id: "i8", id_jadwal: "h1", tanggal: "2021-10-20" },
    { id: "i9", id_jadwal: "h1", tanggal: "2021-10-27" },
    { id: "i10", id_jadwal: "h1", tanggal: "2021-11-03" },
    { id: "i11", id_jadwal: "h1", tanggal: "2021-11-10" },
    { id: "i12", id_jadwal: "h1", tanggal: "2021-11-17" },
    { id: "i13", id_jadwal: "h1", tanggal: "2021-11-24" },
    { id: "i14", id_jadwal: "h1", tanggal: "2021-12-01" },
    { id: "i15", id_jadwal: "h1", tanggal: "2021-12-08" },
    { id: "i16", id_jadwal: "h1", tanggal: "2021-12-15" },
    // id_jadwal: h2
    { id: "i17", id_jadwal: "h2", tanggal: "2021-09-02" },
    { id: "i18", id_jadwal: "h2", tanggal: "2021-09-09" },
    { id: "i19", id_jadwal: "h2", tanggal: "2021-09-16" },
    { id: "i20", id_jadwal: "h2", tanggal: "2021-09-23" },
    { id: "i21", id_jadwal: "h2", tanggal: "2021-09-30" },
    { id: "i22", id_jadwal: "h2", tanggal: "2021-10-07" },
    { id: "i23", id_jadwal: "h2", tanggal: "2021-10-14" },
    { id: "i24", id_jadwal: "h2", tanggal: "2021-10-21" },
    { id: "i25", id_jadwal: "h2", tanggal: "2021-10-28" },
    { id: "i26", id_jadwal: "h2", tanggal: "2021-11-04" },
    { id: "i27", id_jadwal: "h2", tanggal: "2021-11-11" },
    { id: "i28", id_jadwal: "h2", tanggal: "2021-11-18" },
    { id: "i29", id_jadwal: "h2", tanggal: "2021-11-25" },
    { id: "i30", id_jadwal: "h2", tanggal: "2021-12-02" },
    { id: "i31", id_jadwal: "h2", tanggal: "2021-12-09" },
    { id: "i32", id_jadwal: "h2", tanggal: "2021-12-16" },
    // id_jadwal: h3
    // { id: "i33", id_jadwal: "h3", tanggal: "2021-09-03" },
    // { id: "i34", id_jadwal: "h3", tanggal: "2021-09-10" },
    // { id: "i35", id_jadwal: "h3", tanggal: "2021-09-17" },
    // { id: "i36", id_jadwal: "h3", tanggal: "2021-09-24" },
    // { id: "i37", id_jadwal: "h3", tanggal: "2021-10-01" },
    // { id: "i38", id_jadwal: "h3", tanggal: "2021-10-08" },
    // { id: "i39", id_jadwal: "h3", tanggal: "2021-10-15" },
    // { id: "i40", id_jadwal: "h3", tanggal: "2021-10-22" },
    // { id: "i41", id_jadwal: "h3", tanggal: "2021-10-29" },
    // { id: "i42", id_jadwal: "h3", tanggal: "2021-11-05" },
    // { id: "i43", id_jadwal: "h3", tanggal: "2021-11-12" },
    // { id: "i44", id_jadwal: "h3", tanggal: "2021-11-19" },
    // { id: "i45", id_jadwal: "h3", tanggal: "2021-11-26" },
    // { id: "i46", id_jadwal: "h3", tanggal: "2021-12-03" },
    // { id: "i47", id_jadwal: "h3", tanggal: "2021-12-10" },
    // { id: "i48", id_jadwal: "h3", tanggal: "2021-12-17" },
];


const DataPresensi = [
    {
        id  : "j1",
        id_siswa : "b1",
        id_absensi : "i2",
        kehadiran: "Hadir",
    },
    {
        id  : "j1",
        id_siswa : "b1",
        id_absensi : "i1",
        kehadiran: "Izin",
    },
    {
        id  : "j2",
        id_siswa : "b2",
        id_absensi : "i1",
        kehadiran: "Hadir",
    },
    {
        id  : "j3",
        id_siswa : "b3",
        id_absensi : "i1",
        kehadiran: "Hadir",
    },
    {
        id  : "j4",
        id_siswa : "b4",
        id_absensi : "i1",
        kehadiran: "Tidak Hadir",
    },
    {
        id  : "j5",
        id_siswa : "b5",
        id_absensi : "i1",
        kehadiran: "Hadir",
    },
    {
        id  : "j2",
        id_siswa : "b2",
        id_absensi : "i2",
        kehadiran: "Hadir",
    },
    {
        id  : "j3",
        id_siswa : "b3",
        id_absensi : "i2",
        kehadiran: "Tidak Hadir",
    },
    {
        id  : "j4",
        id_siswa : "b4",
        id_absensi : "i2",
        kehadiran: "Hadir",
    },
    {
        id  : "j5",
        id_siswa : "b5",
        id_absensi : "i2",
        kehadiran: "Hadir",
    },
    
]



export { DataKelas, DataSiswa, DataGuru, DataMataPelajaran, DataAjaran, DataJadwal, DataAbsensi, DataPresensi }