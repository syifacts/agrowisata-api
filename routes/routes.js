// routes/agrowisata.js
const Agrowisata = require('../models/agrowisata');

// GET - Mengambil semua data agrowisata
const getAgrowisata = async (request, h) => {
  try {
    const agrowisata = await Agrowisata.find();
    
    // Menampilkan _id bersama data lainnya
    return h.response(agrowisata).code(200);
  } catch (err) {
    return h.response({ message: 'Error fetching data' }).code(500);
  }
};

// GET - Mengambil data agrowisata berdasarkan ID
const getAgrowisataById = async (request, h) => {
  const { id } = request.params;
  try {
    const agrowisata = await Agrowisata.findById(id); // Menggunakan findById untuk mencari berdasarkan _id
    if (!agrowisata) {
      return h.response({ message: 'Agrowisata not found' }).code(404);
    }
    return h.response(agrowisata).code(200); // _id sudah termasuk dalam data yang dikembalikan
  } catch (err) {
    return h.response({ message: 'Error fetching data' }).code(500);
  }
};


// POST - Menambahkan data agrowisata
const postAgrowisata = async (request, h) => {
  const { name, location, urlimg, urlmaps, fasilitas } = request.payload;

  // Validasi input
  if (!name || !location || !urlimg || !urlmaps || !fasilitas) {
    return h.response({ message: 'Semua field wajib diisi!' }).code(400);
  }

  try {
    // Menghilangkan penggunaan 'id' karena MongoDB akan otomatis menambahkan '_id'
    const newAgrowisata = new Agrowisata({ name, location, urlimg, urlmaps, fasilitas });
    await newAgrowisata.save();
    return h.response({ message: 'Data added successfully' }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ message: 'Error adding data', error: err.message }).code(500);
  }
};


// PUT - Mengupdate data agrowisata berdasarkan ID
const putAgrowisata = async (request, h) => {
  const { id } = request.params;
  const { name, location, urlimg, urlmaps, fasilitas } = request.payload;

  // Validasi input
  if (!name || !location || !urlimg || !urlmaps || !fasilitas) {
    return h.response({ message: 'Semua field wajib diisi!' }).code(400);
  }

  try {
    const updatedAgrowisata = await Agrowisata.findByIdAndUpdate(  // Menggunakan findByIdAndUpdate untuk MongoDB _id
      id,
      { name, location, urlimg, urlmaps, fasilitas },
      { new: true } // Mengembalikan data yang telah diperbarui
    );
    if (!updatedAgrowisata) {
      return h.response({ message: 'Agrowisata not found' }).code(404);
    }
    return h.response(updatedAgrowisata).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ message: 'Error updating data', error: err.message }).code(500);
  }
};

// DELETE - Menghapus data agrowisata berdasarkan ID
const deleteAgrowisata = async (request, h) => {
  const { id } = request.params;
  try {
    const deletedAgrowisata = await Agrowisata.findByIdAndDelete(id);  // Menggunakan findByIdAndDelete untuk MongoDB _id
    if (!deletedAgrowisata) {
      return h.response({ message: 'Agrowisata not found' }).code(404);
    }
    return h.response({ message: 'Data deleted successfully' }).code(200);
  } catch (err) {
    console.error(err);
    return h.response({ message: 'Error deleting data', error: err.message }).code(500);
  }
};

module.exports = [
  {
    method: 'GET',
    path: '/agrowisata',
    handler: getAgrowisata,
  },
  {
    method: 'GET',
    path: '/agrowisata/{id}',
    handler: getAgrowisataById, // Menggunakan handler baru untuk GET berdasarkan ID
  },
  {
    method: 'POST',
    path: '/agrowisata',
    handler: postAgrowisata,
  },
  {
    method: 'PUT',
    path: '/agrowisata/{id}',
    handler: putAgrowisata,
  },
  {
    method: 'DELETE',
    path: '/agrowisata/{id}',
    handler: deleteAgrowisata,
  },
];
