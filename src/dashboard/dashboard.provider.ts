import { DataSource } from 'typeorm';
import { Dashboard } from './entities/dashboard.entity';

export const dashboardProviders = [
  {
    provide: 'DASHBOARD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dashboard),
    inject: ['DATA_SOURCE'],
  },
];
