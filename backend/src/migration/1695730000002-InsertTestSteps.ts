import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTestSteps1695730000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO step (title, questions) VALUES 
      ('Step 1', '[{"id": 1, "label": "What is your name?", "type": "text"}]'),
      ('Step 2', '[{"id": 2, "label": "How old are you?", "type": "number"}]'),
      ('Step 3', '[{"id": 3, "label": "Choose your gender", "type": "single-choice", "options": ["Male", "Female", "Other"]}]'),
      ('Step 4', '[{"id": 4, "label": "Select your hobbies", "type": "multi-choice", "options": ["Reading", "Sports", "Music", "Movies"]}]');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM step WHERE title IN ('Step 1', 'Step 2', 'Step 3')`);
  }
}
