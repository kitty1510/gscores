import { AppDataSource } from '../../config/typeorm.config';
import { Student } from '../../modules/students/student.entity';
import csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

const CSV_PATH =
  process.env.CSV_PATH ||
  path.join(__dirname, '..', '..', '..', '..', '..', 'dataset', 'diem_thi_thpt_2024.csv');
const BATCH_SIZE = 1000;

function parseScore(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

async function seed(): Promise<void> {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Student);
  const existing = await repo.count();
  if (existing > 0) {
    console.log(`Seed skipped: ${existing.toLocaleString()} students already in database.`);
    await AppDataSource.destroy();
    return;
  }

  console.log('Database connected. Starting CSV import...');

  const batch: Partial<Student>[] = [];
  let total = 0;

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', async (row: Record<string, string>) => {
        batch.push({
          sbd: row['sbd']?.trim(),
          toan: parseScore(row['toan']),
          ngu_van: parseScore(row['ngu_van']),
          ngoai_ngu: parseScore(row['ngoai_ngu']),
          vat_li: parseScore(row['vat_li']),
          hoa_hoc: parseScore(row['hoa_hoc']),
          sinh_hoc: parseScore(row['sinh_hoc']),
          lich_su: parseScore(row['lich_su']),
          dia_li: parseScore(row['dia_li']),
          gdcd: parseScore(row['gdcd']),
          ma_ngoai_ngu: row['ma_ngoai_ngu']?.trim() || null,
        });

        if (batch.length >= BATCH_SIZE) {
          const toInsert = batch.splice(0, BATCH_SIZE);
          total += toInsert.length;
          await repo
            .createQueryBuilder()
            .insert()
            .into(Student)
            .values(toInsert as Student[])
            .orIgnore()
            .execute();
          console.log(`Imported ${total} rows...`);
        }
      })
      .on('end', async () => {
        if (batch.length > 0) {
          total += batch.length;
          await repo
            .createQueryBuilder()
            .insert()
            .into(Student)
            .values(batch as Student[])
            .orIgnore()
            .execute();
        }
        console.log(`Import complete. Total rows: ${total}`);
        resolve();
      })
      .on('error', reject);
  });

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
