<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizzes = [
            [
                'teacher_id' => 1,
                'slug' => 'matematika-dasar-kelas-7',
                'title' => 'Matematika Dasar Kelas 7',
                'description' =>
                    'Quiz matematika dasar untuk siswa kelas 7 mencakup operasi bilangan bulat dan pecahan',
                'time_limit_minutes' => 60,
                'max_attempts' => 2,
                'max_participants' => 30,
                'visibility' => 'public',
                'access_code' => null,
                'require_code' => false,
                'start_time' => Carbon::now()->addDays(1),
                'end_time' => Carbon::now()->addDays(7),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 1,
                'slug' => 'bahasa-indonesia-puisi',
                'title' => 'Bahasa Indonesia - Puisi',
                'description' =>
                    'Quiz tentang struktur puisi, majas, dan analisis karya sastra Indonesia',
                'time_limit_minutes' => 45,
                'max_attempts' => 1,
                'max_participants' => 25,
                'visibility' => 'private',
                'access_code' => 'PUISI1', // 6 karakter
                'require_code' => true,
                'start_time' => Carbon::now()->addHours(2),
                'end_time' => Carbon::now()->addDays(3),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 2,
                'slug' => 'ipa-sistem-tata-surya',
                'title' => 'IPA - Sistem Tata Surya',
                'description' =>
                    'Quiz mengenai planet-planet, satelit, dan fenomena astronomi dalam tata surya',
                'time_limit_minutes' => 30,
                'max_attempts' => 3,
                'max_participants' => 40,
                'visibility' => 'public',
                'access_code' => null,
                'require_code' => false,
                'start_time' => null,
                'end_time' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 2,
                'slug' => 'sejarah-kemerdekaan-indonesia',
                'title' => 'Sejarah Kemerdekaan Indonesia',
                'description' =>
                    'Quiz tentang perjuangan kemerdekaan Indonesia dari masa pergerakan hingga proklamasi',
                'time_limit_minutes' => 90,
                'max_attempts' => 1,
                'max_participants' => 35,
                'visibility' => 'private',
                'access_code' => 'MRDEKA', // 6 karakter (disingkat dari MERDEKA)
                'require_code' => true,
                'start_time' => Carbon::now()->subDays(1),
                'end_time' => Carbon::now()->addDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 3,
                'slug' => 'english-grammar-basic',
                'title' => 'English Grammar Basic',
                'description' =>
                    'Basic English grammar quiz covering tenses, articles, and sentence structure',
                'time_limit_minutes' => 40,
                'max_attempts' => 2,
                'max_participants' => 20,
                'visibility' => 'public',
                'access_code' => null,
                'require_code' => false,
                'start_time' => Carbon::now()->addDays(2),
                'end_time' => Carbon::now()->addWeeks(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 3,
                'slug' => 'pkn-pancasila-dan-uud',
                'title' => 'PKN - Pancasila dan UUD 1945',
                'description' =>
                    'Quiz tentang nilai-nilai Pancasila dan pasal-pasal penting dalam UUD 1945',
                'time_limit_minutes' => 50,
                'max_attempts' => 1,
                'max_participants' => 40,
                'visibility' => 'private',
                'access_code' => 'PKN123', // 6 karakter
                'require_code' => true,
                'start_time' => Carbon::now()->addHours(6),
                'end_time' => Carbon::now()->addDays(4),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 1,
                'slug' => 'geografi-iklim-indonesia',
                'title' => 'Geografi - Iklim Indonesia',
                'description' =>
                    'Quiz mengenai karakteristik iklim tropis Indonesia dan faktor-faktor yang mempengaruhinya',
                'time_limit_minutes' => 35,
                'max_attempts' => 2,
                'max_participants' => 30,
                'visibility' => 'public',
                'access_code' => null,
                'require_code' => false,
                'start_time' => null,
                'end_time' => Carbon::now()->addDays(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 2,
                'slug' => 'biologi-ekosistem',
                'title' => 'Biologi - Ekosistem',
                'description' =>
                    'Quiz tentang komponen ekosistem, rantai makanan, dan keseimbangan alam',
                'time_limit_minutes' => 55,
                'max_attempts' => 1,
                'max_participants' => 25,
                'visibility' => 'private',
                'access_code' => 'BIO456', // 6 karakter
                'require_code' => true,
                'start_time' => Carbon::now()->addDays(3),
                'end_time' => Carbon::now()->addWeeks(1),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 3,
                'slug' => 'fisika-gerak-lurus',
                'title' => 'Fisika - Gerak Lurus',
                'description' =>
                    'Quiz fisika tentang konsep gerak lurus beraturan dan gerak lurus berubah beraturan',
                'time_limit_minutes' => 70,
                'max_attempts' => 3,
                'max_participants' => 40,
                'visibility' => 'public',
                'access_code' => null,
                'require_code' => false,
                'start_time' => Carbon::now()->addHours(12),
                'end_time' => Carbon::now()->addDays(6),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'teacher_id' => 1,
                'slug' => 'kimia-tabel-periodik',
                'title' => 'Kimia - Tabel Periodik',
                'description' =>
                    'Quiz mengenai unsur-unsur dalam tabel periodik, sifat-sifat, dan konfigurasi elektron',
                'time_limit_minutes' => 65,
                'max_attempts' => 2,
                'max_participants' => 35,
                'visibility' => 'private',
                'access_code' => 'KIMIA7', // 6 karakter
                'require_code' => true,
                'start_time' => Carbon::now()->addDays(1)->addHours(3),
                'end_time' => Carbon::now()->addDays(8),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('quizzes')->insert($quizzes);
    }
}
