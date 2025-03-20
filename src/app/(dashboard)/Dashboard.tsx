'use client'
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import PageContainer from '@/app/(dashboard)/components/container/PageContainer';
import SalesOverview from '@/app/(dashboard)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(dashboard)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(dashboard)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(dashboard)/components/dashboard/ProductPerformance';
import Blog from '@/app/(dashboard)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(dashboard)/components/dashboard/MonthlyEarnings';
import AnalyticsWidgetSummary from '@/app/(dashboard)/components/analytics/AnalyticsWidgetSummary';
import AnalyticsConversionRates from './components/analytics/AnalyticsConversionRates';
import AnalyticsOrderTimeline from './components/analytics/AnalyticsOrderTimeline';
import { _timeline } from '../_mock/_data';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <AnalyticsWidgetSummary
              title="Weekly sales"
              percent={2.6}
              total={714000}
              icon={<img alt="icon" src="/images/glass/ic-glass-bag.svg" />}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [22, 8, 35, 50, 82, 84, 77, 12],
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <AnalyticsWidgetSummary
              title="New users"
              percent={-0.1}
              total={1352831}
              color="secondary"
              icon={<img alt="icon" src="/images/glass/ic-glass-users.svg" />}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [56, 47, 40, 62, 73, 30, 23, 54],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <AnalyticsWidgetSummary
              title="Purchase orders"
              percent={2.8}
              total={1723315}
              color="warning"
              icon={<img alt="icon" src="/images/glass/ic-glass-buy.svg" />}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [40, 70, 50, 28, 70, 75, 7, 64],
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <AnalyticsWidgetSummary
              title="Messages"
              percent={3.6}
              total={234}
              color="error"
              icon={<img alt="icon" src="/images/glass/ic-glass-message.svg" />}
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                series: [56, 30, 23, 54, 47, 40, 62, 73],
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 8 }}>
            <SalesOverview />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 4 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <YearlyBreakup />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 4 }}>
            <RecentTransactions />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3, lg: 8 }}>
            <ProductPerformance />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 8 }}>
            <AnalyticsConversionRates
              title="Conversion rates"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
                series: [
                  { name: '2022', data: [44, 55, 41, 64, 22] },
                  { name: '2023', data: [53, 32, 33, 52, 13] },
                ],
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <AnalyticsOrderTimeline title="Order timeline" list={_timeline} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
