import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { ReadQueryDto } from './dto';
import * as path from 'path';

@Injectable()
export class CsvService {
  async read(query: ReadQueryDto) {
    const { limit = 30, page = 1 } = query;

    const fetchData = () =>
      new Promise<any[]>((resolve, reject) => {
        const results = [];

        const pathToDataCsv = path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'data.csv',
        );

        fs.createReadStream(pathToDataCsv)
          .pipe(csv())
          .on('data', (data) => {
            // TODO: Carregar conforme o pedido

            return results.push(data);
          })
          .on('end', () => {
            console.log({ results });
            resolve(results);
          })
          .on('error', reject);
      });

    const results = await fetchData();

    const offset = limit * (page - 1);
    const totalPages = Math.ceil(results.length / limit);
    const paginatedItems = results.slice(offset, limit * page);

    return {
      previousPage: page - 1 ? page - 1 : null,
      nextPage: totalPages > page ? page + 1 : null,
      total: results.length,
      totalPages: totalPages,
      data: paginatedItems,
    };
  }
}
