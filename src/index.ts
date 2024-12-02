import { promises as fs } from 'fs';

const day = process.argv[2];

(async () => {
  if (!day) {
    console.error('Please provide a day folder name as an argument');
    process.exit(1);
  }

  //check if the day folder exists
  const directories = await fs.readdir(__dirname);
  if (!directories.includes(day)) {
    console.error(`Day ${day} does not exist`);
    console.error(
      `Please provide one of the following days: ${directories.filter((el) => el.includes('day')).join(', ')}`
    );
    process.exit(1);
  }

  try {
    const { default: run } = await import(`./${day}`);
    run();
  } catch (error) {
    console.error(error);
  }
})();
