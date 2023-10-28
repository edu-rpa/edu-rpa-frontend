import { BpmnParser } from '@/utils/bpmn-parser/bpmn-parser.util';
import { BpmnParseError } from '@/utils/bpmn-parser/error';
import { promises as fsPromises } from 'fs';
import { dirname } from 'path';

async function parseAndWriteBpmnToFile(inputPath: string, outputPath: string) {
  const process = new BpmnParser().parse(inputPath);
  await fsPromises.mkdir(dirname(outputPath), { recursive: true });
  await fsPromises.writeFile(outputPath, JSON.stringify(process, null, 2));
  console.log(BpmnParseError);
}

describe('BPMN Test', () => {
  it('Test 1', async () => {
    await parseAndWriteBpmnToFile(
      '__test__/bpmn/1.xml',
      '__test__/output/1.json'
    );
  });

  it('Test 2', async () => {
    await parseAndWriteBpmnToFile(
      '__test__/bpmn/2.xml',
      '__test__/output/2.json'
    );
  });
});
