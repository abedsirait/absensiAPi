// setup-db.js
const db = require('./models/db'); // Sesuaikan dengan path file db.js Anda

const createTablesSQL = `
-- Buat tabel roles
CREATE TABLE IF NOT EXISTS \`roles\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`nama_role\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert data roles jika belum ada
INSERT IGNORE INTO \`roles\` (\`id\`, \`nama_role\`) VALUES (1, 'admin'), (2, 'parent');

-- Buat tabel parents
CREATE TABLE IF NOT EXISTS \`parents\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`phone\` varchar(20) DEFAULT NULL,
  \`address\` text,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Buat tabel students
CREATE TABLE IF NOT EXISTS \`students\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) DEFAULT NULL,
  \`nis\` varchar(20) DEFAULT NULL,
  \`kelas\` varchar(50) DEFAULT NULL,
  \`parent_id\` int DEFAULT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`nis\` (\`nis\`),
  KEY \`fk_parent_id\` (\`parent_id\`),
  CONSTRAINT \`fk_parent_id\` FOREIGN KEY (\`parent_id\`) REFERENCES \`parents\` (\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Buat tabel users
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) DEFAULT NULL,
  \`email\` varchar(100) DEFAULT NULL,
  \`password\` varchar(255) DEFAULT NULL,
  \`role\` int NOT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email\` (\`email\`),
  KEY \`role\` (\`role\`),
  CONSTRAINT \`users_ibfk_1\` FOREIGN KEY (\`role\`) REFERENCES \`roles\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Buat tabel absensi
CREATE TABLE IF NOT EXISTS \`absensi\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`student_id\` int DEFAULT NULL,
  \`tanggal\` date DEFAULT NULL,
  \`jam\` time DEFAULT NULL,
  \`foto_bukti\` text,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`student_id\` (\`student_id\`),
  CONSTRAINT \`absensi_ibfk_1\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

// Fungsi untuk menjalankan setup database
function setupDatabase() {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('❌ Gagal mendapatkan koneksi:', err.message);
        reject(err);
        return;
      }

      console.log('🔄 Memulai setup database...');

      // Jalankan semua SQL statement
      connection.query(createTablesSQL, (error, results) => {
        connection.release();
        
        if (error) {
          console.error('❌ Gagal membuat tabel:', error.message);
          reject(error);
          return;
        }
        
        console.log('✅ Database setup berhasil!');
        resolve(results);
      });
    });
  });
}

// Jalankan setup jika file dijalankan langsung
if (require.main === module) {
  setupDatabase()
    .then(() => {
      console.log('🎉 Setup database selesai!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Setup database gagal:', error.message);
      process.exit(1);
    });
}

module.exports = setupDatabase;