import { Card, CardContent, Typography } from '@mui/material';
import styles from './page.module.css'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
export default async function Home() {
  return (
    <div className={styles.page}>
         <Card>
          where there i sfea
          <Typography>
          welCome to the page
          </Typography>
          <h4>
            haile
          </h4>
          <CardContent>
            CardContent
          </CardContent>
         </Card>
    </div>
  );
}
